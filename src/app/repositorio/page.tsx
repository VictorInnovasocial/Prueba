'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard';
import SearchBar from '@/components/SearchBar';
import {
  resources,
  ResourceCategory,
  categoryColors,
  categoryDescriptions,
} from '@/data/resources';

const categories: ResourceCategory[] = [
  'Herramientas',
  'Manuales',
  'Buenas Prácticas',
  'Financiación',
  'Formación',
];

const sortOptions = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'popular', label: 'Más descargados' },
  { value: 'az', label: 'A-Z' },
];

export default function RepositorioPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'Todos'>('Todos');
  const [sortBy, setSortBy] = useState('recent');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = resources;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.organization.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'Todos') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (showFeaturedOnly) {
      result = result.filter((r) => r.featured);
    }

    if (sortBy === 'recent') {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'es'));
    }

    return result;
  }, [search, selectedCategory, sortBy, showFeaturedOnly]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: resources.length };
    categories.forEach((cat) => {
      counts[cat] = resources.filter((r) => r.category === cat).length;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('Todos');
    setShowFeaturedOnly(false);
    setSortBy('recent');
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'Todos' ||
    showFeaturedOnly ||
    sortBy !== 'recent';

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-primary-700 py-14">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <BookOpen className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Repositorio de Conocimiento</h1>
              <p className="text-white/70 mt-1">
                {resources.length} recursos disponibles para el Tercer Sector
              </p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Encuentra herramientas, manuales, buenas prácticas y oportunidades de financiación
            curadas y verificadas por expertos del sector social internacional.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
        <div className="container-main py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Buscar por título, autor, etiqueta..."
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-base pl-4 pr-10 py-3 appearance-none cursor-pointer text-sm w-48"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Featured Toggle */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                  showFeaturedOnly
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-accent-300 hover:text-accent-600'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Destacados
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

      <div className="container-main py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Category Filter */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-5 sticky top-36">
              <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categorías
              </h2>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === 'Todos'
                      ? 'bg-primary-700 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-700'
                  }`}
                >
                  <span>Todas las categorías</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      selectedCategory === 'Todos'
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {categoryCounts.Todos}
                  </span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedCategory === cat
                        ? 'bg-primary-700 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-700'
                    }`}
                  >
                    <div>
                      <span>{cat}</span>
                      <p
                        className={`text-xs mt-0.5 leading-tight ${
                          selectedCategory === cat ? 'text-white/70' : 'text-neutral-400'
                        }`}
                      >
                        {categoryDescriptions[cat]}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2 ${
                        selectedCategory === cat
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                {filtered.length === 0
                  ? 'No se encontraron recursos'
                  : `Mostrando ${filtered.length} recurso${filtered.length !== 1 ? 's' : ''}`}
                {selectedCategory !== 'Todos' && (
                  <span className="text-primary-600 font-medium"> en {selectedCategory}</span>
                )}
              </p>
            </div>

            {/* Resource Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
                {filtered.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
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
                  No encontramos recursos que coincidan con tu búsqueda.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
