import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Peflarmo',
  description: 'Peflarmo Customer Privacy Policy regarding data protection, customer safety, and booking records.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Customer Data Protection</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 · Peflarmo Technologies Pvt. Ltd.</p>
      </div>

      <div className="prose prose-slate text-sm space-y-6 text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When registering an account, submitting inquiries, or requesting accommodation bookings on Peflarmo, we collect
            your full name, email address, mobile phone number, preferred accommodation dates, and communication messages.
            For confirmed bookings, government identity verification (such as Aadhaar or Passport) may be requested in
            accordance with local Delhi police tenancy verification norms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Data</h2>
          <p>
            Your information is used strictly to process accommodation inquiries, perform internal availability reviews,
            prevent fraudulent double-bookings, coordinate property site visits, and facilitate tenancy agreements between
            customers and authorized accommodation managers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Verified Request Privacy</h2>
          <p>
            In accordance with Peflarmo&apos;s verified architecture, customer inquiries and booking applications are routed
            exclusively through Peflarmo Central Operations first. Contact details are never publicly displayed or sold to
            unauthorized third-party brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Synchronization Across Web &amp; Mobile</h2>
          <p>
            Customer accounts, inquiry statuses, favorites, and reservations are synchronized securely with the Peflarmo
            customer mobile application using encrypted authentication tokens.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Data Retention &amp; Rights</h2>
          <p>
            You have the right to inspect, edit, or request deletion of your customer profile at any time by visiting your
            Customer Profile or writing to <span className="text-blue-600 font-semibold">privacy@peflarmo.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
