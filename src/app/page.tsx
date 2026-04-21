import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Star,
  TrendingUp,
  Shield,
  Lightbulb,
  Download,
  Calendar,
  FileText,
} from 'lucide-react';
import { resources } from '@/data/resources';

const stats = [
  { label: 'Entidades Miembro', value: '50+', icon: Users, color: 'text-primary-700', bg: 'bg-primary-50' },
  { label: 'Recursos Compartidos', value: '200+', icon: BookOpen, color: 'text-accent-600', bg: 'bg-accent-50' },
  { label: 'Países Representados', value: '30+', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Proyectos Activos', value: '120+', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const features = [
  {
    icon: BookOpen,
    title: 'Repositorio de Conocimiento',
    description:
      'Accede a herramientas, manuales, buenas prácticas y recursos de financiación curados y organizados por categorías. Todo lo que necesita tu organización en un solo lugar.',
    href: '/repositorio',
    cta: 'Explorar repositorio',
    color: 'bg-primary-700',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-700',
  },
  {
    icon: Users,
    title: 'Espacio Comunitario',
    description:
      'Conecta con más de 50 organizaciones de todo el mundo. Comparte experiencias, establece alianzas y colabora en proyectos de cooperación internacional de alto impacto.',
    href: '/comunidad',
    cta: 'Ver comunidad',
    color: 'bg-accent-500',
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  {
    icon: Star,
    title: 'Programa de Mentoring',
    description:
      'Accede a mentores expertos del sector social con décadas de experiencia. Recibe orientación personalizada para fortalecer tu organización y maximizar tu impacto.',
    href: '/mentoring',
    cta: 'Solicitar mentoring',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Confianza y Transparencia',
    description: 'Todos los recursos han sido verificados por expertos del sector.',
  },
  {
    icon: Globe,
    title: 'Perspectiva Global',
    description: 'Conocimiento e innovación de organizaciones en más de 30 países.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación Social',
    description: 'Mejores prácticas y metodologías en constante actualización.',
  },
];

const featuredResources = resources.filter((r) => r.featured).slice(0, 3);

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 30%, #E67E22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #2563A0 0%, transparent 60%)',
          }}
        />

        <div className="container-main relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Globe className="w-4 h-4 text-accent-400" />
              Red Internacional del Tercer Sector
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Cooperación,{' '}
              <span className="text-accent-400">Conocimiento</span>{' '}
              e Impacto Global
            </h1>

            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-2xl">
              RedCoopera es el ecosistema digital donde las organizaciones del Tercer Sector
              comparten recursos, construyen alianzas y aprenden juntas para multiplicar su
              impacto en el mundo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/repositorio" className="btn-accent text-base px-7 py-3.5">
                Explorar recursos
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/comunidad"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-200 text-base"
              >
                Conocer la comunidad
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-neutral-100 shadow-sm">
        <div className="container-main py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-neutral-500 font-medium leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title text-4xl">Todo lo que necesita tu organización</h2>
            <p className="section-subtitle">
              Una plataforma integral diseñada para las necesidades reales del Tercer Sector Internacional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card p-7 flex flex-col hover:border-primary-200 group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-200`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed flex-1 mb-6">{feature.description}</p>
                <Link
                  href={feature.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${feature.textColor} hover:gap-3 transition-all duration-200`}
                >
                  {feature.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title">Recursos Destacados</h2>
              <p className="section-subtitle !mb-0">
                Materiales más valorados por la comunidad
              </p>
            </div>
            <Link
              href="/repositorio"
              className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors text-sm whitespace-nowrap"
            >
              Ver todos los recursos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="card group overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-primary">{resource.category}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {formatDownloads(resource.downloads)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(resource.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <FileText className="w-3.5 h-3.5" />
                      {resource.type}
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href="/repositorio"
                    className="btn-primary w-full text-sm py-2 justify-center"
                  >
                    Ver en repositorio
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">¿Por qué RedCoopera?</h2>
            <p className="section-subtitle">
              Construida por y para el sector social, con los más altos estándares de calidad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 mb-2">{value.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />
        <div className="container-main relative text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para ampliar tu impacto?
          </h2>
          <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto">
            Únete a más de 50 organizaciones que ya forman parte de la red y accede a
            recursos, conexiones y oportunidades de colaboración.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/comunidad" className="btn-accent text-base px-8 py-3.5">
              Unirse a la comunidad
              <Users className="w-5 h-5" />
            </Link>
            <Link
              href="/repositorio"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-200 text-base"
            >
              Explorar repositorio
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
