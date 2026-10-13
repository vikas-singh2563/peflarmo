'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function FavoritesPage() {
  const { user, favorites } = useAuth();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProps = async () => {
      try {
        const res = await fetch('/api/favorites');
        const data = await res.json();
        if (data.success) {
          setFavoriteProperties(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProps();
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 mb-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Saved Shortlist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Saved Favorites</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Revisit your shortlisted PGs, flats, rooms, and hostels anytime across desktop and mobile.
          </p>
        </div>

        <Link
          href="/search"
          className="self-start sm:self-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <span>Explore More Stays</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onFavoriteChange={(isFav) => {
                if (!isFav) {
                  setFavoriteProperties((prev) => prev.filter((p) => p.id !== prop.id));
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your Favorites List is Empty</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Click the heart icon on any PG, flat, room, or hostel card to save properties for quick access and price
            comparisons.
          </p>
          <Link
            href="/search"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Start Exploring Accommodations
          </Link>
        </div>
      )}
    </div>
  );
}
