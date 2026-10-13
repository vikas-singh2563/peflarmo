'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  ShieldCheck,
  Building,
  Check,
  MapPin,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property, PropertyCategory } from '@/lib/types';

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial query params
  const initialCity = searchParams.get('city') || 'Delhi';
  const initialLocality = searchParams.get('locality') || '';
  const initialCategory = (searchParams.get('category') as PropertyCategory | 'all') || 'all';
  const initialMinBudget = searchParams.get('minBudget') ? Number(searchParams.get('minBudget')) : '';
  const initialMaxBudget = searchParams.get('maxBudget') ? Number(searchParams.get('maxBudget')) : '';
  const initialSearchQuery = searchParams.get('q') || '';

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Form states
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [city, setCity] = useState(initialCity);
  const [locality, setLocality] = useState(initialLocality);
  const [category, setCategory] = useState<PropertyCategory | 'all'>(initialCategory);
  const [minBudget, setMinBudget] = useState<number | ''>(initialMinBudget);
  const [maxBudget, setMaxBudget] = useState<number | ''>(initialMaxBudget);
  const [genderSuitability, setGenderSuitability] = useState('All');
  const [sharingType, setSharingType] = useState('All');
  const [bhk, setBhk] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [ac, setAc] = useState('All');
  const [food, setFood] = useState('All');
  const [bathroom, setBathroom] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'rating'>('newest');

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAvailableAmenities = [
    'Wi-Fi',
    'AC',
    'Security',
    'Power Backup',
    'Daily Housekeeping',
    'RO Water',
    'Parking',
    'Gym',
  ];

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (city) params.set('city', city);
      if (locality.trim()) params.set('locality', locality.trim());
      if (category && category !== 'all') params.set('category', category);
      if (minBudget !== '') params.set('minBudget', minBudget.toString());
      if (maxBudget !== '') params.set('maxBudget', maxBudget.toString());
      if (genderSuitability !== 'All') params.set('genderSuitability', genderSuitability);
      if (sharingType !== 'All') params.set('sharingType', sharingType);
      if (bhk !== 'All') params.set('bhk', bhk);
      if (furnishing !== 'All') params.set('furnishing', furnishing);
      if (ac !== 'All') params.set('ac', ac === 'AC' ? 'true' : 'false');
      if (food !== 'All') params.set('food', food);
      if (bathroom !== 'All') params.set('bathroom', bathroom);
      if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
      params.set('sortBy', sortBy);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    city,
    locality,
    category,
    minBudget,
    maxBudget,
    genderSuitability,
    sharingType,
    bhk,
    furnishing,
    ac,
    food,
    bathroom,
    selectedAmenities,
    sortBy,
  ]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const toggleAmenity = (am: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(am) ? prev.filter((a) => a !== am) : [...prev, am]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setLocality('');
    setCategory('all');
    setMinBudget('');
    setMaxBudget('');
    setGenderSuitability('All');
    setSharingType('All');
    setBhk('All');
    setFurnishing('All');
    setAc('All');
    setFood('All');
    setBathroom('All');
    setSelectedAmenities([]);
    setSortBy('newest');
    router.push('/search');
  };

  const hasActiveFilters =
    searchQuery ||
    locality ||
    category !== 'all' ||
    minBudget !== '' ||
    maxBudget !== '' ||
    genderSuitability !== 'All' ||
    sharingType !== 'All' ||
    bhk !== 'All' ||
    furnishing !== 'All' ||
    ac !== 'All' ||
    food !== 'All' ||
    bathroom !== 'All' ||
    selectedAmenities.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search Bar & Sort Header */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by property name, landmark, area (e.g. North Campus, Hauz Khas)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium shadow-2xs">
              <span className="text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Listings</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-200/60">
          <span className="text-xs font-bold text-slate-500 mr-2">Category:</span>
          {[
            { key: 'all', label: 'All Categories' },
            { key: 'PG', label: 'PG' },
            { key: 'Flat', label: 'Flat' },
            { key: 'Room', label: 'Room' },
            { key: 'Hostel', label: 'Hostel' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key as PropertyCategory | 'all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                category === cat.key
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Comprehensive Filter Sidebar + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Search Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="Delhi">Delhi (NCR)</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Noida">Noida</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Locality</label>
            <div className="relative">
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. North Campus, Saket"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Budget (₹)</label>
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

          {/* Sharing Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sharing / Room Type</label>
            <select
              value={sharingType}
              onChange={(e) => setSharingType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option value="All">All Types</option>
              <option value="Single">Single Sharing / Private</option>
              <option value="Double">Double Sharing</option>
              <option value="Triple">Triple Sharing</option>
              <option value="Four Sharing">Four Sharing</option>
              <option value="Entire Flat">Entire Flat</option>
            </select>
          </div>

          {/* BHK (If Flat or All) */}
          {(category === 'Flat' || category === 'all') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">BHK Configuration</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
              >
                <option value="All">Any BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
          )}

          {/* Furnishing */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Furnishing</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option value="All">All Furnishings</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* AC Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Air Conditioning</label>
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

          {/* Food Availability */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Food Availability</label>
            <select
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option value="All">All</option>
              <option value="3 Meals">3 Meals Included</option>
              <option value="Breakfast">Breakfast Included</option>
              <option value="Mess">Food on Demand / Mess</option>
              <option value="No Food">Without Food</option>
            </select>
          </div>

          {/* Bathroom Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Bathroom Type</label>
            <select
              value={bathroom}
              onChange={(e) => setBathroom(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option value="All">All</option>
              <option value="Attached">Attached Bathroom</option>
              <option value="Common">Common Bathroom</option>
            </select>
          </div>

          {/* Amenities checklist */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Amenities</label>
            <div className="space-y-1.5">
              {allAvailableAmenities.map((am) => (
                <label key={am} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(am)}
                    onChange={() => toggleAmenity(am)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{am}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Search Results Main Column */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Found <strong className="text-slate-900">{properties.length}</strong> verified accommodations in {city}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
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
              <h3 className="text-lg font-bold text-slate-900">No Matching Accommodations Found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any verified properties matching your selected criteria. Try removing some filters or
                searching in nearby localities like North Campus, South Campus, or Hauz Khas.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-5 shadow-2xl animate-slideLeft">
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PropertyCategory | 'all')}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
              >
                <option value="all">All Categories</option>
                <option value="PG">PG</option>
                <option value="Flat">Flat</option>
                <option value="Room">Room</option>
                <option value="Hostel">Hostel</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleClearFilters}
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
