// Flat, modern vector illustration of Pakistan, safety, and technology.
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 420" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Illustration of Pakistan with safety and technology elements">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#01411C" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#01411C" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Background blob */}
      <rect x="20" y="20" width="440" height="380" rx="200" fill="url(#bgGrad)" />
      <circle cx="380" cy="80" r="40" fill="#bbf7d0" opacity="0.6" />
      <circle cx="60" cy="340" r="50" fill="#a7f3d0" opacity="0.5" />

      {/* Pakistan map silhouette (stylized) */}
      <g filter="url(#softShadow)">
        <path
          d="M150 130 C 130 140, 120 165, 130 185 C 110 195, 105 220, 125 235 C 130 255, 150 270, 175 270 C 190 285, 215 288, 230 275 C 250 280, 275 270, 280 250 C 300 245, 305 225, 290 210 C 300 195, 295 175, 275 170 C 280 150, 265 135, 245 140 C 230 125, 205 125, 195 140 C 175 130, 160 125, 150 130 Z"
          fill="url(#mapGrad)"
        />
      </g>

      {/* Crescent + star symbol on map */}
      <g transform="translate(200 195)">
        <path d="M12 0 A 12 12 0 1 0 16 11 A 9 9 0 1 1 12 0 Z" fill="#fff" />
        <path d="M20 4 L 22 10 L 28 10 L 23 14 L 25 20 L 20 16 L 15 20 L 17 14 L 12 10 L 18 10 Z" fill="#fff" />
      </g>

      {/* Floating shield (safety) */}
      <g filter="url(#softShadow)" transform="translate(300 110)">
        <path d="M30 0 L 55 10 L 55 35 C 55 50, 42 58, 30 62 C 18 58, 5 50, 5 35 L 5 10 Z" fill="url(#shieldGrad)" />
        <path d="M20 30 L 27 37 L 42 22" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* AI chat bubble (technology) */}
      <g filter="url(#softShadow)" transform="translate(60 90)">
        <rect x="0" y="0" width="80" height="56" rx="16" fill="white" />
        <path d="M20 56 L 16 68 L 32 56 Z" fill="white" />
        <circle cx="22" cy="28" r="4" fill="#01411C" />
        <circle cx="40" cy="28" r="4" fill="#34d399" />
        <circle cx="58" cy="28" r="4" fill="#01411C" />
      </g>

      {/* Notification/alert card */}
      <g filter="url(#softShadow)" transform="translate(310 280)">
        <rect x="0" y="0" width="120" height="50" rx="14" fill="white" />
        <circle cx="20" cy="25" r="10" fill="#fee2e2" />
        <path d="M20 20 L 20 26 M 20 30 L 20 30.5" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="38" y="16" width="60" height="6" rx="3" fill="#e2e8f0" />
        <rect x="38" y="28" width="44" height="6" rx="3" fill="#e2e8f0" />
      </g>

      {/* Small location pin */}
      <g transform="translate(245 250)">
        <path d="M0 0 C -8 0, -12 8, -6 16 L 0 24 L 6 16 C 12 8, 8 0, 0 0 Z" fill="#f59e0b" />
        <circle cx="0" cy="8" r="3.5" fill="white" />
      </g>

      {/* Sparkle accents */}
      <g fill="#34d399">
        <path d="M380 200 L 384 208 L 392 212 L 384 216 L 380 224 L 376 216 L 368 212 L 376 208 Z" opacity="0.7" />
        <circle cx="120" cy="250" r="3" opacity="0.5" />
        <circle cx="340" cy="180" r="3" opacity="0.5" />
      </g>
    </svg>
  )
}
