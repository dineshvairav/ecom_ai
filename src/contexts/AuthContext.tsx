
"use client";

import type { User } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mockUsers } from '@/lib/mock-data'; // For mock login

interface AuthContextType {
  user: User | null;
  login: (role: User['role'], email?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user (e.g., from localStorage)
    // For now, default to guest
    const storedUser = localStorage.getItem('visualVestUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('visualVestUser');
        setUser({ id: 'guest-initial', role: 'guest' });
      }
    } else {
      setUser({ id: 'guest-initial', role: 'guest' });
    }
    setLoading(false);
  }, []);

  const login = (role: User['role'], email?: string) => {
    let foundUser: User | undefined;
    if (email) {
      foundUser = mockUsers.find(u => u.email === email && u.role === role);
    } else {
      foundUser = mockUsers.find(u => u.role === role); // Simple mock: find first user of that role
    }
    
    const loggedInUser = foundUser || { id: email || `mock-${role}-${Date.now()}`, email, role, name: email ? email.split('@')[0] : role };
    setUser(loggedInUser);
    localStorage.setItem('visualVestUser', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    const guestUser = { id: 'guest-logout', role: 'guest' };
    setUser(guestUser);
    localStorage.setItem('visualVestUser', JSON.stringify(guestUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
