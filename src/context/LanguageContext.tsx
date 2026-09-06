import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { en } from '../locales/en';
import { ar } from '../locales/ar';
import { fr } from '../locales/fr';
import { es } from '../locales/es';
import { de } from '../locales/de';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
];

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
  t: (key: string, defaultText?: string) => string;
  getToolName: (slug: string, defaultName?: string) => string;
  getToolDesc: (slug: string, defaultDesc?: string) => string;
  getCategoryName: (slugOrId: string, defaultName?: string) => string;
  getCategoryDesc: (slugOrId: string, defaultDesc?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en,
  ar,
  fr,
  es,
  de,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('sahlino_lang') as SupportedLanguage;
      if (saved && ['en', 'ar', 'fr', 'es', 'de'].includes(saved)) {
        return saved;
      }
      // Check browser language preferences
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang === 'ar') return 'ar';
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'es') return 'es';
      if (browserLang === 'de') return 'de';
    } catch {
      // Safe fallback
    }
    return 'en';
  });

  const direction: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    if (language === 'ar') {
      document.documentElement.classList.add('lang-ar');
    } else {
      document.documentElement.classList.remove('lang-ar');
    }
  }, [language, direction]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sahlino_lang', lang);
    } catch {
      // Safe fallback if local storage is restricted
    }
  };

  const t = (key: string, defaultText = ''): string => {
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? defaultText;
  };

  const getToolName = (slug: string, defaultName = ''): string => {
    const key = `tool.${slug}.name`;
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? defaultName;
  };

  const getToolDesc = (slug: string, defaultDesc = ''): string => {
    const key = `tool.${slug}.desc`;
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? defaultDesc;
  };

  const getCategoryName = (slugOrId: string, defaultName = ''): string => {
    const key = `cat.${slugOrId}.name`;
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? defaultName;
  };

  const getCategoryDesc = (slugOrId: string, defaultDesc = ''): string => {
    const key = `cat.${slugOrId}.desc`;
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS['en']?.[key] ?? defaultDesc;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        direction,
        isRTL,
        t,
        getToolName,
        getToolDesc,
        getCategoryName,
        getCategoryDesc,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
