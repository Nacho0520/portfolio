import { contact, projects, skillCategories, timeline } from "@/lib/content";
import { dictionary, type Locale } from "@/lib/i18n/dictionary";

export type BotLine = {
  kind: "system" | "bot" | "user" | "success" | "error" | "link";
  text: string;
  href?: string;
};

export type BotContext = {
  locale: Locale;
  toggleLocale: () => void;
  clear: () => void;
};

type CommandHandler = (ctx: BotContext) => BotLine[];

const aliases: Record<string, string> = {
  help: "help",
  ayuda: "help",
  "?": "help",
  contact: "contact",
  contacto: "contact",
  contactar: "contact",
  download_cv: "download_cv",
  descargar_cv: "download_cv",
  cv: "download_cv",
  skills: "skills",
  habilidades: "skills",
  stack: "skills",
  projects: "projects",
  proyectos: "projects",
  experience: "experience",
  experiencia: "experience",
  education: "education",
  educacion: "education",
  about: "about",
  sobre: "about",
  bio: "about",
  language: "language",
  idioma: "language",
  lang: "language",
  clear: "clear",
  clean: "clear",
  reset: "clear",
  whoami: "about",
  social: "contact",
  linkedin: "contact",
  email: "contact",
};

const commands: Record<string, CommandHandler> = {
  help: ({ locale }) => [
    { kind: "bot", text: dictionary.bot.help[locale] },
  ],
  about: ({ locale }) => [
    { kind: "bot", text: dictionary.about.bio[locale] },
    { kind: "bot", text: dictionary.about.interests[locale] },
  ],
  skills: ({ locale }) => [
    ...skillCategories.map<BotLine>((cat) => ({
      kind: "bot",
      text: `${dictionary.skills.categories[cat.id][locale]}: ${cat.items
        .map((s) => s.label)
        .join(", ")}`,
    })),
  ],
  projects: ({ locale }) =>
    projects.map<BotLine>((p) => ({
      kind: "bot",
      text: `• ${p.title} — ${p.short[locale]}`,
    })),
  experience: ({ locale }) =>
    timeline
      .filter((t) => t.kind !== "education")
      .map<BotLine>((t) => ({
        kind: "bot",
        text: `• ${t.title[locale]} @ ${t.org} (${t.period[locale]})`,
      })),
  education: ({ locale }) =>
    timeline
      .filter((t) => t.kind === "education")
      .map<BotLine>((t) => ({
        kind: "bot",
        text: `• ${t.title[locale]} @ ${t.org} (${t.period[locale]})`,
      })),
  contact: ({ locale }) => [
    { kind: "bot", text: dictionary.bot.contactSummary[locale] },
    { kind: "link", text: `LinkedIn → ${contact.linkedin}`, href: contact.linkedin },
    { kind: "link", text: `mailto:${contact.email}`, href: `mailto:${contact.email}` },
  ],
  download_cv: ({ locale }) => [
    { kind: "success", text: dictionary.bot.downloadingCv[locale] },
    { kind: "link", text: "/api/cv", href: "/api/cv" },
  ],
  language: (ctx) => {
    ctx.toggleLocale();
    return [{ kind: "success", text: dictionary.bot.languageToggled[ctx.locale] }];
  },
  clear: (ctx) => {
    ctx.clear();
    return [{ kind: "system", text: dictionary.bot.clearing[ctx.locale] }];
  },
};

const keywordMap: Array<{ match: RegExp; command: string }> = [
  { match: /\b(cv|curriculum|curr[ií]culum|resume)\b/i, command: "download_cv" },
  { match: /\b(contact|contacto|contactar|email|phone|tel[eé]fono|linkedin)\b/i, command: "contact" },
  { match: /\b(skill|skills|tech|stack|habilidad)/i, command: "skills" },
  { match: /\b(project|proyecto|portfolio|portafolio)/i, command: "projects" },
  { match: /\b(experienc|work|trabajo|job)/i, command: "experience" },
  { match: /\b(educ|universi|degree|grado)/i, command: "education" },
  { match: /\b(about|sobre|bio|qui[eé]n|who)/i, command: "about" },
  { match: /\b(language|idioma|english|spanish|ingl[eé]s|espa[nñ]ol)/i, command: "language" },
  { match: /\b(help|ayuda)\b/i, command: "help" },
];

export function runCommand(input: string, ctx: BotContext): BotLine[] {
  const raw = input.trim();
  if (!raw) return [];

  const normalized = raw.toLowerCase();
  const alias = aliases[normalized];
  if (alias && commands[alias]) {
    return commands[alias](ctx);
  }

  const keyword = keywordMap.find((k) => k.match.test(normalized));
  if (keyword && commands[keyword.command]) {
    return commands[keyword.command](ctx);
  }

  return [{ kind: "error", text: dictionary.bot.unknown[ctx.locale] }];
}
