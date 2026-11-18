import { motion } from 'framer-motion';
import { impactKpis, impactNote, impactYears, npiDashboard } from '../data/content';
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

        {/* NPI dashboard 2021–2025 */}
        <Reveal className="mt-16 rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-10 md:mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[21px] font-semibold tracking-tight">NPI 儀表板 2021–2025</h3>
            <p className="text-[13px] text-white/50">資料來源：2025 年晉升審查報告</p>
          </div>
          <dl className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="text-[13px] text-white/55">產品上市</dt>
              <dd className="mt-2 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tightest tabular-nums">
                {npiDashboard.launches}
                <span className="ml-1 text-[17px] font-medium tracking-normal text-white/60">款</span>
              </dd>
            </div>
            <div>
              <dt className="text-[13px] text-white/55">達成 QCD 目標</dt>
              <dd className="mt-2 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tightest tabular-nums">
                {npiDashboard.qcdMet}
                <span className="ml-1 text-[17px] font-medium tracking-normal text-white/60">/ {npiDashboard.launches} 款</span>
              </dd>
              <dd className="mt-3 text-[13px] leading-relaxed text-white/55">{npiDashboard.qcdCriteria.join('・')}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-white/55">準則導入率</dt>
              <dd className="mt-2 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tightest tabular-nums">
                {npiDashboard.guidelineRate}
              </dd>
              <dd className="mt-3 text-[13px] leading-relaxed text-white/55">點膠製程・手持產品製程</dd>
            </div>
          </dl>

          <h4 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">工作組成</h4>
          {/* one 100% bar: all segments share the same unit, so lengths are comparable */}
          <div className="mt-4 flex h-3 w-full gap-[2px] overflow-hidden rounded-full" role="img" aria-label={npiDashboard.portfolio.map((p) => `${p.label} ${p.share}%`).join('，')}>
            {npiDashboard.portfolio.map((p, i) => (
              <div
                key={p.label}
                className="h-full bg-[#2997FF]"
                style={{ width: `${p.share}%`, opacity: 1 - i * 0.22 }}
                title={`${p.label} ${p.share}%`}
              />
            ))}
          </div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {npiDashboard.portfolio.map((p, i) => (
              <li key={p.label} className="min-w-0">
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2997FF]" style={{ opacity: 1 - i * 0.22 }} aria-hidden="true" />
                  {p.label}
                  <span className="font-normal tabular-nums text-white/55">{p.share}%</span>
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{p.items.join('・')}</p>
              </li>
            ))}
          </ul>
        </Reveal>

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
