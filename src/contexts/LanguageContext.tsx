import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, type Language, type TranslationSchema } from '../i18n/translations';
import {
  localizeAvailability,
  localizeCategoryDescription,
  localizeCategoryName,
  localizeColor,
  localizeOrderStatus,
  localizeProductDescription,
  localizeProductTitle,
  localizeSareeType,
} from '../i18n/catalogTranslations';

const LANG_STORAGE_KEY = 'sirimagga_lang_v1';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
  localizeCategoryName: (name: string) => string;
  localizeCategoryDesc: (slug: string, fallback: string) => string;
  localizeSareeType: (type: string) => string;
  localizeColor: (color: string) => string;
  localizeAvailability: (status: string) => string;
  localizeOrderStatus: (status: string) => string;
  localizeProductTitle: (code: string, fallback: string) => string;
  localizeProductDescription: (code: string, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'kn') return saved;
    } catch {
      // ignore storage access issues
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        localizeCategoryName: (name) => localizeCategoryName(name, lang),
        localizeCategoryDesc: (slug, fallback) => localizeCategoryDescription(slug, fallback, lang),
        localizeSareeType: (type) => localizeSareeType(type, lang),
        localizeColor: (color) => localizeColor(color, lang),
        localizeAvailability: (status) => localizeAvailability(status, lang),
        localizeOrderStatus: (status) => localizeOrderStatus(status, lang),
        localizeProductTitle: (code, fallback) => localizeProductTitle(code, fallback, lang),
        localizeProductDescription: (code, fallback) =>
          localizeProductDescription(code, fallback, lang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
