'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('Accommodation Inquiry / Support');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, subject, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to submit message');
        setIsSubmitting(false);
        return;
      }

      setTicketId(data.ticketId);
    } catch {
      setErrorMsg('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Customer Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Contact Peflarmo</h1>
        <p className="text-sm text-slate-600">
          Have questions regarding property verification, tenancy agreements, or need help scheduling visits? Our Delhi
          operations team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Contact Info Cards (Col 1) */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Delhi Central Operations Office</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Peflarmo Hub</strong>
                  <span>Plot 18, Barakhamba Road, Connaught Place, New Delhi 110001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Customer Care Hotline</strong>
                  <a
                    href="tel:+919318322388"
                    className="hover:text-blue-600 transition-colors"
                  >
                    +91 93183 22388
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Email Inquiries</strong>
                  <span>support@peflarmo.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Operational Hours</strong>
                  <span>Monday - Saturday: 9:00 AM – 8:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-50/60 rounded-3xl border border-blue-100 text-xs text-blue-900 space-y-2">
            <div className="font-bold">Need Immediate Accommodation Assistance?</div>
            <p className="leading-relaxed">
              If you are in Delhi right now and need same-day PG or room check-in, call our helpline directly for fast-track
              property verification.
            </p>
          </div>
        </div>

        {/* Form (Col 2 & 3) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Send an Inquiry or Message</h2>
            <p className="text-xs text-slate-500">We respond to all customer tickets within 2 business hours.</p>
          </div>

          {ticketId ? (
            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Logged Successfully!</h3>
              <div className="text-xs text-slate-600">
                Ticket Reference: <strong className="font-mono text-blue-700">{ticketId}</strong>
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you for contacting Peflarmo. Our customer operations officer will reach out to your registered phone or
                email shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTicketId(null);
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anjali@example.com"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Accommodation Inquiry">Accommodation Inquiry</option>
                    <option value="Booking Assistance">Booking Assistance</option>
                    <option value="Physical Visit Scheduling">Physical Visit Scheduling</option>
                    <option value="Payment & Deposit Query">Payment &amp; Deposit Query</option>
                    <option value="Feedback / Complaint">Feedback / Complaint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Inquiry *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
