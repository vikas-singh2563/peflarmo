'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Bed,
  IndianRupee,
  ShieldCheck,
  Ban,
  ArrowRight,
} from 'lucide-react';
import { Booking } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Cancel state
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        if (data.success) {
          setBookings(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, authLoading]);

  const handleCancelBooking = async () => {
    if (!cancellingBookingId) return;
    setIsCancelling(true);
    setCancelError('');

    try {
      const res = await fetch(`/api/bookings/${cancellingBookingId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: cancelReason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setCancelError(data.error || 'Failed to cancel booking');
        setIsCancelling(false);
        return;
      }

      // Update state locally
      setBookings((prev) =>
        prev.map((b) => (b.id === cancellingBookingId ? { ...b, status: 'Cancelled' } : b))
      );
      setCancellingBookingId(null);
      setCancelReason('');
      if (selectedBooking?.id === cancellingBookingId) {
        setSelectedBooking((prev) => (prev ? { ...prev, status: 'Cancelled' } : null));
      }
    } catch {
      setCancelError('Network error while cancelling');
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Pending Admin Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Pending Review
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Under Review
          </span>
        );
      case 'Awaiting Owner/Broker Confirmation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Awaiting Confirmation
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  if (!authLoading && !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Login Required</h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Please log in to your Peflarmo customer account to view and manage your reservation bookings.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
          >
            Log In Now
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Shared Real-Time Booking Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Bookings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track reservation approvals, stay dates, and review breakdown invoices for your stays.
          </p>
        </div>

        <Link
          href="/search"
          className="self-start sm:self-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Find Another Stay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-3xl animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canCancel =
              booking.status !== 'Cancelled' &&
              booking.status !== 'Completed' &&
              booking.status !== 'Confirmed';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {booking.id}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">
                      Booked on: {new Date(booking.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      <Link href={`/property/${booking.propertyId}`} className="hover:text-blue-600 transition-colors">
                        {booking.propertyTitle}
                      </Link>
                    </h3>
                    <div className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                      <span>{booking.propertyCategory}</span>
                      <span>·</span>
                      <span>{booking.locality}, {booking.city}</span>
                      <span>·</span>
                      <span className="font-medium text-slate-800">{booking.roomBedName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 max-w-2xl">
                    <div>
                      <span className="text-slate-500 block">Move-in Date:</span>
                      <strong className="text-slate-800">{booking.moveInDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Duration:</span>
                      <strong className="text-slate-800">{booking.durationMonths} Months</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Monthly Rent:</span>
                      <strong className="text-slate-800">₹{booking.rentPerMonth.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Due:</span>
                      <strong className="text-blue-700">₹{booking.totalPayableInitial.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0 md:min-w-[150px]">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors"
                  >
                    View Details
                  </button>

                  {canCancel && (
                    <button
                      onClick={() => setCancellingBookingId(booking.id)}
                      className="flex-1 py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl text-center transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Booking Requests Yet</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            You haven&apos;t created any booking reservations yet. Explore verified PGs, flats, and hostels to submit your
            first stay request!
          </p>
          <Link
            href="/search"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Explore Accommodations
          </Link>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Booking Summary Breakdown</h3>
                <div className="text-xs font-mono text-blue-600">{selectedBooking.id}</div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 border border-slate-200">
                <div className="text-slate-500 font-semibold">Accommodation:</div>
                <div className="font-bold text-slate-900 text-sm">{selectedBooking.propertyTitle}</div>
                <div className="text-slate-600">{selectedBooking.locality}, {selectedBooking.city}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Room / Bed Option:</span>
                  <span className="font-semibold text-slate-800">{selectedBooking.roomBedName}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Move-in Date:</span>
                  <span className="font-semibold text-slate-800">{selectedBooking.moveInDate}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Tenancy Duration:</span>
                  <span className="font-semibold text-slate-800">{selectedBooking.durationMonths} Months</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Occupants:</span>
                  <span className="font-semibold text-slate-800">{selectedBooking.occupantsCount} Person(s)</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                <div className="font-bold text-slate-900 border-b border-blue-200/60 pb-1.5">
                  Financial Breakdown (INR ₹)
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly Rent:</span>
                  <span>₹{selectedBooking.rentPerMonth.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Security Deposit (Refundable):</span>
                  <span>₹{selectedBooking.securityDeposit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>One-Time Onboarding &amp; Verification Fee:</span>
                  <span>₹{selectedBooking.oneTimeOnboardingFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-blue-200">
                  <span>Total Initial Payable on Confirmation:</span>
                  <span className="text-blue-700">₹{selectedBooking.totalPayableInitial.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block font-medium">Customer Special Requests:</span>
                  <span className="text-slate-800">{selectedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Ban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Confirm Booking Cancellation</h3>
                <p className="text-xs text-slate-500">Booking Reference: {cancellingBookingId}</p>
              </div>
            </div>

            {cancelError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{cancelError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Change of plans, found alternative accommodation, shift in joining date..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleCancelBooking}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs disabled:opacity-60"
              >
                {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
