
'use server';

import Stripe from 'stripe';
import * as z from 'zod';
import nodemailer from 'nodemailer';
import { getAdminDb, handleFirestoreError, OperationType, FieldValue } from './firebase-admin';
import { verifyDiscountCode } from './discount-actions';
import { MOCK_RATES } from './data';
import type { Currency, Service } from './types';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactRequest(values: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') {
    return { success: false, error: "Database connection is not available." };
  }

  try {
    await db.collection("contacts").add({
      ...validatedFields.data,
      createdAt: FieldValue.serverTimestamp(),
    });

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const isSecure = process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === 'true'
        : smtpPort === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: { rejectUnauthorized: false }
      });

      const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
      const mailOptions = {
        from: `"${validatedFields.data.name} via ArrDuBlu Studio" <${fromEmail}>`,
        to: 'hi@arrdublu.us',
        replyTo: validatedFields.data.email,
        subject: `New Contact Submission: ${validatedFields.data.subject}`,
        text: `You have received a new Contact Request from ${validatedFields.data.name} (${validatedFields.data.email}).\n\nSubject: ${validatedFields.data.subject}\n\nMessage:\n${validatedFields.data.message}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${validatedFields.data.name}</p>
          <p><strong>Email:</strong> ${validatedFields.data.email}</p>
          <p><strong>Subject:</strong> ${validatedFields.data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedFields.data.message ? validatedFields.data.message.replace(/\n/g, '<br>') : 'No message provided.'}</p>
        `,
      };

      const MAX_RETRIES = 3;
      let attempt = 0;
      let emailSent = false;
      let lastError = null;

      while (attempt < MAX_RETRIES && !emailSent) {
        try {
          console.log(`[Diagnostic] Attempting to send email (Attempt ${attempt + 1}/${MAX_RETRIES})`);
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log('[Diagnostic] Server-side SMTP connection and transmission successful.');
        } catch (error: any) {
          lastError = error;
          console.error(`[Diagnostic] Server-side SMTP connection or transmission failed on attempt ${attempt + 1}:`, error);
          attempt++;
          if (attempt < MAX_RETRIES) {
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`[Diagnostic] Waiting ${delay}ms before next retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      if (!emailSent) {
        try {
          await db.collection("failed_messages").add({
            error: lastError instanceof Error ? lastError.message : String(lastError),
            contactData: validatedFields.data,
            createdAt: FieldValue.serverTimestamp(),
          });
          console.log("[Diagnostic] Failed message saved to 'failed_messages' collection for admin retry.");
        } catch (dbError) {
          console.error("Failed to log failed message to Firestore", dbError);
        }
        return { success: false, error: "Transmission partially failed: Saved to database, but email notification failed. Admins can retry later." };
      }
    } else {
      console.warn("SMTP environment variables are not configured. Email to hi@arrdublu.us skipped, but contact stored in database.");
      return { success: true, message: "Request received and saved successfully. Email notification skipped (SMTP not configured)." };
    }

    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'contacts');
    return { success: false, error: "Failed to submit contact request" };
  }
}

export async function createPaymentIntent(
  items: {service: Service, quantity: number}[],
  currency: Currency,
  discountCode?: string
): Promise<{ clientSecret: string; orderId: string }> {
  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') {
    throw new Error('Database connection is not available. Please try again later.');
  }

  const orderItems = items.map(item => ({
    itemId: item.service.id,
    name: item.service.name,
    quantity: item.quantity,
    price: item.service.price, // Price is always stored in USD
  }));

  const subtotal = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
  let totalAmount = subtotal; // This is in USD
  let discountAmount = 0;

  const orderData: any = {
    items: orderItems,
    subtotal: subtotal,
    status: 'pending',
    currency: currency,
    createdAt: FieldValue.serverTimestamp(),
  };

  if (discountCode) {
    try {
      const discount = await verifyDiscountCode(discountCode);
      if (discount.type === 'percentage') {
        discountAmount = subtotal * (discount.value / 100);
      } else {
        discountAmount = discount.value;
      }
      totalAmount = Math.max(0, subtotal - discountAmount);
      
      orderData.discountCode = discount.code;
      orderData.discountAmount = discountAmount;

    } catch (error) {
      console.warn(`Invalid discount code "${discountCode}" provided during checkout. Proceeding without discount.`);
    }
  }
  
  orderData.totalAmount = totalAmount;

  // Create a pending order document in Firestore first.
  let orderRef;
  try {
    orderRef = await db.collection('orders').add(orderData);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'orders');
  }

  if (!orderRef) {
     throw new Error("Failed to create order");
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.warn("STRIPE_SECRET_KEY is not set. Using mock client secret.");
    return { clientSecret: 'mock_client_secret_for_preview', orderId: orderRef.id };
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-05-27.dahlia' as any,
  });

  // Note: Stripe requires the amount in the lowest denomination (cents for USD).
  // The amount sent to Stripe should match the currency.
  const rate = MOCK_RATES[currency] || 1;
  const amountInCurrency = totalAmount * rate;

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountInCurrency * 100), // Amount in cents of the target currency
      currency: currency.toLowerCase(), // Stripe expects lowercase currency codes
      receipt_email: 'customer@example.com', // Placeholder, Stripe will use the email from the payment form if available
      metadata: {
        orderId: orderRef.id,
      },
    });
  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    if (error.type === 'StripeAuthenticationError' || error.message.includes('No API key provided')) {
      // Provide a mock client secret so the UI doesn't completely break for preview purposes
      return { clientSecret: 'mock_client_secret_for_preview', orderId: orderRef.id };
    }
    throw new Error('Failed to create Payment Intent: ' + error.message);
  }

  if (!paymentIntent.client_secret) {
    throw new Error('Failed to create Payment Intent.');
  }
  
  // Link the PaymentIntent ID to the order
  try {
    await orderRef.update({ stripePaymentIntentId: paymentIntent.id });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `orders/${orderRef.id}`);
  }

  return { clientSecret: paymentIntent.client_secret, orderId: orderRef.id };
}

export async function simulateMockPayment(orderId: string): Promise<{ success: boolean }> {
  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') {
    throw new Error('Database connection is not available. Please try again later.');
  }

  try {
    const orderRef = db.collection('orders').doc(orderId);
    await orderRef.update({
      status: 'paid',
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update mock order status:', error);
    throw new Error('Failed to complete mock payment');
  }
}

export async function subscribeToNewsletter(email: string) {
  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') throw new Error("Database connection is not available.");
  
  try {
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Invalid email address.");
    }
    
    // Check if email already exists
    const existing = await db.collection('newsletter_subscribers').where('email', '==', email).get();
    if (!existing.empty) {
      return { success: true, message: 'Already subscribed' };
    }
    
    await db.collection("newsletter_subscribers").add({
      email,
      status: 'subscribed',
      createdAt: FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'newsletter_subscribers');
    throw new Error("Failed to subscribe to newsletter");
  }
}

export async function getNewsletterSubscribers() {
  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') return [];
  
  try {
    const snapshot = await db.collection('newsletter_subscribers').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any),
      createdAt: (doc.data() as any).createdAt?.toDate?.()?.toISOString() || null
    }));
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return [];
  }
}

export async function getWebsiteImage(id: string): Promise<string | null> {
  const db = typeof getAdminDb === 'function' ? getAdminDb() : null;
  if (!db || typeof db.collection !== 'function') return null;
  try {
    const doc = await db.collection('website_images').doc(id).get();
    if (doc.exists) {
      return doc.data()?.url || null;
    }
  } catch (error) {
    console.error("Error fetching website image:", error);
  }
  return null;
}
