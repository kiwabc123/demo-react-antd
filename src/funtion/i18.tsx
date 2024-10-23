// src/function/i18.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en.json'; // English translations
import translationTH from '../locales/th.json'; // Thai translations

export const detectUserLanguage = () => {
    const userLang = navigator.language; // Get user's language
    return userLang.startsWith('th') ? 'th' : 'en'; // Default to English if not Thai
};

const defaultLanguage = detectUserLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      th: { translation: translationTH },
    },
    lng: defaultLanguage, // Set default language based on detection
    fallbackLng: 'en', // Fallback language to English
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
