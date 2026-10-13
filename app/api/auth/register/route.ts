import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, mobile, password } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 });
    }
    if (!mobile || mobile.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Valid mobile number (at least 10 digits) is required' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const newUser = dbStore.createCustomer({
      fullName,
      email,
      mobile,
      password,
    });

    const token = createSessionToken(newUser.id);
    const res = NextResponse.json({
      success: true,
      user: newUser,
      message: 'Account created successfully. Welcome to Peflarmo!',
    });

    setSessionCookie(res, token);
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
