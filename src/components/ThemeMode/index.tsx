import cn from '@utils/cn';
import React from 'react';
import { GiEvilMoon, GiSun } from 'react-icons/gi';

interface ThemeModeProps {
  theme: string;
  className?: string;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme, className }) => {
  return theme === 'dark' ? (
    <GiEvilMoon className={cn(className ? className : 'w-7 h-7')} />
  ) : (
    <GiSun className={cn(className ? className : 'w-7 h-7')} />
  );
};

export default ThemeMode;
