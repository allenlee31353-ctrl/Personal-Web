import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? '切換為淺色模式' : '切換為深色模式'}
      title={dark ? '淺色模式' : '深色模式'}
      className="relative grid h-11 w-11 place-items-center rounded-full text-ink/80 transition hover:bg-ink/[0.06] hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {dark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
