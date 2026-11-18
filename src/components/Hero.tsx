import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { profile } from '../data/content';
import { HeroVisual } from './HeroVisual';

const INTRO_DELAY = 1.35; // starts as the loader fades

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const lines = profile.headline.split('\n');
  const d = (n: number) => (reduce ? 0 : INTRO_DELAY + n);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 md:pt-28"
    >
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d(0) }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-medium text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30D158] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30D158]" />
              </span>
              {profile.availability}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d(0.08) }}
            className="mt-8 text-[17px] font-medium text-ink md:text-[19px]"
          >
            <span className="inline-flex items-center gap-3">
              <img
                src={profile.avatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-canvas shadow-soft"
              />
              <span>
                {profile.name} <span className="text-muted">·</span> {profile.nameEn}
              </span>
            </span>
          </motion.p>

          <h1 id="hero-title" className="display-1 mt-3 text-balance">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: reduce ? 0 : '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: d(0.15 + i * 0.12), ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.includes(profile.headlineAccent) ? (
                    <>
                      {line.split(profile.headlineAccent)[0]}
                      <span className="text-accent">{profile.headlineAccent}</span>
                      {line.split(profile.headlineAccent)[1]}
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d(0.45) }}
            className="mt-6 max-w-xl text-[19px] font-medium leading-snug text-ink/85 md:text-[22px]"
          >
            {profile.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d(0.55) }}
            className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted md:text-[17px]"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d(0.68) }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#about" className="btn-primary group">
              認識我
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href="#projects" className="btn-ghost group">
              探索我的作品
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: d(0.85) }}
            className="mt-10 flex items-center gap-2 text-[13px] text-muted"
          >
            <MapPin size={14} /> {profile.location} · {profile.role} @ {profile.company}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: d(0.1) }}
          className="px-4 sm:px-8 lg:px-0"
        >
          <HeroVisual progress={scrollYProgress} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="向下捲動至關於我"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d(1.2) }}
        className="absolute bottom-6 left-1/2 hidden h-11 w-7 -translate-x-1/2 justify-center rounded-full ring-1 ring-inset ring-ink/20 md:flex"
      >
        <motion.span
          className="mt-2 h-2 w-[3px] rounded-full bg-ink/50"
          animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  );
}
