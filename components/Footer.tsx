import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl">
                P
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Peflarmo</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India&apos;s trusted property rental and accommodation booking platform. Discover safe, comfortable, and
              affordable verified PGs, Flats, Rooms, and Hostels across Delhi NCR and key Indian educational hubs.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-blue-400">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
              <span>100% Verified Accommodations · Safe Booking Process</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Delhi Central Operations Hub, Connaught Place, New Delhi 110001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Customer Care:{' '}
                  <a href="tel:+919318322388" className="hover:text-white transition-colors">
                    +91 93183 22388
                  </a>{' '}
                  (9 AM - 8 PM IST)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@peflarmo.com</span>
              </div>
            </div>
          </div>

          {/* Accommodation Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Accommodations</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pg" className="hover:text-white transition-colors">
                  PG in Delhi
                </Link>
              </li>
              <li>
                <Link href="/pg?gender=Boys" className="hover:text-white transition-colors text-slate-400">
                  Boys PG
                </Link>
              </li>
              <li>
                <Link href="/pg?gender=Girls" className="hover:text-white transition-colors text-slate-400">
                  Girls PG
                </Link>
              </li>
              <li>
                <Link href="/flat" className="hover:text-white transition-colors">
                  Flats for Rent
                </Link>
              </li>
              <li>
                <Link href="/room" className="hover:text-white transition-colors">
                  Private & Shared Rooms
                </Link>
              </li>
              <li>
                <Link href="/hostel" className="hover:text-white transition-colors">
                  Student & Professional Hostels
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Customer Support & FAQ
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-white transition-colors">
                  Track My Bookings
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  Saved Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal & Trust</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-white transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400 block pt-2">
                  All transactions and listings comply with Indian Tenancy Acts and consumer data privacy standards.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Peflarmo Technologies Pvt. Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Pricing in Indian Rupees (INR ₹)</span>
            <span>·</span>
            <span>Delhi · Gurgaon · Noida · Bengaluru · Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
