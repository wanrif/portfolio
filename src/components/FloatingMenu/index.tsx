import ThemeMode from '@components/ThemeMode';
import { setTheme } from '@containers/app/reducer';
import { selectLocale, selectTheme } from '@containers/app/selectors';
import Language from '@containers/language';
import { useGSAP } from '@gsap/react';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import Tooltip from './Tooltip';
import { animateTooltip, containerVariants, menuItemVariants } from './animations';
import { MENU_ITEMS, SCROLL_OBSERVER_OPTIONS } from './config';

const FloatingMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const locale = useAppSelector(selectLocale);

  const [isScrolled, setIsScrolled] = useState(false);
  const [tooltipState, setTooltipState] = useState({ index: 0, isActive: false });

  const refs = {
    tooltip: useRef<HTMLDivElement>(null),
    menu: useRef<HTMLDivElement>(null),
    tooltipAnimation: useRef<GSAPTween | null>(null),
    scrollObserver: useRef<IntersectionObserver | null>(null),
  };

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
    document.documentElement.classList.toggle('dark');
  };

  const menuList = useMemo(
    () => [
      ...MENU_ITEMS.map(({ icon: Icon, sectionId, tooltip }) => ({
        component: <Icon className='w-7 h-7' />,
        handleClick: () => scrollToSection(sectionId),
        tooltip,
      })),
      {
        component: <ThemeMode theme={theme} />,
        handleClick: toggleTheme,
        tooltip: 'Theme',
      },
      {
        component: <Language />,
        tooltip: locale,
      },
    ],
    [theme, locale]
  );

  // Scroll observer effect
  useEffect(() => {
    refs.scrollObserver.current = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      SCROLL_OBSERVER_OPTIONS
    );

    const target = document.getElementById('header') || document.body;
    refs.scrollObserver.current.observe(target);

    return () => refs.scrollObserver.current?.disconnect();
  }, []);

  // Click outside effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!refs.menu.current?.contains(event.target as Node)) {
        setTooltipState((prev) => ({ ...prev, isActive: false }));
        refs.tooltipAnimation.current?.kill();
        refs.tooltip.current && (refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // GSAP animation
  useGSAP(() => {
    const items = gsap.utils.toArray('.menu-item');
    gsap.set(items, { opacity: 0, y: 50 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
      rotation: (i: number) => (i % 2 === 0 ? 15 : -15),
    });
  }, []);

  return (
    <div className='fixed bottom-0 py-4 w-screen flex justify-center items-center'>
      <motion.div
        ref={refs.menu}
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={containerVariants}
        className={`${
          isScrolled ? 'backdrop-blur-lg bg-white/30 dark:bg-black/30' : 'bg-gallery-50 dark:bg-tuna-950'
        } shadow-md rounded-full py-2 px-4 w-fit flex items-center gap-x-4 relative`}
      >
        <Tooltip
          ref={refs.tooltip}
          isActive={tooltipState.isActive}
          tooltipIndex={tooltipState.index}
          items={menuList}
        />
        {menuList.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={menuItemVariants}
            whileHover={{ scale: 1.2, rotate: 0, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 1.1, rotate: 0 }}
            className='font-semibold cursor-pointer select-none text-tertiary-500 dark:text-gallery-100'
            onClick={item.handleClick}
            onMouseEnter={() => {
              setTooltipState({ index, isActive: true });
              refs.tooltipAnimation.current?.kill();
              refs.tooltip.current && (refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, true));
            }}
            onMouseLeave={() => {
              setTooltipState((prev) => ({ ...prev, isActive: false }));
              refs.tooltipAnimation.current?.kill();
              refs.tooltip.current && (refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, false));
            }}
          >
            {item.component}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(FloatingMenu);
