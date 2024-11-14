import { setTheme } from '@containers/app/reducer';
import { selectTheme } from '@containers/app/selectors';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { motion } from 'framer-motion';
import React, { useCallback } from 'react';
import { GiEvilMoon, GiSun } from 'react-icons/gi';

const ThemeMode: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
    document.documentElement.classList.toggle('dark');
  }, [dispatch, theme]);

  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }} className='block' onClick={toggleTheme}>
      {theme === 'dark' ? <GiEvilMoon className='w-7 h-7' /> : <GiSun className='w-7 h-7' />}
    </motion.div>
  );
};

export default ThemeMode;
