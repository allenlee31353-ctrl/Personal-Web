import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

interface Props {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** layoutId shared with the trigger card for a seamless expand transition */
  layoutId?: string;
}

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export function Modal({ onClose, labelledBy, children, layoutId }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useScrollLock(true);

  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        layoutId={layoutId}
        initial={layoutId ? undefined : { opacity: 0, y: 40, scale: 0.98 }}
        animate={layoutId ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={layoutId ? undefined : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
        className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] bg-elevated shadow-lift sm:rounded-[28px]"
      >
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label="關閉"
          className="glass absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-ink transition hover:scale-105"
        >
          <X size={20} strokeWidth={2} />
        </button>
        <div className="overflow-y-auto overscroll-contain">{children}</div>
      </motion.div>
    </div>
  );
}
