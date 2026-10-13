import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { getCustomerFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get('email');

    if (!customer && !emailParam) {
      return NextResponse.json({ success: false, error: 'Please log in to view your inquiries.' }, { status: 401 });
    }

    const customerId = customer ? customer.id : '';
    const email = customer ? customer.email : emailParam!;

    const inquiries = dbStore.getInquiriesByCustomer(customerId, email);

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching inquiries';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    const body = await req.json();
    const { customerName, customerEmail, customerMobile, propertyId, preferredMoveInDate, message } = body;

    // Strict validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
    }
    if (!customerEmail || !customerEmail.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 });
    }
    if (!customerMobile || customerMobile.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number is required' }, { status: 400 });
    }
    if (!propertyId) {
      return NextResponse.json({ success: false, error: 'Property selection is required' }, { status: 400 });
    }
    if (!preferredMoveInDate) {
      return NextResponse.json({ success: false, error: 'Preferred move-in date is required' }, { status: 400 });
    }
    if (!message || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Please provide a brief inquiry message' }, { status: 400 });
    }

    const savedInquiry = dbStore.createInquiry({
      customerId: customer?.id,
      customerName,
      customerEmail,
      customerMobile,
      propertyId,
      preferredMoveInDate,
      message,
    });

    return NextResponse.json({
      success: true,
      inquiryId: savedInquiry.id,
      data: savedInquiry,
      message: `Inquiry #${savedInquiry.id} submitted successfully! Your request has been queued for review.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit inquiry';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
