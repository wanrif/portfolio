import { gsap } from 'gsap';

export const containerVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 100,
    scale: 0.9,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
};

export const menuItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: i % 2 === 0 ? 15 : -15,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 200,
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
