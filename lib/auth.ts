import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { dbStore } from './db/store';
import { CustomerUser } from './types';

const SECRET = process.env.SESSION_SECRET || 'peflarmo-delhi-secure-session-key-2026';
const COOKIE_NAME = 'peflarmo_cust_session';

export function createSessionToken(userId: string): string {
  const payload = JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 }); // 30 days
  const base64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

export function verifySessionToken(token: string): string | null {
  try {
    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return null;
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(base64Payload).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) return null;
    return payload.userId;
  } catch {
    return null;
  }
}

export function getCustomerFromRequest(req: NextRequest): CustomerUser | null {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  const token = cookie || authHeader;
  if (!token) return null;

  const userId = verifySessionToken(token);
  if (!userId) return null;

  const user = dbStore.findCustomerById(userId);
  if (!user) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
