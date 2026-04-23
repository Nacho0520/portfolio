# Ignacio Hemmings — Interactive Portfolio

<p align="center">
  <strong>ES:</strong> Portfolio SPA bilingue (ES/EN) con enfoque en desarrollo web, IA aplicada y UX moderna.<br/>
  <strong>EN:</strong> Bilingual (ES/EN) SPA portfolio focused on web development, applied AI, and modern UX.
</p>

<p align="center">
  <a href="https://nextjs.org/">Next.js 16</a> ·
  <a href="https://react.dev/">React 19</a> ·
  <a href="https://www.typescriptlang.org/">TypeScript</a> ·
  <a href="https://tailwindcss.com/">Tailwind CSS v4</a> ·
  <a href="https://www.framer.com/motion/">Framer Motion</a>
</p>

---

## ES — Que es este proyecto

Este repositorio contiene el portfolio personal de **Ignacio Hemmings**: una web de una sola pagina (SPA) pensada para presentar perfil profesional, proyectos, experiencia y formas de contacto de manera visual, clara y rapida.

El disenio sigue la identidad del portfolio: estilo moderno, contraste alto, microinteracciones suaves, narrativa por secciones y componentes reutilizables.

## EN — What this project is

This repository contains **Ignacio Hemmings'** personal portfolio: a single-page web app (SPA) designed to present professional profile, projects, experience, and contact options in a visual, clear, and fast way.

The design follows the portfolio identity: modern style, high contrast, smooth microinteractions, section-based storytelling, and reusable components.

## ES/EN — Caracteristicas | Features

- ES: Modo oscuro y claro con cambio instantaneo.  
  EN: Dark/light mode with instant switch.
- ES: Internacionalizacion completa en espaniol e ingles.  
  EN: Full internationalization in Spanish and English.
- ES: Secciones estructuradas (About, Servicios, Skills, Proyectos, Trayectoria, Contacto).  
  EN: Structured sections (About, Services, Skills, Projects, Journey, Contact).
- ES: Vista previa interactiva de DayClose integrada en la pagina.  
  EN: Interactive in-page DayClose live preview.
- ES: Terminal interactiva "Ignacio-Bot" con comandos ES/EN.  
  EN: Interactive "Ignacio-Bot" terminal with ES/EN commands.
- ES: Contacto por email y WhatsApp desde formulario.  
  EN: Direct email and WhatsApp contact from the form.
- ES: SEO para compartir enlaces (Open Graph, Twitter cards, JSON-LD, sitemap, robots).  
  EN: Share-friendly SEO (Open Graph, Twitter cards, JSON-LD, sitemap, robots).

## ES/EN — Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS v4
- **Language:** TypeScript
- **Animation:** Framer Motion
- **Icons:** lucide-react + react-icons
- **UI Accessibility:** Radix Tooltip

## ES/EN — Demo

If deployed, add your production link here:

```txt
https://TU-DOMINIO.vercel.app
```

## ES/EN — Local Development

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## ES/EN — Production Build

```bash
npm run build
npm run start
```

## ES/EN — Project Structure

```txt
app/                App Router routes, SEO metadata, sitemap, robots
components/
  layout/           Navbar, Footer, Providers, toggles
  sections/         Hero, About, Services, Skills, Projects, Experience, Contact
  ui/               Reusable visual components
  bot/              IgnacioBotTerminal + command registry
lib/
  content.ts        Portfolio data (skills, projects, experience, contact)
  i18n/             Dictionary + ES/EN locale provider
  theme/            Light/dark theme provider
public/
  cv/               CV PDF file
  logos/            Organization and brand logos
```

## ES/EN — Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - Linting

## ES/EN — Contact Form Notes

- ES: El formulario abre cliente de correo (`mailto`) o WhatsApp (`wa.me`) con mensaje precargado.
- EN: The form opens email client (`mailto`) or WhatsApp (`wa.me`) with prefilled message.
- ES: No guarda datos en base de datos ni usa backend propio para envio.
- EN: It does not store data in a database nor send through a custom backend.

## ES/EN — Deployment

Prepared for Vercel:

```bash
vercel --prod
```

## ES/EN — Author

**Ignacio Hemmings**

- LinkedIn: [linkedin.com/in/ignaciohemmings](https://www.linkedin.com/in/ignaciohemmings/)
- GitHub: [github.com/Nacho0520](https://github.com/Nacho0520)

---

ES: Si te resulta util este proyecto o su enfoque visual, puedes usarlo como referencia para construir tu propio portfolio.  
EN: If this project or its visual approach is useful to you, feel free to use it as reference for your own portfolio.
