import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { getCustomerFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    if (!customer) {
      return NextResponse.json({ success: true, data: [], favoriteIds: [] });
    }

    const allApproved = dbStore.getApprovedProperties();
    const favoriteProps = allApproved.filter((p) => customer.favorites.includes(p.id));

    return NextResponse.json({
      success: true,
      data: favoriteProps,
      favoriteIds: customer.favorites,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching favorites';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const customer = getCustomerFromRequest(req);
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Please log in to save properties to your favorites.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json({ success: false, error: 'Property ID is required' }, { status: 400 });
    }

    const updatedFavorites = dbStore.toggleFavorite(customer.id, propertyId);
    const isFavorited = updatedFavorites.includes(propertyId);

    return NextResponse.json({
      success: true,
      isFavorited,
      favoriteIds: updatedFavorites,
      message: isFavorited ? 'Property added to Favorites' : 'Property removed from Favorites',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error updating favorites';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
