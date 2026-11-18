import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { projects, type Project } from '../data/content';
import { fadeUp } from '../lib/motion';
import { Modal } from './Modal';
import { ProjectCover, coverTheme } from './ProjectCover';
import { RevealGroup } from './Reveal';
import { SectionHeading } from './SectionHeading';

function ProjectCard({
  project,
  feature,
  last,
  onOpen,
}: {
  project: Project;
  feature?: boolean;
  last?: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-[28px] bg-elevated shadow-soft ring-1 ring-line/50 transition-shadow duration-500 hover:shadow-lift ${
        feature ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.45fr_1fr]' : last ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <motion.div
        layoutId={`cover-${project.id}`}
        className={`relative overflow-hidden ${feature ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[460px]' : 'aspect-[16/10]'}`}
      >
        <div className="h-full w-full transition-transform duration-[1200ms] ease-apple group-hover:scale-[1.04]">
          <ProjectCover variant={project.cover} title={project.title} />
        </div>
      </motion.div>

      <div className={`flex flex-col p-6 sm:p-8 ${feature ? 'lg:justify-center lg:p-12' : ''}`}>
        <p className="flex items-center gap-2 text-[13px] text-muted">
          <span className="font-medium text-accent">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{project.year}</span>
        </p>
        <h3 className={`mt-2 font-semibold tracking-tight text-ink ${feature ? 'text-[clamp(1.75rem,3vw,2.5rem)]' : 'text-[24px]'}`}>
          {project.title}
        </h3>
        <p className={`mt-1 text-ink/75 ${feature ? 'text-[19px]' : 'text-[16px]'}`}>{project.subtitle}</p>
        {feature && <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">{project.background}</p>}

        {feature && (
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line/70 pt-6">
            {project.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="text-[19px] font-semibold leading-tight tracking-tight text-ink sm:text-[24px]">{r.value}</dd>
                <dd className="mt-1 text-[12px] text-muted sm:text-[13px]">{r.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <button
          type="button"
          onClick={onOpen}
          className={`mt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-[15px] font-medium text-accent after:absolute after:inset-0 after:content-[''] ${
            feature ? 'lg:mt-10' : ''
          }`}
          aria-haspopup="dialog"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 transition-transform duration-500 ease-apple group-hover:rotate-90">
            <Plus size={16} aria-hidden="true" />
          </span>
          查看專案細節<span className="sr-only">：{project.title}</span>
        </button>
      </div>
    </motion.article>
  );
}

function ProjectDetail({ project, onNav }: { project: Project; onNav: (dir: 1 | -1) => void }) {
  const titleId = `project-title-${project.id}`;
  const dark = coverTheme[project.cover].dark;
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.closest('.overflow-y-auto')?.scrollTo({ top: 0 });
  }, [project.id]);
  return (
    <article ref={ref} aria-labelledby={titleId}>
      <motion.div layoutId={`cover-${project.id}`} className="relative aspect-[16/9] overflow-hidden" style={{ background: coverTheme[project.cover].bg }}>
        <ProjectCover variant={project.cover} title={project.title} />
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${dark ? 'from-black/30' : 'from-black/5'} to-transparent`} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 pb-10 pt-8 sm:px-12 sm:pb-14 sm:pt-12"
      >
        <p className="text-[13px] font-medium text-accent">
          {project.category} · <span className="tabular-nums">{project.year}</span>
        </p>
        <h2 id={titleId} className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-display text-ink">
          {project.title}
        </h2>
        <p className="mt-2 text-[19px] text-ink/75">{project.subtitle}</p>

        <dl className="mt-8 grid gap-6 border-y border-line/70 py-6 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">角色</dt>
            <dd className="mt-1.5 text-[15px] text-ink">{project.role}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">技術</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full bg-surface px-2.5 py-1 text-[12px] font-medium text-ink/80">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {[
            ['專案背景', project.background],
            ['技術挑戰', project.challenge],
            ['解決方案', project.solution],
          ].map(([h, t], i) => (
            <section key={h}>
              <p className="text-[12px] font-medium tabular-nums text-muted">0{i + 1}</p>
              <h3 className="mt-1 text-[19px] font-semibold tracking-tight text-ink">{h}</h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-muted">{t}</p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-3xl bg-surface p-6 sm:p-8">
          <h3 className="text-[19px] font-semibold tracking-tight text-ink">專案成果</h3>
          <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {project.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-tightest text-ink">{r.value}</dd>
                <dd className="mt-2 text-[14px] text-muted">{r.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="mt-10 flex items-center justify-between gap-4" aria-label="切換專案">
          <button type="button" onClick={() => onNav(-1)} className="btn-ghost !px-5">
            <ArrowLeft size={16} aria-hidden="true" /> 上一個
          </button>
          <button type="button" onClick={() => onNav(1)} className="btn-ghost !px-5">
            下一個 <ArrowRight size={16} aria-hidden="true" />
          </button>
        </nav>
      </motion.div>
    </article>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const index = projects.findIndex((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);
  const nav = (dir: 1 | -1) => {
    const next = projects[(index + dir + projects.length) % projects.length];
    setOpenId(next.id);
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-surface py-24 md:py-36">
      <div className="container-site">
        <SectionHeading
          id="projects-title"
          eyebrow="Selected Work"
          title={'每一個專案，\n都是解決真實問題的旅程。'}
          description="以下是在 Garmin、Corning 與群光電能的代表專案，橫跨穿戴裝置、車用玻璃與電源產品。點擊任一專案，了解背後的挑戰與解法。"
        />

        <LayoutGroup>
          <RevealGroup className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3" gap={0.1}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} feature={i === 0} last={i === projects.length - 1 && projects.length % 2 === 0} onOpen={() => setOpenId(p.id)} />
            ))}
          </RevealGroup>

          <AnimatePresence>
            {openId && index >= 0 && (
              <Modal key="project-modal" onClose={close} labelledBy={`project-title-${openId}`}>
                <ProjectDetail key={openId} project={projects[index]} onNav={nav} />
              </Modal>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
