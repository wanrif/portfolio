import React from 'react';

interface ThemeModeProps {
  theme: string;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme }) => {
  return (
    <span className='text-xs font-semibold tracking-wider uppercase'>
      {theme === 'dark' ? 'mode:cyber' : 'mode:amber-crt'}
    </span>
  );
};

export default ThemeMode;
