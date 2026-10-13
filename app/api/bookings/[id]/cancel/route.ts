import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { getCustomerFromRequest } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const customer = getCustomerFromRequest(req);
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const reason = body?.reason;

    const cancelledBooking = dbStore.cancelBooking(customer.id, id, reason);

    return NextResponse.json({
      success: true,
      message: `Booking #${id} has been cancelled successfully.`,
      data: cancelledBooking,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Cancellation failed';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
