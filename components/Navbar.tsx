'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Heart,
  User,
  CalendarCheck,
  Search,
  LogOut,
  Building2,
  FileQuestion,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, favorites, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'PG', href: '/pg' },
    { label: 'Flat', href: '/flat' },
    { label: 'Room', href: '/room' },
    { label: 'Hostel', href: '/hostel' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:bg-blue-700 transition-colors">
              P
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Peflarmo
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide -mt-0.5">
                Find Your Perfect Stay
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search shortcut */}
            <Link
              href="/search"
              aria-label="Search accommodations"
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
              title="Search Accommodations"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Favorites shortcut */}
            <Link
              href="/favorites"
              aria-label="Saved favorites"
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
              title="My Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* My Bookings link */}
            <Link
              href="/my-bookings"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                pathname === '/my-bookings'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>

            {/* Customer User Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.fullName.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-semibold text-sm text-slate-900 truncate">{user.fullName}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Customer Profile</span>
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      <span>My Bookings</span>
                    </Link>
                    <Link
                      href="/my-inquiries"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <FileQuestion className="w-4 h-4 text-slate-400" />
                      <span>My Inquiries</span>
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Saved Favorites</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="relative p-2 text-slate-600 hover:text-blue-600"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-50 text-slate-800 rounded-xl text-sm font-medium"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Search</span>
            </Link>
            <Link
              href="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-base font-medium ${
                  isActive(link.href)
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{user.fullName}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold text-blue-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    Profile
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/my-inquiries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center text-xs font-medium text-slate-700 bg-slate-100 rounded-xl"
                  >
                    My Inquiries
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex-1 py-2 text-center text-xs font-medium text-rose-600 bg-rose-50 rounded-xl"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
                >
                  Customer Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
