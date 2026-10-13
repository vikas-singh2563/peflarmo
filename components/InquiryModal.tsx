'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, CheckCircle2, AlertCircle, Calendar, Send, ShieldCheck } from 'lucide-react';
import { Property } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

interface InquiryModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (inquiryId: string) => void;
}

export default function InquiryModal({ property, isOpen, onClose, onSuccess }: InquiryModalProps) {
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerMobile, setCustomerMobile] = useState(user?.mobile || '');
  const [preferredMoveInDate, setPreferredMoveInDate] = useState('');
  const [message, setMessage] = useState(
    `Hello, I am interested in ${property.title} in ${property.locality}. Please connect me with the property coordinator for a visit.`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerMobile,
          propertyId: property.id,
          preferredMoveInDate,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmittedInquiryId(data.inquiryId);
      if (onSuccess) onSuccess(data.inquiryId);
    } catch {
      setErrorMsg('A network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Submit Property Inquiry</h3>
            <p className="text-xs text-slate-500">Peflarmo Review First Workflow</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedInquiryId ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Inquiry Logged Successfully!</h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Inquiry ID:</span>
                <span className="font-mono font-bold text-blue-700">{submittedInquiryId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Initial Status:</span>
                <span className="font-semibold text-amber-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Pending Review
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Property:</span>
                <span className="font-medium text-slate-800 line-clamp-1">{property.title}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your inquiry has been queued for verification by Peflarmo Operations. Following review, the authorized
              coordinator will reach out to you via your provided contact details.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/my-inquiries"
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl text-center transition-colors shadow-sm"
              >
                Track in My Inquiries
              </Link>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Property Summary Kicker */}
            <div className="flex items-center gap-3 p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
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
                <div className="text-xs text-blue-700 font-medium">{property.category} in {property.locality}</div>
                <h4 className="text-sm font-semibold text-slate-900 truncate">{property.title}</h4>
                <div className="text-xs text-slate-600">₹{property.monthlyRent.toLocaleString('en-IN')} / month</div>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Move-in Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={preferredMoveInDate}
                    onChange={(e) => setPreferredMoveInDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Details / Message *</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about sharing preferences, timings, food menu, or schedule an in-person visit..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Verified Channel: Your inquiry is routed to Peflarmo operations before coordinator contact.</span>
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
                disabled={isSubmitting}
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center gap-2 shadow-sm transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
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
