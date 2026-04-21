export interface Entity {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  sector: string;
  description: string;
  expertise: string[];
  contactEmail: string;
  website: string;
  mentorAvailable: boolean;
  foundedYear: number;
  teamSize: string;
  projectsCount: number;
}

export const entities: Entity[] = [
  {
    id: '1',
    name: 'Fundación Raíces Solidarias',
    country: 'España',
    countryFlag: '🇪🇸',
    sector: 'Inclusión Social',
    description:
      'Organización dedicada a la promoción de la inclusión social y laboral de colectivos en riesgo de exclusión. Desarrollamos programas de formación profesional, orientación laboral y acompañamiento psicosocial en colaboración con empresas y administraciones públicas.',
    expertise: ['Inclusión laboral', 'Formación profesional', 'Acompañamiento social', 'Empleo'],
    contactEmail: 'info@raicessolidarias.org',
    website: 'https://raicessolidarias.org',
    mentorAvailable: true,
    foundedYear: 2008,
    teamSize: '25-50',
    projectsCount: 18,
  },
  {
    id: '2',
    name: 'Asociación Agua para Todos',
    country: 'México',
    countryFlag: '🇲🇽',
    sector: 'Medio Ambiente y Agua',
    description:
      'Trabajamos para garantizar el acceso al agua potable y el saneamiento básico en comunidades rurales e indígenas de México y Centroamérica. Implementamos tecnologías sostenibles de bajo costo y formamos a comunidades para la gestión autónoma de sus sistemas hídricos.',
    expertise: ['WASH', 'Agua y saneamiento', 'Comunidades rurales', 'Tecnología apropiada'],
    contactEmail: 'contacto@aguaparatodos.mx',
    website: 'https://aguaparatodos.mx',
    mentorAvailable: true,
    foundedYear: 2003,
    teamSize: '10-25',
    projectsCount: 34,
  },
  {
    id: '3',
    name: 'Red Educativa Futuro Posible',
    country: 'Colombia',
    countryFlag: '🇨🇴',
    sector: 'Educación',
    description:
      'Promovemos el acceso a educación de calidad en zonas de postconflicto y territorios vulnerables de Colombia. Nuestro modelo pedagógico integra tecnología, arte y valores de paz para transformar comunidades a través de la educación formal y no formal.',
    expertise: ['Educación en emergencias', 'Postconflicto', 'Pedagogía crítica', 'Tecnología educativa'],
    contactEmail: 'red@futuroposible.edu.co',
    website: 'https://futuroposible.edu.co',
    mentorAvailable: false,
    foundedYear: 2012,
    teamSize: '50-100',
    projectsCount: 27,
  },
  {
    id: '4',
    name: 'Organización para la Salud Comunitaria',
    country: 'Perú',
    countryFlag: '🇵🇪',
    sector: 'Salud',
    description:
      'Fortalecemos los sistemas de salud comunitaria en regiones amazónicas y andinas del Perú. Capacitamos promotores de salud locales, implementamos teleconsulta médica en zonas remotas y desarrollamos programas de salud materna e infantil con enfoque intercultural.',
    expertise: ['Salud primaria', 'Salud intercultural', 'Telemedicina', 'Salud materna'],
    contactEmail: 'info@oscperu.org',
    website: 'https://oscperu.org',
    mentorAvailable: true,
    foundedYear: 1999,
    teamSize: '25-50',
    projectsCount: 41,
  },
  {
    id: '5',
    name: 'Instituto de Derechos Humanos Mediterráneo',
    country: 'Italia',
    countryFlag: '🇮🇹',
    sector: 'Derechos Humanos',
    description:
      'Defensa y promoción de los derechos humanos en el contexto mediterráneo, con especial atención a migrantes, refugiados y minorías. Realizamos investigación, incidencia política y litigio estratégico a nivel nacional e internacional.',
    expertise: ['Derechos humanos', 'Migración y asilo', 'Litigio estratégico', 'Incidencia política'],
    contactEmail: 'info@idhm.it',
    website: 'https://idhm.it',
    mentorAvailable: true,
    foundedYear: 1995,
    teamSize: '10-25',
    projectsCount: 56,
  },
  {
    id: '6',
    name: 'Centro de Agroecología Sustentable',
    country: 'Brasil',
    countryFlag: '🇧🇷',
    sector: 'Desarrollo Rural',
    description:
      'Promovemos la transición agroecológica y la soberanía alimentaria en el nordeste brasileño. Apoyamos a agricultores familiares con formación técnica, acceso a mercados locales y certificación orgánica participativa.',
    expertise: ['Agroecología', 'Soberanía alimentaria', 'Agricultura familiar', 'Mercados locales'],
    contactEmail: 'contato@agroecosustentavel.org.br',
    website: 'https://agroecosustentavel.org.br',
    mentorAvailable: false,
    foundedYear: 2007,
    teamSize: '10-25',
    projectsCount: 22,
  },
  {
    id: '7',
    name: 'Plataforma Digital para el Cambio Social',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    sector: 'Innovación Social',
    description:
      'Desarrollamos soluciones tecnológicas de código abierto para ONGs y movimientos sociales. Creamos herramientas digitales accesibles para gestión de organizaciones, movilización ciudadana y transparencia institucional.',
    expertise: ['Tecnología cívica', 'Software libre', 'Transformación digital', 'Participación ciudadana'],
    contactEmail: 'hola@plataformacambio.org.ar',
    website: 'https://plataformacambio.org.ar',
    mentorAvailable: true,
    foundedYear: 2015,
    teamSize: '10-25',
    projectsCount: 15,
  },
  {
    id: '8',
    name: 'Asociación de Mujeres Emprendedoras de África Occidental',
    country: 'Senegal',
    countryFlag: '🇸🇳',
    sector: 'Género y Empoderamiento',
    description:
      'Empoderamos económicamente a mujeres emprendedoras en zonas rurales y periurbanas de Senegal, Guinea y Mali. Ofrecemos microcréditos, formación en gestión empresarial y acceso a redes de comercio regional con enfoque de género.',
    expertise: ['Empoderamiento femenino', 'Microfinanzas', 'Emprendimiento', 'Género y desarrollo'],
    contactEmail: 'contact@mefao.org',
    website: 'https://mefao.org',
    mentorAvailable: false,
    foundedYear: 2010,
    teamSize: '25-50',
    projectsCount: 29,
  },
  {
    id: '9',
    name: 'Fundación Bosque Vivo',
    country: 'Costa Rica',
    countryFlag: '🇨🇷',
    sector: 'Medio Ambiente',
    description:
      'Trabajamos en la conservación de ecosistemas forestales y la restauración de corredores biológicos en Centroamérica. Combinamos ciencia de la conservación con el conocimiento de comunidades indígenas y campesinas guardianas del bosque.',
    expertise: ['Conservación de bosques', 'Biodiversidad', 'Cambio climático', 'Conocimiento indígena'],
    contactEmail: 'info@bosquevivo.cr',
    website: 'https://bosquevivo.cr',
    mentorAvailable: true,
    foundedYear: 2001,
    teamSize: '25-50',
    projectsCount: 38,
  },
  {
    id: '10',
    name: 'Alianza para la Transparencia y Buen Gobierno',
    country: 'Portugal',
    countryFlag: '🇵🇹',
    sector: 'Gobernanza y Democracia',
    description:
      'Promovemos la transparencia institucional, la participación ciudadana y la lucha contra la corrupción en países lusófonos y de habla hispana. Desarrollamos observatorios ciudadanos, herramientas de datos abiertos y programas de educación cívica.',
    expertise: ['Transparencia', 'Anticorrupción', 'Datos abiertos', 'Educación cívica'],
    contactEmail: 'geral@aliancatransparencia.pt',
    website: 'https://aliancatransparencia.pt',
    mentorAvailable: true,
    foundedYear: 2013,
    teamSize: '10-25',
    projectsCount: 20,
  },
];

export const sectors = [
  'Todos los sectores',
  'Inclusión Social',
  'Medio Ambiente y Agua',
  'Educación',
  'Salud',
  'Derechos Humanos',
  'Desarrollo Rural',
  'Innovación Social',
  'Género y Empoderamiento',
  'Medio Ambiente',
  'Gobernanza y Democracia',
];

export const countries = [
  'Todos los países',
  'Argentina',
  'Brasil',
  'Colombia',
  'Costa Rica',
  'España',
  'Italia',
  'México',
  'Perú',
  'Portugal',
  'Senegal',
];
