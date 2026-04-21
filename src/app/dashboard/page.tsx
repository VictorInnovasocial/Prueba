'use client';

import Link from 'next/link';
import {
  BookOpen,
  Users,
  GraduationCap,
  Handshake,
  Star,
  ArrowRight,
  Calendar,
  FileText,
  Globe,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Briefcase,
  Award,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { resources } from '@/data/resources';
import { entities } from '@/data/entities';
import { courses } from '@/data/courses';
import ProtectedRoute from '@/components/ProtectedRoute';

const quickLinks = [
  { href: '/repositorio', icon: BookOpen, label: 'Repositorio', desc: 'Herramientas y manuales', color: 'bg-primary-50 text-primary-700 border-primary-100' },
  { href: '/formacion', icon: GraduationCap, label: 'Formación', desc: 'Cursos y talleres', color: 'bg-accent-50 text-accent-600 border-accent-100' },
  { href: '/comunidad', icon: Users, label: 'Comunidad', desc: 'Red de entidades', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { href: '/propuestas', icon: Handshake, label: 'Propuestas', desc: 'Proyectos conjuntos', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { href: '/mentoring', icon: Star, label: 'Mentoring', desc: 'Sesiones de mentoría', color: 'bg-rose-50 text-rose-700 border-rose-100' },
];

const notifications = [
  { id: 1, text: 'Nueva propuesta publicada: Erasmus+ KA2 sobre inserción laboral', time: 'Hace 2 horas', icon: Handshake, color: 'text-purple-600 bg-purple-50' },
  { id: 2, text: 'Fundación Bosque Vivo se ha unido a la Red', time: 'Hace 1 día', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
  { id: 3, text: 'Nuevo recurso disponible: Convocatorias de Financiación Q3 2024', time: 'Hace 2 días', icon: FileText, color: 'text-primary-600 bg-primary-50' },
  { id: 4, text: 'Curso destacado: Internacionalización de proyectos sociales', time: 'Hace 3 días', icon: GraduationCap, color: 'text-accent-600 bg-accent-50' },
];

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const recentResources = resources.filter((r) => r.featured).slice(0, 3);
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 2);
  const mentorEntities = entities.filter((e) => e.mentorAvailable).slice(0, 3);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const roleLabel = user?.role === 'admin' ? 'Administrador' : user?.role === 'mentor' ? 'Entidad Mentora' : 'Miembro';
  const roleColor = user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : user?.role === 'mentor' ? 'bg-accent-100 text-accent-700' : 'bg-primary-100 text-primary-700';

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-700 py-10">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
                <Globe className="w-7 h-7 text-accent-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Bienvenida/o de nuevo,</p>
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/70 text-sm">{user?.organization}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${roleColor}`}>
                    {roleLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configuración</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-10 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Recursos disponibles', value: resources.length, icon: BookOpen, color: 'text-primary-700', bg: 'bg-primary-50' },
            { label: 'Formaciones activas', value: courses.length, icon: GraduationCap, color: 'text-accent-600', bg: 'bg-accent-50' },
            { label: 'Entidades en la Red', value: entities.length, icon: Users, color: 'text-emerald-700', bg: 'bg-emerald-50' },
            { label: 'Mentoras disponibles', value: mentorEntities.length, icon: Award, color: 'text-purple-700', bg: 'bg-purple-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-neutral-100 shadow-card p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick access */}
        <div>
          <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            Acceso rápido
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-white hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 text-center group`}
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${link.color}`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors">{link.label}</p>
                  <p className="text-xs text-neutral-400">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notifications */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary-600" />
                Actividad reciente
              </h2>
              <span className="text-xs text-neutral-400">{notifications.length} novedades</span>
            </div>
            <div className="bg-white rounded-xl border border-neutral-100 shadow-card divide-y divide-neutral-50">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-neutral-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}>
                    <n.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700 leading-snug">{n.text}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming mentoring */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Mentoras activas
              </h2>
              <Link href="/mentoring" className="text-xs font-medium text-primary-700 hover:underline">Ver todas</Link>
            </div>
            <div className="space-y-3">
              {mentorEntities.map((entity) => (
                <div key={entity.id} className="bg-white rounded-xl border border-neutral-100 shadow-card p-4 flex items-center gap-3">
                  <span className="text-2xl">{entity.countryFlag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">{entity.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{entity.sector}</p>
                  </div>
                  <Link
                    href="/mentoring"
                    className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-primary-50 text-primary-700 font-medium rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    Contactar
                  </Link>
                </div>
              ))}
              <Link
                href="/mentoring"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-neutral-200 text-sm text-neutral-500 hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                Ver programa de mentoring
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent resources */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-600" />
              Recursos destacados
            </h2>
            <Link href="/repositorio" className="text-xs font-medium text-primary-700 hover:underline flex items-center gap-1">
              Ver repositorio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentResources.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-neutral-100 shadow-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full border border-primary-100">{r.category}</span>
                  <span className="text-xs text-neutral-400">{r.type}</span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-800 leading-snug mb-1 line-clamp-2">{r.title}</h3>
                <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">{r.organization}</span>
                  <a href={r.downloadUrl} className="text-xs font-medium text-primary-700 hover:underline flex items-center gap-1">
                    Descargar <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-600" />
              Formaciones recomendadas
            </h2>
            <Link href="/formacion" className="text-xs font-medium text-primary-700 hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featuredCourses.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-neutral-100 shadow-card p-5 flex gap-4 hover:shadow-card-hover transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-accent-600 mb-1">{c.area}</p>
                  <h3 className="text-sm font-semibold text-neutral-800 leading-snug line-clamp-2 mb-2">{c.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>{c.duration}</span>
                    <span>·</span>
                    <span>{c.level}</span>
                    <span>·</span>
                    <span>{c.format}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
