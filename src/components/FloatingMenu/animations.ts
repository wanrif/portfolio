import { gsap } from 'gsap';
import type { Variants } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.22,
      ease: 'easeOut' as const,
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  }),
};

export const animateTooltip = (element: HTMLElement, show: boolean) => {
  return gsap.to(element, {
    opacity: show ? 1 : 0,
    y: show ? -10 : 0,
    duration: show ? 0.3 : 0.2,
    ease: show ? 'power2.out' : 'power2.in',
  });
};
