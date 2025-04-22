import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Create empty translation objects to avoid errors if files are missing
const defaultTranslation = {};

// Import translation files
import enTranslation from '../locales/en.json';
import hiTranslation from '../locales/hi.json';
import guTranslation from '../locales/gu.json';
import teTranslation from '../locales/te.json';

// Language names for the selector
export const languageOptions = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

// Initialize i18next
i18n
  // Load translations from server or local files
  .use(HttpBackend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize configuration
  .init({
    // Default language
    fallbackLng: 'en',
    // Debug mode in development
    debug: process.env.NODE_ENV === 'development',
    // Don't escape special characters
    interpolation: {
      escapeValue: false,
    },
    // Resources - use default empty objects to prevent errors
    resources: {
      en: { translation: defaultTranslation },
      hi: { translation: defaultTranslation },
      gu: { translation: defaultTranslation },
      te: { translation: defaultTranslation },
      ta: { translation: defaultTranslation },
      kn: { translation: defaultTranslation },
      ml: { translation: defaultTranslation },
      fr: { translation: defaultTranslation },
      zh: { translation: defaultTranslation },
      ru: { translation: defaultTranslation },
    },
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    // React options
    react: {
      useSuspense: true,
    },
  });

export default i18n; 