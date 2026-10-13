import React from 'react';
import CategoryListingView from '@/components/CategoryListingView';

export const metadata = {
  title: 'Boys & Girls Hostels in Delhi - Student & Working Hostels | Peflarmo',
  description:
    'Verified student & working professional hostels in Delhi near North & South Campuses. Buffet dining mess, study halls, sports, and round-the-clock security.',
};

export default function HostelPage() {
  return (
    <CategoryListingView
      category="Hostel"
      title="Student & Working Professional Hostels"
      tagline="Safe, well-organized hostels featuring hygienic dining mess, recreational zones, silent study rooms, and warden supervision across prime educational hubs."
    />
  );
}
