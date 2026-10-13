import React from 'react';
import { Ban } from 'lucide-react';

export const metadata = {
  title: 'Cancellation and Refund Policy | Peflarmo',
  description: 'Peflarmo Policy regarding booking cancellations, refundable security deposits, and notice periods.',
};

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <Ban className="w-4 h-4 text-rose-600" />
          <span>Fair Tenancy Terms</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cancellation and Refund Policy</h1>
        <p className="text-xs text-slate-500">Updated: October 2026</p>
      </div>

      <div className="prose prose-slate text-sm space-y-6 text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Cancellation Before Booking Confirmation</h2>
          <p>
            If you cancel a booking request while its status remains &quot;Pending Review&quot; or &quot;Under Review&quot;, cancellation is
            effective immediately with 100% refund of any initial advance tokens paid.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Cancellation After Confirmation &amp; Prior to Move-in</h2>
          <p>
            - Cancellations made 7 or more days prior to the scheduled move-in date are eligible for full refund of the security deposit minus a standard ₹500 processing fee.
          </p>
          <p>
            - Cancellations made less than 48 hours prior to move-in may incur a deduction equivalent to 3 days pro-rata rent to compensate property managers for held inventory.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Security Deposit Refunds on Tenancy Completion</h2>
          <p>
            Security deposits are 100% refundable at the end of the tenancy agreement following standard checkout inspection,
            subject to 30 days written notice as per property rules. Refunds are transferred via IMPS / UPI within 5 business days of checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. How to Request Cancellation</h2>
          <p>
            Log in to your customer account, open <span className="font-semibold text-blue-600">My Bookings</span>, find the
            relevant booking card, and click <span className="font-semibold text-rose-600">Cancel Booking</span>. For special
            disputes, contact <span className="text-blue-600 font-semibold">support@peflarmo.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
