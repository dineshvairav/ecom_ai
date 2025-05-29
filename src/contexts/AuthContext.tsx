
"use client";

import type { User } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mockUsers } from '@/lib/mock-data'; // For mock login

interface AuthContextType {
  user: User | null;
  login: (role: User['role'], email?: string, mobile?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('visualVestUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('visualVestUser');
        setUser({ id: 'guest-initial', role: 'guest', name: 'Guest User' });
      }
    } else {
      setUser({ id: 'guest-initial', role: 'guest', name: 'Guest User' });
    }
    setLoading(false);
  }, []);

  const login = (role: User['role'], email?: string, mobile?: string) => {
    let userToSet: User;

    if (role === 'guest') {
      const guestBase = mockUsers.find(u => u.role === 'guest' && !u.email && !u.mobile);
      const guestId = mobile ? `guest-mob-${Date.now()}` : `guest-${Date.now()}`;
      const guestName = 'Guest User'; // Consistent name for guests

      userToSet = {
        ...(guestBase || { id: '', name: '' }), // Spread generic guest fields if any
        id: guestId,
        role: 'guest',
        name: guestName,
        email: undefined, // Explicitly no email for guests
        mobile: mobile && mobile.trim() !== '' ? mobile.trim() : undefined,
      };
    } else {
      // Logic for registered users (user, admin, dealer)
      let foundUser = mockUsers.find(u => u.email === email && u.role === role);
      if (!foundUser && email) { 
          foundUser = {
              id: email, // Use email as ID if creating on the fly
              email: email,
              role: role,
              name: email.split('@')[0],
          };
      } else if (!foundUser) { // Fallback if no email for some reason
          const genericUserForRole = mockUsers.find(u => u.role === role && !u.email);
          foundUser = genericUserForRole || {
              id: `mock-${role}-${Date.now()}`,
              role: role,
              name: role.charAt(0).toUpperCase() + role.slice(1) + " User", // e.g. "Admin User"
          };
      }
      userToSet = foundUser!;
       // Ensure mobile is not accidentally carried over to non-guest users unless intended
      if (userToSet.role !== 'guest') {
        delete userToSet.mobile;
      }
    }

    setUser(userToSet);
    localStorage.setItem('visualVestUser', JSON.stringify(userToSet));
  };

  const logout = () => {
    // When logging out, revert to a generic guest user state without mobile/email
    const guestUser: User = { 
        id: `guest-logout-${Date.now()}`, 
        role: 'guest', 
        name: 'Guest User', 
        email: undefined, 
        mobile: undefined 
    };
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
