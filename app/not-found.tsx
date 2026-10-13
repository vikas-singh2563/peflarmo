import React from 'react';
import Link from 'next/link';
import { Home, Search, Building2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 font-black text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Accommodation Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The property or page you are looking for may have been updated, relocated, or is no longer active in our
            verified listing directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/search"
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Stays</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-semibold text-blue-600">
          <Link href="/pg" className="hover:underline">PGs</Link>
          <span>·</span>
          <Link href="/flat" className="hover:underline">Flats</Link>
          <span>·</span>
          <Link href="/room" className="hover:underline">Rooms</Link>
          <span>·</span>
          <Link href="/hostel" className="hover:underline">Hostels</Link>
        </div>
      </div>
    </div>
  );
}
