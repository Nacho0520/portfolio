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
  stack?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "uog",
    kind: "education",
    period: { en: "2023 – December 2026", es: "2023 – Diciembre 2026" },
    title: { en: "BSc Computing and Entrepreneurship", es: "BSc Computing and Entrepreneurship" },
    org: "University of Gibraltar",
    description: {
      en: "Degree combining software engineering foundations with entrepreneurship, innovation management and product thinking.",
      es: "Grado que combina fundamentos de ingeniería de software con emprendimiento, gestión de la innovación y pensamiento de producto.",
    },
  },
  {
    id: "bet365",
    kind: "work",
    period: { en: "University Internship", es: "Prácticas universitarias" },
    title: { en: "CRM Data & Segmentation Intern", es: "Prácticas CRM – Datos y Segmentación" },
    org: "Bet365",
    description: {
      en: "Supporting global CRM operations with BigQuery, R and Optimove for data extraction and customer segmentation.",
      es: "Apoyo a las operaciones CRM globales utilizando BigQuery, R y Optimove para la extracción de datos y segmentación de clientes.",
    },
    stack: ["bigquery", "r", "optimove"],
  },
  {
    id: "concert",
    kind: "leadership",
    period: { en: "Summer seasons", es: "Temporadas de verano" },
    title: { en: "Crowd Control & Operations", es: "Control de multitudes y operaciones" },
    org: "Concert Music Festival",
    description: {
      en: "Crowd control and operations management for events with 10,000+ attendees, coordinating teams under high-pressure situations.",
      es: "Control de multitudes y gestión de operaciones en eventos con más de 10.000 asistentes, coordinando equipos en situaciones de alta presión.",
    },
  },
  {
    id: "piscina",
    kind: "leadership",
    period: { en: "Seasonal", es: "Temporal" },
    title: { en: "Bar Manager", es: "Bar Manager" },
    org: "Pizzería Piscina",
    description: {
      en: "Managing operations under pressure as Bar Manager: staff, stock, cash control and customer experience.",
      es: "Gestión de operaciones bajo presión como Bar Manager: equipo, stock, control de caja y experiencia del cliente.",
    },
  },
];

export const contact = {
  email: "hemmings.nacho@gmail.com",
  phone: "+34 622 33 96 28",
  phoneE164: "+34622339628",
  whatsappNumber: "34622339628",
  locations: ["Chiclana de la Frontera", "La Línea de la Concepción"],
  linkedin: "https://www.linkedin.com/in/ignacio-hemmings/",
  github: "https://github.com/",
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
