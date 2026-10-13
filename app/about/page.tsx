import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Target, HeartHandshake, MapPin, Building, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Peflarmo - India\'s Trusted Rental & Accommodation Platform',
  description:
    'Learn about Peflarmo, our mission to simplify PG, Flat, Room, and Hostel renting in Delhi and Indian cities through genuine physical verification and zero brokerage deception.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>About Peflarmo Technologies</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Simplifying Accommodations for Millions Across India
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Peflarmo was founded on a simple premise: finding safe, verified, and transparent accommodation in Delhi and
          major educational hubs should be as easy and dependable as ordering a cab.
        </p>
      </section>

      {/* Image Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Peflarmo Accommodation Community"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <div className="text-white max-w-xl space-y-2">
              <div className="text-xl sm:text-2xl font-bold">100% Physical Property Verification</div>
              <p className="text-xs sm:text-sm text-slate-200">
                Every property on our website and mobile app has been physically inspected by Peflarmo operations officers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200/90 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To provide student aspirants, university scholars, and working professionals with verified, safe, and
            dignified living spaces with transparent pricing in Indian Rupees, eliminating deceptive broker markups and
            bogus photo promises.
          </p>
        </div>

        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200/90 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Verified Quality First Promise</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike open-classified platforms where anyone can post fake listings, every customer inquiry and booking on
            Peflarmo is reviewed by Central Operations first before being routed to authorized coordinators, protecting
            customers at every step.
          </p>
        </div>
      </section>

      {/* Target Cities & Delhi Focus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Footprint in Delhi &amp; Indian Hubs
          </h2>
          <p className="text-sm text-slate-600">
            Initial focus on Delhi NCR student and tech corridors, followed by expansion to Bengaluru, Pune, and Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { city: 'Delhi (DU North Campus)', tag: 'Vishwavidyalaya, GTB Nagar, Hudson' },
            { city: 'Delhi (DU South Campus)', tag: 'Satya Niketan, Anand Niketan' },
            { city: 'Delhi (Coaching Hubs)', tag: 'Karol Bagh, Laxmi Nagar, Mukherjee' },
            { city: 'Delhi NCR Tech Hubs)', tag: 'DLF Cyber City, Noida Sector 62' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-sm font-bold text-slate-900">{item.city}</div>
              <div className="text-xs text-slate-500">{item.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Ready to find your ideal stay?</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Explore our complete directory of verified PGs, Flats, Rooms, and Hostels today.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
        >
          <span>Browse All Accommodations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
