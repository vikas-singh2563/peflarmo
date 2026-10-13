'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  ShieldCheck,
  Eye,
  Send,
  Bed,
  Wifi,
  Wind,
  Utensils,
  Zap,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import InquiryModal from './InquiryModal';
import BookingModal from './BookingModal';

interface PropertyCardProps {
  property: Property;
  onFavoriteChange?: (isFav: boolean) => void;
}

export default function PropertyCard({ property, onFavoriteChange }: PropertyCardProps) {
  const { favorites, toggleFavorite } = useAuth();
  const isFavorite = favorites.includes(property.id);

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await toggleFavorite(property.id);
    if (onFavoriteChange) onFavoriteChange(result);
  };

  // Summarize room / bed types
  const roomBedSummary =
    property.roomBedOptions && property.roomBedOptions.length > 0
      ? property.roomBedOptions.map((o) => o.sharingType).filter((v, i, a) => a.indexOf(v) === i).join(' · ')
      : property.bhk || `${property.category} Space`;

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:border-blue-200">
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Link href={`/property/${property.id}`} className="block w-full h-full">
            <Image
              src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-end pointer-events-none">
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-slate-700 hover:text-rose-600 flex items-center justify-center shadow-xs transition-colors pointer-events-auto hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
            </button>
          </div>

          {/* Bottom Image Strip: Availability & Category */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white pointer-events-auto">
              {property.category}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm pointer-events-auto ${
                property.availabilityStatus === 'Available Now'
                  ? 'bg-emerald-950/80 text-emerald-200'
                  : 'bg-amber-950/80 text-amber-200'
              }`}
            >
              {property.availabilityStatus}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Locality & Gender Suitability */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                {property.locality}, {property.city}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{property.genderSuitability}</span>
            </div>

            {/* Title */}
            <Link href={`/property/${property.id}`} className="group-hover:text-blue-600 transition-colors">
              <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 mb-2">
                {property.title}
              </h3>
            </Link>

            {/* Available Room / Bed Type */}
            <div className="text-xs text-slate-600 mb-3 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">Options:</span>
              <span className="truncate">{roomBedSummary}</span>
            </div>

            {/* Quick Amenities highlights */}
            <div className="flex items-center gap-3 text-xs text-slate-500 py-2 border-y border-slate-100 mb-3">
              {property.acAvailable && (
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-slate-400" />
                  <span>AC</span>
                </span>
              )}
              {property.foodOption !== 'No Food' && (
                <span className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-slate-400" />
                  <span>Meals</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
                <span>Wi-Fi</span>
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-slate-400" />
                <span>Power B/U</span>
              </span>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="space-y-3 pt-1">
            {/* Price section */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-lg font-black text-slate-900">
                  ₹{property.monthlyRent.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-normal"> / month</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Deposit: ₹{property.securityDeposit.toLocaleString('en-IN')}
              </div>
            </div>

            {/* 3 Action Buttons: View Details, Submit Inquiry, Book Now */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <Link
                href={`/property/${property.id}`}
                className="py-2 px-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-center flex items-center justify-center gap-1 transition-colors"
                title="View Full Details"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Details</span>
              </Link>

              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="py-2 px-2 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 rounded-xl text-center flex items-center justify-center gap-1 transition-colors"
                title="Submit Inquiry"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="py-2 px-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center flex items-center justify-center gap-1 transition-colors shadow-xs"
                title="Book Now"
              >
                <Bed className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        property={property}
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      {/* Booking Modal */}
      <BookingModal
        property={property}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
