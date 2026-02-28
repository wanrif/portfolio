import { useAppStore } from '@stores/app/store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import id from './id';

const resources = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: useAppStore.getState().locale,
  fallbackLng: ['en', 'id'],
  interpolation: {
    escapeValue: false,
  },
  lowerCaseLng: true,
});

export default i18n;
