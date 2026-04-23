import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { NeuralBackground } from "@/components/effects/NeuralBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ignaciohemmings.dev";
const TITLE = "Ignacio Hemmings — Full-stack & AI Developer";
const DESCRIPTION =
  "Ignacio Hemmings Jiménez. I build modern websites, AI automations and chatbots. Available for projects in 2026.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
    { media: "(prefers-color-scheme: light)", color: "#fffaf5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Ignacio Hemmings",
  },
  description: DESCRIPTION,
  applicationName: "Ignacio Hemmings Portfolio",
  authors: [{ name: "Ignacio Hemmings Jiménez", url: SITE_URL }],
  creator: "Ignacio Hemmings Jiménez",
  publisher: "Ignacio Hemmings Jiménez",
  keywords: [
    "Ignacio Hemmings",
    "Ignacio Hemmings Jiménez",
    "Hemmings developer",
    "Portfolio",
    "Full-stack Developer",
    "AI Specialist",
    "Next.js",
    "React",
    "Automations",
    "Chatbots",
    "Web development",
    "Bet365",
    "University of Gibraltar",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      es: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["es_ES"],
    url: SITE_URL,
    siteName: "Ignacio Hemmings",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Ignacio Hemmings — Full-stack & AI Developer",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.svg"],
    creator: "@ignaciohemmings",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ignacio Hemmings Jiménez",
  alternateName: "Ignacio Hemmings",
  url: SITE_URL,
  jobTitle: "Full-stack Developer & AI Specialist",
  description: DESCRIPTION,
  email: "mailto:hemmings.nacho@gmail.com",
  telephone: "+34622339628",
  knowsLanguage: ["es", "en"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Gibraltar",
  },
  worksFor: {
    "@type": "Organization",
    name: "Bet365",
  },
  sameAs: [
    "https://www.linkedin.com/in/ignacio-hemmings/",
    "https://dayclose.vercel.app",
  ],
  knowsAbout: [
    "Web development",
    "Artificial intelligence",
    "LLMs",
    "Next.js",
    "React",
    "Automation",
    "Chatbots",
  ],
  offers: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Web development" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "AI automations" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Chatbots" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`try{var t=localStorage.getItem('portfolio.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}`}</Script>
      </head>
      <body className="relative min-h-screen bg-bg-base text-fg-base">
        <Providers>
          <NeuralBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </Providers>
        <Script
          id="ld-json-person"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}
