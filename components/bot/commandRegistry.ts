import {
  contact,
  projects,
  skillCategories,
  workTimeline,
  educationTimeline,
  type TimelineEntry,
} from "@/lib/content";
import { dictionary, type Locale } from "@/lib/i18n/dictionary";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BotLine = {
  kind: "system" | "bot" | "user" | "success" | "error" | "link" | "action" | "separator";
  text: string;
  href?: string;
  /** For kind="action" — what the terminal should do when rendered */
  action?: { type: "scroll"; target: string } | { type: "whatsapp"; message: string };
};

export type FlowState = {
  name: "quote";
  step: number;
  data: Partial<{
    type: string;
    scale: string;
    deadline: string;
    sector: string;
    extra: string;
  }>;
} | null;

export type SessionMemory = {
  explored: Set<string>;
  interests: string[];
  interactionCount: number;
};

export type BotContext = {
  locale: Locale;
  toggleLocale: (newLocale?: Locale) => void;
  clear: () => void;
  memory: SessionMemory;
  flowState: FlowState;
};

export type RunResult = {
  lines: BotLine[];
  newFlowState?: FlowState | null;
  switchLocale?: Locale;
};

// ─── Language detection ───────────────────────────────────────────────────────

const esWords = /\b(qué|que|cómo|como|cuándo|cuando|cuánto|cuanto|para|tengo|quiero|necesito|puedes|tienes|hacer|saber|dime|hola|haces|ofreces|cuál|cual|costar|coste|precio|trabajas|hiciste|explica|dame|muestra|sabes|disponible|dispones|trabajar)\b/i;
const enWords = /\b(what|how|when|how much|for|have|want|need|can you|do you|tell me|hello|hi there|do|offer|cost|price|work|did|explain|show|know|available|let's)\b/i;

export function detectLocale(input: string): Locale | null {
  const esScore = (input.match(esWords) ?? []).length;
  const enScore = (input.match(enWords) ?? []).length;
  if (esScore > enScore && esScore >= 2) return "es";
  if (enScore > esScore && enScore >= 2) return "en";
  return null;
}

// ─── Intent classifier ────────────────────────────────────────────────────────

type IntentSignal = { pattern: RegExp; command: string; weight: number };

const intentSignals: IntentSignal[] = [
  // High-confidence exact aliases (weight 10)
  { pattern: /^(help|ayuda|\?)$/i, command: "help", weight: 10 },
  { pattern: /^(clear|limpiar|reset|cls)$/i, command: "clear", weight: 10 },
  { pattern: /^(cv|download_cv|descargar_cv)$/i, command: "download_cv", weight: 10 },
  { pattern: /^(language|idioma|lang)$/i, command: "language", weight: 10 },
  { pattern: /^(faq|preguntas)$/i, command: "faq", weight: 10 },
  { pattern: /^(quote|presupuesto|cotizaci[oó]n)$/i, command: "quote", weight: 10 },
  { pattern: /^(compare|comparar|comparativa)$/i, command: "compare", weight: 10 },
  { pattern: /^(roadmap|fases|proceso)$/i, command: "roadmap", weight: 10 },
  { pattern: /^(availability|disponibilidad|disponible)$/i, command: "availability", weight: 10 },
  { pattern: /^(stack_recommendation|recomienda|stack)$/i, command: "stack_recommendation", weight: 10 },
  // Medium-weight keyword patterns (weight 5)
  { pattern: /\b(skill|tech|stack|habilidad|herramienta|tecnolog)/i, command: "skills", weight: 5 },
  { pattern: /\b(project|proyecto|app|web que has|dayclose|lms|cv.analyzer)/i, command: "projects", weight: 5 },
  { pattern: /\b(experienc|work|trabajo|bet365|concert|piscina|empresa)/i, command: "experience", weight: 5 },
  { pattern: /\b(educ|universi|bachillerato|grado|guadalete|gibraltar)/i, command: "education", weight: 5 },
  { pattern: /\b(about|sobre m[íi]|qui[eé]n eres|bio|te presentas|descr[íi]bete)/i, command: "about", weight: 5 },
  { pattern: /\b(contact|contacto|contactar|email|whatsapp|tel[eé]fono|linkedin|github)/i, command: "contact", weight: 5 },
  { pattern: /\b(cv|curriculum|curr[ií]culum|resume|descarg)/i, command: "download_cv", weight: 5 },
  { pattern: /\b(precio|coste|cost|cuesta|cuánto|budget|presupuest|cotiz)/i, command: "quote", weight: 5 },
  { pattern: /\b(ejemplo|case|caso|cliente|sector|negocio|restaurante|cl[íi]nica|inmo)/i, command: "case", weight: 5 },
  { pattern: /\b(faq|pregunta.+frecuente|duda|common|typical)/i, command: "faq", weight: 5 },
  { pattern: /\b(compara|diferencia|mejor|cu[aá]l elegir|vs\b)/i, command: "compare", weight: 5 },
  { pattern: /\b(roadmap|fases|etapas|pasos|proceso|c[oó]mo funciona|workflow)/i, command: "roadmap", weight: 5 },
  { pattern: /\b(disponible|disponibilidad|libre|freelance|contratar|cuando empezar|start when)/i, command: "availability", weight: 5 },
  { pattern: /\b(recomienda|qu[eé] usar|stack para|herramienta para|mejor tecnolog)/i, command: "stack_recommendation", weight: 5 },
  { pattern: /\b(propuesta|proposal|presenta|plantilla)/i, command: "propose", weight: 5 },
  // Low-weight topical keywords (weight 2)
  { pattern: /\b(inglés|english|espa[nñ]ol|bilingu|language|idioma)\b/i, command: "language", weight: 2 },
  { pattern: /\b(help|commands|comandos|lista|list)\b/i, command: "help", weight: 2 },
];

export function classifyIntent(input: string): { command: string; confidence: number } | null {
  const scores: Record<string, number> = {};
  for (const sig of intentSignals) {
    if (sig.pattern.test(input)) {
      scores[sig.command] = (scores[sig.command] ?? 0) + sig.weight;
    }
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (!best || best[1] < 2) return null;
  return { command: best[0], confidence: best[1] };
}

// ─── Response helpers ─────────────────────────────────────────────────────────

const t = (en: string, es: string, locale: Locale) => (locale === "es" ? es : en);
const sep = (): BotLine => ({ kind: "separator", text: "─" });

// ─── Quote flow ───────────────────────────────────────────────────────────────

const QUOTE_STEPS = {
  type: {
    prompt: {
      en: "What kind of project do you have in mind?\n  1) Website   2) AI automation   3) Chatbot   4) All of them   5) I'm not sure",
      es: "¿Qué tipo de proyecto tienes en mente?\n  1) Página web   2) Automatización IA   3) Chatbot   4) Todo   5) No estoy seguro",
    },
    options: [
      { keys: /^(1|web|p[aá]gina|pagina|website|sitio)/i, value: "web" },
      { keys: /^(2|auto|automatiz|workflow)/i, value: "automation" },
      { keys: /^(3|chat|bot|asistente)/i, value: "chatbot" },
      { keys: /^(4|todo|all|los tres|ambos|combo)/i, value: "all" },
      { keys: /^(5|no s[eé]|not sure|quiz[aá]s|d[eé]jame)/i, value: "unknown" },
    ],
  },
  scale: {
    prompt: {
      en: "How complex does it need to be?\n  1) Simple / landing page   2) Medium (several pages/integrations)   3) Large / custom platform",
      es: "¿Qué nivel de complejidad?\n  1) Sencillo / landing page   2) Medio (varias páginas/integraciones)   3) Grande / plataforma a medida",
    },
    options: [
      { keys: /^(1|peque[nñ]o|simple|sencill|landing|b[aá]sico)/i, value: "small" },
      { keys: /^(2|medio|mediano|medium|varios|several)/i, value: "medium" },
      { keys: /^(3|grande|large|complex|plataforma|custom)/i, value: "large" },
    ],
  },
  deadline: {
    prompt: {
      en: "When do you need it?\n  1) ASAP   2) 1–3 months   3) No rush",
      es: "¿Cuándo lo necesitas?\n  1) Lo antes posible   2) En 1–3 meses   3) Sin prisa",
    },
    options: [
      { keys: /^(1|ya|asap|urgente|pronto|soon|r[aá]pido)/i, value: "asap" },
      { keys: /^(2|mes|month|1.?3|par de)/i, value: "soon" },
      { keys: /^(3|sin prisa|no rush|tranquil|flexible|tiempo)/i, value: "flexible" },
    ],
  },
  sector: {
    prompt: {
      en: "What sector or type of business is it for? (e.g. restaurant, clinic, e-commerce, gym, agency...)",
      es: "¿Para qué sector o tipo de negocio? (ej: restaurante, clínica, ecommerce, gimnasio, agencia...)",
    },
    options: [],
  },
  extra: {
    prompt: {
      en: "Any extra detail you want to share? (or press Enter / type 'skip' to finish)",
      es: "¿Algún detalle extra que quieras añadir? (o pulsa Enter / escribe 'saltar' para terminar)",
    },
    options: [],
  },
};

const stepKeys = ["type", "scale", "deadline", "sector", "extra"] as const;
type StepKey = (typeof stepKeys)[number];

function estimateRange(type: string, scale: string, locale: Locale): string {
  const ranges: Record<string, Record<string, [string, string]>> = {
    web:        { small: ["300€–600€", "$350–$700"], medium: ["600€–1.400€", "$700–$1.600"], large: ["1.400€–3.000€+", "$1.600–$3.500+"] },
    automation: { small: ["200€–500€", "$230–$580"], medium: ["500€–1.100€", "$580–$1.300"], large: ["1.100€–2.500€+", "$1.300–$3.000+"] },
    chatbot:    { small: ["250€–550€", "$290–$640"], medium: ["550€–1.200€", "$640–$1.400"], large: ["1.200€–2.800€+", "$1.400–$3.200+"] },
    all:        { small: ["800€–1.500€", "$930–$1.750"], medium: ["1.500€–3.500€", "$1.750–$4.000"], large: ["3.500€–7.000€+", "$4.000–$8.000+"] },
    unknown:    { small: ["200€–600€", "$230–$700"], medium: ["500€–1.400€", "$580–$1.600"], large: ["1.200€–3.000€+", "$1.400–$3.500+"] },
  };
  const resolvedType = ranges[type] ? type : "unknown";
  const resolvedScale = scale === "small" || scale === "medium" || scale === "large" ? scale : "medium";
  const [eur, usd] = ranges[resolvedType][resolvedScale];
  return locale === "es" ? eur : usd;
}

function deadlineLabel(val: string, locale: Locale): string {
  const map: Record<string, [string, string]> = {
    asap: ["lo antes posible", "ASAP"],
    soon: ["1–3 meses", "1–3 months"],
    flexible: ["sin prisa", "flexible timeline"],
  };
  const [es, en] = map[val] ?? ["—", "—"];
  return locale === "es" ? es : en;
}

function typeLabel(val: string, locale: Locale): string {
  const map: Record<string, [string, string]> = {
    web: ["Página web", "Website"],
    automation: ["Automatización IA", "AI Automation"],
    chatbot: ["Chatbot", "Chatbot"],
    all: ["Web + Automatización + Chatbot", "Web + Automation + Chatbot"],
    unknown: ["Por definir", "To be defined"],
  };
  const [es, en] = map[val] ?? [val, val];
  return locale === "es" ? es : en;
}

function scaleLabel(val: string, locale: Locale): string {
  const map: Record<string, [string, string]> = {
    small: ["Sencillo", "Simple"],
    medium: ["Mediano", "Medium"],
    large: ["Complejo/Grande", "Large/Complex"],
  };
  const [es, en] = map[val] ?? [val, val];
  return locale === "es" ? es : en;
}

type QuoteData = NonNullable<FlowState>["data"];
function buildQuoteSummary(data: QuoteData, locale: Locale): BotLine[] {
  const type = data.type ?? "unknown";
  const scale = data.scale ?? "medium";
  const deadline = data.deadline ?? "flexible";
  const sector = data.sector ?? (locale === "es" ? "no especificado" : "not specified");
  const extra = data.extra ?? "";
  const range = estimateRange(type, scale, locale);

  const waText = locale === "es"
    ? `Hola Ignacio, te contacto desde tu portfolio.\n\nProyecto: ${typeLabel(type, "es")}\nComplejidad: ${scaleLabel(scale, "es")}\nPlazo: ${deadlineLabel(deadline, "es")}\nSector: ${sector}${extra ? `\nDetalles: ${extra}` : ""}\n\n¿Podemos hablar?`
    : `Hi Ignacio, I'm reaching out from your portfolio.\n\nProject: ${typeLabel(type, "en")}\nComplexity: ${scaleLabel(scale, "en")}\nTimeline: ${deadlineLabel(deadline, "en")}\nSector: ${sector}${extra ? `\nDetails: ${extra}` : ""}\n\nCan we talk?`;

  const waUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(waText)}`;

  return [
    sep(),
    { kind: "success", text: t("✓ Brief complete! Here's your summary:", "✓ Brief completo. Aquí tienes el resumen:", locale) },
    sep(),
    { kind: "bot", text: `  ${t("Type", "Tipo"        , locale)}: ${typeLabel(type, locale)}` },
    { kind: "bot", text: `  ${t("Scale", "Complejidad" , locale)}: ${scaleLabel(scale, locale)}` },
    { kind: "bot", text: `  ${t("Timeline", "Plazo"   , locale)}: ${deadlineLabel(deadline, locale)}` },
    { kind: "bot", text: `  ${t("Sector", "Sector"    , locale)}: ${sector}` },
    ...(extra ? [{ kind: "bot" as const, text: `  ${t("Extra", "Extra", locale)}: ${extra}` }] : []),
    sep(),
    { kind: "bot", text: t(`  Estimated range: ${range} (non-binding)`, `  Rango estimado: ${range} (orientativo, sin compromiso)`, locale) },
    sep(),
    { kind: "system", text: t("Send this brief to Ignacio via WhatsApp:", "Envía este brief a Ignacio por WhatsApp:", locale) },
    { kind: "action", text: t("↗ Send brief on WhatsApp", "↗ Enviar brief por WhatsApp", locale), action: { type: "whatsapp", message: waUrl } },
    { kind: "bot", text: t("You can also type 'contact' for more options.", "También puedes escribir 'contact' para más opciones.", locale) },
  ];
}

function handleQuoteFlow(input: string, flow: FlowState & { name: "quote" }, locale: Locale): RunResult {
  const stepKey = stepKeys[flow.step] as StepKey;
  const stepDef = QUOTE_STEPS[stepKey];
  const raw = input.trim();

  // Allow user to cancel flow
  if (/^(cancel|exit|salir|cancelar|quit|abort)$/i.test(raw)) {
    return {
      lines: [{ kind: "system", text: t("Brief cancelled. Type 'quote' to start again.", "Brief cancelado. Escribe 'presupuesto' para empezar de nuevo.", locale) }],
      newFlowState: null,
    };
  }

  // Match against step options if defined
  let resolvedValue = raw;
  if (stepDef.options.length > 0) {
    const match = stepDef.options.find((o) => o.keys.test(raw));
    if (!match) {
      return {
        lines: [{ kind: "error", text: t("Please choose one of the options above (e.g. 1, 2, 3).", "Por favor elige una de las opciones de arriba (ej: 1, 2, 3).", locale) }],
      };
    }
    resolvedValue = match.value;
  }

  // Handle "skip" on optional steps
  if (/^(skip|saltar|omitir|paso|-)$/i.test(raw)) {
    resolvedValue = "";
  }

  const newData = { ...flow.data, [stepKey]: resolvedValue };
  const nextStep = flow.step + 1;

  if (nextStep >= stepKeys.length) {
    // Flow complete
    return {
      lines: buildQuoteSummary(newData, locale),
      newFlowState: null,
    };
  }

  // Advance to next step
  const nextKey = stepKeys[nextStep] as StepKey;
  const nextPrompt = QUOTE_STEPS[nextKey].prompt[locale];
  return {
    lines: [
      { kind: "success", text: t("Got it!", "Entendido.", locale) },
      { kind: "system", text: nextPrompt },
    ],
    newFlowState: { name: "quote", step: nextStep, data: newData },
  };
}

// ─── Case studies ─────────────────────────────────────────────────────────────

type CaseData = { name: string; lines: { en: string; es: string }[] };
const CASES: Record<string, CaseData> = {
  restaurante: {
    name: "Restaurante / Bar",
    lines: [
      { en: "Website with menu, gallery and Google Maps embed", es: "Web con carta, galería y mapa Google Maps" },
      { en: "WhatsApp automation for reservations and order confirmations", es: "Automatización WhatsApp para reservas y confirmaciones de pedido" },
      { en: "Chatbot on the website for FAQs (hours, allergens, location)", es: "Chatbot en la web para FAQs (horarios, alérgenos, ubicación)" },
      { en: "Estimated: €500–€1.200 depending on scope", es: "Estimación: 500€–1.200€ según alcance" },
    ],
  },
  clinica: {
    name: "Clínica / Salud",
    lines: [
      { en: "Professional website with specialties, team bios and appointment form", es: "Web profesional con especialidades, equipo y formulario de citas" },
      { en: "Email automation for appointment reminders and follow-ups", es: "Automatización de emails para recordatorios de citas y seguimiento" },
      { en: "Chatbot to pre-qualify patients and collect symptoms", es: "Chatbot para pre-calificar pacientes y recoger síntomas" },
      { en: "Estimated: €700–€1.600", es: "Estimación: 700€–1.600€" },
    ],
  },
  inmobiliaria: {
    name: "Inmobiliaria",
    lines: [
      { en: "Property listing website with search, filters and contact forms", es: "Web de propiedades con buscador, filtros y formulario de contacto" },
      { en: "CRM automation: new lead → assigned agent → follow-up sequence", es: "Automatización CRM: lead nuevo → agente asignado → secuencia de seguimiento" },
      { en: "Chatbot to qualify buyers and collect property requirements", es: "Chatbot para cualificar compradores y recoger requisitos de vivienda" },
      { en: "Estimated: €900–€2.200", es: "Estimación: 900€–2.200€" },
    ],
  },
  ecommerce: {
    name: "E-commerce / Tienda online",
    lines: [
      { en: "Online store with product catalog, cart and secure checkout", es: "Tienda online con catálogo, carrito y pago seguro" },
      { en: "Order automation: confirmation email, shipping tracking, review request", es: "Automatización de pedidos: email de confirmación, tracking, solicitud de reseña" },
      { en: "Chatbot for product recommendations and order status queries", es: "Chatbot de recomendaciones de producto y estado de pedidos" },
      { en: "Estimated: €800–€2.500+", es: "Estimación: 800€–2.500€+" },
    ],
  },
  gimnasio: {
    name: "Gimnasio / Fitness",
    lines: [
      { en: "Website with class schedule, pricing and online sign-up", es: "Web con horario de clases, tarifas y alta online" },
      { en: "Automation to welcome new members and send session reminders", es: "Automatización para dar la bienvenida a socios y enviar recordatorios de sesión" },
      { en: "Chatbot with class info, trainer bios and contact form", es: "Chatbot con info de clases, perfiles de entrenadores y formulario de contacto" },
      { en: "Estimated: €450–€1.100", es: "Estimación: 450€–1.100€" },
    ],
  },
  agencia: {
    name: "Agencia / Consultoría",
    lines: [
      { en: "Portfolio/services website with case studies and lead capture", es: "Web de servicios con casos de éxito y captación de leads" },
      { en: "Proposal automation: intake form → auto-generated brief → CRM entry", es: "Automatización de propuestas: formulario → brief generado → entrada en CRM" },
      { en: "Chatbot to pre-qualify potential clients 24/7", es: "Chatbot para pre-cualificar clientes potenciales 24/7" },
      { en: "Estimated: €600–€1.500", es: "Estimación: 600€–1.500€" },
    ],
  },
};

function resolveCaseSector(input: string): CaseData | null {
  const lower = input.toLowerCase();
  if (/restaur|bar|cafet|hostel|food/.test(lower)) return CASES.restaurante;
  if (/cl[íi]nica|salud|m[eé]dico|dentist|psicol|health|doctor/.test(lower)) return CASES.clinica;
  if (/inmob|real estate|piso|casa|alquil|propert/.test(lower)) return CASES.inmobiliaria;
  if (/tienda|shop|ecom|store|ventas|product/.test(lower)) return CASES.ecommerce;
  if (/gimnasio|gym|fitness|sport|deport/.test(lower)) return CASES.gimnasio;
  if (/agencia|agenc|consult|marketing|studio/.test(lower)) return CASES.agencia;
  return null;
}

// ─── Commands ─────────────────────────────────────────────────────────────────

const COMMANDS: Record<string, (input: string, ctx: BotContext) => RunResult> = {

  help: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Available commands ──", "── Comandos disponibles ──", locale) },
      { kind: "bot", text: t("about · skills · projects · experience · education", "about · skills · projects · experience · education", locale) },
      { kind: "bot", text: t("contact · download_cv · language · clear", "contact · download_cv · language · clear", locale) },
      sep(),
      { kind: "system", text: t("── Smart commands ──", "── Comandos inteligentes ──", locale) },
      { kind: "bot", text: t("faq             — Common questions", "faq             — Preguntas frecuentes", locale) },
      { kind: "bot", text: t("compare         — Web vs Automation vs Chatbot", "compare         — Web vs Automatización vs Chatbot", locale) },
      { kind: "bot", text: t("quote           — Get an estimate for your project", "presupuesto     — Obtener estimación de tu proyecto", locale) },
      { kind: "bot", text: t("case <sector>   — Examples: restaurant, clinic…", "caso <sector>   — Ejemplos: restaurante, clínica…", locale) },
      { kind: "bot", text: t("roadmap         — How a project unfolds", "roadmap         — Cómo se desarrolla un proyecto", locale) },
      { kind: "bot", text: t("availability    — Current availability", "disponibilidad  — Disponibilidad actual", locale) },
      { kind: "bot", text: t("stack_recommendation — Best stack for your need", "recomienda_stack — Mejor stack para tu necesidad", locale) },
      sep(),
      { kind: "bot", text: t("Or just ask in plain language — I understand both EN and ES.", "O pregunta en lenguaje natural — entiendo ES e EN.", locale) },
    ],
  }),

  about: (_input, { locale }) => ({
    lines: [
      { kind: "bot", text: dictionary.about.bio[locale] },
      { kind: "bot", text: dictionary.about.interests[locale] },
      { kind: "bot", text: t("Bilingual: English & Spanish (Native/Bilingual).", "Bilingüe: inglés y español (Nativo/Bilingüe).", locale) },
    ],
    scrollTo: "about",
  }),

  skills: (_input, { locale }) => ({
    lines: [
      ...skillCategories.flatMap<BotLine>((cat) => [
        { kind: "system", text: dictionary.skills.categories[cat.id][locale] },
        { kind: "bot", text: cat.items.map((s) => s.label).join(" · ") },
      ]),
      sep(),
      { kind: "action", text: t("→ Go to Skills section", "→ Ir a Habilidades", locale), action: { type: "scroll", target: "skills" } },
    ],
  }),

  projects: (_input, { locale }) => ({
    lines: [
      ...projects.map<BotLine>((p) => ({ kind: "bot", text: `• ${p.title} — ${p.short[locale]}` })),
      sep(),
      { kind: "action", text: t("→ Go to Projects section", "→ Ir a Proyectos", locale), action: { type: "scroll", target: "projects" } },
    ],
  }),

  experience: (_input, { locale }) => ({
    lines: [
      ...workTimeline.map<BotLine>((t: TimelineEntry) => ({
        kind: "bot",
        text: `• ${t.title[locale]} @ ${t.org} (${t.period[locale]})`,
      })),
      sep(),
      { kind: "action", text: t("→ Go to Experience section", "→ Ir a Experiencia", locale), action: { type: "scroll", target: "experience" } },
    ],
  }),

  education: (_input, { locale }) => ({
    lines: [
      ...educationTimeline.map<BotLine>((t: TimelineEntry) => ({
        kind: "bot",
        text: `• ${t.title[locale]} @ ${t.org} (${t.period[locale]})`,
      })),
      sep(),
      { kind: "action", text: t("→ Go to Education section", "→ Ir a Educación", locale), action: { type: "scroll", target: "experience" } },
    ],
  }),

  contact: (_input, { locale }) => ({
    lines: [
      { kind: "bot", text: dictionary.bot.contactSummary[locale] },
      { kind: "link", text: `LinkedIn → ${contact.linkedin}`, href: contact.linkedin },
      { kind: "link", text: `WhatsApp → wa.me/${contact.whatsappNumber}`, href: `https://wa.me/${contact.whatsappNumber}` },
      { kind: "link", text: `Email → ${contact.email}`, href: `mailto:${contact.email}` },
      { kind: "link", text: `GitHub → github.com/Nacho0520`, href: contact.github },
      sep(),
      { kind: "action", text: t("→ Go to Contact section", "→ Ir a Contacto", locale), action: { type: "scroll", target: "contact" } },
    ],
  }),

  download_cv: (_input, { locale }) => ({
    lines: [
      { kind: "success", text: dictionary.bot.downloadingCv[locale] },
      { kind: "link", text: "/api/cv — Ignacio_Hemmings_CV.pdf", href: "/api/cv" },
    ],
  }),

  language: (_input, ctx) => {
    const next: Locale = ctx.locale === "es" ? "en" : "es";
    return {
      lines: [{ kind: "success", text: dictionary.bot.languageToggled[ctx.locale] }],
      switchLocale: next,
    };
  },

  clear: (_input, ctx) => {
    ctx.clear();
    return { lines: [] };
  },

  // ── New smart commands ──────────────────────────────────────────────────────

  faq: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Frequently Asked Questions ──", "── Preguntas Frecuentes ──", locale) },
      sep(),
      { kind: "system", text: t("Q: How much does a project cost?", "P: ¿Cuánto cuesta un proyecto?", locale) },
      { kind: "bot", text: t("It depends on scope and complexity. Type 'quote' for a personalised estimate.", "Depende del alcance. Escribe 'presupuesto' para una estimación personalizada.", locale) },
      sep(),
      { kind: "system", text: t("Q: How long does it take?", "P: ¿Cuánto tiempo tarda?", locale) },
      { kind: "bot", text: t("Simple landing: ~1–2 weeks. Full site + automations: 3–6 weeks. Chatbot: 1–3 weeks.", "Landing simple: ~1–2 semanas. Web completa + automatizaciones: 3–6 semanas. Chatbot: 1–3 semanas.", locale) },
      sep(),
      { kind: "system", text: t("Q: Do you provide post-launch support?", "P: ¿Ofreces soporte post-lanzamiento?", locale) },
      { kind: "bot", text: t("Yes, a free 1-month bug-fix period is included. Extended support can be agreed per project.", "Sí, incluye 1 mes de corrección de bugs. El soporte extendido se acuerda por proyecto.", locale) },
      sep(),
      { kind: "system", text: t("Q: Can you work with existing tools?", "P: ¿Puedes trabajar con herramientas existentes?", locale) },
      { kind: "bot", text: t("Yes — Make, n8n, Notion, Google Sheets, WhatsApp Business, email providers and most APIs.", "Sí — Make, n8n, Notion, Google Sheets, WhatsApp Business, proveedores de email y la mayoría de APIs.", locale) },
      sep(),
      { kind: "system", text: t("Q: Do I need to have a domain or hosting?", "P: ¿Necesito tener dominio y hosting?", locale) },
      { kind: "bot", text: t("Not necessarily. I can advise and set it up as part of the project at minimal extra cost.", "No necesariamente. Puedo asesorarte y configurarlo como parte del proyecto a coste mínimo.", locale) },
    ],
  }),

  compare: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Service Comparison ──", "── Comparativa de Servicios ──", locale) },
      sep(),
      { kind: "system", text: t("🌐 Website", "🌐 Página Web", locale) },
      { kind: "bot", text: t("  Best for: online presence, credibility, sales", "  Ideal para: presencia online, credibilidad, ventas", locale) },
      { kind: "bot", text: t("  Timeline: 1–4 weeks   Complexity: Low–Medium", "  Plazo: 1–4 semanas   Complejidad: Baja–Media", locale) },
      { kind: "bot", text: t("  Impact: Visible 24/7, SEO, professional image", "  Impacto: Visible 24/7, SEO, imagen profesional", locale) },
      sep(),
      { kind: "system", text: t("⚙️  AI Automation", "⚙️  Automatización IA", locale) },
      { kind: "bot", text: t("  Best for: saving time, removing manual tasks, scaling", "  Ideal para: ahorrar tiempo, eliminar tareas manuales, escalar", locale) },
      { kind: "bot", text: t("  Timeline: 1–3 weeks   Complexity: Medium", "  Plazo: 1–3 semanas   Complejidad: Media", locale) },
      { kind: "bot", text: t("  Impact: Save 10–30 hrs/month, reduce errors", "  Impacto: Ahorra 10–30 h/mes, reduce errores", locale) },
      sep(),
      { kind: "system", text: t("🤖 Chatbot", "🤖 Chatbot", locale) },
      { kind: "bot", text: t("  Best for: customer support, lead capture, FAQs 24/7", "  Ideal para: atención al cliente, captación de leads, FAQs 24/7", locale) },
      { kind: "bot", text: t("  Timeline: 1–2 weeks   Complexity: Low–Medium", "  Plazo: 1–2 semanas   Complejidad: Baja–Media", locale) },
      { kind: "bot", text: t("  Impact: Never miss a message, qualify leads automatically", "  Impacto: Sin mensajes perdidos, cualifica leads automáticamente", locale) },
      sep(),
      { kind: "bot", text: t("💡 Not sure? Type 'quote' and I'll recommend based on your needs.", "💡 ¿Dudas? Escribe 'presupuesto' y te recomendaré según tu caso.", locale) },
    ],
  }),

  quote: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Project Brief ──", "── Brief de Proyecto ──", locale) },
      { kind: "bot", text: t("I'll ask you 5 quick questions to give you a rough estimate and pre-fill a message to send Ignacio.", "Te haré 5 preguntas rápidas para darte una estimación orientativa y preparar un mensaje para Ignacio.", locale) },
      { kind: "bot", text: t("Type 'cancel' at any time to stop.", "Escribe 'cancelar' en cualquier momento para salir.", locale) },
      sep(),
      { kind: "system", text: QUOTE_STEPS.type.prompt[locale] },
    ],
    newFlowState: { name: "quote", step: 0, data: {} },
  }),

  case: (input, { locale }) => {
    const sector = input.replace(/^(case|caso)\s*/i, "").trim();
    const caseData = resolveCaseSector(sector || input);

    if (!caseData) {
      return {
        lines: [
          { kind: "bot", text: t(`No example found for "${sector}". Try: restaurant, clinic, estate agent, e-commerce, gym, agency.`, `No encontré un ejemplo para "${sector}". Prueba: restaurante, clínica, inmobiliaria, ecommerce, gimnasio, agencia.`, locale) },
        ],
      };
    }

    return {
      lines: [
        { kind: "system", text: `── ${caseData.name} ──` },
        ...caseData.lines.map<BotLine>((l) => ({ kind: "bot", text: `• ${l[locale]}` })),
        sep(),
        { kind: "bot", text: t("Type 'quote' to get an estimate for your project.", "Escribe 'presupuesto' para una estimación de tu proyecto.", locale) },
      ],
    };
  },

  roadmap: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Project Roadmap ──", "── Fases del Proyecto ──", locale) },
      { kind: "bot", text: t("1. Discovery (1–3 days) — goals, audience, reference sites", "1. Discovery (1–3 días) — objetivos, audiencia, referencias", locale) },
      { kind: "bot", text: t("2. Proposal (1–2 days) — scope, timeline, budget agreed", "2. Propuesta (1–2 días) — alcance, plazo y presupuesto acordado", locale) },
      { kind: "bot", text: t("3. Design (3–7 days) — wireframes, style guide, feedback", "3. Diseño (3–7 días) — wireframes, guía de estilo, feedback", locale) },
      { kind: "bot", text: t("4. Build (1–4 weeks) — development, integrations, testing", "4. Desarrollo (1–4 semanas) — código, integraciones, pruebas", locale) },
      { kind: "bot", text: t("5. Launch (1–2 days) — deploy, domain, final checks", "5. Lanzamiento (1–2 días) — despliegue, dominio, revisión final", locale) },
      { kind: "bot", text: t("6. Support (1 month included) — bug fixes, minor tweaks", "6. Soporte (1 mes incluido) — corrección de bugs, ajustes menores", locale) },
      sep(),
      { kind: "bot", text: t("Type 'quote' to kick off a real brief.", "Escribe 'presupuesto' para empezar un brief real.", locale) },
    ],
  }),

  availability: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Current Availability ──", "── Disponibilidad Actual ──", locale) },
      { kind: "success", text: t("✓ Available for freelance projects", "✓ Disponible para proyectos freelance", locale) },
      { kind: "bot", text: t("Capacity: 1–2 projects simultaneously.", "Capacidad: 1–2 proyectos simultáneos.", locale) },
      { kind: "bot", text: t("Start date: immediate or within 1 week.", "Inicio: inmediato o en menos de 1 semana.", locale) },
      { kind: "bot", text: t("Formats: fixed-price projects, hourly consulting, or retainer.", "Formatos: proyecto precio fijo, consultoría por horas o retainer.", locale) },
      sep(),
      { kind: "bot", text: t("Type 'quote' to get the ball rolling!", "Escribe 'presupuesto' para ponernos en marcha.", locale) },
      { kind: "action", text: t("→ Go to Contact", "→ Ir a Contacto", locale), action: { type: "scroll", target: "contact" } },
    ],
  }),

  stack_recommendation: (_input, { locale }) => ({
    lines: [
      { kind: "system", text: t("── Stack Recommendations ──", "── Recomendaciones de Stack ──", locale) },
      sep(),
      { kind: "system", text: t("For a fast, modern website:", "Para una web rápida y moderna:", locale) },
      { kind: "bot", text: "→ Next.js · React · Tailwind CSS · Vercel" },
      sep(),
      { kind: "system", text: t("For AI automations:", "Para automatizaciones con IA:", locale) },
      { kind: "bot", text: "→ Make · n8n · Python · OpenAI API" },
      sep(),
      { kind: "system", text: t("For a business chatbot:", "Para un chatbot de negocio:", locale) },
      { kind: "bot", text: "→ Flowise · LangChain · WhatsApp Business API" },
      sep(),
      { kind: "system", text: t("For a data pipeline / reporting:", "Para pipeline de datos / reporting:", locale) },
      { kind: "bot", text: "→ BigQuery · Python · R · MicroStrategy · Looker Studio" },
      sep(),
      { kind: "bot", text: t("Tell me your specific need and I'll go deeper.", "Cuéntame tu necesidad concreta y profundizo.", locale) },
    ],
  }),

  propose: (input, { locale }) => {
    const raw = input.replace(/^(propose|propuesta)\s*/i, "").trim().toLowerCase();
    let type = "web";
    if (/auto|workflow|automatiz/.test(raw)) type = "automation";
    else if (/chat|bot/.test(raw)) type = "chatbot";

    const proposals: Record<string, { title: string; lines: { en: string; es: string }[] }> = {
      web: {
        title: t("Website Proposal Template", "Plantilla de Propuesta Web", locale),
        lines: [
          { en: "Scope: Custom responsive website (5–8 pages)", es: "Alcance: Web responsive a medida (5–8 páginas)" },
          { en: "Includes: Home, About, Services, Blog/Portfolio, Contact", es: "Incluye: Inicio, Sobre mí, Servicios, Blog/Portfolio, Contacto" },
          { en: "Tech: Next.js + Tailwind CSS + CMS (optional)", es: "Tech: Next.js + Tailwind CSS + CMS (opcional)" },
          { en: "SEO: Meta tags, sitemap, OG image", es: "SEO: Meta tags, sitemap, imagen OG" },
          { en: "Delivery: 2–3 weeks", es: "Entrega: 2–3 semanas" },
          { en: "Support: 1 month post-launch included", es: "Soporte: 1 mes post-lanzamiento incluido" },
        ],
      },
      automation: {
        title: t("Automation Proposal Template", "Plantilla de Propuesta Automatización", locale),
        lines: [
          { en: "Scope: End-to-end workflow automation", es: "Alcance: Automatización de flujo de trabajo completo" },
          { en: "Tools: Make / n8n + your existing platforms", es: "Herramientas: Make / n8n + tus plataformas actuales" },
          { en: "Phases: Audit → Design → Build → Test → Hand-off", es: "Fases: Auditoría → Diseño → Construcción → Test → Entrega" },
          { en: "Delivery: 1–3 weeks", es: "Entrega: 1–3 semanas" },
          { en: "Docs: Full documentation + walkthrough video", es: "Docs: Documentación completa + video explicativo" },
        ],
      },
      chatbot: {
        title: t("Chatbot Proposal Template", "Plantilla de Propuesta Chatbot", locale),
        lines: [
          { en: "Scope: Custom chatbot for website / WhatsApp / Telegram", es: "Alcance: Chatbot a medida para web / WhatsApp / Telegram" },
          { en: "Knowledge base: your FAQs, docs, and product info", es: "Base de conocimiento: tus FAQs, documentos e info de producto" },
          { en: "Tools: Flowise + LangChain + chosen channel", es: "Herramientas: Flowise + LangChain + canal elegido" },
          { en: "Handoff: escalation to human when needed", es: "Traspaso: escalado a humano cuando sea necesario" },
          { en: "Delivery: 1–2 weeks", es: "Entrega: 1–2 semanas" },
        ],
      },
    };

    const proposal = proposals[type];
    return {
      lines: [
        { kind: "system", text: `── ${proposal.title} ──` },
        ...proposal.lines.map<BotLine>((l) => ({ kind: "bot", text: `  • ${l[locale]}` })),
        sep(),
        { kind: "bot", text: t("Type 'quote' to personalise this for your project.", "Escribe 'presupuesto' para personalizar esta propuesta.", locale) },
      ],
    };
  },
};

// ─── Command aliases ──────────────────────────────────────────────────────────

const aliases: Record<string, string> = {
  "?": "help", ayuda: "help",
  sobre: "about", bio: "about", whoami: "about",
  habilidades: "skills",
  proyectos: "projects",
  experiencia: "experience",
  educacion: "education", educación: "education",
  contacto: "contact", contactar: "contact", social: "contact", linkedin: "contact", email: "contact", github: "contact",
  descargar_cv: "download_cv", curriculum: "download_cv",
  idioma: "language", lang: "language",
  limpiar: "clear", reset: "clear", cls: "clear",
  preguntas: "faq",
  comparar: "compare", comparativa: "compare",
  presupuesto: "quote", cotizacion: "quote", cotización: "quote",
  caso: "case",
  fases: "roadmap", proceso: "roadmap",
  disponibilidad: "availability", disponible: "availability",
  recomienda: "stack_recommendation", stack_rec: "stack_recommendation",
  propuesta: "propose",
};

// ─── Main runner ──────────────────────────────────────────────────────────────

export function runCommand(input: string, ctx: BotContext): RunResult {
  const raw = input.trim();
  if (!raw) return { lines: [] };

  // ── Active flow: route to flow handler ──
  if (ctx.flowState?.name === "quote") {
    return handleQuoteFlow(raw, ctx.flowState, ctx.locale);
  }

  const normalized = raw.toLowerCase();

  // ── Exact alias match ──
  const aliasTarget = aliases[normalized];
  if (aliasTarget && COMMANDS[aliasTarget]) {
    return COMMANDS[aliasTarget](raw, ctx);
  }

  // ── Direct command match ──
  const firstWord = normalized.split(/\s+/)[0];
  if (COMMANDS[firstWord]) {
    return COMMANDS[firstWord](raw, ctx);
  }

  // ── Intent classifier (keyword scoring) ──
  const intent = classifyIntent(raw);
  if (intent && COMMANDS[intent.command]) {
    return COMMANDS[intent.command](raw, ctx);
  }

  // ── Unknown ──
  return {
    lines: [
      { kind: "error", text: dictionary.bot.unknown[ctx.locale] },
      { kind: "bot", text: t("Try 'help' to see all commands, or ask in plain language.", "Escribe 'help' para ver todos los comandos, o pregunta en lenguaje natural.", ctx.locale) },
    ],
  };
}
