import Image from "next/image";
import type { SVGProps } from "react";

export type BrandLogoId = "uog" | "bet365" | "concert" | "piscina";

function cls(className?: string) {
  return className ?? "";
}

/**
 * University of Gibraltar — official logo from unigib.edu.gi
 * White PNG rendered with invert in dark mode so it is always legible.
 */
export function UoGLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      {/* Logo is white PNG: always invert to match theme */}
      <Image
        src="/logos/uog-logo-2x.png"
        alt="University of Gibraltar"
        width={200}
        height={56}
        className="uog-logo h-full w-auto object-contain"
        unoptimized
      />
    </span>
  );
}

/**
 * Bet365 — faithful pill wordmark in official green + yellow
 */
export function Bet365Logo({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 220 72"
      role="img"
      aria-label="Bet365"
      className={cls(className)}
      {...rest}
    >
      <defs>
        <linearGradient id="b365-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f6b3a" />
          <stop offset="100%" stopColor="#064021" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="212" height="56" rx="12" fill="url(#b365-bg)" stroke="#ffe900" strokeWidth="1.5" />
      <text
        x="110"
        y="48"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="30"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="#ffe900"
      >
        bet365
      </text>
    </svg>
  );
}

/**
 * Concert Music Festival — stage lights + sound wave icon
 */
export function ConcertLogo({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 260 80"
      role="img"
      aria-label="Concert Music Festival"
      className={cls(className)}
      {...rest}
    >
      {/* Icon: stage spotlights + crowd silhouette */}
      <g transform="translate(6 4)">
        {/* Stage platform */}
        <rect x="0" y="62" width="66" height="6" rx="2" fill="currentColor" opacity="0.35" />

        {/* Crowd silhouettes */}
        {/* person 1 */}
        <ellipse cx="10" cy="57" rx="4" ry="6" fill="currentColor" opacity="0.45" />
        <circle cx="10" cy="48" r="4" fill="currentColor" opacity="0.45" />
        {/* person 2 (raised arm) */}
        <ellipse cx="24" cy="56" rx="4" ry="7" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="46" r="4" fill="currentColor" opacity="0.5" />
        <line x1="24" y1="50" x2="18" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        {/* person 3 */}
        <ellipse cx="38" cy="57" rx="4" ry="6" fill="currentColor" opacity="0.45" />
        <circle cx="38" cy="48" r="4" fill="currentColor" opacity="0.45" />
        {/* person 4 (raised arm) */}
        <ellipse cx="52" cy="56" rx="4" ry="7" fill="currentColor" opacity="0.5" />
        <circle cx="52" cy="46" r="4" fill="currentColor" opacity="0.5" />
        <line x1="52" y1="50" x2="58" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

        {/* Left spotlight beam */}
        <polygon points="6,2 18,2 30,38 0,38" fill="#f97316" opacity="0.28" />
        <circle cx="12" cy="5" r="5" fill="#fbbf24" opacity="0.9" />
        <circle cx="12" cy="5" r="3" fill="#fff" opacity="0.8" />

        {/* Right spotlight beam */}
        <polygon points="48,2 60,2 66,38 36,38" fill="#fb923c" opacity="0.22" />
        <circle cx="54" cy="5" r="5" fill="#fbbf24" opacity="0.9" />
        <circle cx="54" cy="5" r="3" fill="#fff" opacity="0.8" />

        {/* Centre top laser beam */}
        <line x1="33" y1="0" x2="33" y2="36" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Wordmark */}
      <g transform="translate(86 14)" fill="currentColor">
        <text
          x="0"
          y="26"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fontWeight="900"
          letterSpacing="4"
        >
          CONCERT
        </text>
        <text
          x="0"
          y="50"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="500"
          letterSpacing="5"
          opacity="0.65"
        >
          MUSIC FESTIVAL
        </text>
      </g>
    </svg>
  );
}

/**
 * La Piscina – Pizza & Copas — official logo image
 */
export function PiscinaLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ""}`}>
      <Image
        src="/logos/piscina-logo.png"
        alt="La Piscina – Pizza & Copas"
        width={200}
        height={80}
        className="piscina-logo h-full w-auto object-contain"
        unoptimized
      />
    </span>
  );
}

/**
 * @deprecated – kept for type compatibility, replaced by real logo above
 */
function _PiscinaLogoSvg({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 260 80"
      role="img"
      aria-label="Pizzería Piscina"
      className={cls(className)}
      {...rest}
    >
      {/* Icon: pizza slice */}
      <g transform="translate(6 4)">
        {/* Crust arc */}
        <path
          d="M36 6 A30 30 0 0 1 66 36"
          fill="none"
          stroke="#d97706"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Slice triangle */}
        <polygon
          points="36,6 66,36 36,70"
          fill="#fbbf24"
          opacity="0.85"
        />
        {/* Cheese layer */}
        <polygon
          points="38,14 62,38 38,62"
          fill="#fde68a"
          opacity="0.9"
        />
        {/* Toppings */}
        <circle cx="46" cy="28" r="4" fill="#dc2626" opacity="0.85" />
        <circle cx="38" cy="44" r="3.5" fill="#dc2626" opacity="0.85" />
        <circle cx="52" cy="42" r="3" fill="#16a34a" opacity="0.85" />
        {/* Crust fill */}
        <path
          d="M36 6 A30 30 0 0 1 66 36"
          fill="none"
          stroke="#92400e"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.3"
        />
      </g>

      {/* Wordmark */}
      <g transform="translate(84 10)" fill="currentColor">
        <text
          x="0"
          y="22"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="12"
          fontStyle="italic"
          fontWeight="400"
          opacity="0.65"
          letterSpacing="1"
        >
          Pizzería
        </text>
        <text
          x="0"
          y="52"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="30"
          fontWeight="800"
          letterSpacing="1"
        >
          Piscina
        </text>
      </g>
    </svg>
  );
}

const svgLogoMap: Partial<Record<BrandLogoId, React.ComponentType<SVGProps<SVGSVGElement>>>> = {
  bet365: Bet365Logo,
  concert: ConcertLogo,
};

export function BrandLogo({
  id,
  className,
}: {
  id: BrandLogoId;
  className?: string;
}) {
  if (id === "uog") return <UoGLogo className={className} />;
  if (id === "piscina") return <PiscinaLogo className={className} />;
  const Logo = svgLogoMap[id];
  if (!Logo) return null;
  return <Logo className={className} />;
}
