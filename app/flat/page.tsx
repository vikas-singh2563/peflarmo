import React from 'react';
import CategoryListingView from '@/components/CategoryListingView';

export const metadata = {
  title: 'Flats & Apartments for Rent in Delhi - 1, 2, 3 BHK | Peflarmo',
  description:
    'Find verified 1 BHK, 2 BHK, 3 BHK builder floors and gated society flats for rent in Delhi, Saket, Hauz Khas, and East Delhi. Fully & semi-furnished apartments.',
};

export default function FlatPage() {
  return (
    <CategoryListingView
      category="Flat"
      title="Flats & Apartments for Rent"
      tagline="Spacious, verified builder floors and gated community apartments for families, bachelors, and sharing. Full kitchen, balconies, and parking info."
    />
  );
}
