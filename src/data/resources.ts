export type ResourceCategory =
  | 'Herramientas'
  | 'Manuales'
  | 'Buenas Prácticas'
  | 'Financiación'
  | 'Formación';

export type ResourceType = 'PDF' | 'DOC' | 'XLS' | 'PPT' | 'VIDEO' | 'ENLACE';

export interface Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  author: string;
  organization: string;
  date: string;
  tags: string[];
  downloadUrl: string;
  type: ResourceType;
  featured: boolean;
  downloads: number;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Guía Completa de Gobernanza para ONGs',
    category: 'Manuales',
    description:
      'Manual exhaustivo que abarca los principios fundamentales de gobernanza organizacional para entidades del tercer sector. Incluye modelos de estatutos, marcos de rendición de cuentas y mejores prácticas internacionales de gestión.',
    author: 'Ana García López',
    organization: 'Fundación Transparencia Global',
    date: '2024-03-15',
    tags: ['gobernanza', 'gestión', 'estatutos', 'rendición de cuentas', 'junta directiva'],
    downloadUrl: '#',
    type: 'PDF',
    featured: true,
    downloads: 1247,
  },
  {
    id: '2',
    title: 'Plantilla de Planificación Estratégica 2024-2027',
    category: 'Herramientas',
    description:
      'Herramienta práctica en formato editable para diseñar planes estratégicos trienales. Contiene matriz FODA, indicadores de impacto, marco lógico de proyectos y cuadro de mando para seguimiento de objetivos.',
    author: 'Carlos Mendoza Ruiz',
    organization: 'Centro de Innovación Social',
    date: '2024-01-20',
    tags: ['planificación', 'estrategia', 'indicadores', 'marco lógico', 'FODA'],
    downloadUrl: '#',
    type: 'XLS',
    featured: true,
    downloads: 892,
  },
  {
    id: '3',
    title: 'Movilización de Fondos Europeos para el Tercer Sector',
    category: 'Financiación',
    description:
      'Guía detallada sobre los principales instrumentos de financiación de la Unión Europea accesibles para ONGs y asociaciones. Incluye calendario de convocatorias 2024-2025, requisitos de elegibilidad y consejos para la elaboración de propuestas exitosas.',
    author: 'Isabel Fernández Castro',
    organization: 'Red Europa Solidaria',
    date: '2024-02-08',
    tags: ['financiación', 'fondos europeos', 'subvenciones', 'UE', 'convocatorias'],
    downloadUrl: '#',
    type: 'PDF',
    featured: true,
    downloads: 2103,
  },
  {
    id: '4',
    title: 'Comunicación Digital Efectiva para ONGs',
    category: 'Formación',
    description:
      'Programa formativo completo sobre estrategias de comunicación digital para organizaciones sin ánimo de lucro. Cubre redes sociales, email marketing, storytelling de impacto y medición de audiencias con herramientas gratuitas.',
    author: 'Roberto Silva Vargas',
    organization: 'Escuela de Comunicación Social',
    date: '2024-04-10',
    tags: ['comunicación', 'redes sociales', 'digital', 'marketing', 'storytelling'],
    downloadUrl: '#',
    type: 'PPT',
    featured: false,
    downloads: 674,
  },
  {
    id: '5',
    title: 'Modelo de Evaluación de Impacto Social',
    category: 'Buenas Prácticas',
    description:
      'Framework metodológico para medir y comunicar el impacto social de programas y proyectos. Basado en la metodología SROI (Retorno Social de la Inversión) adaptada para contextos latinoamericanos y europeos.',
    author: 'María Elena Rodríguez',
    organization: 'Instituto de Evaluación Social',
    date: '2023-11-22',
    tags: ['evaluación', 'impacto', 'SROI', 'metodología', 'medición'],
    downloadUrl: '#',
    type: 'PDF',
    featured: true,
    downloads: 1589,
  },
  {
    id: '6',
    title: 'Kit de Herramientas para Voluntariado Corporativo',
    category: 'Herramientas',
    description:
      'Colección de recursos para gestionar programas de voluntariado corporativo: formularios de inscripción, protocolos de coordinación, formatos de informe de actividades y encuestas de satisfacción para participantes.',
    author: 'Luis Alberto Ponce',
    organization: 'Alianza Empresa y Sociedad',
    date: '2024-05-03',
    tags: ['voluntariado', 'empresas', 'RSE', 'gestión', 'programas'],
    downloadUrl: '#',
    type: 'DOC',
    featured: false,
    downloads: 445,
  },
  {
    id: '7',
    title: 'Mejores Prácticas en Cooperación Internacional',
    category: 'Buenas Prácticas',
    description:
      'Recopilación de 20 casos de éxito en proyectos de cooperación al desarrollo con impacto demostrado. Analiza factores de éxito, lecciones aprendidas y recomendaciones para la transferencia de modelos entre países.',
    author: 'Sofia Martínez Ibarra',
    organization: 'Coordinadora de ONGD',
    date: '2023-09-14',
    tags: ['cooperación', 'desarrollo', 'casos de éxito', 'lecciones aprendidas', 'internacional'],
    downloadUrl: '#',
    type: 'PDF',
    featured: false,
    downloads: 987,
  },
  {
    id: '8',
    title: 'Gestión Financiera Transparente para Asociaciones',
    category: 'Manuales',
    description:
      'Manual práctico sobre contabilidad, presupuestación y control financiero para organizaciones pequeñas y medianas. Incluye plantillas de presupuesto, modelos de balance y guía para auditorías externas.',
    author: 'Pedro Alonso García',
    organization: 'Observatorio del Tercer Sector',
    date: '2024-01-05',
    tags: ['finanzas', 'contabilidad', 'presupuesto', 'transparencia', 'auditoría'],
    downloadUrl: '#',
    type: 'PDF',
    featured: false,
    downloads: 1134,
  },
  {
    id: '9',
    title: 'Convocatorias de Financiación Q3 2024',
    category: 'Financiación',
    description:
      'Listado actualizado de convocatorias de subvenciones y fondos disponibles para el tercer sector durante el tercer trimestre de 2024. Incluye organismos nacionales, regionales e internacionales con fechas límite y montos disponibles.',
    author: 'Equipo RedCoopera',
    organization: 'RedCoopera',
    date: '2024-06-01',
    tags: ['convocatorias', 'subvenciones', 'financiación', '2024', 'oportunidades'],
    downloadUrl: '#',
    type: 'DOC',
    featured: true,
    downloads: 3241,
  },
  {
    id: '10',
    title: 'Curso: Liderazgo Transformador en Organizaciones Sociales',
    category: 'Formación',
    description:
      'Programa de desarrollo de competencias para líderes del sector social. Aborda liderazgo adaptativo, gestión del cambio, inteligencia emocional en equipos multiculturales y toma de decisiones éticas.',
    author: 'Dr. Jorge Ramírez Castillo',
    organization: 'Universidad de Cooperación Internacional',
    date: '2024-03-28',
    tags: ['liderazgo', 'formación', 'competencias', 'gestión de equipos', 'cambio organizacional'],
    downloadUrl: '#',
    type: 'VIDEO',
    featured: false,
    downloads: 756,
  },
  {
    id: '11',
    title: 'Protocolo de Protección de Datos para ONGs (RGPD)',
    category: 'Herramientas',
    description:
      'Guía de implementación del Reglamento General de Protección de Datos para organizaciones del tercer sector. Incluye plantillas de política de privacidad, registros de actividades de tratamiento y formularios de consentimiento.',
    author: 'Laura Sánchez Méndez',
    organization: 'Clínica Jurídica Social',
    date: '2023-12-10',
    tags: ['RGPD', 'protección de datos', 'privacidad', 'compliance', 'legal'],
    downloadUrl: '#',
    type: 'DOC',
    featured: false,
    downloads: 823,
  },
  {
    id: '12',
    title: 'Alianzas Estratégicas: Cómo Construir Redes de Impacto',
    category: 'Buenas Prácticas',
    description:
      'Metodología para identificar, establecer y gestionar alianzas estratégicas entre organizaciones sociales, sector público y empresas. Incluye marcos de negociación, modelos de convenios de colaboración y métricas de valor compartido.',
    author: 'Carmen López Vidal',
    organization: 'Plataforma de ONG de Acción Social',
    date: '2024-02-19',
    tags: ['alianzas', 'redes', 'colaboración', 'partenariados', 'impacto colectivo'],
    downloadUrl: '#',
    type: 'PDF',
    featured: false,
    downloads: 612,
  },
];

export const categoryColors: Record<ResourceCategory, string> = {
  Herramientas: 'badge-primary',
  Manuales: 'badge-accent',
  'Buenas Prácticas': 'badge-green',
  Financiación: 'badge-purple',
  Formación: 'badge-rose',
};

export const categoryDescriptions: Record<ResourceCategory, string> = {
  Herramientas: 'Plantillas, formularios y recursos prácticos',
  Manuales: 'Guías completas y documentación técnica',
  'Buenas Prácticas': 'Casos de éxito y metodologías probadas',
  Financiación: 'Convocatorias, fondos y guías de financiación',
  Formación: 'Cursos, talleres y materiales educativos',
};
