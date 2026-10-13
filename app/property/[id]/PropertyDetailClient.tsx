'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  Heart,
  Share2,
  Calendar,
  Bed,
  CheckCircle2,
  Clock,
  Wifi,
  Wind,
  Utensils,
  Zap,
  Info,
  Send,
  Star,
  Sparkles,
  Building,
  Home,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Property, Review } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import InquiryModal from '@/components/InquiryModal';
import BookingModal from '@/components/BookingModal';

interface PropertyDetailClientProps {
  property: Property;
  reviews: Review[];
}

export default function PropertyDetailClient({ property, reviews }: PropertyDetailClientProps) {
  const { favorites, toggleFavorite } = useAuth();
  const isFavorite = favorites.includes(property.id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    property.roomBedOptions[0]?.id || ''
  );
  const [shareSuccess, setShareSuccess] = useState(false);

  const selectedOption =
    property.roomBedOptions.find((o) => o.id === selectedOptionId) ||
    property.roomBedOptions[0];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} in ${property.locality} on Peflarmo!`,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href={`/${property.category.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
          {property.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 truncate max-w-xs">{property.locality}</span>
      </nav>

      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
              {property.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Suitability: <strong className="text-slate-700">{property.genderSuitability}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 flex-wrap">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">{property.fullAddress}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{property.landmark}</span>
          </div>
        </div>

        {/* Share & Favorite Buttons */}
        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>{shareSuccess ? 'Copied URL!' : 'Share'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors shadow-2xs ${
              isFavorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
            <span>{isFavorite ? 'Favorited' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Photo Gallery: Main Hero Image + Thumbnails */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200">
          <Image
            src={property.images[activeImageIdx] || property.images[0]}
            alt={property.title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
            Photo {activeImageIdx + 1} of {property.images.length}
          </div>
        </div>

        {/* Thumbnails list */}
        {property.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIdx === idx
                    ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2-Column Layout: Details Body + Floating Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Main Details (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Category</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{property.category}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Furnishing</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{property.furnishing}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Food / Mess</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{property.foodOption}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Available From</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{property.availableFrom}</div>
            </div>
          </div>

          {/* About Accommodation */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">About this Accommodation</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Flat Specific Info (If Flat) */}
          {property.category === 'Flat' && (
            <div className="space-y-3 p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
              <h3 className="text-base font-bold text-slate-900">Apartment Configuration &amp; Layout</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Configuration:</span>
                  <span className="font-bold text-slate-800 text-sm">{property.bhk}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Super Area:</span>
                  <span className="font-bold text-slate-800 text-sm">{property.superAreaSqFt} sq.ft</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bedrooms / Baths:</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {property.bedrooms} Bed · {property.bathrooms} Bath
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Balconies:</span>
                  <span className="font-bold text-slate-800 text-sm">{property.balconies} Attached</span>
                </div>
              </div>
            </div>
          )}

          {/* Available Room / Bed Options */}
          {property.roomBedOptions && property.roomBedOptions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Available Room &amp; Bed Configurations</h2>
                <span className="text-xs text-slate-500">Live Inventory Available</span>
              </div>

              <div className="space-y-3">
                {property.roomBedOptions.map((opt) => {
                  const isSelected = opt.id === selectedOptionId;
                  const isAvailable = opt.availableUnits > 0;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => isAvailable && setSelectedOptionId(opt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : isAvailable
                          ? 'border-slate-200 bg-white hover:border-slate-300'
                          : 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-base">{opt.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                              {opt.sharingType}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span>{opt.ac ? 'Air Conditioned' : 'Non-AC'}</span>
                            <span>·</span>
                            <span>{opt.bathroomType} Bathroom</span>
                            <span>·</span>
                            <span>{opt.foodOption}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="sm:text-right">
                            <div className="text-lg font-black text-slate-900">
                              ₹{opt.rentPerMonth.toLocaleString('en-IN')}
                              <span className="text-xs font-normal text-slate-500"> / mo</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              Deposit: ₹{opt.securityDeposit.toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div>
                            {isAvailable ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOptionId(opt.id);
                                  setBookingOpen(true);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                              >
                                Select &amp; Book
                              </button>
                            ) : (
                              <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-lg">
                                Sold Out
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Amenities Checklist */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Amenities &amp; Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((am) => (
                <div
                  key={am}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Rules & Tenancy Terms */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Property Rules &amp; Policies</h2>
            <div className="p-5 bg-amber-50/50 rounded-3xl border border-amber-200/70 space-y-2.5">
              {property.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proximity / Connectivity */}
          {property.nearByHubs && property.nearByHubs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Nearby Connectivity &amp; Hubs</h2>
              <div className="space-y-2">
                {property.nearByHubs.map((hub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{hub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Genuine Customer Reviews (Only when reviews exist) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Verified Customer Reviews</h2>
                <p className="text-xs text-slate-500">Only verified tenants who completed stay via Peflarmo</p>
              </div>
              {reviews.length > 0 && (
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-800 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{property.rating} ({property.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                          {rev.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900">{rev.customerName}</div>
                          <div className="text-[11px] text-slate-500">{rev.stayPeriod}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                No reviews yet for this listing. Be the first tenant to leave feedback after booking!
              </div>
            )}
          </div>
        </div>

        {/* Floating Sidebar: Pricing & Instant Action Box (Col 3) */}
        <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6 sticky top-24">
          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Starting Rent</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">
                ₹{selectedOption?.rentPerMonth.toLocaleString('en-IN') || property.monthlyRent.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
            <div className="text-xs text-slate-500">
              Security Deposit: ₹
              {selectedOption?.securityDeposit.toLocaleString('en-IN') || property.securityDeposit.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Selected Option:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[140px]">
                {selectedOption?.name || 'Standard Unit'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Availability:</span>
              <span className="font-semibold text-emerald-700">{property.availabilityStatus}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>One-Time Fee:</span>
              <span className="font-semibold text-slate-900">₹999 (onboarding)</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            >
              <Bed className="w-4 h-4" />
              <span>Book Now</span>
            </button>

            <button
              onClick={() => setInquiryOpen(true)}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Peflarmo Safety Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Every request is reviewed by Central Operations prior to landlord contact to prevent spam and double bookings.
            </p>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <InquiryModal
        property={property}
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

      <BookingModal
        property={property}
        defaultOptionId={selectedOptionId}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
