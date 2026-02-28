import React from 'react';

interface ThemeModeProps {
  theme: string;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme }) => {
  return <span className='text-sm font-semibold'>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>;
};

export default ThemeMode;
