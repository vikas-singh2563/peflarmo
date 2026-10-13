import { NextRequest, NextResponse } from 'next/server';
import { dbStore } from '@/lib/db/store';
import { FilterParams } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get('category') || undefined;
    const city = searchParams.get('city') || undefined;
    const locality = searchParams.get('locality') || undefined;
    const minBudget = searchParams.get('minBudget') ? Number(searchParams.get('minBudget')) : undefined;
    const maxBudget = searchParams.get('maxBudget') ? Number(searchParams.get('maxBudget')) : undefined;
    const genderSuitability = searchParams.get('genderSuitability') || undefined;
    const sharingType = searchParams.get('sharingType') || undefined;
    const bhk = searchParams.get('bhk') || undefined;
    const furnishing = searchParams.get('furnishing') || undefined;
    const ac = searchParams.get('ac') || undefined;
    const food = searchParams.get('food') || undefined;
    const bathroom = searchParams.get('bathroom') || undefined;
    const sortBy = (searchParams.get('sortBy') as FilterParams['sortBy']) || undefined;
    const searchQuery = searchParams.get('q') || searchParams.get('search') || undefined;

    const amenitiesParam = searchParams.get('amenities');
    const amenities = amenitiesParam ? amenitiesParam.split(',').filter(Boolean) : undefined;

    const filters: FilterParams = {
      category: category as FilterParams['category'],
      city,
      locality,
      minBudget,
      maxBudget,
      genderSuitability,
      sharingType,
      bhk,
      furnishing,
      ac,
      food,
      bathroom,
      sortBy,
      searchQuery,
      amenities,
    };

    // Note: getApprovedProperties automatically filters only adminApprovalStatus === 'Approved'
    const properties = dbStore.getApprovedProperties(filters);

    return NextResponse.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch properties';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
