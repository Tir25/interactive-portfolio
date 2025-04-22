import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: {} },
      hi: { translation: {} },
      gu: { translation: {} },
      te: { translation: {} },
      ta: { translation: {} },
      kn: { translation: {} },
      ml: { translation: {} },
      fr: { translation: {} },
      zh: { translation: {} },
      ru: { translation: {} },
    },
  });

export default i18n; 