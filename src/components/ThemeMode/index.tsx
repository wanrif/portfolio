import React from 'react';
import { GiEvilMoon, GiSun } from 'react-icons/gi';

interface ThemeModeProps {
  theme: string;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme }) => {
  return theme === 'dark' ? <GiEvilMoon className='w-7 h-7' /> : <GiSun className='w-7 h-7' />;
};

export default ThemeMode;
