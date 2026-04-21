'use client';

import { useState } from 'react';
import {
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  X,
  Send,
  Calendar,
  Award,
  Lightbulb,
  Target,
  MessageCircle,
  Globe,
  Briefcase,
} from 'lucide-react';
import { entities } from '@/data/entities';

const mentors = entities.filter((e) => e.mentorAvailable);

interface MentoringModalProps {
  mentorName: string;
  mentorOrg: string;
  onClose: () => void;
}

function MentoringModal({ mentorName, mentorOrg, onClose }: MentoringModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    country: '',
    topic: '',
    message: '',
    modality: 'videollamada',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-xl font-bold text-neutral-800">Solicitar Mentoring</h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Con {mentorName} de {mentorOrg}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">
                ¡Solicitud enviada!
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Tu solicitud de mentoring ha sido enviada a <strong>{mentorName}</strong>.
                Recibirás una respuesta en los próximos 3-5 días hábiles.
              </p>
              <button onClick={onClose} className="btn-primary px-8">
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="María García"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@ong.org"
                    className="input-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Organización *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Nombre de tu ONG"
                  className="input-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="España"
                  className="input-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Área de apoyo solicitada *
                </label>
                <select
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="input-base"
                >
                  <option value="">Selecciona un área...</option>
                  <option value="gobernanza">Gobernanza y estructura organizacional</option>
                  <option value="financiacion">Estrategia de financiación</option>
                  <option value="comunicacion">Comunicación e incidencia</option>
                  <option value="evaluacion">Medición de impacto</option>
                  <option value="alianzas">Alianzas estratégicas</option>
                  <option value="digital">Transformación digital</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Modalidad preferida
                </label>
                <div className="flex gap-3">
                  {['videollamada', 'presencial', 'asíncrono'].map((mod) => (
                    <label key={mod} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="modality"
                        value={mod}
                        checked={formData.modality === mod}
                        onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                        className="text-primary-700"
                      />
                      <span className="text-sm text-neutral-700 capitalize">{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Describe tu situación y qué esperas del mentoring *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos brevemente el contexto de tu organización y qué tipo de orientación necesitas..."
                  rows={4}
                  className="input-base resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-ghost flex-1 border border-neutral-200">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1">
                  <Send className="w-4 h-4" />
                  Enviar solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const howItWorks = [
  {
    step: '01',
    icon: Target,
    title: 'Identifica tu necesidad',
    description:
      'Define el área en la que tu organización necesita orientación: gobernanza, financiación, comunicación, impacto u otra.',
    color: 'text-primary-700',
    bg: 'bg-primary-50',
  },
  {
    step: '02',
    icon: Users,
    title: 'Elige tu mentor',
    description:
      'Explora los perfiles de mentores disponibles y selecciona quien mejor se ajuste a tu área de interés y contexto.',
    color: 'text-accent-600',
    bg: 'bg-accent-50',
  },
  {
    step: '03',
    icon: MessageCircle,
    title: 'Envía tu solicitud',
    description:
      'Rellena el formulario de solicitud describiendo tu situación y qué esperas obtener del proceso de mentoring.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    step: '04',
    icon: Calendar,
    title: 'Inicia el proceso',
    description:
      'Una vez aceptada tu solicitud, el mentor se pondrá en contacto contigo para planificar las sesiones.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

export default function MentoringPage() {
  const [selectedMentor, setSelectedMentor] = useState<{
    name: string;
    org: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-primary-700 py-14">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Star className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Programa de Mentoring</h1>
              <p className="text-white/70 mt-1">
                {mentors.length} mentores expertos disponibles
              </p>
            </div>
          </div>
          <p className="text-white/70 max-w-2xl leading-relaxed">
            Conecta con líderes del Tercer Sector internacional que pueden orientarte en
            áreas clave para fortalecer tu organización y ampliar su impacto.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-b border-neutral-100">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="section-title">Cómo funciona</h2>
            <p className="section-subtitle">Proceso simple y efectivo para conectar con tu mentor</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center shadow-sm`}>
                      <step.icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    <span className={`absolute -top-2 -right-2 text-xs font-bold ${step.color} bg-white border border-neutral-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm`}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-12">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Mentores Disponibles</h2>
              <p className="section-subtitle !mb-0">
                Expertos con experiencia probada en el Tercer Sector Internacional
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="card group overflow-hidden">
                <div className="p-6">
                  {/* Mentor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-3xl leading-none flex-shrink-0 shadow-sm">
                      {mentor.countryFlag}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-neutral-800 group-hover:text-primary-700 transition-colors">
                            {mentor.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="text-sm text-neutral-500">{mentor.country}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end flex-shrink-0">
                          <span className="badge badge-accent">
                            <Star className="w-3 h-3 mr-1" />
                            Mentor activo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sector */}
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-700">{mentor.sector}</span>
                    <span className="text-neutral-200">·</span>
                    <span className="text-sm text-neutral-500">Desde {mentor.foundedYear}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                    {mentor.description}
                  </p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                        Áreas de expertise
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full border border-primary-100 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4 pb-4 border-b border-neutral-100">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {mentor.projectsCount} proyectos
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Equipo de {mentor.teamSize}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() =>
                      setSelectedMentor({ name: mentor.name, org: mentor.name })
                    }
                    className="btn-primary w-full text-sm py-2.5"
                  >
                    Solicitar mentoring
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 border-t border-neutral-100">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="section-title">¿Qué puedes obtener del mentoring?</h2>
            <p className="section-subtitle">
              Aprendizaje aplicado y orientación personalizada para organizaciones del Tercer Sector
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Estrategia Organizacional',
                items: [
                  'Planificación estratégica a largo plazo',
                  'Modelos de gobernanza efectivos',
                  'Gestión del cambio organizacional',
                  'Cultura organizacional y liderazgo',
                ],
              },
              {
                icon: Target,
                title: 'Impacto y Financiación',
                items: [
                  'Estrategias de movilización de fondos',
                  'Metodologías de evaluación de impacto',
                  'Acceso a financiación internacional',
                  'Rendición de cuentas y transparencia',
                ],
              },
              {
                icon: Globe,
                title: 'Cooperación Internacional',
                items: [
                  'Construcción de alianzas estratégicas',
                  'Gestión de proyectos internacionales',
                  'Comunicación intercultural',
                  'Participación en redes globales',
                ],
              },
            ].map((benefit) => (
              <div key={benefit.title} className="card p-6">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-bold text-neutral-800 mb-3">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-500">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to become mentor */}
      <section className="py-16 bg-neutral-50">
        <div className="container-main">
          <div className="card p-10 text-center bg-gradient-to-br from-primary-700 to-primary-800 border-0">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
              <Star className="w-8 h-8 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              ¿Quieres ser mentor/a en RedCoopera?
            </h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto leading-relaxed">
              Comparte tu experiencia y conocimiento con organizaciones que lo necesitan.
              Como mentor/a, contribuyes al fortalecimiento del Tercer Sector a nivel global.
            </p>
            <a
              href="mailto:mentoring@redcoopera.org?subject=Solicitud para ser mentor en RedCoopera"
              className="btn-accent inline-flex mx-auto"
            >
              Quiero ser mentor/a
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Mentoring Modal */}
      {selectedMentor && (
        <MentoringModal
          mentorName={selectedMentor.name}
          mentorOrg={selectedMentor.org}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
}
