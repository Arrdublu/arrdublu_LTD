import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAdminDb, FieldValue, handleFirestoreError, OperationType } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { name, email, message, serviceName } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const cleanName = name.trim().substring(0, 128);
    if (cleanName.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }

    const cleanEmail = email.trim().substring(0, 128);
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Save to Firestore 'contacts' collection first
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ error: 'Database connection is not available' }, { status: 500 });
    }

    const subject = `Quick Request: ${serviceName || 'General Inquiry'}`;
    const cleanSubject = subject.trim().substring(0, 256);
    const cleanMessage = (message && message.trim().length >= 10)
      ? message.trim().substring(0, 4096)
      : `Interested in service: ${serviceName || 'General Inquiry'}. No additional message provided.`;

    try {
      await db.collection("contacts").add({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (dbError) {
      console.error('Error saving contact to Firestore:', dbError);
      return NextResponse.json({ error: 'Failed to save contact request' }, { status: 500 });
    }

    // Configure the SMTP transporter (as a secondary resilient notification)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
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
          // Resilient networking settings for cloud deployment
          connectionTimeout: 10000, // 10s connection timeout
          greetingTimeout: 10000,   // 10s greeting timeout
          socketTimeout: 15000,     // 15s socket timeout
          tls: {
            // Do not fail if the host certificate cannot be verified by local container CA bundle
            rejectUnauthorized: false
          }
        });

        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
        const mailOptions = {
          from: `"${cleanName} via ArrDuBlu Studio" <${fromEmail}>`, // Use authenticated email as sender, but visitor name in display
          to: 'hi@arrdublu.us', // target email as requested
          replyTo: cleanEmail, // Reply to the person who filled out the form
          subject: cleanSubject, // Subject line
          text: `You have received a new Quick Request from ${cleanName} (${cleanEmail}) regarding ${serviceName || 'General Inquiry'}.\n\nMessage:\n${cleanMessage}`, // plain text body
          html: `
            <h2>New Quick Request</h2>
            <p><strong>Name:</strong> ${cleanName}</p>
            <p><strong>Email:</strong> ${cleanEmail}</p>
            <p><strong>Service/Subject:</strong> ${cleanSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
          `, // html body
        };

        // Send the email asynchronously/resiliently
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('SMTP email transmission failed, but contact request was saved to database:', emailError);
      }
    } else {
      console.warn('SMTP environment variables are not configured in production. Email notification skipped, but contact stored in database.');
    }

    return NextResponse.json({ success: true, message: 'Request received and saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
