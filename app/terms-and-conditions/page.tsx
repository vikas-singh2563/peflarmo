import React from 'react';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | Peflarmo',
  description: 'Peflarmo Terms and Conditions governing property discovery, booking workflow, and tenancy rules in India.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Customer Tenancy Agreement</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-500">Last Revised: October 2026</p>
      </div>

      <div className="prose prose-slate text-sm space-y-6 text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Platform Terms</h2>
          <p>
            By accessing or creating an account on the Peflarmo website or mobile application, you agree to comply with
            these Terms of Service and applicable Indian tenancy regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Customer-Only Portal &amp; Booking Process</h2>
          <p>
            This website is strictly intended for customer accommodation discovery, inquiry submissions, and reservation
            management. Owner, broker, and staff management portals are maintained separately and must not be accessed through this
            customer interface.
          </p>
          <p>
            Submitting a booking request reserves an availability slot subject to Operations Review and formal coordinator
            confirmation. Bookings transition to &quot;Confirmed&quot; only once verification protocols and deposit payments are
            formally acknowledged.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Pricing &amp; Currency</h2>
          <p>
            All listed rents, security deposits, and onboarding charges are stated in Indian Rupees (INR ₹). Transparent
            breakdowns are provided before any booking submission without hidden charges.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Property Discipline &amp; House Rules</h2>
          <p>
            Tenants residing in PGs, hostels, or rental apartments must adhere to specific property guidelines regarding
            visitor hours, gate closure timings, quiet study periods, and non-smoking norms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            Peflarmo verifies property listings for quality, amenities, and safety prior to approval. Customers are encouraged
            to schedule in-person visits using our Inquiry system before executing long-term agreements.
          </p>
        </section>
      </div>
    </div>
  );
}
