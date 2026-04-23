export type SkillItem = {
  id: string;
  label: string;
  icon: string;
  brandColor?: string;
  tooltip?: { en: string; es: string };
};

export type SkillCategory = {
  id: "ai" | "code" | "data";
  items: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    items: [
      {
        id: "make",
        label: "Make",
        icon: "workflow",
        brandColor: "#6d5cff",
        tooltip: {
          en: "No-code automation platform for chaining APIs and services.",
          es: "Plataforma no-code para encadenar APIs y servicios automatizados.",
        },
      },
      {
        id: "n8n",
        label: "n8n",
        icon: "n8n",
        brandColor: "#ea4b71",
        tooltip: {
          en: "Open-source workflow automation for complex data pipelines.",
          es: "Automatización open-source para pipelines de datos complejos.",
        },
      },
      {
        id: "flowise",
        label: "Flowise",
        icon: "flowise",
        brandColor: "#38bdf8",
        tooltip: {
          en: "Visual builder for LLM apps and autonomous agents.",
          es: "Constructor visual para apps con LLMs y agentes autónomos.",
        },
      },
      {
        id: "prompt",
        label: "Prompt Engineering",
        icon: "sparkles",
        brandColor: "#a78bfa",
        tooltip: {
          en: "Designing robust prompts and chain-of-thought strategies.",
          es: "Diseño de prompts robustos y estrategias chain-of-thought.",
        },
      },
      {
        id: "llm",
        label: "LLM Principles",
        icon: "brain",
        brandColor: "#f472b6",
        tooltip: {
          en: "Tokenization, embeddings, RAG and inference fundamentals.",
          es: "Tokenización, embeddings, RAG e inferencia.",
        },
      },
    ],
  },
  {
    id: "code",
    items: [
      { id: "python", label: "Python", icon: "SiPython", brandColor: "#3776AB" },
      { id: "javascript", label: "JavaScript", icon: "SiJavascript", brandColor: "#F7DF1E" },
      { id: "react", label: "React", icon: "SiReact", brandColor: "#61DAFB" },
      { id: "php", label: "PHP", icon: "SiPhp", brandColor: "#777BB4" },
      { id: "html", label: "HTML5", icon: "SiHtml5", brandColor: "#E34F26" },
      { id: "css", label: "CSS3", icon: "SiCss", brandColor: "#1572B6" },
      { id: "mysql", label: "MySQL", icon: "SiMysql", brandColor: "#4479A1" },
    ],
  },
  {
    id: "data",
    items: [
      { id: "bigquery", label: "BigQuery", icon: "SiGooglebigquery", brandColor: "#669DF6" },
      { id: "r", label: "R", icon: "SiR", brandColor: "#276DC3" },
      {
        id: "optimove",
        label: "Optimove",
        icon: "line-chart",
        brandColor: "#22d3ee",
        tooltip: {
          en: "CRM orchestration platform used at Bet365 for segmentation.",
          es: "Plataforma de orquestación CRM usada en Bet365 para segmentación.",
        },
      },
      {
        id: "microstrategy",
        label: "MicroStrategy",
        icon: "SiMicrostrategy",
        brandColor: "#d53847",
        tooltip: {
          en: "Enterprise BI and analytics platform.",
          es: "Plataforma empresarial de BI y analítica.",
        },
      },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  kind: { en: string; es: string };
  short: { en: string; es: string };
  long: { en: string; es: string };
  stack: string[];
  icon: string;
  links?: { github?: string; demo?: string };
  accent: string;
  livePreview?: string;
};

export const projects: Project[] = [
  {
    id: "cv-analyzer",
    title: "Local CV Analyzer (B2B)",
    kind: { en: "AI Capstone Project", es: "Proyecto Capstone de IA" },
    short: {
      en: "Privacy-first local AI that analyzes and classifies CVs, packaged as a B2B product.",
      es: "IA local enfocada en privacidad que analiza y clasifica currículums, empaquetada como producto B2B.",
    },
    long: {
      en: "Local AI solution to analyze and classify CVs privately, structured as a B2B product to optimize data privacy and processing efficiency. Runs on-prem with vector retrieval, keeping candidate data off the cloud.",
      es: "Solución de IA local para analizar y clasificar currículums de forma privada, estructurada como un producto B2B para optimizar la privacidad de los datos y la eficiencia. Corre on-prem con búsqueda vectorial, manteniendo los datos de candidatos fuera de la nube.",
    },
    stack: ["python", "llm", "prompt", "flowise"],
    icon: "brain",
    accent: "#f97316",
  },
  {
    id: "dayclose",
    title: "DayClose",
    kind: { en: "Web App · Live", es: "Aplicación Web · En vivo" },
    short: {
      en: "Independent web app to manage daily habits end-to-end. Try it live below.",
      es: "App web independiente para gestionar hábitos diarios de principio a fin. Pruébala en vivo aquí debajo.",
    },
    long: {
      en: "Independently built web application to manage daily habits. Ownership of the full development cycle, from frontend architecture to deployment on Vercel.",
      es: "Aplicación web de creación independiente para gestionar hábitos diarios. Gestión de todo el ciclo de desarrollo, desde la arquitectura frontend hasta el despliegue en Vercel.",
    },
    stack: ["react", "javascript", "css"],
    icon: "calendar",
    accent: "#14b8a6",
    links: { demo: "https://dayclose.vercel.app" },
    livePreview: "https://dayclose.vercel.app",
  },
  {
    id: "lms",
    title: "Educational Web Application (LMS)",
    kind: { en: "Learning Management System", es: "Sistema de Gestión de Aprendizaje" },
    short: {
      en: "Canvas/Google Classroom-inspired LMS with student and teacher interfaces.",
      es: "LMS inspirado en Canvas/Google Classroom con interfaces para estudiantes y profesores.",
    },
    long: {
      en: "Learning management system inspired by Canvas/Google Classroom, built with PHP, MySQL and JavaScript. Student and teacher interfaces with automated assignment management.",
      es: "Sistema de gestión de aprendizaje inspirado en Canvas/Google Classroom utilizando PHP, MySQL y JavaScript. Interfaces para estudiantes y profesores con gestión de tareas automatizada.",
    },
    stack: ["php", "mysql", "javascript", "html", "css"],
    icon: "graduation-cap",
    accent: "#fbbf24",
  },
  {
    id: "dynamic-sites",
    title: "Dynamic Website Development",
    kind: { en: "Full-stack Websites", es: "Sitios Web Full-stack" },
    short: {
      en: "Multiple websites built from scratch managing both front-end and back-end.",
      es: "Múltiples sitios web desde cero gestionando tanto front-end como back-end.",
    },
    long: {
      en: "Development of multiple websites from scratch managing both front-end and back-end. Emphasis on responsive design, SEO-friendly architecture and maintainable code.",
      es: "Desarrollo de múltiples sitios web desde cero gestionando tanto front-end como back-end. Énfasis en diseño responsive, arquitectura amigable con SEO y código mantenible.",
    },
    stack: ["html", "css", "javascript", "php", "mysql"],
    icon: "globe",
    accent: "#fb7185",
  },
];

export type TimelineEntry = {
  id: string;
  kind: "education" | "work" | "leadership";
  period: { en: string; es: string };
  title: { en: string; es: string };
  org: string;
  description: { en: string; es: string };
  bullets?: { en: string[]; es: string[] };
  stack?: string[];
};

export const educationTimeline: TimelineEntry[] = [
  {
    id: "uog",
    kind: "education",
    period: { en: "2023 – Dec 2026", es: "2023 – Dic 2026" },
    title: { en: "BSc Computing & Entrepreneurship", es: "BSc Computing & Entrepreneurship" },
    org: "University of Gibraltar",
    description: {
      en: "Degree blending software engineering with entrepreneurship, product thinking and innovation management. Hands-on projects from day one.",
      es: "Grado que combina ingeniería de software con emprendimiento, pensamiento de producto y gestión de la innovación. Proyectos prácticos desde el primer día.",
    },
    bullets: {
      en: [
        "Software Engineering & Architecture",
        "Web & Full-stack Development",
        "Databases & SQL",
        "Algorithms & Data Structures",
        "AI & Machine Learning fundamentals",
        "Entrepreneurship & Business Strategy",
        "Project Management & Agile",
      ],
      es: [
        "Ingeniería y Arquitectura de Software",
        "Desarrollo Web y Full-stack",
        "Bases de Datos y SQL",
        "Algoritmos y Estructuras de Datos",
        "Fundamentos de IA y Machine Learning",
        "Emprendimiento y Estrategia Empresarial",
        "Gestión de Proyectos y Metodologías Ágiles",
      ],
    },
  },
  {
    id: "guadalete",
    kind: "education",
    period: { en: "2021 – 2023", es: "2021 – 2023" },
    title: {
      en: "Technological Baccalaureate",
      es: "Bachillerato Tecnológico",
    },
    org: "Colegio Privado Guadalete",
    description: {
      en: "Spanish Technological Baccalaureate with a STEM focus. Strong foundation in mathematics, physics and computing that directly feeds into my software career.",
      es: "Bachillerato Tecnológico con enfoque STEM. Sólida base en matemáticas, física e informática que alimenta directamente mi carrera en software.",
    },
    bullets: {
      en: [
        "Mathematics II (Calculus, Linear Algebra)",
        "Physics",
        "Technical Drawing II (3D visualisation)",
        "Industrial Technology II",
        "ICT & Information Systems",
        "Chemistry",
      ],
      es: [
        "Matemáticas II (Cálculo, Álgebra Lineal)",
        "Física",
        "Dibujo Técnico II (visualización 3D)",
        "Tecnología Industrial II",
        "TIC y Sistemas de Información",
        "Química",
      ],
    },
  },
];

export const workTimeline: TimelineEntry[] = [
  {
    id: "bet365",
    kind: "work",
    period: { en: "Mar 2026 – Apr 2026", es: "Mar 2026 – Abr 2026" },
    title: { en: "CRM Data & Segmentation Intern", es: "Prácticas CRM – Datos y Segmentación" },
    org: "Bet365",
    description: {
      en: "University placement supporting global CRM operations across UK, Spain, LATAM and Brazil — collaborating with CRM Analytics, Gaming and Brand Marketing teams.",
      es: "Prácticas universitarias de apoyo a operaciones CRM globales en UK, España, LATAM y Brasil — colaborando con los equipos de CRM Analytics, Gaming y Brand Marketing.",
    },
    bullets: {
      en: [
        "Used BigQuery and R for data extraction and high-level reporting via MicroStrategy",
        "Executed customer segmentation in Optimove to drive acquisition and reactivate churned users",
        "Designed targeting filters for campaigns across multiple markets",
        "Proactively identified CRM workflow bottlenecks to ensure seamless campaign delivery",
      ],
      es: [
        "BigQuery y R para extracción de datos y reporting de alto nivel vía MicroStrategy",
        "Segmentación de clientes en Optimove para adquisición y reactivación de usuarios perdidos",
        "Diseño de filtros de targeting para campañas en múltiples mercados",
        "Identificación proactiva de cuellos de botella en flujos CRM para asegurar entregas sin fricción",
      ],
    },
    stack: ["bigquery", "r", "optimove", "microstrategy"],
  },
  {
    id: "concert",
    kind: "leadership",
    period: { en: "Summer 2025", es: "Verano 2025" },
    title: { en: "Event Staff", es: "Staff de Evento" },
    org: "Concert Music Festival",
    description: {
      en: "Access control and crowd management for a high-capacity outdoor music festival with 10,000+ daily attendees.",
      es: "Control de accesos y gestión de multitudes en un festival de música al aire libre con más de 10.000 asistentes diarios.",
    },
    bullets: {
      en: [
        "Coordinated crowd flow and access control at peak capacity",
        "Managed VIP area logistics and point-of-sale (POS) transactions",
        "Resolved real-time incidents through proactive communication under pressure",
        "Maintained high-standard customer service throughout the event",
      ],
      es: [
        "Coordinación del flujo de público y control de accesos en horas punta",
        "Gestión del área VIP y transacciones en punto de venta (POS)",
        "Resolución de incidencias en tiempo real con comunicación proactiva bajo presión",
        "Mantenimiento de altos estándares de atención al cliente durante el evento",
      ],
    },
  },
  {
    id: "piscina",
    kind: "leadership",
    period: { en: "Summer 2025", es: "Verano 2025" },
    title: { en: "Waiter & Bar Manager", es: "Camarero y Bar Manager" },
    org: "La Piscina – Pizza & Copas",
    description: {
      en: "Bar and floor operations at a busy seasonal restaurant during peak summer season.",
      es: "Operaciones de barra y sala en un restaurante de temporada concurrido durante el pico estival.",
    },
    bullets: {
      en: [
        "Managed bar operations and stock control throughout peak season",
        "Delivered efficient customer service under high-pressure conditions",
        "Coordinated team workflows to maintain service quality and speed",
      ],
      es: [
        "Gestión de operaciones de barra y control de stock en temporada alta",
        "Servicio al cliente eficiente bajo condiciones de alta presión",
        "Coordinación del equipo para mantener calidad y velocidad de servicio",
      ],
    },
  },
];

export const contact = {
  email: "hemmings.nacho@gmail.com",
  phone: "+34 622 33 96 28",
  phoneE164: "+34622339628",
  whatsappNumber: "34622339628",
  locations: ["Chiclana de la Frontera", "Gibraltar"],
  linkedin: "https://www.linkedin.com/in/ignaciohemmings/",
  github: "https://github.com/Nacho0520",
};

export type ServiceId = "web" | "automation" | "chatbot";

export const services: Array<{
  id: ServiceId;
  icon: string;
  accent: string;
}> = [
  { id: "web", icon: "globe", accent: "#f97316" },
  { id: "automation", icon: "workflow", accent: "#fbbf24" },
  { id: "chatbot", icon: "chat", accent: "#14b8a6" },
];
