'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Mail, ExternalLink, Globe, Users, Briefcase, Star,
  Calendar, MapPin, Award, MessageCircle
} from 'lucide-react';
import { entities } from '@/data/entities';

export default function EntityProfilePage() {
  const { id } = useParams<{ id: string }>();
  const entity = entities.find((e) => e.id === id);

  if (!entity) {
    return (
      <div className="container-main py-20 text-center">
        <Users className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-neutral-700 mb-2">Entidad no encontrada</h1>
        <Link href="/comunidad" className="btn-outline mt-4 text-sm py-2 px-5 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Volver a la comunidad
        </Link>
      </div>
    );
  }

  const relatedEntities = entities
    .filter((e) => e.id !== entity.id && (e.sector === entity.sector || e.country === entity.country))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-primary-700 py-12">
        <div className="container-main">
          <Link href="/comunidad" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver a la comunidad
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl flex-shrink-0">
              {entity.countryFlag}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge bg-white/15 text-white border-white/20">{entity.sector}</span>
                {entity.mentorAvailable && (
                  <span className="badge bg-accent-500/20 text-accent-300 border-accent-400/30">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Entidad mentora
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{entity.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{entity.country}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Desde {entity.foundedYear}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{entity.teamSize} personas</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{entity.projectsCount} proyectos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-600" /> Sobre la entidad
              </h2>
              <p className="text-neutral-600 leading-relaxed">{entity.description}</p>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-600" /> Áreas de expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {entity.expertise.map((skill) => (
                  <span key={skill} className="px-3.5 py-2 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentor info */}
            {entity.mentorAvailable && (
              <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent-600 fill-current" />
                  </div>
                  <h2 className="text-lg font-bold text-accent-800">Esta entidad es mentora</h2>
                </div>
                <p className="text-accent-700 text-sm leading-relaxed mb-4">
                  {entity.name} ofrece sesiones de mentoring a otras organizaciones de la Red. Comparte su experiencia
                  en {entity.expertise.slice(0, 2).join(' y ')} con entidades que quieran crecer.
                </p>
                <Link href="/mentoring" className="btn-accent text-sm py-2.5 inline-flex">
                  Solicitar mentoring
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact card */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
              <h3 className="text-base font-bold text-neutral-800 mb-4">Contacto</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${entity.contactEmail}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Mail className="w-4 h-4 text-primary-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-sm font-medium text-neutral-800 truncate">{entity.contactEmail}</p>
                  </div>
                </a>
                <a
                  href={entity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <ExternalLink className="w-4 h-4 text-primary-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">Web</p>
                    <p className="text-sm font-medium text-neutral-800 truncate">{entity.website}</p>
                  </div>
                </a>
              </div>
              <a href={`mailto:${entity.contactEmail}`} className="btn-primary w-full mt-4 text-sm py-2.5">
                <Mail className="w-4 h-4" /> Enviar mensaje
              </a>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
              <h3 className="text-base font-bold text-neutral-800 mb-4">Datos de la entidad</h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'País', value: `${entity.countryFlag} ${entity.country}` },
                  { icon: Briefcase, label: 'Sector', value: entity.sector },
                  { icon: Calendar, label: 'Fundación', value: entity.foundedYear.toString() },
                  { icon: Users, label: 'Equipo', value: `${entity.teamSize} personas` },
                  { icon: Award, label: 'Proyectos', value: `${entity.projectsCount} completados` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="text-xs text-neutral-500 w-20 flex-shrink-0">{label}</span>
                    <span className="text-sm font-medium text-neutral-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Foro CTA */}
            <Link
              href="/foro"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-all group"
            >
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">Debate en el foro</p>
                <p className="text-xs text-neutral-500">Participa en conversaciones de la Red</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-neutral-300 rotate-180 ml-auto group-hover:text-primary-500 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Related entities */}
        {relatedEntities.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-neutral-800 mb-5">Entidades relacionadas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedEntities.map((e) => (
                <Link key={e.id} href={`/comunidad/${e.id}`} className="bg-white rounded-xl border border-neutral-100 shadow-card p-4 flex items-center gap-3 hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                  <span className="text-2xl">{e.countryFlag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors truncate">{e.name}</p>
                    <p className="text-xs text-neutral-500">{e.country} · {e.sector}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
