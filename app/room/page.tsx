import React from 'react';
import CategoryListingView from '@/components/CategoryListingView';

export const metadata = {
  title: 'Private & Shared Rooms for Rent in Delhi | Peflarmo',
  description:
    'Discover independent private rooms and shared rooms in Delhi for UPSC/coaching students and working professionals. Flexible short-term and long-term stays.',
};

export default function RoomPage() {
  return (
    <CategoryListingView
      category="Room"
      title="Private & Shared Rooms"
      tagline="Independent furnished rooms with attached baths, study desks, and separate key access. Maintained separately from flats and hostels for complete privacy."
    />
  );
}
