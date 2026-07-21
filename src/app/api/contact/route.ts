import { NextResponse } from 'next/server';
import { submitContactRequest } from '@/lib/actions';

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

    const subject = `Quick Request: ${serviceName || 'General Inquiry'}`;
    const cleanSubject = subject.trim().substring(0, 256);
    const cleanMessage = (message && message.trim().length >= 10)
      ? message.trim().substring(0, 4096)
      : `Interested in service: ${serviceName || 'General Inquiry'}. No additional message provided.`;

    // Use the unified server action logic which includes exponential backoff
    // and failed_messages tracking.
    const result = await submitContactRequest({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    if (result && !result.success) {
      return NextResponse.json({ error: result.error || 'Failed to submit contact request' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Request received and saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
