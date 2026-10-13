import { NextRequest, NextResponse } from 'next/server';
import { dbStore, verifyPassword } from '@/lib/db/store';
import { createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const customer = dbStore.findCustomerByEmail(email);
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = verifyPassword(password, customer.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = customer;
    const token = createSessionToken(safeUser.id);

    const res = NextResponse.json({
      success: true,
      user: safeUser,
      message: 'Login successful',
    });

    setSessionCookie(res, token);
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
