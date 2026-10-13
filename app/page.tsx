import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Building,
  Home,
  Bed,
  Hotel,
  CheckCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Smartphone,
  Users,
} from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import { dbStore } from '@/lib/db/store';

export default async function HomePage() {
  // SSR fetch approved properties directly from backend store
  const featuredProperties = dbStore.getApprovedProperties().slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[640px] flex items-center justify-center bg-slate-900 overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Deep Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
            alt="Peflarmo Accommodation in Delhi"
            fill
            priority
            className="object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-slate-900/80 to-slate-950"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Delhi NCR&apos;s Trusted Accommodation Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Find Your Ideal PG, Flat, Room or Hostel
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Comfortable, Safe and Affordable Accommodation
            </p>
          </div>

          {/* Hero Property Search Engine */}
          <HeroSearch />
        </div>
      </section>

      {/* 2. Accommodation Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore by Property Category
          </h2>
          <p className="text-sm text-slate-600">
            Tailored stays matching student budgets, bachelor preferences, and family requirements across Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* PG */}
          <Link
            href="/pg"
            className="group p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                PG (Paying Guest)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Boys, Girls &amp; Co-Living PGs with AC, 3 home meals, Wi-Fi, and 24/7 security near colleges and hubs.
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1">
                <div>· Single, Double, Triple Sharing</div>
                <div>· Attached Bathroom Available</div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:gap-2.5 transition-all">
              <span>Browse PGs</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Flat */}
          <Link
            href="/flat"
            className="group p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                Flats &amp; Apartments
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                1 BHK, 2 BHK, 3 BHK &amp; luxury builder floors for families, bachelors, and working groups.
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1">
                <div>· Fully, Semi &amp; Unfurnished</div>
                <div>· Flats for Rent &amp; Long-Term Lease</div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:gap-2.5 transition-all">
              <span>Browse Flats</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Room */}
          <Link
            href="/room"
            className="group p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Bed className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                Private &amp; Shared Rooms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Independent furnished rooms in quiet residential villas and floors for exam aspirants and professionals.
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1">
                <div>· Short-Term &amp; Long-Term Stay</div>
                <div>· Attached or Common Bath</div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-600 group-hover:gap-2.5 transition-all">
              <span>Browse Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Hostel */}
          <Link
            href="/hostel"
            className="group p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Hotel className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                Student &amp; Pro Hostels
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Structured university hostels with central dining mess, reading rooms, sports, and warden security.
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1">
                <div>· Single Bed &amp; Dormitory</div>
                <div>· Boys, Girls &amp; Student Hostels</div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-sky-600 group-hover:gap-2.5 transition-all">
              <span>Browse Hostels</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Verified Accommodations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Curated Listings
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Stays in Delhi NCR
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verified demonstration properties actively available for in-person visits and instant booking.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>View All {featuredProperties.length}+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 4. Why Choose Peflarmo & Workflow Guarantee */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Peflarmo is the Trusted Choice
            </h2>
            <p className="text-sm text-slate-600">
              Eliminating rental scams, fake photos, and unverified brokers through a rigorous multi-tier security model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct Verification Workflow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every customer inquiry and booking request is routed directly to Peflarmo Central Operations first. No
                unverified listings or unsolicited broker spam.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">100% Genuine Physical Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only properties physically inspected for cleanliness, water supply, security protocols, and fire safety
                receive our Verified Stay stamp.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unified Web &amp; Mobile App Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connected to the same shared backend and database as the Peflarmo mobile app. Inquiries, bookings, and
                favorites stay updated across all your devices in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works (4-Step Workflow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Simple &amp; Transparent</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Accommodation Booking Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Discover & Filter',
              desc: 'Search by city, locality, budget, sharing type, AC, and meal preference with zero brokerage clutter.',
            },
            {
              step: '02',
              title: 'Submit Request',
              desc: 'Choose your room or bed and submit an Inquiry or Booking Request with your preferred move-in date.',
            },
            {
              step: '03',
              title: 'Verification & Review',
              desc: 'Peflarmo operations checks availability and property status before routing to the authorized coordinator.',
            },
            {
              step: '04',
              title: 'Confirm & Move In',
              desc: 'Receive confirmation on web and mobile app, review tenancy terms, and smoothly move into your stay.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="text-3xl font-black text-blue-100">{item.step}</div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Delhi Hubs Quick Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Looking for Accommodation Near Top Delhi Institutes?
            </h2>
            <p className="text-sm text-blue-200 leading-relaxed">
              We have verified PGs, flats, and rooms situated within walking distance of Delhi University North &amp;
              South Campuses, IIT Delhi, AIIMS, and major UPSC/CA coaching hubs.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <Link
                href="/search?city=Delhi&locality=North+Campus"
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors"
              >
                DU North Campus (Hudson Lane &amp; GTB Nagar)
              </Link>
              <Link
                href="/search?city=Delhi&locality=South+Campus"
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors"
              >
                DU South Campus (Satya Niketan)
              </Link>
              <Link
                href="/search?city=Delhi&locality=Karol+Bagh"
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors"
              >
                Karol Bagh &amp; Old Rajendra Nagar
              </Link>
              <Link
                href="/search?city=Delhi&locality=Laxmi+Nagar"
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors"
              >
                Laxmi Nagar &amp; Nirman Vihar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
