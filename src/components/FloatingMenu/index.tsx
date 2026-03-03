import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import ThemeMode from '@components/ThemeMode';
import Language from '@containers/language';
import { selectLocale, selectTheme, useAppStore } from '@stores/app/store';
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
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
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
    if (!isPaletteOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
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
    <div className='fixed bottom-3 left-1/2 z-50 flex w-[calc(100vw-1rem)] -translate-x-1/2 items-center justify-center sm:bottom-4 sm:w-auto'>
      <motion.div
        ref={refs.menu}
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={containerVariants}
        className={`hidden sm:flex ${
          isScrolled ? 'bg-shark-900/86' : 'bg-shark-950/95'
        } relative flex w-fit max-w-[calc(100vw-2rem)] items-center gap-x-2 overflow-x-auto rounded-2xl border border-tertiary-700/55 px-2 py-1.5 backdrop-blur-xl [scrollbar-width:none] sm:max-w-none sm:px-3 sm:py-2 [&::-webkit-scrollbar]:hidden`}
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
          className='ml-auto cursor-pointer rounded-xl border border-gallery-700/90 bg-shark-950/75 px-2 py-1 text-[10px] tracking-[0.12em] text-gallery-200 uppercase hover:border-tertiary-400 sm:ml-0 sm:text-[11px]'
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
        className={`${
          isScrolled ? 'bg-shark-900/88' : 'bg-shark-950/95'
        } flex w-fit max-w-full items-center justify-center gap-1.5 rounded-2xl border border-tertiary-700/55 px-2 py-1.5 backdrop-blur-xl sm:hidden`}
      >
        {mobileMenuList.map((item, index) => (
          <motion.button
            key={index}
            custom={index}
            variants={menuItemVariants}
            whileTap={{ scale: 0.94 }}
            type='button'
            aria-label={item.tooltip}
            className='flex h-10 w-10 items-center justify-center rounded-xl border border-gallery-700/90 bg-shark-950/75 text-tertiary-300'
            onClick={item.handleClick}
          >
            {item.component}
          </motion.button>
        ))}

        <motion.button
          type='button'
          whileTap={{ scale: 0.94 }}
          className='flex h-10 min-w-10 items-center justify-center rounded-xl border border-gallery-700/90 bg-shark-950/75 px-2 text-[10px] font-semibold tracking-[0.12em] text-gallery-200 uppercase'
          onClick={() => setIsPaletteOpen(true)}
        >
          exec
        </motion.button>
      </motion.div>

      {createPortal(
        <AnimatePresence>
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
