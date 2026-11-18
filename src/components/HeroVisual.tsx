import { motion, useReducedMotion, type MotionValue, useTransform } from 'framer-motion';
import { Factory, Gauge, TrendingUp } from 'lucide-react';

/**
 * Exploded view of a wearable display stack (lens, adhesive bead, bezel) inside orbit rings,
 * with floating readouts that drift at different parallax depths.
 */
export function HeroVisual({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const near = useTransform(progress, [0, 1], [0, reduce ? 0 : -140]);
  const mid = useTransform(progress, [0, 1], [0, reduce ? 0 : -70]);
  const far = useTransform(progress, [0, 1], [0, reduce ? 0 : -30]);
  const rotate = useTransform(progress, [0, 1], [0, reduce ? 0 : 25]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* soft ambient light */}
      <div className="absolute inset-[8%] rounded-full bg-accent/10 blur-[80px] dark:bg-accent/20" />

      {/* orbit rings */}
      <motion.svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-ink" style={{ y: far, rotate }}>
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeOpacity="0.08" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        <circle cx="390" cy="200" r="4" className="fill-accent" />
        <circle cx="94" cy="94" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="200" cy="350" r="3" fill="currentColor" fillOpacity="0.3" />
      </motion.svg>

      {/* exploded view: cover lens / adhesive bead / bezel */}
      <motion.div style={{ y: mid }} className="absolute inset-0 grid place-items-center">
        <svg viewBox="-10 50 470 320" className="w-[92%] text-ink">
          <defs>
            <linearGradient id="hv-lens" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#dfe6ee" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="hv-bezel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3a3e" />
              <stop offset="100%" stopColor="#141416" />
            </linearGradient>
          </defs>
          {/* guide lines */}
          <g stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 5">
            <line x1="90" y1="110" x2="90" y2="290" />
            <line x1="310" y1="110" x2="310" y2="290" />
          </g>
          {/* bezel */}
          <motion.g initial={{ y: -90 }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}>
            <path d="M80 290 v22 a120 46 0 0 0 240 0 v-22" fill="#0e0e10" />
            <ellipse cx="200" cy="290" rx="120" ry="46" fill="url(#hv-bezel)" />
            <ellipse cx="200" cy="290" rx="92" ry="34" fill="#050506" />
            <ellipse cx="200" cy="290" rx="74" ry="27" fill="#0d1a2b" />
            <path d="M150 292 h14 l6 -10 l8 20 l8 -26 l7 22 l5 -6 h20" fill="none" stroke="#2997FF" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          </motion.g>
          {/* adhesive bead */}
          <motion.g initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 1.9 }}>
            <ellipse cx="200" cy="200" rx="104" ry="40" fill="none" className="stroke-accent" strokeWidth="9" strokeOpacity="0.9" />
            <ellipse cx="200" cy="200" rx="104" ry="40" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 10" />
          </motion.g>
          {/* cover lens */}
          <motion.g initial={{ y: 90 }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}>
            <path d="M88 110 v8 a112 43 0 0 0 224 0 v-8" fill="currentColor" fillOpacity="0.08" />
            <ellipse cx="200" cy="110" rx="112" ry="43" fill="url(#hv-lens)" stroke="currentColor" strokeOpacity="0.18" />
            <path d="M140 96 q40 -22 104 -10" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9" />
          </motion.g>
          {/* labels */}
          <g fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" className="fill-muted">
            <text x="330" y="114">Cover lens</text>
            <text x="330" y="204" className="fill-accent">PUR adhesive</text>
            <text x="330" y="294">Bezel</text>
          </g>
        </svg>
      </motion.div>

      {/* floating readouts */}
      <motion.div style={{ y: near }} className="absolute inset-0">
        <FloatCard className="left-0 top-[16%] sm:-left-4" delay={1.9} icon={<TrendingUp size={16} />} label="Forerunner 55 yield" value="97% → 100%" />
        <FloatCard className="bottom-[14%] right-0 sm:-right-2" delay={2.05} icon={<Gauge size={16} />} label="PUR 4.0 ROI" value="150%" />
        <FloatCard className="bottom-[4%] left-[10%] hidden sm:flex" delay={2.2} icon={<Factory size={16} />} label="New line investment" value="US$160M" />
      </motion.div>
    </div>
  );
}

function FloatCard({
  className = '',
  delay,
  icon,
  label,
  value,
}: {
  className?: string;
  delay: number;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass absolute flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft ring-1 ring-line/60 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-accent">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] text-muted">{label}</span>
        <span className="text-[15px] font-semibold tracking-tight text-ink">{value}</span>
      </span>
    </motion.div>
  );
}
