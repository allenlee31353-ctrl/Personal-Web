import { memo } from 'react';
import type { CoverVariant } from '../data/content';

/**
 * Original, resolution-independent cover art for each project.
 * Drawn as inline SVG: no image requests, crisp at any size, tiny payload.
 */
export const coverTheme: Record<CoverVariant, { bg: string; dark: boolean }> = {
  vision: { bg: '#0B0B0E', dark: true },
  building: { bg: '#ECECEF', dark: false },
  energy: { bg: '#0A1424', dark: true },
  health: { bg: '#F4F1EC', dark: false },
};

function Vision() {
  const cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const x = 205 + c * 22;
      const y = 85 + r * 22;
      const dx = x + 9 - 300;
      const dy = y + 9 - 180;
      if (dx * dx + dy * dy > 98 * 98) continue;
      const defect = (r === 2 && c === 6) || (r === 6 && c === 3);
      cells.push(
        <rect key={`${r}-${c}`} x={x} y={y} width="18" height="18" rx="2.5" fill={defect ? '#2997FF' : '#ffffff'} fillOpacity={defect ? 0.9 : 0.09} />,
      );
    }
  }
  return (
    <>
      <defs>
        <radialGradient id="v-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2997FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2997FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="v-scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2997FF" stopOpacity="0" />
          <stop offset="100%" stopColor="#2997FF" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="180" r="170" fill="url(#v-glow)" />
      <circle cx="300" cy="180" r="112" fill="none" stroke="#fff" strokeOpacity="0.18" />
      <circle cx="300" cy="180" r="104" fill="#16161A" />
      {cells}
      <rect x="196" y="150" width="208" height="44" fill="url(#v-scan)" />
      <line x1="196" x2="404" y1="194" y2="194" stroke="#2997FF" strokeWidth="1.5" />
      {/* detection boxes */}
      <g fill="none" stroke="#2997FF" strokeWidth="1.5">
        <rect x="333" y="123" width="30" height="30" rx="4" />
        <rect x="267" y="211" width="30" height="30" rx="4" />
      </g>
      <g fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#2997FF">
        <text x="333" y="116">0.98</text>
        <text x="267" y="256">0.95</text>
      </g>
      {/* corner frame */}
      <g stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" fill="none">
        <path d="M168 70v-18h18M432 70v-18h-18M168 290v18h18M432 290v18h-18" />
      </g>
    </>
  );
}

function Building() {
  const floors = 7;
  return (
    <>
      <defs>
        <linearGradient id="b-face" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#F7F7F9" />
        </linearGradient>
        <linearGradient id="b-side" x1="0" x2="1">
          <stop offset="0%" stopColor="#D8D8DE" />
          <stop offset="100%" stopColor="#E6E6EA" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="318" rx="190" ry="16" fill="#000" fillOpacity="0.06" />
      {/* front & side faces */}
      <path d="M220 90 L300 60 L300 310 L220 300 Z" fill="url(#b-side)" />
      <path d="M300 60 L400 95 L400 300 L300 310 Z" fill="url(#b-face)" />
      <path d="M220 90 L300 60 L400 95 L320 122 Z" fill="#fff" stroke="#1D1D1F" strokeOpacity="0.08" />
      {Array.from({ length: floors }).map((_, i) => {
        const t = (i + 1) / (floors + 1);
        const yl = 90 + (300 - 90) * t;
        const ym = 60 + (310 - 60) * t;
        const yr = 95 + (300 - 95) * t;
        return (
          <g key={i} stroke="#1D1D1F" strokeOpacity="0.1">
            <line x1="220" y1={yl} x2="300" y2={ym} />
            <line x1="300" y1={ym} x2="400" y2={yr} />
          </g>
        );
      })}
      {/* sensor nodes */}
      {[
        [340, 120, 1],
        [372, 175, 0],
        [328, 215, 1],
        [360, 262, 0],
        [250, 160, 0],
        [270, 245, 1],
      ].map(([x, y, a], i) => (
        <g key={i}>
          {a ? <circle cx={x} cy={y} r="11" fill="#0071E3" fillOpacity="0.14" /> : null}
          <circle cx={x} cy={y} r="4" fill={a ? '#0071E3' : '#1D1D1F'} fillOpacity={a ? 1 : 0.35} />
        </g>
      ))}
      <path d="M340 120 L372 175 L328 215 L360 262 M250 160 L270 245" stroke="#0071E3" strokeOpacity="0.35" strokeDasharray="3 4" fill="none" />
      {/* floating readout */}
      <g transform="translate(418 128)">
        <rect width="118" height="58" rx="12" fill="#fff" stroke="#1D1D1F" strokeOpacity="0.08" />
        <text x="14" y="24" fontFamily="Inter, sans-serif" fontSize="10" fill="#86868B">Energy</text>
        <text x="14" y="45" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#1D1D1F">−24%</text>
      </g>
      <g transform="translate(70 200)">
        <rect width="112" height="58" rx="12" fill="#fff" stroke="#1D1D1F" strokeOpacity="0.08" />
        <text x="14" y="24" fontFamily="Inter, sans-serif" fontSize="10" fill="#86868B">CO₂ · ppm</text>
        <text x="14" y="45" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#1D1D1F">412</text>
      </g>
    </>
  );
}

function Energy() {
  const pts = (fn: (x: number) => number) =>
    Array.from({ length: 61 }, (_, i) => {
      const x = 60 + i * 8;
      return `${x},${fn(i).toFixed(1)}`;
    });
  const base = (i: number) => 200 - Math.sin(i / 6) * 42 - Math.sin(i / 2.3) * 9 - i * 0.6;
  const upper = pts((i) => base(i) - 10 - (i > 36 ? (i - 36) * 1.6 : 0));
  const lower = pts((i) => base(i) + 10 + (i > 36 ? (i - 36) * 1.6 : 0)).reverse();
  const actual = pts(base).slice(0, 37);
  const forecast = pts(base).slice(36);
  return (
    <>
      <g stroke="#fff" strokeOpacity="0.07">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="60" x2="540" y1={80 + i * 45} y2={80 + i * 45} />
        ))}
      </g>
      <polygon points={[...upper, ...lower].join(' ')} fill="#2997FF" fillOpacity="0.16" />
      <polyline points={actual.join(' ')} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points={forecast.join(' ')} fill="none" stroke="#2997FF" strokeWidth="2.5" strokeDasharray="6 6" />
      <line x1="348" x2="348" y1="60" y2="310" stroke="#fff" strokeOpacity="0.35" strokeDasharray="2 4" />
      <circle cx="348" cy={base(36)} r="6" fill="#0A1424" stroke="#fff" strokeWidth="2.5" />
      <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500">
        <text x="356" y="74" fill="#fff" fillOpacity="0.6">NOW</text>
        <text x="60" y="52" fill="#fff" fillOpacity="0.9" fontSize="13" fontWeight="600">Solar output · MW</text>
        <text x="470" y="52" fill="#2997FF">Forecast</text>
      </g>
    </>
  );
}

function Health() {
  return (
    <>
      <defs>
        <linearGradient id="h-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D9D3C9" />
          <stop offset="100%" stopColor="#C9C1B5" />
        </linearGradient>
        <linearGradient id="h-case" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3A3A3E" />
          <stop offset="100%" stopColor="#1D1D1F" />
        </linearGradient>
      </defs>
      <rect x="258" y="10" width="84" height="340" rx="30" fill="url(#h-band)" />
      <ellipse cx="300" cy="300" rx="120" ry="12" fill="#000" fillOpacity="0.05" />
      <rect x="215" y="85" width="170" height="190" rx="46" fill="url(#h-case)" />
      <rect x="225" y="95" width="150" height="170" rx="38" fill="#000" />
      <circle cx="300" cy="180" r="56" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="7" />
      <circle
        cx="300"
        cy="180"
        r="56"
        fill="none"
        stroke="#FF453A"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="250 352"
        transform="rotate(-90 300 180)"
      />
      <path d="M262 170 h14 l6 -14 l9 30 l8 -40 l8 34 l5 -10 h26" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <text x="300" y="212" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="600" fill="#fff">
        72 <tspan fontSize="10" fill="#86868B">BPM</tspan>
      </text>
      <rect x="383" y="140" width="8" height="32" rx="4" fill="#2C2C2E" />
    </>
  );
}

const art: Record<CoverVariant, () => JSX.Element> = { vision: Vision, building: Building, energy: Energy, health: Health };

export const ProjectCover = memo(function ProjectCover({ variant, title }: { variant: CoverVariant; title: string }) {
  const Art = art[variant];
  return (
    <svg
      viewBox="0 0 600 360"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${title} 專案視覺`}
      style={{ background: coverTheme[variant].bg }}
    >
      <Art />
    </svg>
  );
});
