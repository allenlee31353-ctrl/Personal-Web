import { memo } from 'react';
import type { CoverVariant } from '../data/content';

/**
 * Original, resolution-independent cover art for each project.
 * Drawn as inline SVG: no image requests, crisp at any size, tiny payload.
 */
export const coverTheme: Record<CoverVariant, { bg: string; dark: boolean }> = {
  watch: { bg: '#F2F2F4', dark: false },
  bonding: { bg: '#0B0B0E', dark: true },
  glassline: { bg: '#E9EEF2', dark: false },
  fea: { bg: '#0A1424', dark: true },
  handheld: { bg: '#EEF0EC', dark: false },
};

function Watch() {
  return (
    <>
      <defs>
        <linearGradient id="h-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D5D5DA" />
          <stop offset="100%" stopColor="#BFC0C6" />
        </linearGradient>
        <linearGradient id="h-case" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3A3A3E" />
          <stop offset="100%" stopColor="#1D1D1F" />
        </linearGradient>
      </defs>
      <rect x="258" y="10" width="84" height="340" rx="30" fill="url(#h-band)" />
      <ellipse cx="300" cy="300" rx="120" ry="12" fill="#000" fillOpacity="0.05" />
      <rect x="215" y="85" width="170" height="190" rx="46" fill="url(#h-case)" />
      <rect x="219" y="89" width="162" height="182" rx="42" fill="none" stroke="#0071E3" strokeWidth="3" strokeDasharray="1 5" strokeLinecap="round" />
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
      <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">
        <line x1="219" y1="120" x2="170" y2="96" stroke="#0071E3" strokeWidth="1.2" />
        <circle cx="219" cy="120" r="3" fill="#0071E3" />
        <text x="164" y="86" textAnchor="end" fill="#0071E3">PUR bead</text>
        <text x="164" y="102" textAnchor="end" fill="#86868B" fontWeight="500">Lens ↔ Bezel</text>
      </g>
    </>
  );
}


function Bonding() {
  // Optical stack: cover glass / LOCA / LCM, shown as an isometric exploded view.
  const layer = (y: number, fill: string, op: number, stroke = '#fff', so = 0.25) => (
    <path d={`M150 ${y} L300 ${y - 60} L450 ${y} L300 ${y + 60} Z`} fill={fill} fillOpacity={op} stroke={stroke} strokeOpacity={so} />
  );
  return (
    <>
      <defs>
        <radialGradient id="b-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#2997FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2997FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="360" fill="url(#b-glow)" />
      <g stroke="#fff" strokeOpacity="0.15" strokeDasharray="3 5">
        <line x1="150" y1="100" x2="150" y2="250" />
        <line x1="450" y1="100" x2="450" y2="250" />
        <line x1="300" y1="160" x2="300" y2="310" />
      </g>
      {/* LCM */}
      <path d="M150 250 L300 310 L300 322 L150 262 Z" fill="#1c1c20" />
      <path d="M300 310 L450 250 L450 262 L300 322 Z" fill="#141417" />
      {layer(250, '#16233a', 1, '#2997FF', 0.5)}
      <path d="M215 250 L300 216 L385 250 L300 284 Z" fill="#2997FF" fillOpacity="0.35" />
      {/* LOCA */}
      {layer(178, '#2997FF', 0.28, '#2997FF', 0.9)}
      {/* cover glass */}
      {layer(108, '#ffffff', 0.12, '#fff', 0.6)}
      <path d="M200 100 L280 68" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <g fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500">
        <text x="468" y="112" fill="#fff" fillOpacity="0.85">Cover glass</text>
        <text x="468" y="182" fill="#2997FF">LOCA</text>
        <text x="468" y="254" fill="#fff" fillOpacity="0.85">LCM</text>
        <text x="40" y="186" fill="#fff" fillOpacity="0.5">UV cure ↓</text>
      </g>
    </>
  );
}

function GlassLine() {
  // A cassette of curved automotive cover glass moving through a cleaning line.
  return (
    <>
      <defs>
        <linearGradient id="g-glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cfdbe6" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* conveyor */}
      <rect x="0" y="282" width="600" height="10" fill="#1D1D1F" fillOpacity="0.12" />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={20 + i * 38} cy="287" r="7" fill="#fff" stroke="#1D1D1F" strokeOpacity="0.2" />
      ))}
      {/* cleaning hood */}
      <path d="M380 90 h170 v192 h-170 z" fill="#ffffff" stroke="#1D1D1F" strokeOpacity="0.1" />
      <rect x="400" y="110" width="130" height="36" rx="8" fill="#F5F5F7" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <line x1={410 + i * 22} y1="150" x2={404 + i * 22} y2="200" stroke="#0071E3" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="2 6" />
        </g>
      ))}
      <text x="412" y="133" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1D1D1F">Cleaning · 03</text>
      {/* cassette with curved glass */}
      <g>
        <rect x="70" y="120" width="250" height="160" rx="10" fill="none" stroke="#1D1D1F" strokeOpacity="0.55" strokeWidth="3" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M${92 + i * 32} 132 q 18 72 0 136`}
            fill="none"
            stroke="url(#g-glass)"
            strokeWidth="9"
            strokeLinecap="round"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={'e' + i} d={`M${92 + i * 32} 132 q 18 72 0 136`} fill="none" stroke="#0071E3" strokeOpacity="0.35" strokeWidth="1" />
        ))}
      </g>
      <g transform="translate(96 40)">
        <rect width="150" height="58" rx="12" fill="#fff" stroke="#1D1D1F" strokeOpacity="0.08" />
        <text x="14" y="24" fontFamily="Inter, sans-serif" fontSize="10" fill="#86868B">Fixture weight</text>
        <text x="14" y="45" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="#1D1D1F">−18%</text>
      </g>
    </>
  );
}

function Fea() {
  // Stress contour on an adapter housing after a drop event.
  const bands = ['#1f4fd1', '#2a7be4', '#33b0d9', '#4fc29a', '#c9cf4a', '#f0a43a', '#e5533a'];
  return (
    <>
      <g stroke="#fff" strokeOpacity="0.06">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="360" />
        ))}
      </g>
      {/* adapter body (isometric box) */}
      <path d="M150 170 L330 110 L470 160 L290 220 Z" fill="#2a7be4" />
      <path d="M150 170 L290 220 L290 290 L150 240 Z" fill="#1f4fd1" />
      <path d="M290 220 L470 160 L470 230 L290 290 Z" fill="#1a3fa8" />
      {/* contour bands radiating from impact corner */}
      <clipPath id="fea-top">
        <path d="M150 170 L330 110 L470 160 L290 220 Z" />
      </clipPath>
      <g clipPath="url(#fea-top)">
        {bands
          .slice()
          .reverse()
          .map((c, i) => (
            <ellipse key={c} cx="290" cy="220" rx={40 + (bands.length - 1 - i) * 34} ry={22 + (bands.length - 1 - i) * 18} fill={c} />
          ))}
      </g>
      <clipPath id="fea-side">
        <path d="M290 220 L470 160 L470 230 L290 290 Z" />
      </clipPath>
      <g clipPath="url(#fea-side)" opacity="0.85">
        {bands
          .slice()
          .reverse()
          .map((c, i) => (
            <ellipse key={c} cx="290" cy="240" rx={30 + (bands.length - 1 - i) * 30} ry={26 + (bands.length - 1 - i) * 14} fill={c} />
          ))}
      </g>
      <path d="M150 170 L330 110 L470 160 L290 220 Z M150 170 L150 240 L290 290 L470 230 L470 160 M290 220 L290 290" fill="none" stroke="#fff" strokeOpacity="0.35" />
      {/* cable */}
      <path d="M150 205 C 100 210, 80 260, 40 300" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
      {/* drop arrow */}
      <g stroke="#fff" strokeWidth="2" strokeOpacity="0.8">
        <line x1="290" y1="300" x2="290" y2="335" />
      </g>
      {/* legend */}
      <g transform="translate(40 40)" fontFamily="Inter, sans-serif" fontSize="10" fill="#fff">
        <text y="0" fillOpacity="0.9" fontSize="12" fontWeight="600">S, Mises</text>
        {bands
          .slice()
          .reverse()
          .map((c, i) => (
            <rect key={c} x="0" y={12 + i * 12} width="14" height="10" fill={c} />
          ))}
        <text x="22" y="21" fillOpacity="0.6">max</text>
        <text x="22" y="93" fillOpacity="0.6">min</text>
      </g>
      <text x="300" y="350" fontFamily="Inter, sans-serif" fontSize="11" fill="#fff" fillOpacity="0.6">Drop test · Abaqus</text>
    </>
  );
}

function Handheld() {
  // A rugged handheld GPS sitting in a universal-slot tray, annotated like a design guideline.
  const contour = (r: number) => `M${300 - r} 170 q ${r} ${-r * 0.55} ${r * 2} 0 q ${-r} ${r * 0.6} ${-r * 2} 0`;
  return (
    <>
      <defs>
        <clipPath id="hh-screen">
          <rect x="258" y="112" width="84" height="104" rx="8" />
        </clipPath>
      </defs>
      {/* universal-slot tray */}
      <rect x="60" y="250" width="480" height="70" rx="14" fill="#ffffff" stroke="#1D1D1F" strokeOpacity="0.08" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={78 + i * 76} y="262" width="64" height="46" rx="8" fill="#1D1D1F" fillOpacity={i === 3 ? 0 : 0.06} stroke={i === 3 ? '#0071E3' : 'none'} strokeDasharray="4 4" strokeWidth="1.5" />
      ))}
      {/* device */}
      <rect x="296" y="36" width="8" height="34" rx="4" fill="#2C2C2E" />
      <rect x="236" y="64" width="128" height="226" rx="28" fill="#2C2C2E" />
      <rect x="244" y="72" width="112" height="210" rx="22" fill="#3A3A3E" />
      <rect x="254" y="108" width="92" height="112" rx="10" fill="#0b0b0d" />
      <g clipPath="url(#hh-screen)">
        <rect x="258" y="112" width="84" height="104" fill="#E9F0E4" />
        {[10, 22, 34, 48, 64].map((r) => (
          <path key={r} d={contour(r)} fill="none" stroke="#6B8F5A" strokeOpacity="0.55" strokeWidth="1.2" />
        ))}
        <path d="M268 206 C 285 190, 290 170, 305 160 S 330 130, 336 122" fill="none" stroke="#0071E3" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="305" cy="160" r="4" fill="#0071E3" stroke="#fff" strokeWidth="1.5" />
      </g>
      {/* seal line (dashed) around front housing */}
      <rect x="240" y="68" width="120" height="218" rx="25" fill="none" stroke="#0071E3" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={274 + i * 26} cy="250" r="9" fill="#2C2C2E" stroke="#4a4a4f" />
      ))}
      {/* callouts */}
      <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">
        <line x1="240" y1="120" x2="176" y2="104" stroke="#0071E3" strokeWidth="1.2" />
        <circle cx="240" cy="120" r="3" fill="#0071E3" />
        <text x="170" y="100" textAnchor="end" fill="#0071E3">Seal line</text>
        <text x="170" y="115" textAnchor="end" fill="#86868B" fontWeight="500">Waterproof</text>

        <line x1="360" y1="180" x2="420" y2="160" stroke="#1D1D1F" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="360" cy="180" r="3" fill="#1D1D1F" />
        <text x="426" y="156" fill="#1D1D1F">Glue path</text>
        <text x="426" y="171" fill="#86868B" fontWeight="500">No leakage</text>

        <text x="78" y="240" fill="#0071E3">Universal slot · +66% / area</text>
      </g>
    </>
  );
}

const art: Record<CoverVariant, () => JSX.Element> = { watch: Watch, bonding: Bonding, glassline: GlassLine, fea: Fea, handheld: Handheld };

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
