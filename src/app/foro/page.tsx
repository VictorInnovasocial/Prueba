'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MessageCircle, Pin, Plus, X, Send, CheckCircle, ChevronRight, Clock } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { threads, forumCategories, categoryColors } from '@/data/forum';
import type { ForumCategory } from '@/data/forum';
import { useAuth } from '@/context/AuthContext';

export default function ForoPage() {
  const { isAuthenticated, user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ForumCategory | 'Todas'>('Todas');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: '', category: '' as ForumCategory | '', content: '' });

  const filtered = useMemo(() => {
    return threads.filter((t) => {
      const matchesCategory = activeCategory === 'Todas' || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q || t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q) || t.author.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [search, activeCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-700 py-14">
        <div className="container-main">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <MessageCircle className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">Foro de la Red</h1>
                  <p className="text-white/70 mt-1">{threads.length} debates activos</p>
                </div>
              </div>
              <p className="text-white/70 max-w-2xl leading-relaxed">
                Espacio de intercambio y comunicación entre entidades. Comparte experiencias, resuelve dudas
                y construye conocimiento colectivo con la comunidad RedCoopera.
              </p>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => { setShowForm(true); setSubmitted(false); }}
                className="btn-accent flex-shrink-0 hidden sm:inline-flex"
              >
                <Plus className="w-4 h-4" />
                Nuevo debate
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveCategory('Todas')}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === 'Todas'
                  ? 'bg-accent-500 text-white border-accent-500'
                  : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
              }`}
            >
              Todas
            </button>
            {forumCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search sticky */}
      <section className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
        <div className="container-main py-4">
          <div className="flex gap-3 items-center">
            <div className="flex-1 max-w-lg">
              <SearchBar value={search} onChange={setSearch} placeholder="Buscar debates, temas, autores..." />
            </div>
            <span className="text-sm text-neutral-500 font-medium">{filtered.length} debate{filtered.length !== 1 ? 's' : ''}</span>
            {isAuthenticated && (
              <button
                onClick={() => { setShowForm(true); setSubmitted(false); }}
                className="btn-primary text-sm py-3 sm:hidden"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="container-main py-8">
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-between gap-4">
            <p className="text-sm text-primary-800">
              <span className="font-semibold">¿Formas parte de la Red?</span> Inicia sesión para participar en los debates y abrir nuevos hilos.
            </p>
            <Link href="/login" className="btn-primary text-sm py-2 px-4 flex-shrink-0">
              Acceder
            </Link>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-100 shadow-card">
            <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">No hay debates para este filtro</h3>
            <button onClick={() => { setSearch(''); setActiveCategory('Todas'); }} className="btn-outline mt-4 text-sm py-2 px-4">
              Ver todos los debates
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((thread) => (
              <Link
                key={thread.id}
                href={`/foro/${thread.id}`}
                className="block bg-white rounded-xl border border-neutral-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-[48px] text-center">
                    <div className="w-11 h-11 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-neutral-400" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">{thread.replies.length}</span>
                    <span className="text-xs text-neutral-400">resp.</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {thread.pinned && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-200">
                          <Pin className="w-3 h-3" /> Fijado
                        </span>
                      )}
                      <span className={`badge border text-xs ${categoryColors[thread.category]}`}>
                        {thread.category}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-snug mb-2 line-clamp-2">
                      {thread.title}
                    </h3>

                    <p className="text-sm text-neutral-500 line-clamp-2 mb-3 leading-relaxed">
                      {thread.content}
                    </p>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <span>{thread.countryFlag}</span>
                        <span className="font-medium text-neutral-600">{thread.author}</span>
                        <span>·</span>
                        <span>{thread.organization}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(thread.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New thread modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-800">Abrir nuevo debate</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">¡Debate publicado!</h3>
                  <p className="text-neutral-500 mb-6">Tu hilo ya es visible para las entidades de la Red.</p>
                  <button onClick={() => setShowForm(false)} className="btn-primary px-8">Cerrar</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-sm text-neutral-600 mb-2">
                    <span>{user?.name}</span>
                    <span>·</span>
                    <span className="text-neutral-400">{user?.organization}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Título del debate *</label>
                    <input
                      required
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Ej: ¿Cómo gestionáis los informes intermedios en proyectos Erasmus+?"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Categoría *</label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as ForumCategory })}
                      className="input-base"
                    >
                      <option value="">Seleccionar categoría...</option>
                      {forumCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Mensaje *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Explica tu pregunta, experiencia o tema con el mayor detalle posible para facilitar respuestas útiles..."
                      className="input-base resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1 border border-neutral-200">Cancelar</button>
                    <button type="submit" className="btn-primary flex-1">
                      <Send className="w-4 h-4" />
                      Publicar debate
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
