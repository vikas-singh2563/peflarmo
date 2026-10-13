'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CustomerUser } from '@/lib/types';

interface AuthContextType {
  user: CustomerUser | null;
  loading: boolean;
  favorites: string[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { fullName: string; email: string; mobile: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: { fullName?: string; mobile?: string; currentPassword?: string; newPassword?: string }) => Promise<{ success: boolean; error?: string }>;
  toggleFavorite: (propertyId: string) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          setFavorites(data.user.favorites || []);
          return;
        }
      }
      setUser(null);
      setFavorites([]);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to log in' };
      }
      setUser(data.user);
      setFavorites(data.user.favorites || []);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error during login' };
    }
  };

  const signup = async (payload: { fullName: string; email: string; mobile: string; password: string }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Registration failed' };
      }
      setUser(data.user);
      setFavorites(data.user.favorites || []);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error during signup' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      setFavorites([]);
    }
  };

  const updateProfile = async (payload: { fullName?: string; mobile?: string; currentPassword?: string; newPassword?: string }) => {
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Update failed' };
      }
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error updating profile' };
    }
  };

  const toggleFavorite = async (propertyId: string): Promise<boolean> => {
    if (!user) {
      // Local optimistic toggle if not logged in
      setFavorites((prev) => {
        const exists = prev.includes(propertyId);
        return exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      });
      return false; // indicates not logged in for backend persistence
    }

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (data.success && data.favoriteIds) {
        setFavorites(data.favoriteIds);
        return true;
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        favorites,
        login,
        signup,
        logout,
        updateProfile,
        toggleFavorite,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
