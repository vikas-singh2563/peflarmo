import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = dbStore.getPropertyById(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found or currently unavailable.' },
        { status: 404 }
      );
    }

    const reviews = dbStore.getReviewsByProperty(property.id);

    return NextResponse.json({
      success: true,
      data: {
        ...property,
        reviews,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching property details';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
