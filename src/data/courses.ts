export interface Course {
  id: string;
  title: string;
  area: CourseArea;
  description: string;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  format: 'Vídeo' | 'Documento' | 'Taller' | 'Webinar';
  instructor: string;
  organization: string;
  tags: string[];
  featured: boolean;
}

export type CourseArea =
  | 'Internacionalización'
  | 'Metodologías de Intervención'
  | 'Buenas Prácticas'
  | 'Financiación Europea'
  | 'Gestión de Proyectos';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Cómo internacionalizar tu proyecto social: de la idea a la propuesta europea',
    area: 'Internacionalización',
    description:
      'Guía completa para transformar un proyecto local en una iniciativa con proyección europea. Cubre la identificación de socios, la adaptación metodológica a contextos internacionales y la presentación ante organismos europeos de financiación.',
    duration: '4 horas',
    level: 'Intermedio',
    format: 'Vídeo',
    instructor: 'Isabel Fernández Castro',
    organization: 'Red Europa Solidaria',
    tags: ['internacionalización', 'propuestas europeas', 'socios', 'financiación'],
    featured: true,
  },
  {
    id: '2',
    title: 'Metodologías de orientación e inserción laboral para personas desempleadas',
    area: 'Metodologías de Intervención',
    description:
      'Marco metodológico para el diseño e implementación de programas de orientación laboral con enfoque en empleabilidad real. Incluye técnicas de diagnóstico de competencias, itinerarios individualizados, trabajo con empresas y evaluación de resultados.',
    duration: '6 horas',
    level: 'Intermedio',
    format: 'Taller',
    instructor: 'Dra. Marta Sánchez López',
    organization: 'Fundación Emplea+',
    tags: ['inserción laboral', 'desempleo', 'orientación', 'itinerarios', 'empleabilidad'],
    featured: true,
  },
  {
    id: '3',
    title: 'Buenas prácticas en proyectos de cooperación al desarrollo: 20 casos de referencia',
    area: 'Buenas Prácticas',
    description:
      'Análisis detallado de 20 proyectos de cooperación internacional que han demostrado impacto sostenible. Se examinan factores de éxito, errores comunes, transferibilidad de modelos y lecciones aprendidas aplicables a nuevos proyectos.',
    duration: '3 horas',
    level: 'Básico',
    format: 'Documento',
    instructor: 'Equipo RedCoopera',
    organization: 'RedCoopera',
    tags: ['buenas prácticas', 'cooperación', 'casos de éxito', 'transferibilidad'],
    featured: true,
  },
  {
    id: '4',
    title: 'Erasmus+ para el Tercer Sector: oportunidades y claves para una candidatura exitosa',
    area: 'Financiación Europea',
    description:
      'Formación práctica sobre el programa Erasmus+ en sus líneas KA1, KA2 y KA3. Aprende a identificar la acción adecuada para tu proyecto, a estructurar un consorcio internacional y a redactar formularios de candidatura que destacan ante los evaluadores.',
    duration: '5 horas',
    level: 'Intermedio',
    format: 'Webinar',
    instructor: 'Roberto Pérez Martín',
    organization: 'Agencia Nacional Erasmus',
    tags: ['Erasmus+', 'KA2', 'consorcio', 'candidatura', 'movilidad'],
    featured: false,
  },
  {
    id: '5',
    title: 'Atención integral a personas en situación de desempleo de larga duración',
    area: 'Metodologías de Intervención',
    description:
      'Aborda el fenómeno del desempleo estructural con una perspectiva psicosocial y comunitaria. Presenta herramientas de intervención grupal e individual, trabajo con familias, gestión emocional y coordinación con servicios públicos de empleo.',
    duration: '8 horas',
    level: 'Avanzado',
    format: 'Taller',
    instructor: 'Cristina Morales Rueda',
    organization: 'Plataforma de ONG de Acción Social',
    tags: ['desempleo larga duración', 'intervención psicosocial', 'empleabilidad', 'colectivos vulnerables'],
    featured: false,
  },
  {
    id: '6',
    title: 'Gestión del ciclo del proyecto en cooperación internacional (PCM)',
    area: 'Gestión de Proyectos',
    description:
      'Formación en la metodología Project Cycle Management aplicada a proyectos de cooperación. Cubre todas las fases: identificación, formulación, ejecución, seguimiento y evaluación, con énfasis en herramientas como el marco lógico y el Plan Operativo.',
    duration: '7 horas',
    level: 'Intermedio',
    format: 'Vídeo',
    instructor: 'Jorge Alonso Vega',
    organization: 'CONGDE',
    tags: ['PCM', 'marco lógico', 'ciclo de proyecto', 'evaluación', 'cooperación'],
    featured: true,
  },
  {
    id: '7',
    title: 'Transferencia de buenas prácticas entre organizaciones: metodología y herramientas',
    area: 'Buenas Prácticas',
    description:
      'Guía metodológica para documentar, adaptar y transferir modelos de intervención exitosos entre organizaciones y contextos diferentes. Incluye herramientas de sistematización, fichas de buenas prácticas y protocolos de adaptación.',
    duration: '3 horas',
    level: 'Básico',
    format: 'Documento',
    instructor: 'Lucía Navarro Soto',
    organization: 'Centro de Innovación Social',
    tags: ['transferencia', 'sistematización', 'replicabilidad', 'documentación'],
    featured: false,
  },
  {
    id: '8',
    title: 'Redes internacionales en el Tercer Sector: cómo construirlas y aprovecharlas',
    area: 'Internacionalización',
    description:
      'Estrategias para identificar, establecer y gestionar redes de trabajo con organizaciones internacionales. Trata la comunicación multicultural, la gobernanza de redes, los instrumentos de colaboración y el aprendizaje entre pares a nivel global.',
    duration: '4 horas',
    level: 'Intermedio',
    format: 'Webinar',
    instructor: 'Ana García López',
    organization: 'Fundación Raíces Solidarias',
    tags: ['redes internacionales', 'alianzas', 'colaboración', 'multicultural'],
    featured: false,
  },
];

export const areaColors: Record<CourseArea, string> = {
  'Internacionalización': 'bg-primary-50 text-primary-700 border-primary-200',
  'Metodologías de Intervención': 'bg-accent-50 text-accent-600 border-accent-200',
  'Buenas Prácticas': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Financiación Europea': 'bg-purple-50 text-purple-700 border-purple-200',
  'Gestión de Proyectos': 'bg-cyan-50 text-cyan-700 border-cyan-200',
};

export const courseAreas: CourseArea[] = [
  'Internacionalización',
  'Metodologías de Intervención',
  'Buenas Prácticas',
  'Financiación Europea',
  'Gestión de Proyectos',
];
