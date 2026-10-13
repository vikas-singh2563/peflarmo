'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function HelpPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'How does the Peflarmo Central Verification workflow protect customers?',
      a: 'Unlike unstructured classified sites where anyone can post fake listings or photos, every property on Peflarmo is verified by our physical site audit team. When you submit an inquiry or booking, Peflarmo Central Operations verifies live unit inventory and authentic pricing before connecting you with the authorized coordinator.',
    },
    {
      q: 'Can I visit the PG or Flat in person before making any payment?',
      a: 'Yes, absolutely! We actively encourage physical visits. Simply click "Submit Inquiry" on the property card, choose your preferred date, and our operations coordinator will schedule a guided site walkthrough for you.',
    },
    {
      q: 'What is the difference between a PG, Flat, Room, and Hostel on Peflarmo?',
      a: 'PG (Paying Guest) provides furnished rooms (single/double/triple sharing) typically inclusive of 3 home-cooked meals, housekeeping, Wi-Fi, and warden security. Flat is an independent 1, 2, or 3 BHK apartment with kitchen and private balcony. Room is an independent furnished unit in a residential floor with dedicated privacy. Hostel is a structured campus accommodation with central mess, recreation halls, and sports facilities.',
    },
    {
      q: 'How does Peflarmo prevent double booking of rooms and beds?',
      a: 'Every property on Peflarmo has an authoritative inventory unit counter in our shared backend database. When a booking request is submitted, the system decrements the available bed count, preventing conflicting simultaneous reservations.',
    },
    {
      q: 'Does my customer account work on both the website and the mobile app?',
      a: 'Yes! Peflarmo customer website and the Peflarmo customer mobile app share the exact same backend database. Any booking created on the website appears instantly on your mobile app, and vice-versa.',
    },
    {
      q: 'When and how is the security deposit refunded?',
      a: 'Security deposits are 100% refundable upon completing your tenancy period. Standard checkout inspection is conducted against utility bills, and refunds are credited back via UPI / bank transfer within 5 business days.',
    },
    {
      q: 'What documents are required during move-in in Delhi?',
      a: 'You will need a valid Government Photo ID (Aadhaar Card, Passport, or Voter ID), college ID or company employee letter, and 2 passport-size photographs for standard Delhi Police tenant verification.',
    },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Customer Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Help &amp; Support</h1>
        <p className="text-sm text-slate-600">
          Find answers to frequently asked questions about booking accommodations, meal options, security deposits, and
          tenancy rules in Delhi.
        </p>

        {/* FAQ Search */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics (e.g. deposit, meals, booking)..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Contact Grid */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-xs text-slate-300">
            Our Central Operations team in Delhi is available 6 days a week to guide you.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support Desk</span>
          </Link>

          <a
            href="tel:+919318322388"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call Helpline</span>
          </a>
        </div>
      </div>
    </div>
  );
}
