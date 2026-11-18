import { motion } from 'framer-motion';
import { impactKpis, impactNote, impactYears } from '../data/content';
import { fadeUp } from '../lib/motion';
import { Reveal, RevealGroup } from './Reveal';

/**
 * Year-by-year quantified results. Each metric has its own unit, so they are
 * shown as separate figures rather than bars on one shared scale.
 * The band keeps a deliberate dark look in both themes.
 */
export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="relative overflow-hidden bg-[#0A0A0C] py-24 text-white dark:bg-[#161617] md:py-36"
    >
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#2997FF]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2997FF]">Impact 2021–2026</p>
          <h2 id="impact-title" className="display-2 mt-4 text-balance !text-white">
            逐年成果，
            <br />
            用數字說話。
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/60 md:text-[19px]">{impactNote}</p>
        </Reveal>

        {/* headline figures */}
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {impactKpis.map((k) => (
            <motion.div key={k.label} variants={fadeUp} className="flex flex-col bg-[#141416] p-6 dark:bg-[#1d1d1f] sm:p-8">
              <p className="text-[13px] text-white/55">{k.label}</p>
              <p className="mt-4 whitespace-nowrap text-[clamp(1.75rem,2.7vw,2.5rem)] font-semibold leading-none tracking-tightest tabular-nums">{k.value}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/55">{k.note}</p>
            </motion.div>
          ))}
        </RevealGroup>

        {/* year-by-year */}
        <ol className="mt-16 md:mt-24">
          {impactYears.map((y) => (
            <Reveal
              key={y.year}
              as="li"
              className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-[200px_1fr] md:gap-10 md:py-12"
            >
              <div className="md:sticky md:top-24 md:self-start">
                <p className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-tightest tabular-nums">{y.year}</p>
                <p className="mt-2 text-[13px] text-white/50">
                  {y.note ? y.note : `${y.items.length} 項成果`}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-3">
                {y.items.map((it) => (
                  <li key={it.label} className="min-w-0">
                    <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-tight tabular-nums">
                      {it.value}
                    </p>
                    <p className="mt-2 text-[15px] font-medium leading-snug text-white/85">{it.label}</p>
                    {it.detail && <p className="mt-1 text-[13px] leading-relaxed text-white/55">{it.detail}</p>}
                    {it.product && (
                      <span className="mt-3 inline-block rounded-full bg-white/[0.08] px-2.5 py-1 text-[12px] font-medium text-white/70 ring-1 ring-white/10">
                        {it.product}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
