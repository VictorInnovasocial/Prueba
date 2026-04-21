'use client';

import { useState, useMemo } from 'react';
import { Users, Globe, Search, X, ChevronDown, Star, Filter } from 'lucide-react';
import EntityCard from '@/components/EntityCard';
import SearchBar from '@/components/SearchBar';
import { entities, sectors, countries } from '@/data/entities';

export default function ComunidadPage() {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('Todos los sectores');
  const [selectedCountry, setSelectedCountry] = useState('Todos los países');
  const [mentorsOnly, setMentorsOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = entities;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q) ||
          e.sector.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.expertise.some((ex) => ex.toLowerCase().includes(q))
      );
    }

    if (selectedSector !== 'Todos los sectores') {
      result = result.filter((e) => e.sector === selectedSector);
    }

    if (selectedCountry !== 'Todos los países') {
      result = result.filter((e) => e.country === selectedCountry);
    }

    if (mentorsOnly) {
      result = result.filter((e) => e.mentorAvailable);
    }

    return result;
  }, [search, selectedSector, selectedCountry, mentorsOnly]);

  const clearFilters = () => {
    setSearch('');
    setSelectedSector('Todos los sectores');
    setSelectedCountry('Todos los países');
    setMentorsOnly(false);
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedSector !== 'Todos los sectores' ||
    selectedCountry !== 'Todos los países' ||
    mentorsOnly;

  const mentorCount = entities.filter((e) => e.mentorAvailable).length;
  const countryCount = new Set(entities.map((e) => e.country)).size;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-700 py-14">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Users className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Espacio Comunitario</h1>
              <p className="text-white/70 mt-1">
                {entities.length} organizaciones de {countryCount} países
              </p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Conecta con organizaciones del Tercer Sector de todo el mundo. Explora perfiles,
            descubre áreas de expertise y establece colaboraciones de alto impacto.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5">
              <Users className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">
                {entities.length} organizaciones activas
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5">
              <Globe className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">
                {countryCount} países representados
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5">
              <Star className="w-4 h-4 text-accent-400" />
              <span className="text-white/90 text-sm font-medium">
                {mentorCount} mentores disponibles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
        <div className="container-main py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Buscar por nombre, país, sector..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Sector Filter */}
              <div className="relative">
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="input-base pl-4 pr-10 py-3 appearance-none cursor-pointer text-sm min-w-48"
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="input-base pl-4 pr-10 py-3 appearance-none cursor-pointer text-sm min-w-44"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Mentors Toggle */}
              <button
                onClick={() => setMentorsOnly(!mentorsOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                  mentorsOnly
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-accent-300 hover:text-accent-600'
                }`}
              >
                <Star className="w-4 h-4" />
                Solo mentores
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-3 rounded-lg text-sm font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-neutral-200 hover:border-red-200 transition-all"
                >
                  <X className="w-4 h-4" />
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-main py-8">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            {filtered.length === 0
              ? 'No se encontraron organizaciones'
              : `Mostrando ${filtered.length} organización${filtered.length !== 1 ? 'es' : ''}`}
            {selectedSector !== 'Todos los sectores' && (
              <span className="text-primary-600 font-medium"> en {selectedSector}</span>
            )}
            {selectedCountry !== 'Todos los países' && (
              <span className="text-primary-600 font-medium"> de {selectedCountry}</span>
            )}
          </p>
          {mentorsOnly && (
            <span className="badge badge-accent">
              <Star className="w-3 h-3 mr-1" />
              Filtrando mentores
            </span>
          )}
        </div>

        {/* Entity Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-300" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">
              Sin resultados
            </h3>
            <p className="text-neutral-400 mb-6">
              No encontramos organizaciones que coincidan con tus filtros.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Join CTA */}
        <div className="mt-16 card p-8 bg-gradient-to-br from-primary-700 to-primary-800 text-center border-0">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Users className="w-8 h-8 text-accent-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            ¿Tu organización no está en la red?
          </h3>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Únete a RedCoopera y conecta con cientos de organizaciones del Tercer Sector a nivel mundial.
            Es gratuito y abierto para todas las entidades sin ánimo de lucro.
          </p>
          <a
            href="mailto:info@redcoopera.org?subject=Solicitud de membresía en RedCoopera"
            className="btn-accent inline-flex mx-auto"
          >
            Solicitar membresía
          </a>
        </div>
      </div>
    </div>
  );
}
