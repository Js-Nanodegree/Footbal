import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';

const resources = {
  ru: { translation: ru },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export { useTranslation, i18n }; 