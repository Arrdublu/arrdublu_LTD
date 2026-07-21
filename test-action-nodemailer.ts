import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

async function test() {
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
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: false
      }
    });

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
    const mailOptions = {
      from: `"Test User via ArrDuBlu Studio" <${fromEmail}>`,
      to: 'hi@arrdublu.us',
      replyTo: 'testuser@example.com',
      subject: `New Contact Submission: Test`,
      text: `Hello`,
      html: `<p>Hello</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Success:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
