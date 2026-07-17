import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message, serviceName } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Configure the SMTP transporter
    // Note: The user will need to provide valid SMTP credentials in their environment variables.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com' or 'smtp.resend.com'
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || '"ArrDuBlu Studio" <noreply@arrdublu.us>', // sender address
      to: 'hi@arrdublu.us', // target email as requested
      replyTo: email, // Reply to the person who filled out the form
      subject: `New Quick Request: ${serviceName}`, // Subject line
      text: `You have received a new Quick Request from ${name} (${email}) regarding ${serviceName}.\n\nMessage:\n${message || 'No additional message provided.'}`, // plain text body
      html: `
        <h2>New Quick Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\\n/g, '<br>') : 'No additional message provided.'}</p>
      `, // html body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
