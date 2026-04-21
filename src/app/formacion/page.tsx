'use client';

import { useState, useMemo } from 'react';
import { GraduationCap, Clock, Users, BookOpen, Star, Filter, X, Play, FileText, Video, Mic } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { courses, courseAreas, areaColors } from '@/data/courses';
import type { CourseArea } from '@/data/courses';

const formatIcons: Record<string, React.ReactNode> = {
  Vídeo: <Video className="w-3.5 h-3.5" />,
  Documento: <FileText className="w-3.5 h-3.5" />,
  Taller: <Users className="w-3.5 h-3.5" />,
  Webinar: <Mic className="w-3.5 h-3.5" />,
};

const levelColors: Record<string, string> = {
  Básico: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermedio: 'bg-accent-50 text-accent-600 border-accent-200',
  Avanzado: 'bg-red-50 text-red-700 border-red-200',
};

export default function FormacionPage() {
  const [search, setSearch] = useState('');
  const [activeArea, setActiveArea] = useState<CourseArea | 'Todas'>('Todas');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesArea = activeArea === 'Todas' || c.area === activeArea;
      const matchesFeatured = !featuredOnly || c.featured;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.instructor.toLowerCase().includes(q);
      return matchesArea && matchesFeatured && matchesSearch;
    });
  }, [search, activeArea, featuredOnly]);

  const hasFilters = search.trim() !== '' || activeArea !== 'Todas' || featuredOnly;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-700 py-14">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Espacio de Formación</h1>
              <p className="text-white/70 mt-1">{courses.length} recursos formativos disponibles</p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Fórmate en internacionalización de proyectos, metodologías de intervención con personas desempleadas
            y buenas prácticas del Tercer Sector. Conocimiento especializado para organizaciones sociales.
          </p>

          {/* Area highlights */}
          <div className="flex flex-wrap gap-3 mt-8">
            {courseAreas.map((area) => (
              <button
                key={area}
                onClick={() => setActiveArea(activeArea === area ? 'Todas' : area)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeArea === area
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search bar sticky */}
      <section className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
        <div className="container-main py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 max-w-lg">
              <SearchBar value={search} onChange={setSearch} placeholder="Buscar formaciones, temáticas, instructores..." />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                  featuredOnly
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-accent-300 hover:text-accent-600'
                }`}
              >
                <Star className="w-4 h-4" />
                Destacadas
              </button>
              {hasFilters && (
                <button
                  onClick={() => { setSearch(''); setActiveArea('Todas'); setFeaturedOnly(false); }}
                  className="flex items-center gap-1.5 px-3 py-3 rounded-lg text-sm font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-neutral-200 hover:border-red-200 transition-all"
                >
                  <X className="w-4 h-4" />
                  Limpiar
                </button>
              )}
              <span className="text-sm text-neutral-500 font-medium ml-1">
                {filtered.length} formación{filtered.length !== 1 ? 'es' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-100 shadow-card">
            <GraduationCap className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">No se encontraron formaciones</h3>
            <p className="text-neutral-400 text-sm">Prueba con otros términos o cambia los filtros.</p>
            <button
              onClick={() => { setSearch(''); setActiveArea('Todas'); setFeaturedOnly(false); }}
              className="btn-outline mt-6 text-sm py-2 px-4"
            >
              Ver todas las formaciones
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <article key={course.id} className="card group flex flex-col">
                <div className="p-5 pb-3 flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`badge border text-xs ${areaColors[course.area]}`}>
                      {course.area}
                    </span>
                    {course.featured && (
                      <span className="badge bg-accent-50 text-accent-600 border border-accent-200">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Destacada
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-snug mb-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className={`badge border text-xs ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1">
                      {formatIcons[course.format]}
                      {course.format}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-neutral-100">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-neutral-700 truncate">{course.instructor}</p>
                      <p className="text-xs text-neutral-400 truncate">{course.organization}</p>
                    </div>
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-700 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 transition-colors flex-shrink-0">
                      <Play className="w-3 h-3" />
                      Acceder
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
