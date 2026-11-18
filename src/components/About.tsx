import { motion } from 'framer-motion';
import { Compass, Gem, Sprout } from 'lucide-react';
import { aboutParagraphs, experience, profile, stats, values } from '../data/content';
import { fadeUp } from '../lib/motion';
import { CountUp } from './CountUp';
import { Reveal, RevealGroup } from './Reveal';

const valueIcons = [Compass, Gem, Sprout];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-surface py-24 md:py-36">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: narrative */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="mb-8 flex items-center gap-4">
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} ${profile.nameEn} 個人照`}
                    width={72}
                    height={72}
                    loading="lazy"
                    decoding="async"
                    className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-elevated shadow-soft"
                  />
                  <div>
                    <p className="text-[17px] font-semibold tracking-tight text-ink">
                      {profile.name} {profile.nameEn}
                    </p>
                    <p className="text-[14px] text-muted">
                      {profile.role} · {profile.company}
                    </p>
                  </div>
                </div>
                <p className="eyebrow">About Me</p>
                <h2 id="about-title" className="display-2 mt-4 text-balance">
                  把複雜的技術，
                  <br />
                  化為簡單的體驗。
                </h2>
              </Reveal>
              <div className="mt-8 space-y-5">
                {aboutParagraphs.map((p, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <p className="text-[17px] leading-[1.75] text-muted md:text-[18px]">{p}</p>
                  </Reveal>
                ))}
              </div>

              <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" gap={0.1}>
                {values.map((v, i) => {
                  const Icon = valueIcons[i % valueIcons.length];
                  return (
                    <motion.div key={v.title} variants={fadeUp}>
                      <Icon size={22} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                      <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink">{v.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{v.text}</p>
                    </motion.div>
                  );
                })}
              </RevealGroup>
            </div>
          </div>

          {/* Right: numbers + timeline */}
          <div className="lg:col-span-6">
            <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line/70 ring-1 ring-line/70">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="bg-elevated p-6 sm:p-8">
                  <div className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-none tracking-tightest text-ink">
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-[14px] text-muted">{s.label}</div>
                </motion.div>
              ))}
            </RevealGroup>

            <Reveal className="mt-14">
              <h3 className="flex items-baseline justify-between text-[21px] font-semibold tracking-tight text-ink">
                工作經歷
                <span className="text-[13px] font-normal text-muted">{profile.location}</span>
              </h3>
            </Reveal>
            <ol className="relative mt-6 border-l border-line pl-0">
              {experience.map((e, i) => (
                <Reveal key={e.title} delay={0.06 * i} as="li" className="relative pb-10 pl-8 last:pb-0">
                    <span
                      className={`absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full ring-4 ring-surface ${
                        i === 0 ? 'bg-accent' : 'bg-line'
                      }`}
                      aria-hidden="true"
                    />
                    <p className="text-[13px] font-medium tabular-nums text-muted">{e.period}</p>
                    <p className="mt-1 text-[18px] font-semibold tracking-tight text-ink">{e.title}</p>
                    <p className="text-[15px] text-ink/70">{e.org}</p>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{e.text}</p>
                    {e.highlights && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${e.title} 重點成果`}>
                        {e.highlights.map((h) => (
                          <li key={h} className="rounded-full bg-elevated px-2.5 py-1 text-[12px] font-medium text-ink/75 ring-1 ring-line/60">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
