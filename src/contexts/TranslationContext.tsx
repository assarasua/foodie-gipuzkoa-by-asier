import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";

type Language = "es" | "en";
type Dictionary = typeof es;

type DeepKeyOf<T extends Record<string, unknown>> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown> ? `${K}` | `${K}.${DeepKeyOf<T[K]>}` : `${K}`;
}[keyof T & string];

type TranslationKey = DeepKeyOf<Dictionary>;

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const dictionaries: Record<Language, Dictionary> = { es, en };

function resolvePath(dictionary: Dictionary, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("gipuzkoa-foodie-language") as Language | null;
    if (saved === "es" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("gipuzkoa-foodie-language", lang);
  };

  const t = useMemo(
    () =>
      (key: TranslationKey): string => {
        const value = resolvePath(dictionaries[language], key);
        if (typeof value === "string") return value;

        const fallback = resolvePath(dictionaries.en, key);
        return typeof fallback === "string" ? fallback : key;
      },
    [language]
  );

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
