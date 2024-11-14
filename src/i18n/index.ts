import { selectLocale } from '@containers/app/selectors';
import store, { persistor } from '@stores/configureStore';
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

persistor.subscribe(() => {
  const isRehydrated = persistor.getState().bootstrapped;
  if (isRehydrated) {
    const locale = selectLocale(store.getState());

    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources,
        lng: locale,
        fallbackLng: ['en', 'id'],
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
        lowerCaseLng: true,
      });
  }
});

export default i18n;
