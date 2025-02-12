import ThemeMode from '@components/ThemeMode';
import { setTheme } from '@containers/app/reducer';
import { selectLocale, selectTheme } from '@containers/app/selectors';
import LanguageRevamp from '@containers/languageRevamp';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsBriefcase, BsStack } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

const menuItems = [
  { icon: BiHomeAlt2, label: 'Home', href: '#home' },
  { icon: BsBriefcase, label: 'Experience', href: '#experience' },
  { icon: BsStack, label: 'Skills', href: '#skills' },
  { icon: HiOutlineMail, label: 'Contact', href: '#contact' },
];

const FloatingMenuRevamp = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, width: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const locale = useAppSelector(selectLocale);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark');
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (!menuRef.current) return;

    const target = event.currentTarget;
    const menuRect = menuRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setTooltipPosition({
      x: targetRect.left - menuRect.left + targetRect.width / 2,
      width: targetRect.width,
    });
    setActiveIndex(index);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className='fixed inset-x-0 bottom-0 z-50 flex justify-center pb-6 sm:hidden'
    >
      <div ref={menuRef} className='relative'>
        {/* Tooltip */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'absolute',
                left: '35%',
                transform: 'translateX(-50%)',
                bottom: '80%',
                marginBottom: '1rem',
                minWidth: Math.max(tooltipPosition.width * 2, 80),
                textAlign: 'center',
              }}
              className='px-4 py-2 rounded-xl 
                      bg-gradient-to-r from-gunmetal-900/95 to-iris-900/95 
                      text-fluorescent-cyan-400 backdrop-blur-md 
                      border border-vista-blue-500/20 shadow-lg shadow-gunmetal-950/20
                      text-sm font-medium whitespace-nowrap pointer-events-none'
            >
              {activeIndex < menuItems.length
                ? menuItems[activeIndex].label
                : activeIndex === menuItems.length
                  ? 'Theme'
                  : locale}
              <div
                className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 
                            bg-gradient-to-br from-gunmetal-900 to-iris-900 border-b border-r border-vista-blue-500/20'
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Container */}
        <div
          className='flex items-center gap-1.5 p-1.5 rounded-2xl 
                      bg-gradient-to-r from-gunmetal-900/95 to-iris-900/95 backdrop-blur-md 
                      shadow-lg shadow-gunmetal-950/20 border border-vista-blue-500/20'
        >
          {menuItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className='p-3 rounded-xl text-vista-blue-400 hover:text-fluorescent-cyan-400 transition-all duration-200'
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={() => setActiveIndex(null)}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(123, 90, 255, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className='w-5 h-5' />
            </motion.a>
          ))}

          {/* Divider */}
          <div className='w-px h-6 bg-vista-blue-500/20' />

          {/* Theme Toggle */}
          <motion.button
            className='p-3 rounded-xl text-vista-blue-400 hover:text-fluorescent-cyan-400 transition-all duration-200'
            onClick={handleThemeToggle}
            onMouseEnter={(e) => handleMouseEnter(e, menuItems.length)}
            onMouseLeave={() => setActiveIndex(null)}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(123, 90, 255, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeMode theme={theme} className='w-5 h-5' />
          </motion.button>

          {/* Language Toggle */}
          <motion.div
            className='p-3 rounded-xl text-vista-blue-400 hover:text-fluorescent-cyan-400 transition-all duration-200'
            onMouseEnter={(e) => handleMouseEnter(e, menuItems.length + 1)}
            onMouseLeave={() => setActiveIndex(null)}
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(123, 90, 255, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <LanguageRevamp />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingMenuRevamp;
