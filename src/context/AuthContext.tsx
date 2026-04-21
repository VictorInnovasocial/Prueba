'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  organization: string;
  email: string;
  role: 'member' | 'mentor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: (User & { password: string })[] = [
  { name: 'Ana García', organization: 'Fundación Raíces Solidarias', email: 'ana@raicessolidarias.org', password: '1234', role: 'mentor' },
  { name: 'Carlos Mendoza', organization: 'Centro de Innovación Social', email: 'carlos@innovacionsocial.org', password: '1234', role: 'member' },
  { name: 'Admin RedCoopera', organization: 'RedCoopera', email: 'admin@redcoopera.org', password: 'admin', role: 'admin' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('redcoopera_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('redcoopera_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('redcoopera_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
