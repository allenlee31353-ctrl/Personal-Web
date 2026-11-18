import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { navItems, profile } from '../data/content';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../hooks/useTheme';
import { useScrollLock } from '../hooks/useScrollLock';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const top = () => window.scrollY < 200 && setActive('');
    window.addEventListener('scroll', top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', top);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid ? 'glass shadow-[0_1px_0_rgb(var(--c-line)/0.6)]' : 'bg-transparent'
        }`}
      >
        <nav aria-label="主要導覽" className="container-site flex h-14 items-center justify-between md:h-16">
          <a href="#top" className="group flex items-center gap-2.5 rounded-md" aria-label={`${profile.nameEn} 首頁`}>
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-ink text-[13px] font-semibold tracking-tight text-canvas transition-transform duration-500 ease-apple group-hover:rotate-[-6deg]">
              {profile.initials}
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">{profile.nameEn}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-[14px] transition-colors ${
                    active === item.id ? 'text-ink' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                      transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a href="#contact" className="btn-primary ml-2 hidden !min-h-[36px] !px-4 !text-[13px] md:inline-flex">
              合作洽詢
            </a>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full md:hidden"
              aria-label={open ? '關閉選單' : '開啟選單'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">選單</span>
              <span
                className={`absolute h-[1.5px] w-[18px] rounded bg-ink transition-transform duration-300 ease-apple ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded bg-ink transition-transform duration-300 ease-apple ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>
        <motion.div className="h-px origin-left bg-accent/70" style={{ scaleX: progress }} aria-hidden="true" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-14 bg-canvas/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.1 } }}
          >
            <motion.ul
              className="container-site flex flex-col pt-6"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
                  className="border-b border-line/60"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[60px] items-center text-[26px] font-semibold tracking-tight text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="pt-8">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  合作洽詢
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
