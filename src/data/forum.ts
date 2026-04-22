export interface ForumReply {
  id: string;
  author: string;
  organization: string;
  countryFlag: string;
  content: string;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  title: string;
  category: ForumCategory;
  author: string;
  organization: string;
  countryFlag: string;
  content: string;
  replies: ForumReply[];
  createdAt: string;
  pinned?: boolean;
}

export type ForumCategory =
  | 'Internacionalización'
  | 'Financiación'
  | 'Metodologías'
  | 'Alianzas'
  | 'Herramientas digitales'
  | 'General';

export const forumCategories: ForumCategory[] = [
  'Internacionalización',
  'Financiación',
  'Metodologías',
  'Alianzas',
  'Herramientas digitales',
  'General',
];

export const categoryColors: Record<ForumCategory, string> = {
  'Internacionalización': 'bg-primary-50 text-primary-700 border-primary-200',
  'Financiación': 'bg-purple-50 text-purple-700 border-purple-200',
  'Metodologías': 'bg-accent-50 text-accent-600 border-accent-200',
  'Alianzas': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Herramientas digitales': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'General': 'bg-neutral-100 text-neutral-600 border-neutral-200',
};

export const threads: ForumThread[] = [
  {
    id: '1',
    title: '¿Qué herramientas usáis para la gestión de proyectos internacionales?',
    category: 'Herramientas digitales',
    author: 'Carlos Mendoza',
    organization: 'Centro de Innovación Social',
    countryFlag: '🇪🇸',
    content:
      'Hola a todas las entidades de la Red. Estamos en proceso de mejorar nuestra gestión de proyectos internacionales y me gustaría saber qué herramientas digitales os funcionan mejor: seguimiento de hitos, comunicación con socios internacionales, gestión documental... ¿Usáis Asana, Trello, Notion, alguna plataforma específica para el tercer sector? Cualquier experiencia es bienvenida.',
    createdAt: '2024-06-08',
    pinned: true,
    replies: [
      {
        id: 'r1',
        author: 'Ana García',
        organization: 'Fundación Raíces Solidarias',
        countryFlag: '🇪🇸',
        content: 'Nosotros usamos una combinación de Notion para documentación y planificación + Slack para comunicación diaria con el equipo y socios. Para proyectos Erasmus+, el portal de la SEPIE tiene sus propias herramientas, aunque un poco engorrosas. Lo que más nos ha funcionado es tener un "libro de proyecto" compartido en Notion con todas las partes.',
        createdAt: '2024-06-08',
      },
      {
        id: 'r2',
        author: 'Isabel Fernández',
        organization: 'Red Europa Solidaria',
        countryFlag: '🇪🇸',
        content: 'Para consorcios con muchos socios internacionales os recomiendo Basecamp, tiene una interfaz muy intuitiva y funciona bien en contextos multiculturales. También usamos Zoom con traducción automática habilitada para reuniones. Y para documentación compartida, Google Workspace es lo más universal.',
        createdAt: '2024-06-09',
      },
      {
        id: 'r3',
        author: 'Sofia Martínez',
        organization: 'Coordinadora de ONGD',
        countryFlag: '🇪🇸',
        content: 'Depende mucho del tipo de proyecto. Para proyectos de cooperación al desarrollo con socios del Sur Global, muchas veces la herramienta la dicta la agencia financiadora. AECID usa sus propias plataformas. Para proyectos UE, el Portal de Financiación y Contratación de la CE es obligatorio. Lo importante es acordar UNA herramienta con todos los socios al principio del proyecto.',
        createdAt: '2024-06-10',
      },
    ],
  },
  {
    id: '2',
    title: 'Convocatoria AMIF 2025: ¿alguien tiene experiencia presentando candidaturas?',
    category: 'Financiación',
    author: 'Isabel Fernández',
    organization: 'Instituto de Derechos Humanos Mediterráneo',
    countryFlag: '🇮🇹',
    content:
      'Estamos valorando presentar una candidatura al Fondo de Asilo, Migración e Integración (AMIF) de la UE para 2025. Es la primera vez que nos planteamos este fondo. ¿Alguna entidad de la Red tiene experiencia con AMIF? Nos interesa especialmente saber sobre los requisitos de elegibilidad para ONGs no gubernamentales, los porcentajes de cofinanciación habituales y si es necesario contar con un socio de otro Estado miembro.',
    createdAt: '2024-06-05',
    replies: [
      {
        id: 'r4',
        author: 'María Elena Rodríguez',
        organization: 'Instituto de Evaluación Social',
        countryFlag: '🇪🇸',
        content: 'Tenemos experiencia con AMIF desde 2019. El fondo tiene dos modalidades principales: convocatorias nacionales (gestionadas por cada Estado miembro a través de sus Autoridades Responsables) y convocatorias transnacionales directamente por la CE. Para las nacionales el proceso varía mucho por país. En España, la Secretaría de Estado de Migraciones gestiona las convocatorias. El porcentaje de cofinanciación suele ser del 75% EU / 25% beneficiario.',
        createdAt: '2024-06-06',
      },
      {
        id: 'r5',
        author: 'Laura Sánchez',
        organization: 'Clínica Jurídica Social',
        countryFlag: '🇪🇸',
        content: 'Para las convocatorias transnacionales sí es obligatorio el consorcio multi-país. Os recomiendo revisar el programa de trabajo AMIF 2021-2027 para entender las prioridades actuales. También hay asistencia técnica disponible a través de las organizaciones de la Red Europea de Migración (EMN) en cada país.',
        createdAt: '2024-06-07',
      },
    ],
  },
  {
    id: '3',
    title: 'Metodologías de orientación laboral adaptadas a personas migrantes — compartimos experiencias',
    category: 'Metodologías',
    author: 'Ana García',
    organization: 'Fundación Raíces Solidarias',
    countryFlag: '🇪🇸',
    content:
      'En Raíces Solidarias llevamos 10 años trabajando con personas migrantes en situación de desempleo y nos gustaría iniciar un intercambio de metodologías con otras entidades de la Red. Específicamente nos interesa: ¿cómo adaptáis los itinerarios de inserción laboral a personas con convalidación de títulos pendiente? ¿Qué herramientas usáis para el reconocimiento de competencias informales? ¿Habéis desarrollado materiales multilingüe que podáis compartir?',
    createdAt: '2024-06-01',
    replies: [
      {
        id: 'r6',
        author: 'Cristina Morales',
        organization: 'Plataforma de ONG de Acción Social',
        countryFlag: '🇪🇸',
        content: 'Para el reconocimiento de competencias informales usamos la metodología Europass CV adaptada y el portfolio de evidencias que desarrollamos junto con la Universidad Autónoma de Madrid. Lo tenemos disponible en español, inglés y árabe. Podemos compartirlo con las entidades interesadas.',
        createdAt: '2024-06-02',
      },
      {
        id: 'r7',
        author: 'Pedro Alonso',
        organization: 'Observatorio del Tercer Sector',
        countryFlag: '🇪🇸',
        content: 'Un recurso muy útil para esto es el marco de competencias DigComp de la UE en su versión para colectivos vulnerables. También la Guía de Orientación Profesional del SEPE tiene versiones adaptadas. En cuanto a convalidación de títulos, la colaboración con el NARIC (Red Nacional de Centros de Información sobre Reconocimiento Académico) puede ser un recurso valioso.',
        createdAt: '2024-06-03',
      },
    ],
  },
  {
    id: '4',
    title: 'Buscamos socios para propuesta Ciudadanos, Igualdad, Derechos y Valores (CERV)',
    category: 'Alianzas',
    author: 'Carmen López',
    organization: 'Plataforma de ONG de Acción Social',
    countryFlag: '🇪🇸',
    content:
      'Estamos preparando una propuesta para el programa CERV (Ciudadanos, Igualdad, Derechos y Valores) de la UE, específicamente para la línea de igualdad de género. El proyecto se centraría en el empoderamiento económico de mujeres en situación de vulnerabilidad en contextos urbanos. Buscamos al menos dos socios de otros Estados miembros (preferiblemente con experiencia en CERV) y un socio de país candidato. Si vuestra organización trabaja en estas temáticas y está interesada, contactadnos.',
    createdAt: '2024-05-28',
    replies: [
      {
        id: 'r8',
        author: 'Lucía Navarro',
        organization: 'Centro de Innovación Social',
        countryFlag: '🇪🇸',
        content: 'Nos interesa mucho esta propuesta. Trabajamos en empoderamiento femenino y tenemos socios en Rumanía y Bulgaria que podrían encajar como socios de países candidatos o del Este de Europa. Os escribimos por email para explorar la colaboración.',
        createdAt: '2024-05-29',
      },
    ],
  },
  {
    id: '5',
    title: '¿Cómo medís el impacto de vuestros proyectos de cooperación?',
    category: 'Internacionalización',
    author: 'Jorge Alonso',
    organization: 'CONGDE',
    countryFlag: '🇪🇸',
    content:
      'Una de las mayores dificultades en proyectos de cooperación internacional es demostrar el impacto real más allá de los indicadores de output que exigen las agencias financiadoras. ¿Qué marcos metodológicos usáis para la medición de cambio? ¿Cómo gestionáis la recogida de datos en contextos de baja conectividad o con beneficiarios de difícil acceso? ¿Habéis implementado SROI, Most Significant Change, o algún enfoque propio?',
    createdAt: '2024-05-20',
    replies: [
      {
        id: 'r9',
        author: 'María Elena Rodríguez',
        organization: 'Instituto de Evaluación Social',
        countryFlag: '🇪🇸',
        content: 'Llevamos años aplicando el marco SROI (Social Return on Investment) adaptado a contextos de cooperación. La clave es involucrar a los propios beneficiarios en la definición de indicadores, no imponer métricas desde el Norte. También usamos la metodología de la Teoría del Cambio como marco paraguas, con SROI para proyectos donde hay componente económico medible.',
        createdAt: '2024-05-21',
      },
      {
        id: 'r10',
        author: 'Sofia Martínez',
        organization: 'Coordinadora de ONGD',
        countryFlag: '🇪🇸',
        content: 'Para contextos de baja conectividad trabajamos con herramientas offline como KoBoToolbox (funciona sin internet y sincroniza cuando hay conexión). El método Most Significant Change es muy valioso para capturar impactos no previstos. Y en cuanto a marcos, el GRI adaptado al tercer sector está ganando terreno para la rendición de cuentas.',
        createdAt: '2024-05-22',
      },
    ],
  },
];
