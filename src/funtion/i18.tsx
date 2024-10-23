
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en.json'; 
import translationTH from '../locales/th.json'; 

export const detectUserLanguage = () => {
    const userLang = navigator.language; 
    return userLang.startsWith('th') ? 'th' : 'en'; 
};

const defaultLanguage = detectUserLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      th: { translation: translationTH },
    },
    lng: defaultLanguage, 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
