# Ignacio Hemmings — Portfolio

Single-page portfolio for **Ignacio Hemmings Jiménez** — *Junior full-stack developer and AI specialist*.
Built following the design spec: dark theme with violet/electric-blue neon accents, custom cursor,
neural background, bilingual toggle (EN/ES), scroll-narrative timeline and an interactive
`Ignacio-Bot` terminal.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Framer Motion** for reveals, magnetic buttons and the scroll timeline
- **Radix UI Tooltip** with 200 ms delay on every interactive control
- **react-icons** (`Si*`) for exact brand icons with hover color-to-brand transitions
- **lucide-react** for UI icons
- **Web Audio API** for optional UI sounds (no external assets)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Drop your CV at `public/cv/Ignacio_Hemmings_CV.pdf` to enable the `download_cv` / `descargar_cv`
terminal command.

## Scripts

- `npm run dev` – dev server with hot reload
- `npm run build` – production build
- `npm run start` – start the production server
- `npm run lint` – ESLint

## Project structure

```
app/                Next.js App Router (layout, page, /api/cv, sitemap, robots)
components/
  layout/           Navbar, Footer, Providers, Language & Sound toggles
  sections/         Hero, About, Skills, Projects, Experience, Contact
  effects/          CustomCursor, NeuralBackground
  ui/               MagneticButton, Tooltip, SpotlightCard, Pill, SectionHeading,
                    TypingText, LocalizedText, SkillIcon, BrandIcons
  bot/              IgnacioBotTerminal + commandRegistry
lib/
  i18n/             Dictionary (en/es) + I18nProvider + useT
  sounds/           SoundProvider (Web Audio synth, localStorage toggle)
  content.ts        Skills, projects, timeline and contact data
  cn.ts             clsx + tailwind-merge helper
```

## Deploy to Vercel

```bash
vercel --prod
```

Environment variables: none required. The app is fully static except the `/api/cv` route.

## Bot commands

The terminal supports both English and Spanish aliases:

- `help` / `ayuda`
- `about` / `sobre` / `bio`
- `skills` / `habilidades`
- `projects` / `proyectos`
- `experience` / `experiencia`
- `education` / `educacion`
- `contact` / `contactar`
- `download_cv` / `descargar_cv`
- `language` / `idioma`
- `clear` / `reset`

It also matches natural language questions via keyword rules (e.g. *"what's your stack?"*
routes to `skills`).

## Accessibility

- Custom cursor only replaces the native cursor on pointer-fine devices; keyboard navigation
  keeps the system cursor and shows a violet `:focus-visible` ring on every interactive element.
- Tooltips are built on Radix and exposed as `aria-describedby` when focused.
- Reduced-motion users get a static neural background.
