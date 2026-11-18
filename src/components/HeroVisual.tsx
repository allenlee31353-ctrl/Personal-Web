import { motion, useReducedMotion, type MotionValue, useTransform } from 'framer-motion';
import { Activity, Cpu, ShieldCheck } from 'lucide-react';

/**
 * Abstract "system" composition: a silicon die at the centre of orbit rings,
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

      {/* the chip */}
      <motion.div style={{ y: mid }} className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[38%] w-[38%]"
        >
          {/* pins */}
          <svg viewBox="0 0 200 200" className="absolute -inset-[16%] h-[132%] w-[132%] text-ink">
            {Array.from({ length: 8 }).map((_, i) => {
              const p = 44 + i * 16;
              return (
                <g key={i} stroke="currentColor" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round">
                  <line x1={p} y1="8" x2={p} y2="26" />
                  <line x1={p} y1="174" x2={p} y2="192" />
                  <line x1="8" y1={p} x2="26" y2={p} />
                  <line x1="174" y1={p} x2="192" y2={p} />
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0 rounded-[22%] bg-gradient-to-br from-[#3a3a3e] to-[#111113] shadow-[0_30px_60px_-15px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.12)] dark:from-[#2c2c30] dark:to-[#0a0a0b] dark:ring-1 dark:ring-white/10">
            <div className="absolute inset-[14%] rounded-[16%] bg-[#0b0b0d] ring-1 ring-white/[0.06]">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2997FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0071E3" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <g stroke="#fff" strokeOpacity="0.08">
                  {[20, 35, 50, 65, 80].map((v) => (
                    <g key={v}>
                      <line x1={v} y1="10" x2={v} y2="90" />
                      <line x1="10" y1={v} x2="90" y2={v} />
                    </g>
                  ))}
                </g>
                <rect x="35" y="35" width="30" height="30" rx="4" fill="url(#die)" />
                <rect x="20" y="20" width="12" height="12" rx="2" fill="#fff" fillOpacity="0.12" />
                <rect x="68" y="68" width="12" height="12" rx="2" fill="#fff" fillOpacity="0.12" />
                <rect x="68" y="20" width="12" height="7" rx="2" fill="#fff" fillOpacity="0.08" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* floating readouts */}
      <motion.div style={{ y: near }} className="absolute inset-0">
        <FloatCard className="left-0 top-[16%] sm:-left-4" delay={1.9} icon={<Cpu size={16} />} label="Edge inference" value="38 ms" />
        <FloatCard className="bottom-[14%] right-0 sm:-right-2" delay={2.05} icon={<Activity size={16} />} label="System uptime" value="99.9%" />
        <FloatCard className="bottom-[4%] left-[10%] hidden sm:flex" delay={2.2} icon={<ShieldCheck size={16} />} label="Patents" value="8 granted" />
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
