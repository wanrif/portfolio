import { setTheme } from '@containers/app/reducer';
import { selectTheme } from '@containers/app/selectors';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';

const NavbarRevamp = () => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Experience', 'Skills', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gunmetal-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-2xl font-bold bg-gradient-to-r from-fluorescent-cyan-400 via-vista-blue-400 to-iris-400 text-transparent bg-clip-text'
          >
            Wanrif
          </motion.div>

          <div className='hidden md:flex items-center space-x-8'>
            {links.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className='text-vista-blue-200 hover:text-fluorescent-cyan-400 transition-colors duration-300'
              >
                {link}
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleThemeToggle}
            className='p-2 rounded-xl bg-gunmetal-800/50 hover:bg-iris-800/50 text-fluorescent-cyan-400 hover:text-fluorescent-cyan-300 transition-all duration-300'
          >
            {theme === 'dark' ? <BsSun className='w-5 h-5' /> : <BsMoonStars className='w-5 h-5' />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavbarRevamp;
