import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/content';

/** A short, elegant intro: monogram + hairline progress, then fades away. */
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const min = reduce ? 0 : 1300;
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, min - (performance.now() - start));
      window.setTimeout(() => setDone(true), wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    // Never block the site for long, even if a font stalls.
    const failsafe = window.setTimeout(() => setDone(true), 3000);
    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(failsafe);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-canvas"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          role="status"
          aria-label="網站載入中"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[44px] font-semibold tracking-tightest text-ink"
            >
              {profile.initials}
              <span className="text-accent">.</span>
            </motion.div>
            <div className="mt-6 h-[2px] w-28 overflow-hidden rounded-full bg-line/60">
              <motion.div
                className="h-full bg-ink"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
