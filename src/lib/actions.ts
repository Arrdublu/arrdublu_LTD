
'use server';

import Stripe from 'stripe';
import { getAdminDb, handleFirestoreError, OperationType, FieldValue } from './firebase-admin';
import { verifyDiscountCode } from './discount-actions';
import type { Currency, Service } from './types';

export async function createPaymentIntent(
  items: {service: Service, quantity: number}[],
  currency: Currency,
  discountCode?: string
): Promise<{ clientSecret: string; orderId: string }> {
  const db = getAdminDb();
  if (!db) {
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
  // The amount sent to Stripe is always based on the USD totalAmount.
  // The `currency` parameter in paymentIntent is for display and processing.
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents, based on USD
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
  const db = getAdminDb();
  if (!db) {
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
