'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Inquiry } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function MyInquiriesPage() {
  const { user, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const fetchInquiries = async () => {
      try {
        const url = user ? '/api/inquiries' : `/api/inquiries?email=${encodeURIComponent('')}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setInquiries(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching inquiries:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchInquiries();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const getStatusBadge = (status: Inquiry['status']) => {
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
      case 'Assigned to Owner/Broker':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            Assigned to Coordinator
          </span>
        );
      case 'Response Received':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Response Ready
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
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Login to View Inquiries</h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Please sign in to your Peflarmo customer account to track the status of your submitted property inquiries.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
          >
            Log In
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Verified Inquiries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Inquiries</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check answers from Peflarmo operations and property coordinators for your accommodation inquiries.
          </p>
        </div>

        <Link
          href="/search"
          className="self-start sm:self-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Submit New Inquiry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-36 bg-slate-100 rounded-3xl animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {inq.id}
                  </span>
                  <span className="text-xs text-slate-500">
                    Submitted: {new Date(inq.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </span>
                </div>
                <div>{getStatusBadge(inq.status)}</div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  <Link href={`/property/${inq.propertyId}`} className="hover:text-blue-600 transition-colors">
                    {inq.propertyTitle}
                  </Link>
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {inq.propertyCategory} · {inq.locality}, {inq.city}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Your Inquiry Message:</span>
                  <p className="text-slate-700 italic leading-relaxed">&ldquo;{inq.message}&rdquo;</p>
                </div>
                <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-4">
                  <div>
                    <span className="text-slate-500">Preferred Move-in:</span>{' '}
                    <strong className="text-slate-800">{inq.preferredMoveInDate}</strong>
                  </div>
                  {inq.assignedOwnerBrokerName && (
                    <div>
                      <span className="text-slate-500">Assigned Coordinator:</span>{' '}
                      <strong className="text-blue-700">{inq.assignedOwnerBrokerName}</strong>
                    </div>
                  )}
                  {inq.adminNotes && (
                    <div className="pt-1 text-slate-600 font-medium">
                      <span className="text-slate-500 block">Operations Note:</span>
                      {inq.adminNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <FileQuestion className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Inquiries Found</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Have questions about a PG meal schedule, flat furnishings, or want to schedule a visit? Submit an inquiry on
            any property listing!
          </p>
          <Link
            href="/search"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Browse Listings
          </Link>
        </div>
      )}
    </div>
  );
}
