import { NextRequest, NextResponse } from 'next/server';
import { getCustomerFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const customer = getCustomerFromRequest(req);
  if (!customer) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }

  return NextResponse.json({ success: true, user: customer });
}
