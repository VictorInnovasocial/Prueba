import Link from 'next/link';
import { Globe, ArrowLeft, BookOpen, Users, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 mb-6">
          <Globe className="w-10 h-10 text-primary-700" />
        </div>
        <h1 className="text-7xl font-bold text-primary-700 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-neutral-800 mb-3">Página no encontrada</h2>
        <p className="text-neutral-500 leading-relaxed mb-8">
          La página que buscas no existe o ha sido movida. Explora los recursos de la Red desde los accesos rápidos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" /> Ir al inicio
          </Link>
          <Link href="/repositorio" className="btn-outline">
            Explorar recursos
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {[
            { href: '/repositorio', icon: BookOpen, label: 'Repositorio' },
            { href: '/comunidad', icon: Users, label: 'Comunidad' },
            { href: '/formacion', icon: GraduationCap, label: 'Formación' },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-sm font-medium text-neutral-600 hover:text-primary-700">
              <Icon className="w-5 h-5 text-primary-600" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
