import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { getCustomerFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to view your bookings.' },
        { status: 401 }
      );
    }

    const bookings = dbStore.getBookingsByCustomer(customer.id);
    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching bookings';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerMobile,
      propertyId,
      roomBedOptionId,
      moveInDate,
      durationMonths,
      occupantsCount,
      specialRequests,
    } = body;

    // Must be logged in or provided verifiable customer info
    const effectiveCustomerId = customer?.id || `cust-guest-${Date.now()}`;
    const name = customer ? customer.fullName : customerName;
    const email = customer ? customer.email : customerEmail;
    const mobile = customer ? customer.mobile : customerMobile;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 });
    }
    if (!mobile || mobile.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }
    if (!propertyId) {
      return NextResponse.json({ success: false, error: 'Property ID is required' }, { status: 400 });
    }
    if (!moveInDate) {
      return NextResponse.json({ success: false, error: 'Move-in date is required' }, { status: 400 });
    }

    const booking = dbStore.createBooking({
      customerId: effectiveCustomerId,
      customerName: name,
      customerEmail: email,
      customerMobile: mobile,
      propertyId,
      roomBedOptionId,
      moveInDate,
      durationMonths: Number(durationMonths) || 6,
      occupantsCount: Number(occupantsCount) || 1,
      specialRequests,
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      data: booking,
      message: `Booking request #${booking.id} submitted! Status: Pending Review.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit booking';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
