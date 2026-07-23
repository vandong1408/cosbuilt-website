import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, LanguageType } from "../lib/translations";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem("cosbuilt_language");
    if (saved === "vi" || saved === "en" || saved === "ko") {
      return saved as LanguageType;
    }
    return "vi";
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("cosbuilt_language", lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) {
      return key;
    }
    return entry[language] || entry["vi"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
