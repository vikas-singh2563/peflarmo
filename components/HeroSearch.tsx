'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, IndianRupee, Layers } from 'lucide-react';
import { PropertyCategory } from '@/lib/types';

export default function HeroSearch() {
  const router = useRouter();

  const [city, setCity] = useState('Delhi');
  const [locality, setLocality] = useState('');
  const [category, setCategory] = useState<PropertyCategory | 'all'>('all');
  const [budgetRange, setBudgetRange] = useState('');

  const popularDelhiLocalities = [
    'North Campus',
    'South Campus',
    'Hauz Khas',
    'Saket',
    'Karol Bagh',
    'Laxmi Nagar',
    'Mukherjee Nagar',
    'Cyber City',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (locality.trim()) params.set('locality', locality.trim());
    if (category && category !== 'all') params.set('category', category);

    if (budgetRange) {
      if (budgetRange === 'under-8k') {
        params.set('maxBudget', '8000');
      } else if (budgetRange === '8k-15k') {
        params.set('minBudget', '8000');
        params.set('maxBudget', '15000');
      } else if (budgetRange === '15k-25k') {
        params.set('minBudget', '15000');
        params.set('maxBudget', '25000');
      } else if (budgetRange === '25k-50k') {
        params.set('minBudget', '25000');
        params.set('maxBudget', '50000');
      } else if (budgetRange === 'above-50k') {
        params.set('minBudget', '50000');
      }
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Category Quick Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-2xl max-w-fit shadow-md border border-slate-200/80 mb-3 mx-auto sm:mx-0">
        {[
          { key: 'all', label: 'All Accommodations' },
          { key: 'PG', label: 'PG' },
          { key: 'Flat', label: 'Flat' },
          { key: 'Room', label: 'Room' },
          { key: 'Hostel', label: 'Hostel' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setCategory(tab.key as PropertyCategory | 'all')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              category === tab.key
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Search Bar Card */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/90 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
      >
        {/* City Input */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            City
          </label>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600 shrink-0" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Delhi">Delhi (NCR)</option>
              <option value="Gurgaon">Gurgaon (DLF & Cyber City)</option>
              <option value="Noida">Noida</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
        </div>

        {/* Locality Input */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Area / Locality
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g. North Campus, Hauz Khas"
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Property Category */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Property Category
          </label>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PropertyCategory | 'all')}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="PG">PG (Paying Guest)</option>
              <option value="Flat">Flat / Apartment</option>
              <option value="Room">Private / Shared Room</option>
              <option value="Hostel">Hostel</option>
            </select>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Monthly Budget
          </label>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-blue-600 shrink-0" />
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="under-8k">Under ₹8,000 / mo</option>
              <option value="8k-15k">₹8,000 - ₹15,000 / mo</option>
              <option value="15k-25k">₹15,000 - ₹25,000 / mo</option>
              <option value="25k-50k">₹25,000 - ₹50,000 / mo</option>
              <option value="above-50k">₹50,000+ / mo</option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-12 pt-2 sm:pt-0">
          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
          >
            <Search className="w-5 h-5" />
            <span>Search Verified Accommodations</span>
          </button>
        </div>
      </form>

      {/* Popular Localities Quick Pills */}
      <div className="mt-4 flex items-center gap-2 flex-wrap text-xs text-white/90">
        <span className="font-semibold text-white/80">Popular in Delhi:</span>
        {popularDelhiLocalities.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => {
              setLocality(loc);
              router.push(`/search?city=Delhi&locality=${encodeURIComponent(loc)}`);
            }}
            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-lg text-white text-xs font-medium transition-colors"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
