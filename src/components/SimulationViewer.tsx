import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Easing, type Transition } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import type { Simulation, SimulationKind } from '../data/content';

/* Stress contour colours, low → high (von Mises style). */
const S = ['#1f4fd1', '#2a7be4', '#33b0d9', '#4fc29a', '#c9cf4a', '#f0a43a', '#e5533a'];
const INK = '#ffffff';
const FONT = 'Inter, "Noto Sans TC", sans-serif';

/**
 * Loop timing for an animation. With reduced motion every animation jumps
 * straight to its last keyframe, which is always the "result" state.
 */
function useLoop() {
  const still = useReducedMotion() ?? false;
  return (duration: number, times?: number[], ease: Easing = 'easeInOut'): Transition =>
    still ? { duration: 0 } : { duration, times, ease, repeat: Infinity, repeatDelay: 1.4 };
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label={label}>
      <g stroke="#fff" strokeOpacity="0.05">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="240" />
        ))}
      </g>
      {children}
    </svg>
  );
}

const Label = ({ x, y, children, anchor = 'start', dim = false, size = 11 }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; dim?: boolean; size?: number }) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily={FONT} fontSize={size} fontWeight={dim ? 500 : 600} fill={INK} fillOpacity={dim ? 0.55 : 0.9}>
    {children}
  </text>
);

/* ---------- 1. Contact force: force–time curves ---------- */
function Contact() {
  const loop = useLoop();
  // Chart area: x 60–380 (0–2.0 s), y 200–40 (0–1000 g)
  const X = (t: number) => 60 + (t / 2) * 320;
  const Y = (g: number) => 200 - (g / 1000) * 160;
  const pts = (arr: [number, number][]) => 'M' + arr.map(([t, g]) => `${X(t).toFixed(1)} ${Y(g).toFixed(1)}`).join(' L');
  const s1 = pts([[0, 0], [0.25, 0], [0.35, 420], [0.5, 640], [0.6, 840], [0.65, 920], [1.0, 920], [1.02, 620], [1.4, 620], [1.5, 400], [1.62, 0], [2, 0]]);
  const s2 = pts([[0, 0], [0.27, 0], [0.38, 380], [0.55, 560], [0.68, 740], [1.0, 740], [1.02, 530], [1.42, 530], [1.55, 300], [1.66, 0], [2, 0]]);
  return (
    <Frame label="旋轉插頭兩組彈片的接觸力隨時間變化曲線">
      {[0, 250, 500, 750, 1000].map((g) => (
        <g key={g}>
          <line x1="60" x2="380" y1={Y(g)} y2={Y(g)} stroke="#fff" strokeOpacity="0.08" />
          <Label x={52} y={Y(g) + 4} anchor="end" dim size={9}>
            {g}
          </Label>
        </g>
      ))}
      {[0, 0.5, 1, 1.5, 2].map((t) => (
        <Label key={t} x={X(t)} y={216} anchor="middle" dim size={9}>
          {t.toFixed(1)}
        </Label>
      ))}
      <Label x={380} y={232} anchor="end" dim size={9}>時間 (s)</Label>
      <Label x={60} y={28} dim size={9}>接觸力 (g)</Label>
      <line x1="60" x2="380" y1={Y(45)} y2={Y(45)} stroke="#f0a43a" strokeDasharray="4 4" strokeWidth="1.2" />
      <Label x={378} y={Y(45) - 5} anchor="end" dim size={9}>45 g 穩定門檻</Label>
      <motion.path d={s1} fill="none" stroke="#2997FF" strokeWidth="2.5" strokeLinejoin="round"
        pathLength={1} strokeDasharray="1 1" initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: [1, 0, 0] }} transition={loop(4, [0, 0.75, 1], 'linear')} />
      <motion.path d={s2} fill="none" stroke="#4fc29a" strokeWidth="2.5" strokeLinejoin="round"
        pathLength={1} strokeDasharray="1 1" initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: [1, 0, 0] }} transition={loop(4, [0, 0.75, 1], 'linear')} />
      <g transform="translate(250 54)">
        <rect x="0" y="-8" width="12" height="3" fill="#2997FF" />
        <Label x={18} y={-2} size={10}>Spring 1 ≈ 920 g</Label>
        <rect x="0" y="8" width="12" height="3" fill="#4fc29a" />
        <Label x={18} y={14} size={10}>Spring 2 ≈ 740 g</Label>
      </g>
    </Frame>
  );
}

/* ---------- 2. Charger drop ---------- */
function Drop() {
  const loop = useLoop();
  const t = [0, 0.38, 0.48, 0.56, 0.62, 1];
  return (
    <Frame label="充電器落摔後內部肋條區域出現應力集中">
      <line x1="40" x2="360" y1="200" y2="200" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
      <motion.g animate={{ y: [-150, 0, -18, 0, 0, 0], rotate: [-8, 0, 2, 0, 0, 0] }} transition={loop(3.2, t)} style={{ originX: 0.5, originY: 1 }}>
        <rect x="120" y="128" width="130" height="72" rx="8" fill={S[0]} />
        <rect x="250" y="150" width="22" height="20" rx="3" fill={S[1]} />
        <rect x="272" y="156" width="46" height="8" rx="4" fill={S[1]} />
        <rect x="120" y="128" width="130" height="72" rx="8" fill="none" stroke="#fff" strokeOpacity="0.35" />
        {/* internal ribs */}
        {[150, 172].map((x) => (
          <motion.g key={x} animate={{ opacity: [0, 0, 1, 1, 1, 1] }} transition={loop(3.2, t)}>
            <rect x={x} y="172" width="14" height="14" rx="2" fill={S[6]} />
            <rect x={x + 3} y="175" width="8" height="8" rx="1.5" fill={S[4]} />
          </motion.g>
        ))}
      </motion.g>
      <motion.g animate={{ opacity: [0, 0, 0, 1, 1, 1] }} transition={loop(3.2, t)}>
        <line x1="170" y1="190" x2="120" y2="222" stroke="#fff" strokeOpacity="0.6" />
        <Label x={60} y={232}>肋條區破壞</Label>
      </motion.g>
      <Label x={40} y={30} dim>Charger · drop test</Label>
    </Frame>
  );
}

/* ---------- 3. AC inlet ball drop: rectangular vs circular ---------- */
function AcInlet() {
  const loop = useLoop();
  const t = [0, 0.4, 0.5, 1];
  const Adapter = ({ x, round }: { x: number; round: boolean }) => (
    <g>
      <rect x={x} y="140" width="120" height="58" rx="10" fill={S[0]} stroke="#fff" strokeOpacity="0.3" />
      <rect x={x + 34} y="152" width="52" height="34" rx={round ? 14 : 2} fill="#0e1830" stroke="#fff" strokeOpacity="0.35" />
      {/* stress after impact */}
      <motion.g animate={{ opacity: [0, 0, 1, 1] }} transition={loop(3, t)}>
        {round ? (
          <ellipse cx={x + 60} cy="148" rx="46" ry="9" fill={S[3]} fillOpacity="0.7" />
        ) : (
          <>
            <circle cx={x + 86} cy="152" r="12" fill={S[4]} />
            <circle cx={x + 86} cy="152" r="6" fill={S[6]} />
            <circle cx={x + 34} cy="152" r="9" fill={S[4]} />
            <circle cx={x + 34} cy="152" r="4" fill={S[6]} />
          </>
        )}
      </motion.g>
      <motion.circle cx={x + 60} cy={116} r="22" fill="#d9d9de" initial={{ cy: 10 }} animate={{ cy: [10, 116, 104, 116] }} transition={loop(3, t)} />
      <Label x={x + 60} y={216} anchor="middle">{round ? '圓角' : '直角'}</Label>
      <motion.g animate={{ opacity: [0, 0, 1, 1] }} transition={loop(3, t)}>
        <Label x={x + 60} y={232} anchor="middle" dim>{round ? '無破壞' : '轉角破壞'}</Label>
      </motion.g>
    </g>
  );
  return (
    <Frame label="500 公克鋼球自 1.3 公尺落下：直角插座轉角破壞，圓角插座無破壞">
      <line x1="30" x2="370" y1="199" y2="199" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
      <Adapter x={50} round={false} />
      <Adapter x={230} round />
      <Label x={200} y={24} anchor="middle" dim>Steel ball 500 g · 1.3 m · PC</Label>
    </Frame>
  );
}

/* ---------- 4. Validation: simulated crack vs real crack ---------- */
function Validation() {
  const loop = useLoop();
  const t = [0, 0.35, 0.45, 0.7, 1];
  return (
    <Frame label="落球模擬的破壞區域與實際產品裂痕位置一致">
      {/* simulation */}
      <Label x={110} y={30} anchor="middle" dim>模擬</Label>
      <rect x="40" y="110" width="140" height="80" rx="14" fill={S[0]} stroke="#fff" strokeOpacity="0.3" />
      <motion.g animate={{ opacity: [0, 0, 1, 1, 1] }} transition={loop(3.6, t)}>
        <ellipse cx="70" cy="178" rx="20" ry="7" fill={S[4]} />
        <ellipse cx="70" cy="178" rx="9" ry="3.5" fill={S[6]} />
      </motion.g>
      <motion.circle cx="80" cy={90} r="20" fill="#d9d9de" initial={{ cy: 20 }} animate={{ cy: [20, 90, 80, 90, 90] }} transition={loop(3.6, t)} />
      {/* real product */}
      <Label x={290} y={30} anchor="middle" dim>實測</Label>
      <rect x="220" y="110" width="140" height="80" rx="14" fill="#1b1b1e" stroke="#fff" strokeOpacity="0.3" />
      <path d="M244 178 l6 -6 l5 4 l7 -7 l6 5" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" />
      <motion.g animate={{ opacity: [0, 0, 0, 1, 1] }} transition={loop(3.6, t)}>
        <ellipse cx="256" cy="176" rx="26" ry="11" fill="none" stroke={S[6]} strokeWidth="2" />
        <line x1="96" y1="178" x2="228" y2="176" stroke="#fff" strokeOpacity="0.5" strokeDasharray="4 4" />
        <Label x={200} y={222} anchor="middle">破壞位置一致</Label>
      </motion.g>
    </Frame>
  );
}

/* ---------- 5. Ultrasonic welding line: tensile curve + specimen ---------- */
function Weld() {
  const loop = useLoop();
  // displacement 0–3.2 mm → x 200–380 ; force 0–1.5 kN → y 200–50
  const X = (d: number) => 200 + (d / 3.2) * 180;
  const Y = (f: number) => 200 - (f / 1.5) * 150;
  const curve = `M${X(0)} ${Y(0)} L${X(2.9)} ${Y(1.4)} L${X(3.0)} ${Y(1.38)} L${X(3.08)} ${Y(0.1)} L${X(3.2)} ${Y(0.02)}`;
  const t = [0, 0.75, 0.8, 1];
  return (
    <Frame label="超音波熔接線拉伸模擬：約 3 毫米位移時以約 1.4 千牛斷裂">
      {/* specimen */}
      <rect x="70" y="20" width="60" height="18" rx="3" fill="#3a3a3e" />
      <motion.g animate={{ y: [0, 10, 12, 26] }} transition={loop(4, t)}>
        <rect x="70" y="202" width="60" height="18" rx="3" fill="#3a3a3e" />
        <rect x="82" y="124" width="36" height="80" fill={S[1]} />
      </motion.g>
      <rect x="82" y="38" width="36" height="84" fill={S[1]} />
      <motion.rect x="82" y="118" width="36" height="8" animate={{ fill: [S[2], S[5], S[6], S[6]], opacity: [1, 1, 1, 0] }} transition={loop(4, t)} />
      <Label x={100} y={236} anchor="middle" dim>熔接線</Label>
      {/* chart */}
      <line x1="200" x2="380" y1="200" y2="200" stroke="#fff" strokeOpacity="0.3" />
      <line x1="200" x2="200" y1="40" y2="200" stroke="#fff" strokeOpacity="0.3" />
      {[0, 0.5, 1, 1.5].map((f) => (
        <Label key={f} x={194} y={Y(f) + 4} anchor="end" dim size={9}>{f}</Label>
      ))}
      {[0, 1, 2, 3].map((d) => (
        <Label key={d} x={X(d)} y={214} anchor="middle" dim size={9}>{d}</Label>
      ))}
      <Label x={380} y={230} anchor="end" dim size={9}>位移 (mm)</Label>
      <Label x={200} y={30} dim size={9}>拉力 (kN)</Label>
      <motion.path d={curve} fill="none" stroke="#2997FF" strokeWidth="2.5" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: [1, 0.07, 0, 0] }} transition={loop(4, t, 'linear')} />
    </Frame>
  );
}

/* ---------- 6. Fasten screw: three boss designs ---------- */
function Screw() {
  const loop = useLoop();
  const t = [0, 0.5, 0.65, 1];
  const Boss = ({ x, kind }: { x: number; kind: 'orig' | 'chamfer' | 'thick' }) => {
    const pass = kind === 'chamfer';
    const top = kind === 'thick' ? 98 : 110;
    return (
      <g>
        {/* housing boss (section) */}
        <path
          d={
            kind === 'chamfer'
              ? `M${x} ${top} h28 l14 18 v62 h-42 z M${x + 104} ${top} h-28 l-14 18 v62 h42 z`
              : `M${x} ${top} h40 v80 h-40 z M${x + 104} ${top} h-40 v80 h40 z`
          }
          fill={S[0]}
          stroke="#fff"
          strokeOpacity="0.3"
        />
        {/* screw */}
        <motion.g animate={{ y: [-60, 0, 0, 0] }} transition={loop(3.4, t)}>
          <path d={`M${x + 22} ${top - 10} h60 l-16 18 h-28 z`} fill="#c9c9cf" />
          <rect x={x + 42} y={top + 8} width="20" height="66" fill="#c9c9cf" />
        </motion.g>
        {/* stress at contact */}
        <motion.g animate={{ opacity: [0, 0, 1, 1] }} transition={loop(3.4, t)}>
          {pass ? (
            <>
              <ellipse cx={x + 33} cy={top + 9} rx="8" ry="5" fill={S[3]} />
              <ellipse cx={x + 71} cy={top + 9} rx="8" ry="5" fill={S[3]} />
            </>
          ) : (
            <>
              <circle cx={x + 40} cy={top + 2} r="7" fill={S[6]} />
              <circle cx={x + 64} cy={top + 2} r="7" fill={S[6]} />
            </>
          )}
          <rect x={x + 22} y="206" width="60" height="20" rx="10" fill={pass ? '#2997FF' : 'transparent'} stroke={pass ? 'none' : '#fff'} strokeOpacity="0.5" />
          <Label x={x + 52} y={220} anchor="middle">{pass ? 'Pass' : 'Fail'}</Label>
        </motion.g>
        <Label x={x + 52} y={30} anchor="middle" dim>{kind === 'orig' ? '原始' : kind === 'chamfer' ? '方案一 導角' : '方案二 加厚'}</Label>
      </g>
    );
  };
  return (
    <Frame label="鎖螺絲模擬：原始與加厚方案失敗，導角方案通過">
      <Boss x={14} kind="orig" />
      <Boss x={148} kind="chamfer" />
      <Boss x={282} kind="thick" />
    </Frame>
  );
}

/* ---------- 7. Recessed-light spring ---------- */
function Spring() {
  const loop = useLoop();
  const t = [0, 0.55, 1];
  const Unit = ({ x, arm, pass }: { x: number; arm: number; pass: boolean }) => (
    <g>
      {/* ceiling */}
      <rect x={x - 10} y="96" width="170" height="8" fill="#fff" fillOpacity="0.25" />
      {/* lamp */}
      <path d={`M${x + 40} 104 h70 l-10 70 h-50 z`} fill={S[0]} stroke="#fff" strokeOpacity="0.3" />
      {/* torsion spring coil */}
      <circle cx={x + 112} cy="122" r="7" fill="none" stroke="#c9c9cf" strokeWidth="3" />
      {/* arm rotates up to clamp */}
      <motion.line
        x1={x + 112}
        y1="122"
        x2={x + 112 + arm}
        y2="122"
        stroke="#c9c9cf"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ originX: 0, originY: 0.5 }}
        animate={{ rotate: [40, pass ? -20 : 10, pass ? -20 : 10] }}
        transition={loop(3, t)}
      />
      {/* gap indicator */}
      <motion.g animate={{ opacity: [0, 1, 1] }} transition={loop(3, t)}>
        {!pass && <rect x={x + 40} y="104" width="70" height="5" fill={S[6]} fillOpacity="0.8" />}
        <rect x={x + 36} y="196" width="78" height="20" rx="10" fill={pass ? '#2997FF' : 'transparent'} stroke={pass ? 'none' : '#fff'} strokeOpacity="0.5" />
        <Label x={x + 75} y={210} anchor="middle">{pass ? 'Pass' : 'Fail'}</Label>
      </motion.g>
      <Label x={x + 75} y={40} anchor="middle">{pass ? '新設計 40 mm' : '原始 52 mm'}</Label>
      <Label x={x + 75} y={56} anchor="middle" dim>{pass ? '835.08 mm³' : '896.16 mm³'}</Label>
    </g>
  );
  return (
    <Frame label="嵌燈扭力彈簧：原始 52 毫米間隙檢查不合格，新設計 40 毫米合格，單價降低 17.3%">
      <Unit x={20} arm={52} pass={false} />
      <Unit x={220} arm={40} pass />
      <Label x={200} y={236} anchor="middle" dim>單價成本 −17.3%</Label>
    </Frame>
  );
}

const animations: Record<SimulationKind, () => JSX.Element> = {
  contact: Contact,
  drop: Drop,
  acinlet: AcInlet,
  validation: Validation,
  weld: Weld,
  screw: Screw,
  spring: Spring,
};

export function SimulationViewer({ simulations }: { simulations: Simulation[] }) {
  const [index, setIndex] = useState(0);
  const [replay, setReplay] = useState(0);
  const sim = simulations[index];
  const Anim = animations[sim.kind];

  return (
    <section className="mt-12" aria-labelledby="sim-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id="sim-title" className="text-[19px] font-semibold tracking-tight text-ink">
          CAE 模擬案例
        </h3>
        <p className="text-[13px] text-muted">Abaqus・{simulations.length} 個案例</p>
      </div>

      <div role="tablist" aria-label="模擬案例" className="no-scrollbar -mx-6 mt-4 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
        {simulations.map((s, i) => (
          <button
            key={s.kind}
            role="tab"
            type="button"
            aria-selected={i === index}
            aria-controls="sim-panel"
            onClick={() => {
              setIndex(i);
              setReplay((r) => r + 1);
            }}
            className={`min-h-[36px] shrink-0 rounded-full px-3.5 text-[13px] font-medium transition-colors ${
              i === index ? 'bg-ink text-canvas' : 'bg-surface text-ink/70 hover:text-ink'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div id="sim-panel" role="tabpanel" className="mt-5 grid gap-6 md:grid-cols-[1.25fr_1fr] md:gap-8">
        <div className="relative self-start overflow-hidden rounded-3xl bg-[#0A1424]">
          <div className="aspect-[5/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${sim.kind}-${replay}`}
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Anim />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2 text-[11px] text-white/60">
              <span>應力 低</span>
              <span className="flex h-2 w-24 overflow-hidden rounded-full" aria-hidden="true">
                {S.map((c) => (
                  <span key={c} className="h-full flex-1" style={{ background: c }} />
                ))}
              </span>
              <span>高</span>
            </div>
            <button
              type="button"
              onClick={() => setReplay((r) => r + 1)}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw size={13} aria-hidden="true" /> 重播
            </button>
          </div>
        </div>

        <div aria-live="polite">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted">{sim.product}</p>
          <h4 className="mt-1 text-[21px] font-semibold tracking-tight text-ink">{sim.title}</h4>
          <dl className="mt-4 space-y-3 text-[14px] leading-relaxed">
            <div>
              <dt className="font-semibold text-ink">條件</dt>
              <dd className="text-muted">{sim.setup}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">發現</dt>
              <dd className="text-muted">{sim.finding}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">結論</dt>
              <dd className="text-muted">{sim.outcome}</dd>
            </div>
          </dl>
          {sim.metrics && (
            <ul className="mt-5 grid grid-cols-3 gap-3 border-t border-line/70 pt-4">
              {sim.metrics.map((m) => (
                <li key={m.label} className="min-w-0">
                  <p className="text-[17px] font-semibold leading-tight tracking-tight text-ink">{m.value}</p>
                  <p className="mt-1 text-[12px] leading-snug text-muted">{m.label}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
