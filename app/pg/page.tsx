import React from 'react';
import CategoryListingView from '@/components/CategoryListingView';

export const metadata = {
  title: 'Verified PG in Delhi - Boys, Girls & Co-Living Paying Guest | Peflarmo',
  description:
    'Explore verified PGs in Delhi with AC, home-cooked food, Wi-Fi, single & double sharing options, and zero brokerage. 100% verified stays.',
};

export default function PGPage() {
  return (
    <CategoryListingView
      category="PG"
      title="Verified PGs in Delhi & NCR"
      tagline="Discover safe, comfortable, and affordable Paying Guest accommodations tailored for students and working professionals. Filter by sharing type, AC, food, and attached bathroom."
    />
  );
}
