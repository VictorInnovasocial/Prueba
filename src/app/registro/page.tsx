'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Mail, Lock, Eye, EyeOff, User, Building2, MapPin,
  Briefcase, FileText, CheckCircle, ChevronRight, ChevronLeft
} from 'lucide-react';

const sectors = [
  'Inclusión Social', 'Educación', 'Salud', 'Medio Ambiente', 'Derechos Humanos',
  'Cooperación al Desarrollo', 'Género y Empoderamiento', 'Desarrollo Rural',
  'Innovación Social', 'Gobernanza y Democracia', 'Otro',
];

const countries = [
  'España', 'México', 'Colombia', 'Argentina', 'Perú', 'Chile', 'Ecuador', 'Bolivia',
  'Venezuela', 'Costa Rica', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panamá',
  'Cuba', 'República Dominicana', 'Brasil', 'Portugal', 'Italia', 'Francia', 'Alemania',
  'Países Bajos', 'Bélgica', 'Suecia', 'Noruega', 'Suiza', 'Reino Unido', 'Senegal',
  'Marruecos', 'Kenya', 'Etiopía', 'Otro',
];

const teamSizes = ['1-5', '6-10', '10-25', '25-50', '50-100', 'Más de 100'];

interface FormData {
  // Paso 1 — Cuenta
  email: string;
  password: string;
  confirmPassword: string;
  // Paso 2 — Responsable
  contactName: string;
  contactRole: string;
  phone: string;
  // Paso 3 — Entidad
  entityName: string;
  sector: string;
  country: string;
  city: string;
  foundedYear: string;
  teamSize: string;
  website: string;
  // Paso 4 — Descripción
  description: string;
  expertise: string;
  internationalExperience: string;
  mentorAvailable: boolean;
  acceptTerms: boolean;
}

const STEPS = [
  { label: 'Cuenta', icon: Mail },
  { label: 'Responsable', icon: User },
  { label: 'Entidad', icon: Building2 },
  { label: 'Perfil', icon: FileText },
];

const empty: FormData = {
  email: '', password: '', confirmPassword: '',
  contactName: '', contactRole: '', phone: '',
  entityName: '', sector: '', country: '', city: '', foundedYear: '', teamSize: '', website: '',
  description: '', expertise: '', internationalExperience: '', mentorAvailable: false, acceptTerms: false,
};

export default function RegistroPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.email) newErrors.email = 'El correo es obligatorio';
      if (!form.password || form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (step === 1) {
      if (!form.contactName) newErrors.contactName = 'El nombre es obligatorio';
      if (!form.contactRole) newErrors.contactRole = 'El cargo es obligatorio';
    }
    if (step === 2) {
      if (!form.entityName) newErrors.entityName = 'El nombre de la entidad es obligatorio';
      if (!form.sector) newErrors.sector = 'Selecciona un sector';
      if (!form.country) newErrors.country = 'Selecciona un país';
    }
    if (step === 3) {
      if (!form.description || form.description.length < 50) newErrors.description = 'Descripción mínima de 50 caracteres';
      if (!form.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-3">¡Solicitud enviada!</h1>
          <p className="text-neutral-500 leading-relaxed mb-8">
            Hemos recibido la solicitud de registro de <strong>{form.entityName}</strong>.
            El equipo de RedCoopera la revisará y recibirás una respuesta en <strong>2-3 días hábiles</strong> en{' '}
            <strong>{form.email}</strong>.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const field = (id: keyof FormData) => ({
    value: form[id] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(id, e.target.value),
    className: `input-base ${errors[id] ? 'border-red-400 focus:ring-red-300' : ''}`,
  });

  const err = (id: keyof FormData) =>
    errors[id] ? <p className="text-xs text-red-600 mt-1">{errors[id]}</p> : null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary-700">
            <Globe className="w-7 h-7 text-accent-500" />
            RedCoopera
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800 mt-5">Registrar mi entidad</h1>
          <p className="text-neutral-500 text-sm mt-1">Únete a la Red Internacional del Tercer Sector</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <div className={`flex flex-col items-center gap-1 ${i <= step ? '' : 'opacity-40'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  i < step ? 'bg-emerald-500 text-white' :
                  i === step ? 'bg-primary-700 text-white shadow-md' :
                  'bg-neutral-200 text-neutral-500'
                }`}>
                  {i < step ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-primary-700' : 'text-neutral-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? 'bg-emerald-400' : 'bg-neutral-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-neutral-100 p-7">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
            {/* Step 0: Account */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-800 mb-5">Datos de acceso</h2>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Correo electrónico *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type="email" required autoComplete="email" placeholder="tu@organizacion.org" {...field('email')} className={`input-base pl-10 ${errors.email ? 'border-red-400' : ''}`} />
                  </div>
                  {err('email')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Contraseña *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type={showPassword ? 'text' : 'password'} required placeholder="Mínimo 6 caracteres" {...field('password')} className={`input-base pl-10 pr-10 ${errors.password ? 'border-red-400' : ''}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {err('password')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Repetir contraseña *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type="password" required placeholder="••••••••" {...field('confirmPassword')} className={`input-base pl-10 ${errors.confirmPassword ? 'border-red-400' : ''}`} />
                  </div>
                  {err('confirmPassword')}
                </div>
              </div>
            )}

            {/* Step 1: Contact person */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-800 mb-5">Persona de contacto</h2>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nombre y apellidos *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type="text" required placeholder="María García López" {...field('contactName')} className={`input-base pl-10 ${errors.contactName ? 'border-red-400' : ''}`} />
                  </div>
                  {err('contactName')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Cargo en la entidad *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type="text" required placeholder="Directora de Proyectos" {...field('contactRole')} className={`input-base pl-10 ${errors.contactRole ? 'border-red-400' : ''}`} />
                  </div>
                  {err('contactRole')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Teléfono de contacto</label>
                  <input type="tel" placeholder="+34 600 000 000" {...field('phone')} />
                </div>
              </div>
            )}

            {/* Step 2: Entity */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-800 mb-5">Datos de la entidad</h2>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nombre de la entidad *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input type="text" required placeholder="Fundación / Asociación / ONG..." {...field('entityName')} className={`input-base pl-10 ${errors.entityName ? 'border-red-400' : ''}`} />
                  </div>
                  {err('entityName')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">País *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none z-10" />
                      <select required {...field('country')} className={`input-base pl-9 appearance-none ${errors.country ? 'border-red-400' : ''}`}>
                        <option value="">Seleccionar...</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {err('country')}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ciudad</label>
                    <input type="text" placeholder="Madrid" {...field('city')} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Sector de actividad *</label>
                  <select required {...field('sector')} className={`input-base appearance-none ${errors.sector ? 'border-red-400' : ''}`}>
                    <option value="">Seleccionar sector...</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {err('sector')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Año de fundación</label>
                    <input type="number" min="1900" max={new Date().getFullYear()} placeholder="2010" {...field('foundedYear')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tamaño del equipo</label>
                    <select {...field('teamSize')} className="input-base appearance-none">
                      <option value="">Seleccionar...</option>
                      {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Página web</label>
                  <input type="url" placeholder="https://www.tuorganizacion.org" {...field('website')} />
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-neutral-800 mb-5">Perfil de la entidad</h2>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Descripción de la entidad * <span className="text-neutral-400 font-normal">(mín. 50 caracteres)</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe la misión, actividades principales y el impacto de tu organización..."
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    className={`input-base resize-none ${errors.description ? 'border-red-400' : ''}`}
                  />
                  <div className="flex justify-between mt-1">
                    {err('description')}
                    <span className={`text-xs ml-auto ${form.description.length < 50 ? 'text-red-400' : 'text-neutral-400'}`}>
                      {form.description.length}/50
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Áreas de expertise</label>
                  <input type="text" placeholder="Inserción laboral, Formación profesional, Empleo juvenil..." {...field('expertise')} />
                  <p className="text-xs text-neutral-400 mt-1">Separadas por comas</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Experiencia internacional</label>
                  <textarea
                    rows={2}
                    placeholder="Describe brevemente tu experiencia en proyectos internacionales, si la tienes..."
                    value={form.internationalExperience}
                    onChange={(e) => update('internationalExperience', e.target.value)}
                    className="input-base resize-none"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer p-3 bg-accent-50 rounded-xl border border-accent-200 hover:bg-accent-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.mentorAvailable}
                    onChange={(e) => update('mentorAvailable', e.target.checked)}
                    className="mt-0.5 accent-accent-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-accent-800">Quiero ser entidad mentora</p>
                    <p className="text-xs text-accent-600">Compartiré experiencia con otras organizaciones de la Red</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(e) => update('acceptTerms', e.target.checked)}
                    className="mt-0.5 accent-primary-700"
                  />
                  <p className="text-sm text-neutral-600">
                    Acepto los{' '}
                    <a href="#" className="font-semibold text-primary-700 hover:underline">términos de uso</a>
                    {' '}y la{' '}
                    <a href="#" className="font-semibold text-primary-700 hover:underline">política de privacidad</a>
                    {' '}de RedCoopera *
                  </p>
                </label>
                {err('acceptTerms')}
              </div>
            )}

            {/* Navigation */}
            <div className={`flex gap-3 mt-7 pt-5 border-t border-neutral-100 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
              {step > 0 && (
                <button type="button" onClick={prev} className="btn-ghost border border-neutral-200 px-5">
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
              )}
              <button type="submit" className="btn-primary px-6 ml-auto">
                {step < 3 ? (<>Siguiente <ChevronRight className="w-4 h-4" /></>) : 'Enviar solicitud'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-5">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-primary-700 hover:text-primary-800">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
