import React from 'react';
import { notFound } from 'next/navigation';
import { dbStore } from '@/lib/db/store';
import PropertyDetailClient from './PropertyDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const property = dbStore.getPropertyById(id);
  if (!property) {
    return { title: 'Property Not Found | Peflarmo' };
  }

  return {
    title: `${property.title} in ${property.locality}, ${property.city} | Peflarmo`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} | Peflarmo`,
      description: property.description.slice(0, 160),
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = dbStore.getPropertyById(id);

  if (!property) {
    notFound();
  }

  const reviews = dbStore.getReviewsByProperty(property.id);

  return <PropertyDetailClient property={property} reviews={reviews} />;
}
