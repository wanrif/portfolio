import { selectLocale, useAppStore } from '@stores/app/store';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Language: React.FC = () => {
  const currentLocale = useAppStore(selectLocale);
  const setLocale = useAppStore((state) => state.setLocale);
  const { i18n } = useTranslation();

  const locales = useMemo(() => ['en', 'id'] as const, []);

  const switchLocale = useCallback(() => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextLocale = locales[(currentIndex + 1) % locales.length] ?? 'en';

    setLocale(nextLocale);
    void i18n.changeLanguage(nextLocale);
  }, [i18n, locales, currentLocale, setLocale]);

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      type='button'
      className='font-medium cursor-pointer text-sm'
      onClick={switchLocale}
      data-testid='locale-toggle'>
      {currentLocale === 'id' ? (
        <span className='text-tertiary-300'>ID</span>
      ) : (
        <span className='text-tertiary-300'>EN</span>
      )}
    </motion.button>
  );
};

export default Language;
