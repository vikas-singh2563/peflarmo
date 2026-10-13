'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Filter,
  X,
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property, PropertyCategory } from '@/lib/types';

interface CategoryListingViewProps {
  category: PropertyCategory;
  title: string;
  tagline: string;
  initialGender?: string;
}

export default function CategoryListingView({
  category,
  title,
  tagline,
  initialGender,
}: CategoryListingViewProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters state
  const [locality, setLocality] = useState('');
  const [genderSuitability, setGenderSuitability] = useState(initialGender || 'All');
  const [sharingType, setSharingType] = useState('All');
  const [bhk, setBhk] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [ac, setAc] = useState('All');
  const [food, setFood] = useState('All');
  const [bathroom, setBathroom] = useState('All');
  const [minBudget, setMinBudget] = useState<number | ''>('');
  const [maxBudget, setMaxBudget] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'rating'>('newest');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('category', category);

      if (locality.trim()) params.set('locality', locality.trim());
      if (genderSuitability !== 'All') params.set('genderSuitability', genderSuitability);
      if (sharingType !== 'All') params.set('sharingType', sharingType);
      if (bhk !== 'All') params.set('bhk', bhk);
      if (furnishing !== 'All') params.set('furnishing', furnishing);
      if (ac !== 'All') params.set('ac', ac === 'AC' ? 'true' : 'false');
      if (food !== 'All') params.set('food', food);
      if (bathroom !== 'All') params.set('bathroom', bathroom);
      if (minBudget !== '') params.set('minBudget', minBudget.toString());
      if (maxBudget !== '') params.set('maxBudget', maxBudget.toString());
      params.set('sortBy', sortBy);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [
    category,
    locality,
    genderSuitability,
    sharingType,
    bhk,
    furnishing,
    ac,
    food,
    bathroom,
    minBudget,
    maxBudget,
    sortBy,
  ]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const resetFilters = () => {
    setLocality('');
    setGenderSuitability('All');
    setSharingType('All');
    setBhk('All');
    setFurnishing('All');
    setAc('All');
    setFood('All');
    setBathroom('All');
    setMinBudget('');
    setMaxBudget('');
    setSortBy('newest');
  };

  const hasActiveFilters =
    locality ||
    genderSuitability !== 'All' ||
    sharingType !== 'All' ||
    bhk !== 'All' ||
    furnishing !== 'All' ||
    ac !== 'All' ||
    food !== 'All' ||
    bathroom !== 'All' ||
    minBudget !== '' ||
    maxBudget !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Header */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Verified {category} Listings in Delhi &amp; NCR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">{tagline}</p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl text-sm font-semibold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium">
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Property Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter {category}s</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Locality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Locality in Delhi NCR</label>
            <div className="relative">
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. North Campus, Hauz Khas"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Monthly Budget Range */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Monthly Rent (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value ? Number(e.target.value) : '')}
                placeholder="Min ₹"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value ? Number(e.target.value) : '')}
                placeholder="Max ₹"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Gender Suitability (PG & Hostel) */}
          {(category === 'PG' || category === 'Hostel' || category === 'Room') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Suitability / Gender</label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Boys', 'Girls', 'Co-ed / Coliving'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenderSuitability(g)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                      genderSuitability === g
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sharing Type (PG, Room, Hostel) */}
          {(category === 'PG' || category === 'Room' || category === 'Hostel') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sharing Type</label>
              <select
                value={sharingType}
                onChange={(e) => setSharingType(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="All">All Sharing Types</option>
                <option value="Single">Single Sharing</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
                <option value="Four Sharing">Four Sharing</option>
                {category === 'Hostel' && <option value="Dormitory">Dormitory</option>}
              </select>
            </div>
          )}

          {/* BHK Configuration (Flats) */}
          {category === 'Flat' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">BHK Configuration</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['All', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBhk(b)}
                    className={`px-2 py-1 text-xs rounded-lg font-medium text-center transition-colors ${
                      bhk === b
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Furnishing Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Furnishing</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="All">All Furnishings</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* AC / Non-AC */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Air Conditioning</label>
            <div className="flex gap-2">
              {['All', 'AC', 'Non-AC'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAc(opt)}
                  className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors ${
                    ac === opt
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Food Option (PG & Hostel) */}
          {(category === 'PG' || category === 'Hostel') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Food / Meals</label>
              <select
                value={food}
                onChange={(e) => setFood(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="All">Any Food Option</option>
                <option value="3 Meals">3 Meals Included</option>
                <option value="Breakfast">Breakfast Included</option>
                <option value="Mess">Food on Demand / Mess</option>
                <option value="No Food">Without Food</option>
              </select>
            </div>
          )}

          {/* Bathroom Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bathroom Type</label>
            <select
              value={bathroom}
              onChange={(e) => setBathroom(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="All">Any Bathroom</option>
              <option value="Attached">Attached Bathroom</option>
              <option value="Common">Common Bathroom</option>
            </select>
          </div>
        </aside>

        {/* Listings Content */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900">{properties.length}</strong> verified {category} properties
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-2xl h-80 animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No {category} Properties Found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                We couldn&apos;t find any verified properties matching your current filter criteria. Try expanding your
                budget or clearing specific filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-5 animate-slideLeft shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Filter Properties</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Locality</label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. North Campus"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            {(category === 'PG' || category === 'Hostel' || category === 'Room') && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender Suitability</label>
                <select
                  value={genderSuitability}
                  onChange={(e) => setGenderSuitability(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="All">All</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Co-ed / Coliving">Co-ed / Coliving</option>
                </select>
              </div>
            )}

            {category === 'Flat' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">BHK</label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="All">All BHKs</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Air Conditioning</label>
              <select
                value={ac}
                onChange={(e) => setAc(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
              >
                <option value="All">All</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl shadow-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
