import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 });
    }

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Thank you for contacting Peflarmo! Your inquiry ticket #${ticketId} has been logged. Our Delhi support team will reach out within 2 business hours.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error submitting message';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
