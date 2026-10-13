import React, { Suspense } from 'react';
import SearchPageContent from '@/components/SearchPageContent';

export const metadata = {
  title: 'Search Accommodations in Delhi - PG, Flat, Room & Hostel | Peflarmo',
  description:
    'Search and filter verified rental properties in Delhi NCR. Compare rents, sharing options, food choices, amenities, and book directly.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading accommodation search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
