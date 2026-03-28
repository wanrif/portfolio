import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import ThemeMode from '@components/ThemeMode';
import Language from '@containers/language';
import { selectLocale, selectTheme, useAppStore } from '@stores/app/store';
import cn from '@utils/cn';
import scrollToSection from '@utils/scrollToSection';

import { AnimatePresence, motion } from 'framer-motion';

import { animateTooltip, containerVariants, menuItemVariants } from './animations';
import { MENU_ITEMS, SCROLL_OBSERVER_OPTIONS } from './config';
import Tooltip from './Tooltip';

const FloatingMenu: React.FC = () => {
  const { t } = useTranslation();
  const theme = useAppStore(selectTheme);
  const locale = useAppStore(selectLocale);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompactDock, setIsCompactDock] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileUtilityOpen, setIsMobileUtilityOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [tooltipState, setTooltipState] = useState({ index: 0, isActive: false });

  const refs = {
    tooltip: useRef<HTMLDivElement>(null),
    menu: useRef<HTMLDivElement>(null),
    tooltipAnimation: useRef<ReturnType<typeof animateTooltip> | null>(null),
    scrollObserver: useRef<IntersectionObserver | null>(null),
  };

  const menuList = useMemo(
    () => [
      ...MENU_ITEMS.map(({ icon: Icon, sectionId, tooltip }) => ({
        component: <Icon className='h-7 w-7' />,
        handleClick: () => scrollToSection(sectionId),
        tooltip,
      })),
      {
        component: <ThemeMode theme={theme} />,
        handleClick: toggleTheme,
        tooltip: 'theme',
      },
      {
        component: <Language />,
        handleClick: () => undefined,
        tooltip: locale,
      },
    ],
    [theme, locale, toggleTheme],
  );

  const mobileMenuList = useMemo(
    () =>
      MENU_ITEMS.map(({ icon: Icon, sectionId, tooltip }) => ({
        component: <Icon className='h-5 w-5' />,
        handleClick: () => scrollToSection(sectionId),
        tooltip,
      })),
    [],
  );

  const commandList = useMemo(
    () => [
      { command: 'home', description: t('palette_home'), action: () => scrollToSection('top') },
      {
        command: 'projects',
        description: t('palette_projects'),
        action: () => scrollToSection('projects'),
      },
      { command: 'now', description: t('palette_now'), action: () => scrollToSection('now') },
      {
        command: 'skills',
        description: t('palette_skills'),
        action: () => scrollToSection('skills'),
      },
      {
        command: 'contact',
        description: t('palette_contact'),
        action: () => scrollToSection('contacts'),
      },
      { command: 'theme', description: t('palette_theme'), action: () => toggleTheme() },
      {
        command: 'lang',
        description: t('palette_lang'),
        action: () => document.querySelector<HTMLElement>('[data-testid="locale-toggle"]')?.click(),
      },
    ],
    [t, toggleTheme],
  );

  // Scroll observer effect
  useEffect(() => {
    refs.scrollObserver.current = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      SCROLL_OBSERVER_OPTIONS,
    );

    const target = document.getElementById('header') || document.body;
    refs.scrollObserver.current.observe(target);

    return () => refs.scrollObserver.current?.disconnect();
  }, []);

  // Click outside effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node) || !refs.menu.current?.contains(event.target)) {
        setTooltipState((prev) => ({ ...prev, isActive: false }));
        refs.tooltipAnimation.current?.kill();
        if (refs.tooltip.current) {
          refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Compact dock is mobile-only; tablets and above keep the regular dock.
    const mobileLayoutMediaQuery = window.matchMedia('(max-width: 932px)');

    const updateDockLayout = () => {
      setIsCompactDock(mobileLayoutMediaQuery.matches);
    };

    updateDockLayout();

    mobileLayoutMediaQuery.addEventListener('change', updateDockLayout);
    return () => {
      mobileLayoutMediaQuery.removeEventListener('change', updateDockLayout);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }

      if (event.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (!isPaletteOpen && !isMobileUtilityOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPaletteOpen, isMobileUtilityOpen]);

  useEffect(() => {
    if (isPaletteOpen) {
      setIsMobileUtilityOpen(false);
    }
  }, [isPaletteOpen]);

  const filteredCommands = commandList.filter(({ command }) =>
    command.includes(commandInput.trim().toLowerCase()),
  );

  useEffect(() => {
    setActiveCommandIndex(0);
  }, [commandInput, isPaletteOpen]);

  const runCommand = (command: string) => {
    const selectedCommand = commandList.find((item) => item.command === command);
    selectedCommand?.action();
    setCommandInput('');
    setIsPaletteOpen(false);
    setIsMobileUtilityOpen(false);
  };

  const handlePaletteKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredCommands.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveCommandIndex((prev) => (prev + 1) % filteredCommands.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveCommandIndex(
        (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length,
      );
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const activeCommand = filteredCommands[activeCommandIndex];
      if (activeCommand) {
        runCommand(activeCommand.command);
      }
    }
  };

  return (
    <div
      className={cn(
        'fixed left-1/2 z-50 flex -translate-x-1/2 items-center justify-center',
        isCompactDock
          ? 'bottom-[max(0.5rem,env(safe-area-inset-bottom))] w-[calc(100vw-0.75rem)]'
          : 'bottom-4 w-auto',
      )}
    >
      <motion.div
        ref={refs.menu}
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={containerVariants}
        className={cn(
          isCompactDock ? 'hidden' : 'flex',
          {
            'bg-shark-900/86': isScrolled,
            'bg-shark-950/95': !isScrolled,
          },
          'relative w-fit max-w-none items-center gap-x-2 overflow-visible rounded-2xl border border-tertiary-700/55 px-3 py-2 backdrop-blur-xl',
        )}
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
            whileHover={{ scale: 1.08, rotate: 0, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            className='flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-xl border border-gallery-700/90 bg-shark-950/75 px-2 font-semibold text-tertiary-300 select-none hover:border-tertiary-400 sm:h-9.5 sm:min-w-9.5'
            onClick={item.handleClick}
            onMouseEnter={() => {
              setTooltipState({ index, isActive: true });
              refs.tooltipAnimation.current?.kill();
              if (refs.tooltip.current) {
                refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, true);
              }
            }}
            onMouseLeave={() => {
              setTooltipState((prev) => ({ ...prev, isActive: false }));
              refs.tooltipAnimation.current?.kill();
              if (refs.tooltip.current) {
                refs.tooltipAnimation.current = animateTooltip(refs.tooltip.current, false);
              }
            }}
          >
            {item.component}
          </motion.div>
        ))}
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='ml-auto cursor-pointer rounded-xl border border-gallery-700/90 bg-shark-950/75 px-2 py-1 text-[11px] tracking-[0.12em] text-gallery-200 uppercase hover:border-tertiary-400'
          onClick={() => setIsPaletteOpen(true)}
        >
          exec
        </motion.button>
      </motion.div>

      <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={containerVariants}
        className={cn(
          isCompactDock ? 'flex' : 'hidden',
          {
            'bg-shark-900/88': isScrolled,
            'bg-shark-950/95': !isScrolled,
          },
          'max-w-136 items-center gap-1.5 rounded-2xl border border-tertiary-700/55 bg-shark-950/78 px-1.5 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-xl',
        )}
      >
        <div className='min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <div className='flex min-w-max items-center gap-1.5 pr-1'>
            {mobileMenuList.map((item, index) => (
              <motion.button
                key={index}
                custom={index}
                variants={menuItemVariants}
                whileTap={{ scale: 0.94 }}
                type='button'
                aria-label={item.tooltip}
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gallery-700/90 bg-shark-950/75 text-tertiary-300'
                onClick={item.handleClick}
              >
                {item.component}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          type='button'
          whileTap={{ scale: 0.94 }}
          className='flex h-10 min-w-15 shrink-0 items-center justify-center rounded-xl border border-tertiary-500/55 bg-shark-900/85 px-3 text-[10px] font-semibold tracking-[0.14em] text-tertiary-200 uppercase'
          onClick={() => setIsMobileUtilityOpen(true)}
        >
          sys
        </motion.button>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {isMobileUtilityOpen && (
            <motion.div
              key='mobile-utility-overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: [0.33, 1, 0.68, 1] }}
              className='fixed inset-0 z-55 flex items-end justify-center bg-shark-950/80 px-0 pt-6'
              onClick={() => setIsMobileUtilityOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }}
                className='w-full max-w-136 overflow-hidden rounded-t-3xl border border-tertiary-700/55 bg-shark-950 pb-[max(0.75rem,env(safe-area-inset-bottom))] corner-superellipse/2'
                onClick={(event) => event.stopPropagation()}
              >
                <div className='border-b border-gallery-700 px-4 py-3 text-[11px] tracking-[0.16em] text-gallery-300 uppercase'>
                  {'>'} system controls
                </div>
                <div className='grid grid-cols-3 gap-2 p-3'>
                  <motion.button
                    type='button'
                    whileTap={{ scale: 0.96 }}
                    className='flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border border-gallery-700/85 bg-shark-900/70 px-2 text-center'
                    onClick={() => {
                      setIsMobileUtilityOpen(false);
                      setIsPaletteOpen(true);
                    }}
                  >
                    <span className='text-[11px] tracking-[0.14em] text-tertiary-300 uppercase'>
                      exec
                    </span>
                    <span className='text-[10px] text-gallery-400'>command</span>
                  </motion.button>

                  <motion.button
                    type='button'
                    whileTap={{ scale: 0.96 }}
                    className='flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border border-gallery-700/85 bg-shark-900/70 px-2 text-center'
                    onClick={() => {
                      toggleTheme();
                      setIsMobileUtilityOpen(false);
                    }}
                  >
                    <span className='text-[11px] tracking-[0.14em] text-tertiary-300 uppercase'>
                      theme
                    </span>
                    <span className='text-[10px] text-gallery-400'>
                      {theme === 'dark' ? 'cyber' : 'amber'}
                    </span>
                  </motion.button>

                  <motion.button
                    type='button'
                    whileTap={{ scale: 0.96 }}
                    className='flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border border-gallery-700/85 bg-shark-900/70 px-2 text-center'
                    onClick={() => {
                      document.querySelector<HTMLElement>('[data-testid="locale-toggle"]')?.click();
                      setIsMobileUtilityOpen(false);
                    }}
                  >
                    <span className='text-[11px] tracking-[0.14em] text-tertiary-300 uppercase'>
                      lang
                    </span>
                    <span className='text-[10px] text-gallery-400 uppercase'>{locale}</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {isPaletteOpen && (
            <motion.div
              key='palette-overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: [0.33, 1, 0.68, 1] }}
              className='fixed inset-0 z-60 flex items-end justify-center bg-shark-950/90 px-0 pt-6 sm:items-start sm:px-4 sm:pt-20'
              onClick={() => setIsPaletteOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.9 }}
                className='max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-hidden rounded-t-3xl border border-tertiary-700/55 bg-shark-950 corner-superellipse/2 sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl'
                onClick={(event) => event.stopPropagation()}
              >
                <div className='border-b border-gallery-700 px-4 py-3 text-xs tracking-wider text-gallery-300 uppercase'>
                  {'>'} {t('palette_title')}
                </div>
                <input
                  value={commandInput}
                  onChange={(event) => setCommandInput(event.target.value)}
                  onKeyDown={handlePaletteKeyDown}
                  placeholder={t('palette_placeholder')}
                  className='terminal-input-caret focus-visible:terminal-focus w-full border-b border-gallery-800 bg-transparent px-4 py-3 text-gallery-100'
                  autoFocus
                />
                <div className='border-b border-gallery-800 px-4 py-2 text-[11px] tracking-wider text-gallery-400 uppercase'>
                  {t('palette_hint')}
                </div>
                <div className='max-h-60 overflow-y-auto py-1'>
                  {filteredCommands.length ? (
                    filteredCommands.map(({ command, description }, index) => (
                      <button
                        key={command}
                        type='button'
                        className={`w-full cursor-pointer px-4 py-2.5 text-left ${
                          activeCommandIndex === index ? 'bg-shark-900/95' : 'hover:bg-shark-900/90'
                        }`}
                        onClick={() => runCommand(command)}
                      >
                        <div className='flex items-center justify-between gap-3'>
                          <span className='text-xs tracking-wide text-tertiary-300 uppercase sm:text-sm'>
                            {'$ run '} {command}
                          </span>
                          <span className='hidden text-xs text-gallery-400 sm:inline'>
                            {description}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className='px-4 py-3 text-sm text-gallery-400'>{t('palette_empty')}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default React.memo(FloatingMenu);
