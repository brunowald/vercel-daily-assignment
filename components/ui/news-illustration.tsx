"use client"

export function NewsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <style>{`
          .ni-decor        { fill: #1c1c1c; }
          .ni-surface      { fill: #ffffff; }
          .ni-stroke-card  { stroke: #e5e7eb; }
          .ni-dark         { fill: #1c1c1c; }
          .ni-muted        { fill: #d1d5db; }
          .ni-globe-stroke { stroke: #2e2e2e; }
          .ni-globe-grid   { stroke: #404040; }
          .ni-device       { fill: #1c1c1c; }
          .ni-device-stroke { stroke: #2e2e2e; }
          .ni-screen       { fill: #ffffff; }
          .ni-notch        { fill: #0d0d0d; }

          @media (prefers-color-scheme: dark) {
            .ni-decor        { fill: #e5e7eb; }
            .ni-surface      { fill: #1e1e1e; }
            .ni-stroke-card  { stroke: #374151; }
            .ni-dark         { fill: #f3f4f6; }
            .ni-muted        { fill: #374151; }
            .ni-globe-stroke { stroke: #6b7280; }
            .ni-device       { fill: #374151; }
            .ni-device-stroke { stroke: #4b5563; }
            .ni-screen       { fill: #111827; }
            .ni-notch        { fill: #1f2937; }
          }
        `}</style>

        {/* Gradient for globe */}
        <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aaaaaa" />
          <stop offset="100%" stopColor="#b2b2b2" />
        </linearGradient>

        {/* Gradient for accent elements */}
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circles - decorative */}
      <circle cx="650" cy="100" r="80" className="ni-decor" opacity="0.3">
        <animate
          attributeName="r"
          values="80;90;80"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="100" cy="500" r="60" className="ni-decor" opacity="0.2">
        <animate
          attributeName="r"
          values="60;70;60"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Main Globe */}
      <g transform="translate(400, 300)">
        <circle r="120" fill="url(#globeGradient)" className="ni-globe-stroke" strokeWidth="2">
          <animate
            attributeName="stroke-opacity"
            values="0.5;1;0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Globe lines - latitude */}
        <ellipse rx="120" ry="40" fill="none" className="ni-globe-grid" strokeWidth="1" opacity="0.5" />
        <ellipse rx="120" ry="80" fill="none" className="ni-globe-grid" strokeWidth="1" opacity="0.5" />
        <ellipse rx="100" ry="100" fill="none" className="ni-globe-grid" strokeWidth="1" opacity="0.3" />

        {/* Globe lines - longitude */}
        <ellipse rx="40" ry="120" fill="none" className="ni-globe-grid" strokeWidth="1" opacity="0.5">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="20s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse rx="80" ry="120" fill="none" className="ni-globe-grid" strokeWidth="1" opacity="0.5">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="25s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Orbiting dot 1 */}
        <circle r="6" fill="#f97316" filter="url(#glow)">
          <animateMotion
            path="M0,-120 A120,120 0 1,1 0,120 A120,120 0 1,1 0,-120"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Orbiting dot 2 */}
        <circle r="4" fill="#ffffff" filter="url(#glow)">
          <animateMotion
            path="M-120,0 A120,120 0 1,1 120,0 A120,120 0 1,1 -120,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Newspaper icon - left side */}
      <g transform="translate(120, 200)">
        <rect
          x="0"
          y="0"
          width="140"
          height="180"
          rx="8"
          className="ni-surface ni-stroke-card"
          strokeWidth="2"
        >
          <animate
            attributeName="y"
            values="0;-5;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Newspaper header */}
        <rect x="15" y="15" width="110" height="12" rx="2" className="ni-dark">
          <animate
            attributeName="y"
            values="15;10;15"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Text lines */}
        <rect x="15" y="40" width="80" height="6" rx="1" className="ni-muted">
          <animate
            attributeName="y"
            values="40;35;40"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="15" y="55" width="100" height="6" rx="1" className="ni-muted">
          <animate
            attributeName="y"
            values="55;50;55"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="15" y="70" width="60" height="6" rx="1" className="ni-muted">
          <animate
            attributeName="y"
            values="70;65;70"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Image placeholder */}
        <rect x="15" y="90" width="110" height="60" rx="4" fill="#f97316" opacity="0.2">
          <animate
            attributeName="y"
            values="90;85;90"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* More text lines */}
        <rect x="15" y="160" width="70" height="6" rx="1" className="ni-muted">
          <animate
            attributeName="y"
            values="160;155;160"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Mobile device - right side */}
      <g transform="translate(560, 180)">
        <rect
          x="0"
          y="0"
          width="100"
          height="180"
          rx="12"
          className="ni-device ni-device-stroke"
          strokeWidth="2"
        >
          <animate
            attributeName="y"
            values="0;5;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Screen */}
        <rect x="8" y="20" width="84" height="140" rx="4" className="ni-screen">
          <animate
            attributeName="y"
            values="20;25;20"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* App content - news cards */}
        <rect x="14" y="30" width="72" height="35" rx="4" fill="#f97316" opacity="0.15">
          <animate
            attributeName="y"
            values="30;35;30"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="14" y="75" width="72" height="35" rx="4" className="ni-device" opacity="0.1">
          <animate
            attributeName="y"
            values="75;80;75"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="14" y="120" width="72" height="35" rx="4" className="ni-device" opacity="0.1">
          <animate
            attributeName="y"
            values="120;125;120"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Notch */}
        <rect x="35" y="6" width="30" height="8" rx="4" className="ni-notch">
          <animate
            attributeName="y"
            values="6;11;6"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Speech bubbles / notifications */}
      <g transform="translate(280, 120)">
        <rect x="0" y="0" width="80" height="45" rx="8" className="ni-surface ni-stroke-card" strokeWidth="1">
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <polygon points="20,45 30,60 40,45" className="ni-surface ni-stroke-card" strokeWidth="1">
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </polygon>
        <rect x="10" y="12" width="50" height="5" rx="1" className="ni-dark" opacity="0.6" />
        <rect x="10" y="22" width="60" height="5" rx="1" className="ni-muted" />
        <rect x="10" y="32" width="40" height="5" rx="1" className="ni-muted" />
      </g>

      <g transform="translate(480, 420)">
        <rect x="0" y="0" width="90" height="50" rx="8" fill="#f97316">
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <polygon points="50,50 60,65 70,50" fill="#f97316">
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </polygon>
        <rect x="12" y="14" width="55" height="5" rx="1" fill="#ffffff" opacity="0.9" />
        <rect x="12" y="24" width="66" height="5" rx="1" fill="#ffffff" opacity="0.7" />
        <rect x="12" y="34" width="45" height="5" rx="1" fill="#ffffff" opacity="0.7" />
      </g>

      {/* Signal waves from globe */}
      <g transform="translate(400, 300)">
        <circle r="140" fill="none" stroke="#f97316" strokeWidth="1" opacity="0">
          <animate
            attributeName="r"
            values="120;200"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="140" fill="none" stroke="#f97316" strokeWidth="1" opacity="0">
          <animate
            attributeName="r"
            values="120;200"
            dur="3s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur="3s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="140" fill="none" stroke="#f97316" strokeWidth="1" opacity="0">
          <animate
            attributeName="r"
            values="120;200"
            dur="3s"
            begin="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0"
            dur="3s"
            begin="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Small floating dots */}
      <circle cx="200" cy="100" r="4" fill="#f97316">
        <animate
          attributeName="cy"
          values="100;90;100"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="600" cy="500" r="5" className="ni-decor">
        <animate
          attributeName="cy"
          values="500;490;500"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="700" cy="300" r="3" fill="#f97316">
        <animate
          attributeName="cy"
          values="300;295;300"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="150" cy="400" r="4" className="ni-decor" opacity="0.5">
        <animate
          attributeName="cy"
          values="400;390;400"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}
