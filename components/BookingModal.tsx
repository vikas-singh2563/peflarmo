'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, Bed, Info } from 'lucide-react';
import { Property, RoomBedOption } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface BookingModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  defaultOptionId?: string;
  onSuccess?: (bookingId: string) => void;
}

export default function BookingModal({
  property,
  isOpen,
  onClose,
  defaultOptionId,
  onSuccess,
}: BookingModalProps) {
  const { user } = useAuth();

  const options = property.roomBedOptions && property.roomBedOptions.length > 0
    ? property.roomBedOptions
    : [
        {
          id: 'opt-default',
          name: property.category === 'Flat' ? property.bhk || 'Entire Flat' : 'Standard Accommodation Unit',
          sharingType: property.category === 'Flat' ? 'Entire Flat' : 'Single',
          rentPerMonth: property.monthlyRent,
          securityDeposit: property.securityDeposit,
          ac: property.acAvailable,
          bathroomType: property.bathroomType,
          foodOption: property.foodOption,
          totalUnits: 1,
          availableUnits: 1,
        } as RoomBedOption,
      ];

  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    defaultOptionId || options[0]?.id || 'opt-default'
  );

  const selectedOption = options.find((o) => o.id === selectedOptionId) || options[0];

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerMobile, setCustomerMobile] = useState(user?.mobile || '');
  const [moveInDate, setMoveInDate] = useState('');
  const [durationMonths, setDurationMonths] = useState(6);
  const [occupantsCount, setOccupantsCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const rent = selectedOption?.rentPerMonth || property.monthlyRent;
  const deposit = selectedOption?.securityDeposit || property.securityDeposit;
  const onboardingFee = 999;
  const totalPayable = rent + deposit + onboardingFee;

  const isSoldOut = selectedOption ? selectedOption.availableUnits <= 0 : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSoldOut) {
      setErrorMsg('This room or bed option is currently sold out. Please select another option.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerMobile,
          propertyId: property.id,
          roomBedOptionId: selectedOption?.id,
          moveInDate,
          durationMonths,
          occupantsCount,
          specialRequests,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to submit booking request.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedBookingId(data.bookingId);
      if (onSuccess) onSuccess(data.bookingId);
    } catch {
      setErrorMsg('Network error occurred during booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Request Booking Reservation</h3>
            <p className="text-xs text-slate-500">Peflarmo Secure Booking Gateway</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBookingId ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Booking Request Created!</h4>
              <p className="text-xs text-slate-500 mt-1">Unique Booking Reference Number Generated</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5">
              <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {confirmedBookingId}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Status Workflow:</span>
                <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Pending Review
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Accommodation:</span>
                <span className="font-medium text-slate-800 text-right">{property.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Room / Bed:</span>
                <span className="text-slate-700">{selectedOption?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Move-in Date:</span>
                <span className="text-slate-700">{moveInDate}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-200 font-semibold text-slate-900">
                <span>Total Amount Due on Approval:</span>
                <span className="text-blue-700">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-xl text-left space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                How the Peflarmo verification process works:
              </div>
              <p className="text-[11px] leading-relaxed text-blue-700">
                1. Peflarmo Operations conducts review of room availability and property credentials.<br />
                2. Once operations signs off, the authorized coordinator confirms your slot.<br />
                3. You will receive real-time status updates in your customer account.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/my-bookings"
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl text-center transition-colors shadow-sm"
              >
                Go to My Bookings
              </Link>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Property Snippet */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src={property.images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200'}
                  alt={property.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {property.category} · {property.locality}, {property.city}
                </div>
                <h4 className="text-sm font-semibold text-slate-900 truncate">{property.title}</h4>
                <div className="text-xs text-slate-500">Security Deposit: ₹{deposit.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Room / Bed */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2 flex items-center justify-between">
                <span>Select Room or Bed Option *</span>
                <span className="text-[11px] text-slate-500">Inventory updated in real time</span>
              </label>

              <div className="space-y-2">
                {options.map((opt) => {
                  const isSelected = opt.id === selectedOptionId;
                  const isAvailable = opt.availableUnits > 0;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => isAvailable && setSelectedOptionId(opt.id)}
                      className={`p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : isAvailable
                          ? 'border-slate-200 hover:border-slate-300 bg-white'
                          : 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="roomBedOption"
                            checked={isSelected}
                            disabled={!isAvailable}
                            onChange={() => setSelectedOptionId(opt.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-semibold text-slate-900">{opt.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>{opt.sharingType}</span>
                              <span>·</span>
                              <span>{opt.ac ? 'AC' : 'Non-AC'}</span>
                              <span>·</span>
                              <span>{opt.bathroomType} Bath</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">₹{opt.rentPerMonth.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span></div>
                          <div className="text-[11px]">
                            {isAvailable ? (
                              <span className="text-emerald-600 font-medium">{opt.availableUnits} left</span>
                            ) : (
                              <span className="text-rose-600 font-semibold">Sold Out</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Occupant and Stay Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">Move-in Date *</label>
                <input
                  type="date"
                  required
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">Stay Duration</label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value={1}>1 Month (Trial)</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months (Standard)</option>
                  <option value={11}>11 Months (Full Term)</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">Occupants</label>
                <select
                  value={occupantsCount}
                  onChange={(e) => setOccupantsCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4+ Persons</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Special Preferences / Remarks (Optional)</label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Upper floor, study corner, specific move-in timing, vehicle parking..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-semibold text-slate-800 text-sm flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span>Transparent Price Breakdown</span>
                <span className="text-[11px] text-slate-500 font-normal">INR (₹)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>First Month Rent ({selectedOption?.name}):</span>
                <span>₹{rent.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Refundable Security Deposit:</span>
                <span>₹{deposit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>One-time Onboarding & Police Verification:</span>
                <span>₹{onboardingFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200 text-sm">
                <span>Total Due on Approval:</span>
                <span className="text-blue-700 font-bold">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSoldOut}
                className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Bed className="w-4 h-4" />
                    <span>Submit Booking Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
