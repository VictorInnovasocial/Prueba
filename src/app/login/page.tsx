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
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(email, password);
    if (ok) {
      router.push('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary-700">
            <Globe className="w-7 h-7 text-accent-500" />
            RedCoopera
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800 mt-5">Iniciar sesión</h1>
          <p className="text-neutral-500 text-sm mt-1">Accede a tu espacio en la Red</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-7">
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl mb-5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@organizacion.org"
                  className="input-base pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Accediendo...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              ¿Primera vez en RedCoopera?{' '}
              <Link href="/registro" className="font-semibold text-primary-700 hover:text-primary-800">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-neutral-100 shadow-card text-xs text-neutral-500">
          <p className="font-semibold text-neutral-600 mb-1.5">Cuentas de prueba:</p>
          <ul className="space-y-1">
            <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded">ana@raicessolidarias.org</code> / <code className="bg-neutral-100 px-1.5 py-0.5 rounded">1234</code></li>
            <li><code className="bg-neutral-100 px-1.5 py-0.5 rounded">carlos@innovacionsocial.org</code> / <code className="bg-neutral-100 px-1.5 py-0.5 rounded">1234</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
