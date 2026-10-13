'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to profile or home
  if (user) {
    router.push('/profile');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials');
      setLoading(false);
      return;
    }

    router.push('/profile');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 text-white font-black text-2xl rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            P
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Login</h1>
          <p className="text-xs text-slate-500">
            Sign in to manage your accommodation bookings, inquiries, and saved favorites.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Account Helper */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800">Demo Customer Credentials:</div>
          <div className="flex justify-between text-slate-600">
            <span>Email:</span>
            <code className="text-blue-700 font-mono">customer@peflarmo.com</code>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Password:</span>
            <code className="text-blue-700 font-mono">Peflarmo@123</code>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('customer@peflarmo.com');
              setPassword('Peflarmo@123');
            }}
            className="text-[11px] text-blue-600 hover:underline font-semibold pt-1 block"
          >
            Fill Demo Credentials
          </button>
        </div>

        <div className="pt-2 text-center text-xs text-slate-600">
          Don&apos;t have a customer account?{' '}
          <Link href="/signup" className="font-bold text-blue-600 hover:underline">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}
