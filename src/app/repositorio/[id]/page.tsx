'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Download, ExternalLink, FileText, FileSpreadsheet,
  Presentation, Video, BookOpen, Tag, Calendar, User, Building,
  Share2, Clock
} from 'lucide-react';
import { resources, categoryColors } from '@/data/resources';

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-5 h-5" />,
  DOC: <BookOpen className="w-5 h-5" />,
  XLS: <FileSpreadsheet className="w-5 h-5" />,
  PPT: <Presentation className="w-5 h-5" />,
  VIDEO: <Video className="w-5 h-5" />,
  ENLACE: <ExternalLink className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  PDF: 'bg-red-50 text-red-600 border-red-200',
  DOC: 'bg-blue-50 text-blue-600 border-blue-200',
  XLS: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  PPT: 'bg-orange-50 text-orange-600 border-orange-200',
  VIDEO: 'bg-purple-50 text-purple-600 border-purple-200',
  ENLACE: 'bg-cyan-50 text-cyan-600 border-cyan-200',
};

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="container-main py-20 text-center">
        <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-neutral-700 mb-2">Recurso no encontrado</h1>
        <Link href="/repositorio" className="btn-outline mt-4 text-sm py-2 px-5 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Volver al repositorio
        </Link>
      </div>
    );
  }

  const related = resources
    .filter((r) => r.id !== resource.id && r.category === resource.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="bg-primary-700 py-12">
        <div className="container-main">
          <Link href="/repositorio" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver al repositorio
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={categoryColors[resource.category]}>{resource.category}</span>
            <span className={`badge border ${typeColors[resource.type]}`}>
              <span className="flex items-center gap-1">{typeIcons[resource.type]} {resource.type}</span>
            </span>
            {resource.featured && (
              <span className="badge bg-accent-500/20 text-accent-300 border-accent-400/30">Destacado</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug max-w-3xl">
            {resource.title}
          </h1>
        </div>
      </section>

      <div className="container-main py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-3">Descripción</h2>
              <p className="text-neutral-600 leading-relaxed">{resource.description}</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary-600" /> Etiquetas
              </h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Download card */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 ${typeColors[resource.type]}`}>
                {typeIcons[resource.type]}
              </div>
              <h3 className="text-base font-bold text-neutral-800 mb-1">{resource.type === 'VIDEO' || resource.type === 'ENLACE' ? 'Acceder al recurso' : 'Descargar recurso'}</h3>
              <p className="text-xs text-neutral-500 mb-4">
                {resource.downloads.toLocaleString('es-ES')} descargas
              </p>
              <a
                href={resource.downloadUrl}
                className="btn-primary w-full text-sm py-3"
              >
                {resource.type === 'VIDEO' || resource.type === 'ENLACE'
                  ? <><ExternalLink className="w-4 h-4" /> Ver recurso</>
                  : <><Download className="w-4 h-4" /> Descargar</>
                }
              </a>
              <button className="btn-ghost w-full mt-2 text-sm border border-neutral-200">
                <Share2 className="w-4 h-4" /> Compartir
              </button>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5">
              <h3 className="text-base font-bold text-neutral-800 mb-4">Información</h3>
              <div className="space-y-3">
                {[
                  { icon: User, label: 'Autor/a', value: resource.author },
                  { icon: Building, label: 'Organización', value: resource.organization },
                  { icon: Calendar, label: 'Publicado', value: new Date(resource.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  { icon: BookOpen, label: 'Categoría', value: resource.category },
                  { icon: Clock, label: 'Descargas', value: resource.downloads.toLocaleString('es-ES') },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500">{label}</p>
                      <p className="text-sm font-medium text-neutral-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-neutral-800 mb-5">Recursos relacionados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/repositorio/${r.id}`} className="bg-white rounded-xl border border-neutral-100 shadow-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                  <span className={`badge text-xs mb-2 inline-block ${categoryColors[r.category]}`}>{r.category}</span>
                  <h3 className="text-sm font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-snug line-clamp-2 mb-1">{r.title}</h3>
                  <p className="text-xs text-neutral-400">{r.organization}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
