import { NextRequest, NextResponse } from 'next/server';
import { getCustomerFromRequest } from '@/lib/auth';
import { dbStore, verifyPassword } from '@/lib/db/store';

export async function PATCH(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, mobile, currentPassword, newPassword } = body;

    const fullUser = dbStore.findCustomerById(customer.id);
    if (!fullUser) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ success: false, error: 'Current password is required to set a new password' }, { status: 400 });
      }
      const isValid = verifyPassword(currentPassword, fullUser.passwordHash);
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Current password does not match' }, { status: 400 });
      }
      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, error: 'New password must be at least 6 characters' }, { status: 400 });
      }
    }

    const updated = dbStore.updateCustomerProfile(customer.id, {
      fullName,
      mobile,
      newPassword,
    });

    return NextResponse.json({
      success: true,
      user: updated,
      message: 'Profile updated successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
