import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { expertise, type Expertise as Item } from '../data/content';
import { fadeUp } from '../lib/motion';
import { RevealGroup } from './Reveal';
import { SectionHeading } from './SectionHeading';

// Bento placement on large screens (4-column grid).
const layout = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
  'lg:col-span-2',
];

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function Card({ item, index }: { item: Item; index: number }) {
  const Icon = item.icon;
  const feature = index === 0;
  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={spotlight}
      className={`group relative isolate flex flex-col overflow-hidden rounded-[28px] bg-surface p-7 transition-[transform,box-shadow] duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift sm:p-8 ${layout[index]} ${
        feature ? 'min-h-[340px] sm:col-span-2 lg:min-h-[520px]' : 'min-h-[240px]'
      }`}
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgb(var(--c-accent) / 0.08), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between">
        <span
          className={`grid place-items-center rounded-2xl transition-colors duration-500 ${
            feature ? 'h-14 w-14 bg-ink text-canvas' : 'h-12 w-12 bg-elevated text-ink group-hover:bg-accent group-hover:text-white'
          }`}
        >
          <Icon size={feature ? 26 : 22} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="text-[12px] font-medium tabular-nums text-muted">0{index + 1}</span>
      </div>

      {feature && (
        <svg
          viewBox="0 0 400 220"
          className="pointer-events-none absolute -right-10 top-24 w-[85%] max-w-[440px] text-ink/[0.07] transition-transform duration-[1200ms] ease-apple group-hover:-translate-x-3 dark:text-white/[0.07]"
          aria-hidden="true"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${200 - i * 16} C 120 ${200 - i * 16}, 160 ${110 - i * 6}, 400 ${60 - i * 4}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="400" cy="20" r="5" className="fill-accent" />
        </svg>
      )}

      <div className="mt-auto pt-10">
        <p className="text-[13px] font-medium text-muted">{item.en}</p>
        <h3
          className={`mt-1 font-semibold tracking-tight text-ink ${
            feature ? 'text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight' : 'text-[21px]'
          }`}
        >
          {item.title}
        </h3>
        <p className={`mt-3 leading-relaxed text-muted ${feature ? 'max-w-md text-[17px]' : 'text-[15px]'}`}>{item.text}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} 相關技能`}>
          {item.tags.map((t) => (
            <li key={t} className="rounded-full bg-elevated px-3 py-1 text-[12px] font-medium text-ink/75 ring-1 ring-line/60">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="expertise-title"
            eyebrow="Expertise"
            title={'跨越軟體、硬體與設計\n的整合能力。'}
            description="十多年來，我在不同產業與角色之間累積了完整的產品開發視野，從概念驗證到量產上市。"
          />
          <a href="#projects" className="link-arrow shrink-0 text-[15px] md:mb-2">
            看看實際成果 <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <RevealGroup className="mt-14 grid auto-rows-auto gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5" gap={0.07}>
          {expertise.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
