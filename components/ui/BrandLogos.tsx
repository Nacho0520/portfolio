import type { SVGProps } from "react";

export type BrandLogoId = "uog" | "bet365" | "concert" | "piscina";

function cls(className?: string) {
  return className ?? "";
}

/**
 * University of Gibraltar — stylised crest-style wordmark
 * (custom artwork, no official assets)
 */
export function UoGLogo({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 72"
      role="img"
      aria-label="University of Gibraltar"
      className={cls(className)}
      {...rest}
    >
      <defs>
        <linearGradient id="uog-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9302c" />
          <stop offset="100%" stopColor="#7a1f1c" />
        </linearGradient>
        <linearGradient id="uog-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <g transform="translate(6 6)">
        <path
          d="M30 2 L54 2 L58 14 C58 38 46 56 30 60 C14 56 2 38 2 14 L6 2 Z"
          fill="url(#uog-shield)"
          stroke="#fde68a"
          strokeWidth="1.5"
        />
        <path
          d="M12 18 L48 18 L44 12 L38 16 L30 10 L22 16 L16 12 Z"
          fill="url(#uog-crown)"
        />
        <circle cx="30" cy="20" r="2" fill="#fde68a" />
        <text
          x="30"
          y="44"
          textAnchor="middle"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="16"
          fontWeight="700"
          fill="#fde68a"
          letterSpacing="0.5"
        >
          UoG
        </text>
      </g>

      <g transform="translate(78 0)" fill="currentColor">
        <text
          x="0"
          y="30"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.2"
        >
          University of
        </text>
        <text
          x="0"
          y="54"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="0.3"
        >
          Gibraltar
        </text>
      </g>
    </svg>
  );
}

/**
 * Bet365 — stylised wordmark in brand-inspired yellow/green colours
 */
export function Bet365Logo({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
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
      <rect
        x="4"
        y="8"
        width="212"
        height="56"
        rx="12"
        fill="url(#b365-bg)"
        stroke="#ffe900"
        strokeWidth="1.5"
      />
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
 * Concert Music Festival — custom wordmark
 */
export function ConcertLogo({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 72"
      role="img"
      aria-label="Concert Music Festival"
      className={cls(className)}
      {...rest}
    >
      <g transform="translate(8 8)" fill="none">
        <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <path
          d="M16 32 C 20 20, 36 20, 40 32"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="18" cy="34" r="4" fill="#fbbf24" />
        <circle cx="38" cy="34" r="4" fill="#f97316" />
      </g>
      <g transform="translate(72 0)" fill="currentColor">
        <text
          x="0"
          y="30"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="3"
        >
          CONCERT
        </text>
        <text
          x="0"
          y="52"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="12"
          fontWeight="500"
          letterSpacing="4"
          opacity="0.7"
        >
          MUSIC FESTIVAL
        </text>
      </g>
    </svg>
  );
}

/**
 * Pizzería Piscina — custom wordmark
 */
export function PiscinaLogo({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 72"
      role="img"
      aria-label="Pizzería Piscina"
      className={cls(className)}
      {...rest}
    >
      <g transform="translate(8 8)">
        <circle cx="28" cy="28" r="26" fill="#fb7185" opacity="0.15" stroke="#fb7185" strokeWidth="2" />
        <circle cx="28" cy="28" r="18" fill="#fbbf24" opacity="0.25" />
        <circle cx="22" cy="22" r="2.5" fill="#fb7185" />
        <circle cx="34" cy="26" r="2.5" fill="#fb7185" />
        <circle cx="26" cy="34" r="2.5" fill="#14b8a6" />
        <circle cx="34" cy="36" r="2" fill="#fb7185" />
      </g>
      <g transform="translate(72 0)" fill="currentColor">
        <text
          x="0"
          y="28"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="13"
          fontStyle="italic"
          opacity="0.7"
        >
          Pizzería
        </text>
        <text
          x="0"
          y="54"
          fontFamily="ui-serif, Georgia, serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="1"
        >
          Piscina
        </text>
      </g>
    </svg>
  );
}

export const brandLogoMap: Record<BrandLogoId, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  uog: UoGLogo,
  bet365: Bet365Logo,
  concert: ConcertLogo,
  piscina: PiscinaLogo,
};

export function BrandLogo({
  id,
  className,
}: {
  id: BrandLogoId;
  className?: string;
}) {
  const Logo = brandLogoMap[id];
  return <Logo className={className} />;
}
