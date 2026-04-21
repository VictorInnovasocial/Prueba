'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Globe, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(email, password);
    if (ok) {
      router.push('/');
    } else {
      setError('Email o contraseña incorrectos. Prueba con: ana@raicessolidarias.org / 1234');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary-700 mb-2">
            <Globe className="w-7 h-7 text-accent-500" />
            RedCoopera
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800 mt-4">Accede a tu cuenta</h1>
          <p className="text-neutral-500 text-sm mt-1">Espacio privado para entidades de la Red</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-8">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@organizacion.org"
                  className="input-base pl-11"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-11 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Accediendo...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-500">
            <p className="font-semibold text-neutral-700 mb-1.5">Cuentas de demostración:</p>
            <ul className="space-y-1">
              <li><code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">ana@raicessolidarias.org</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">1234</code> — Mentora</li>
              <li><code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">carlos@innovacionsocial.org</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">1234</code> — Miembro</li>
              <li><code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">admin@redcoopera.org</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">admin</code> — Admin</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          ¿Tu entidad no está registrada?{' '}
          <a href="mailto:info@redcoopera.org?subject=Solicitud de acceso" className="font-medium text-primary-700 hover:text-primary-800">
            Solicita acceso
          </a>
        </p>
      </div>
    </div>
  );
}
