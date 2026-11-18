import { motion, type HTMLMotionProps } from 'framer-motion';
import { easeOut, stagger, viewport } from '../lib/motion';

type Props = HTMLMotionProps<'div'> & { delay?: number; as?: 'div' | 'li' };

/** Fades its children in once when scrolled into view. */
export function Reveal({ delay = 0, as = 'div', children, ...rest }: Props) {
  const Tag = (as === 'li' ? motion.li : motion.div) as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut, delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Container that staggers `motion` children using the `fadeUp` variant. */
export function RevealGroup({ children, gap = 0.08, ...rest }: HTMLMotionProps<'div'> & { gap?: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(gap)} {...rest}>
      {children}
    </motion.div>
  );
}
