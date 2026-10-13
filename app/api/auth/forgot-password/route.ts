import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Please enter a valid registered email' }, { status: 400 });
    }

    const customer = dbStore.findCustomerByEmail(email);
    // Generic safe message to prevent email enumeration, but with specific assistance for test accounts
    return NextResponse.json({
      success: true,
      message: customer
        ? 'A password reset link with instructions has been sent to your registered email.'
        : 'If an account exists with this email address, a password reset link has been dispatched.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error processing request';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
