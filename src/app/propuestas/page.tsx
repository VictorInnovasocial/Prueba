'use client';

import { useState, useMemo } from 'react';
import { Handshake, Plus, Globe, Clock, Users, Tag, X, Send, CheckCircle } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

interface Proposal {
  id: string;
  title: string;
  entity: string;
  country: string;
  countryFlag: string;
  area: string;
  description: string;
  lookingFor: string[];
  deadline: string;
  contact: string;
  createdAt: string;
}

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: '1',
    title: 'Proyecto Erasmus+ KA2 sobre inserción laboral de jóvenes en riesgo de exclusión',
    entity: 'Fundación Raíces Solidarias',
    country: 'España',
    countryFlag: '🇪🇸',
    area: 'Inserción laboral',
    description:
      'Buscamos socios europeos para conformar un consorcio Erasmus+ KA2 centrado en el diseño e intercambio de metodologías innovadoras de inserción laboral para jóvenes en situación de vulnerabilidad. El proyecto incluirá movilidades de personal, producción de recursos y un evento multiplicador.',
    lookingFor: ['ONG de Alemania o Francia', 'Entidad del ámbito educativo', 'Organismo de formación profesional'],
    deadline: '2025-03-01',
    contact: 'proyectos@raicessolidarias.org',
    createdAt: '2024-06-10',
  },
  {
    id: '2',
    title: 'Alianza para programa de emprendimiento social en Latinoamérica',
    entity: 'Plataforma Digital para el Cambio Social',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    area: 'Emprendimiento e innovación',
    description:
      'Desarrollamos un programa de formación en emprendimiento social para colectivos vulnerables en Argentina, Colombia y México. Buscamos organizaciones con experiencia en emprendimiento, acceso a microfinanzas o ecosistemas de impacto para construir una propuesta de financiación conjunta.',
    lookingFor: ['Entidad con experiencia en microfinanzas', 'Aceleradora de impacto social', 'ONG con presencia en México o Colombia'],
    deadline: '2025-04-15',
    contact: 'hola@plataformacambio.org.ar',
    createdAt: '2024-06-05',
  },
  {
    id: '3',
    title: 'Red de intercambio de buenas prácticas en salud comunitaria para zonas rurales',
    entity: 'Organización para la Salud Comunitaria',
    country: 'Perú',
    countryFlag: '🇵🇪',
    area: 'Salud comunitaria',
    description:
      'Impulsamos la creación de una red de aprendizaje entre organizaciones que trabajan en salud primaria en entornos rurales. El objetivo es sistematizar y transferir modelos de atención comunitaria con enfoque intercultural. Buscamos socios para formular una propuesta ante la OPS/OMS.',
    lookingFor: ['ONG de salud en África o Asia', 'Universidad con investigación en salud rural', 'Organismo de cooperación bilateral'],
    deadline: '2025-05-30',
    contact: 'info@oscperu.org',
    createdAt: '2024-05-28',
  },
  {
    id: '4',
    title: 'Consorcio para proyecto de educación ambiental transfronterizo',
    entity: 'Fundación Bosque Vivo',
    country: 'Costa Rica',
    countryFlag: '🇨🇷',
    area: 'Educación ambiental',
    description:
      'Buscamos socios de Panamá, Colombia y Nicaragua para desarrollar un programa de educación ambiental dirigido a jóvenes en ecosistemas de frontera. La propuesta se presentará ante el Fondo Verde para el Clima y el programa UE-EUROCLIMA+.',
    lookingFor: ['ONG ambiental de Panamá o Nicaragua', 'Institución educativa con enfoque ambiental', 'Entidad con acceso a comunidades indígenas'],
    deadline: '2025-02-28',
    contact: 'info@bosquevivo.cr',
    createdAt: '2024-06-01',
  },
];

const areaOptions = [
  'Todas las áreas',
  'Inserción laboral',
  'Emprendimiento e innovación',
  'Salud comunitaria',
  'Educación ambiental',
  'Cooperación al desarrollo',
  'Derechos humanos',
  'Género e igualdad',
  'Tecnología social',
];

export default function PropuestasPage() {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [search, setSearch] = useState('');
  const [activeArea, setActiveArea] = useState('Todas las áreas');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    entity: '',
    country: '',
    area: '',
    description: '',
    lookingFor: '',
    deadline: '',
    contact: '',
  });

  const filtered = useMemo(() => {
    return proposals.filter((p) => {
      const matchesArea = activeArea === 'Todas las áreas' || p.area === activeArea;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.entity.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q);
      return matchesArea && matchesSearch;
    });
  }, [proposals, search, activeArea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal: Proposal = {
      id: String(proposals.length + 1),
      title: form.title,
      entity: form.entity,
      country: form.country,
      countryFlag: '🌍',
      area: form.area || 'Cooperación al desarrollo',
      description: form.description,
      lookingFor: form.lookingFor.split('\n').filter(Boolean),
      deadline: form.deadline,
      contact: form.contact,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProposals([newProposal, ...proposals]);
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
                  <Handshake className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">Propuestas Conjuntas</h1>
                  <p className="text-white/70 mt-1">Encuentra socios para proyectos internacionales</p>
                </div>
              </div>
              <p className="text-white/70 max-w-2xl leading-relaxed">
                Publica tu idea de proyecto y busca entidades colaboradoras, o únete a propuestas
                de otras organizaciones para construir consorcios de mayor impacto.
              </p>
            </div>
            <button
              onClick={() => { setShowForm(true); setSubmitted(false); }}
              className="btn-accent flex-shrink-0 hidden sm:inline-flex"
            >
              <Plus className="w-4 h-4" />
              Publicar propuesta
            </button>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
        <div className="container-main py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 max-w-lg">
              <SearchBar value={search} onChange={setSearch} placeholder="Buscar propuestas por temática, entidad..." />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={activeArea}
                onChange={(e) => setActiveArea(e.target.value)}
                className="input-base py-3 text-sm appearance-none pr-8 min-w-44"
              >
                {areaOptions.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="text-sm text-neutral-500 font-medium">{filtered.length} propuesta{filtered.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-10">
        <div className="flex justify-end mb-6 sm:hidden">
          <button onClick={() => { setShowForm(true); setSubmitted(false); }} className="btn-accent text-sm">
            <Plus className="w-4 h-4" />
            Publicar propuesta
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-100 shadow-card">
            <Handshake className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">No hay propuestas para este filtro</h3>
            <button onClick={() => { setSearch(''); setActiveArea('Todas las áreas'); }} className="btn-outline mt-4 text-sm py-2 px-4">
              Ver todas
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((proposal) => (
              <article key={proposal.id} className="card p-6">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <span className="text-2xl">{proposal.countryFlag}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-800 leading-snug mb-1">
                          {proposal.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
                          <span className="font-medium text-neutral-700">{proposal.entity}</span>
                          <span>·</span>
                          <span>{proposal.country}</span>
                          <span>·</span>
                          <span className="badge bg-primary-50 text-primary-700 border border-primary-200">{proposal.area}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {proposal.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-neutral-700 mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary-500" />
                        Buscamos:
                      </p>
                      <ul className="space-y-1">
                        {proposal.lookingFor.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                            <Tag className="w-3.5 h-3.5 text-accent-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        Plazo: <strong className="text-neutral-700">
                          {new Date(proposal.deadline).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-neutral-400" />
                        Publicada el {new Date(proposal.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-3 items-start md:items-end justify-start md:justify-between flex-shrink-0">
                    <a
                      href={`mailto:${proposal.contact}?subject=Interés en propuesta: ${proposal.title}`}
                      className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Contactar
                    </a>
                    <p className="text-xs text-neutral-400 text-right">{proposal.contact}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* New proposal modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-4">
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-800">Publicar propuesta de colaboración</h2>
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
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">¡Propuesta publicada!</h3>
                  <p className="text-neutral-500 mb-6">Tu propuesta ya es visible para las entidades de la Red.</p>
                  <button onClick={() => setShowForm(false)} className="btn-primary px-8">Cerrar</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Título de la propuesta *</label>
                    <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ej: Proyecto Erasmus+ KA2 sobre juventud en riesgo..." className="input-base" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Tu organización *</label>
                      <input required type="text" value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} placeholder="Nombre de tu ONG" className="input-base" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">País *</label>
                      <input required type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="España" className="input-base" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Área temática</label>
                      <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="input-base">
                        <option value="">Seleccionar...</option>
                        {areaOptions.slice(1).map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Plazo de respuesta *</label>
                      <input required type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-base" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Descripción del proyecto *</label>
                    <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe el proyecto, sus objetivos y el tipo de colaboración que buscas..." className="input-base resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Perfiles de socios buscados (uno por línea)</label>
                    <textarea rows={3} value={form.lookingFor} onChange={(e) => setForm({ ...form, lookingFor: e.target.value })} placeholder="ONG de Alemania o Francia&#10;Entidad del ámbito educativo&#10;Organismo de formación profesional" className="input-base resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email de contacto *</label>
                    <input required type="email" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="proyectos@tuong.org" className="input-base" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1 border border-neutral-200">Cancelar</button>
                    <button type="submit" className="btn-primary flex-1">
                      <Send className="w-4 h-4" />
                      Publicar propuesta
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
