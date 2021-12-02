import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import pl from './pl';

export const i18nConfig = {
  lng: 'en',
  resources: {
    en,
    pl
  },
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(initReactI18next).init(i18nConfig);

export default i18next;