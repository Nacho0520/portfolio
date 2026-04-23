export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export const dictionary = {
  meta: {
    title: {
      en: "Ignacio Hemmings Jiménez — Junior Full-stack Developer & AI Specialist",
      es: "Ignacio Hemmings Jiménez — Junior Full-stack Developer & Especialista en IA",
    },
    description: {
      en: "Portfolio of Ignacio Hemmings Jiménez: full-stack developer and AI specialist building scalable automation, web apps and local LLM tooling.",
      es: "Portfolio de Ignacio Hemmings Jiménez: desarrollador full-stack y especialista en IA creando automatización escalable, aplicaciones web y herramientas locales con LLMs.",
    },
  },
  nav: {
    hero: { en: "Home", es: "Inicio" },
    about: { en: "About", es: "Sobre mí" },
    services: { en: "Services", es: "Servicios" },
    skills: { en: "Skills", es: "Skills" },
    projects: { en: "Projects", es: "Proyectos" },
    experience: { en: "Experience", es: "Experiencia" },
    contact: { en: "Contact", es: "Contacto" },
    language: { en: "Switch language", es: "Cambiar idioma" },
    sound: { en: "Toggle UI sounds", es: "Activar sonidos UI" },
    theme: { en: "Toggle theme", es: "Cambiar tema" },
    themeLight: { en: "Light mode", es: "Modo claro" },
    themeDark: { en: "Dark mode", es: "Modo oscuro" },
  },
  hero: {
    title: { en: "Ignacio Hemmings Jiménez", es: "Ignacio Hemmings Jiménez" },
    subtitle: {
      en: "Junior full-stack developer and AI specialist.",
      es: "Junior full-stack developer and AI specialist.",
    },
    cta: { en: "Explore projects", es: "Explorar Proyectos" },
    scroll: { en: "Scroll", es: "Scroll" },
  },
  about: {
    heading: { en: "About me", es: "Sobre mí" },
    bio: {
      en: "Full-stack developer and AI specialist with an entrepreneurial mindset. Focused on building scalable technology solutions that solve real problems, from AI automation to web development. My goal is to deliver technical and strategic value in innovative environments.",
      es: "Desarrollador full-stack y especialista en IA con mentalidad emprendedora. Enfocado en crear soluciones tecnológicas escalables que resuelvan problemas reales, desde la automatización con IA hasta el desarrollo web. El objetivo es aportar valor técnico y estratégico en entornos innovadores.",
    },
    interests: {
      en: "Passionate about building applications that help people solve everyday problems and improve their quality of life.",
      es: "Apasionado por el desarrollo de aplicaciones que ayudan a las personas a resolver problemas cotidianos y mejorar su calidad de vida.",
    },
    keywords: {
      scalable: { en: "scalable", es: "escalables" },
      ai: { en: "AI automation", es: "automatización con IA" },
      bilingual: { en: "bilingual", es: "bilingüe" },
    },
    tooltips: {
      scalable: {
        en: "Architectures ready to grow without rewrites.",
        es: "Arquitecturas preparadas para crecer sin reescribir.",
      },
      ai: {
        en: "From LLM prompting to end-to-end workflow automation.",
        es: "Desde prompting de LLMs hasta automatización end-to-end.",
      },
      bilingual: {
        en: "Native Spanish, fluent English — comfortable in both.",
        es: "Español nativo, inglés fluido — cómodo en ambos.",
      },
    },
  },
  services: {
    eyebrow: { en: "What I do", es: "Qué hago" },
    heading: { en: "Services", es: "Servicios" },
    lead: {
      en: "Three focused offers. I adapt quickly, love learning, and ship with quality.",
      es: "Tres propuestas claras. Me adapto rápido, me encanta aprender y entrego con calidad.",
    },
    web: {
      title: { en: "Web development", es: "Páginas web" },
      description: {
        en: "Modern, responsive websites and web apps — from landing pages to full-stack platforms with databases and authentication.",
        es: "Webs y aplicaciones modernas y responsive — desde landing pages a plataformas full-stack con bases de datos y autenticación.",
      },
      bullets: {
        en: ["Next.js / React stacks", "SEO-friendly architecture", "Clean UI and smooth UX"],
        es: ["Stacks Next.js / React", "Arquitectura amigable con SEO", "UI limpia y UX fluida"],
      },
    },
    automation: {
      title: { en: "AI automations", es: "Automatizaciones con IA" },
      description: {
        en: "End-to-end workflows that save hours: Make, n8n, Flowise, custom APIs. I connect the tools you already use.",
        es: "Flujos end-to-end que ahorran horas: Make, n8n, Flowise, APIs a medida. Conecto las herramientas que ya usas.",
      },
      bullets: {
        en: ["No-code + custom code", "LLMs, RAG and pipelines", "Clear handover + docs"],
        es: ["No-code + código a medida", "LLMs, RAG y pipelines", "Entrega clara + documentación"],
      },
    },
    chatbot: {
      title: { en: "Chatbots", es: "Chatbots" },
      description: {
        en: "Conversational assistants for support, lead capture or internal ops — scripted or powered by LLMs, with your brand voice.",
        es: "Asistentes conversacionales para soporte, captación o operaciones internas — con script o con LLMs, con la voz de tu marca.",
      },
      bullets: {
        en: ["WhatsApp, web and Telegram", "Tuned prompts and guardrails", "Analytics + handoff"],
        es: ["WhatsApp, web y Telegram", "Prompts afinados y guardrails", "Analítica + handoff"],
      },
    },
    adapt: {
      en: "I adapt easily and stay open to learning. If it isn't on this list, ask — chances are I'll figure it out.",
      es: "Me adapto con facilidad y estoy abierto a aprender. Si no está en esta lista, pregúntame — probablemente lo saque adelante.",
    },
    cta: { en: "Start a conversation", es: "Empezar la conversación" },
  },
  skills: {
    heading: { en: "Skills", es: "Habilidades" },
    lead: {
      en: "A curated stack focused on AI, full-stack development and data.",
      es: "Un stack curado centrado en IA, desarrollo full-stack y datos.",
    },
    categories: {
      ai: { en: "AI & Automation", es: "IA y Automatización" },
      code: { en: "Programming & Databases", es: "Programación y Bases de Datos" },
      data: { en: "Data & Analytics", es: "Herramientas de Datos y Análisis" },
    },
  },
  projects: {
    heading: { en: "Technical projects", es: "Proyectos técnicos" },
    lead: {
      en: "Selected work across AI, web apps and full-stack platforms.",
      es: "Trabajo seleccionado en IA, aplicaciones web y plataformas full-stack.",
    },
    expand: { en: "Read more", es: "Leer más" },
    collapse: { en: "Close", es: "Cerrar" },
    viewRepo: { en: "View repository", es: "Ver repositorio" },
    viewDemo: { en: "Open demo", es: "Abrir demo" },
    livePreview: { en: "Live preview", es: "Vista en vivo" },
    openFull: { en: "Open full app", es: "Abrir app completa" },
    previewNotice: {
      en: "Preview mode — interact freely, but sign-up and account creation are disabled here. Open the full app to create your account.",
      es: "Modo preview — interactúa libremente, pero el registro y la creación de cuentas están desactivados aquí. Abre la app completa para crear tu cuenta.",
    },
  },
  experience: {
    heading: { en: "Experience & Education", es: "Experiencia y Educación" },
    lead: {
      en: "A timeline connecting academic, technical and leadership work.",
      es: "Una línea de tiempo que conecta lo académico, técnico y de liderazgo.",
    },
    featured: {
      en: "Featured environments",
      es: "Entornos destacados",
    },
    badges: {
      education: { en: "Education", es: "Educación" },
      work: { en: "Work", es: "Experiencia" },
      leadership: { en: "Leadership", es: "Liderazgo" },
    },
  },
  contact: {
    heading: { en: "Contact", es: "Contacto" },
    lead: {
      en: "Let's build something. Write me by email, WhatsApp, or talk to the interactive terminal.",
      es: "Vamos a crear algo. Escríbeme por email, WhatsApp o habla con la terminal interactiva.",
    },
    directTitle: { en: "Direct channels", es: "Canales directos" },
    location: { en: "Based in", es: "Con base en" },
    emailLabel: { en: "Email", es: "Email" },
    phoneLabel: { en: "Phone", es: "Teléfono" },
    whatsappLabel: { en: "WhatsApp", es: "WhatsApp" },
    linkedinLabel: { en: "LinkedIn", es: "LinkedIn" },
    terminalTitle: { en: "Ignacio-Bot — interactive terminal", es: "Ignacio-Bot — terminal interactiva" },
    terminalHint: {
      en: "Type 'help' to list available commands.",
      es: "Escribe 'help' para ver los comandos disponibles.",
    },
    form: {
      title: { en: "Send a message", es: "Envíame un mensaje" },
      subtitle: {
        en: "Pick your channel — it opens pre-filled and you only hit send.",
        es: "Elige el canal — se abre rellenado y tú solo pulsas enviar.",
      },
      tabEmail: { en: "Email", es: "Email" },
      tabWhatsApp: { en: "WhatsApp", es: "WhatsApp" },
      name: { en: "Your name", es: "Tu nombre" },
      namePh: { en: "Ada Lovelace", es: "Ada Lovelace" },
      subject: { en: "Subject", es: "Asunto" },
      subjectPh: {
        en: "Project idea, collaboration, hiring…",
        es: "Idea de proyecto, colaboración, contratación…",
      },
      message: { en: "Message", es: "Mensaje" },
      messagePh: {
        en: "Tell me what you need and a bit of context — I'll reply fast.",
        es: "Cuéntame qué necesitas y un poco de contexto — respondo rápido.",
      },
      sendEmail: { en: "Send email", es: "Enviar email" },
      sendWhatsApp: { en: "Open WhatsApp", es: "Abrir WhatsApp" },
      emailHint: {
        en: "Opens your email client with the message ready to go.",
        es: "Abre tu cliente de correo con el mensaje listo para enviar.",
      },
      whatsappHint: {
        en: "Opens WhatsApp with the message ready to send.",
        es: "Abre WhatsApp con el mensaje listo para enviar.",
      },
    },
  },
  footer: {
    built: {
      en: "Built with Next.js, Tailwind CSS and Framer Motion.",
      es: "Construido con Next.js, Tailwind CSS y Framer Motion.",
    },
    rights: {
      en: "All rights reserved.",
      es: "Todos los derechos reservados.",
    },
  },
  bot: {
    welcome: {
      en: "> Hi, I am Ignacio's interactive terminal. Type 'contact', 'download_cv' or ask me anything about his experience.",
      es: "> Hola, soy la terminal interactiva de Ignacio. Escribe 'contactar', 'descargar_cv' o hazme una pregunta sobre su experiencia.",
    },
    placeholder: { en: "Type a command or a question…", es: "Escribe un comando o una pregunta…" },
    unknown: {
      en: "I didn't catch that. Try 'help' to see the full list.",
      es: "No entendí. Prueba 'help' para ver la lista completa.",
    },
    help: {
      en: "Available commands: help, about, skills, projects, experience, education, contact, download_cv, language, clear. You can also ask in natural language.",
      es: "Comandos disponibles: help, sobre, skills, proyectos, experiencia, educacion, contactar, descargar_cv, idioma, clear. También puedes preguntar en lenguaje natural.",
    },
    clearing: { en: "Terminal cleared.", es: "Terminal limpia." },
    downloadingCv: {
      en: "Opening CV download in a new tab…",
      es: "Abriendo la descarga del CV en una nueva pestaña…",
    },
    languageToggled: {
      en: "Language switched. Escribe 'idioma' para alternar.",
      es: "Idioma cambiado. Type 'language' to toggle.",
    },
    contactSummary: {
      en: "Email: hemmings.nacho@gmail.com | Phone: +34 622 33 96 28 | LinkedIn available below.",
      es: "Email: hemmings.nacho@gmail.com | Teléfono: +34 622 33 96 28 | LinkedIn disponible abajo.",
    },
  },
} as const;

export type DictKey = keyof typeof dictionary;
