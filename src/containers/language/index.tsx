import { setLocale } from '@containers/app/reducer';
import { useAppDispatch } from '@stores/hooks';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Language: React.FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const locales = useMemo(() => i18n.languages, [i18n.languages]);
  const currentLocale = i18n.language;

  const switchLocale = useCallback(() => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextLocale = locales[(currentIndex + 1) % locales.length];

    dispatch(setLocale(nextLocale));
    i18n.changeLanguage(nextLocale);
  }, [dispatch, i18n, locales, currentLocale]);

  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      type='button'
      className='font-medium cursor-pointer'
      onClick={switchLocale}
      data-testid='locale-toggle'
    >
      {currentLocale === 'id' ? (
        <span className='text-tertiary-500 dark:text-gallery-100'>ID</span>
      ) : (
        <span className='text-tertiary-500 dark:text-gallery-100'>EN</span>
      )}
    </motion.button>
  );
};

export default Language;
