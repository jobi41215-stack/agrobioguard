"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SupportedLanguage } from "@/lib/translations";

const LANGUAGE_STORAGE_KEY = "agrobioguard-language";

const htmlLanguageCodes: Record<
  SupportedLanguage,
  string
> = {
  English: "en",
  Tamil: "ta",
  Telugu: "te",
  Hindi: "hi",
  Kannada: "kn",
  Malayalam: "ml",
};

const supportedLanguages: SupportedLanguage[] = [
  "English",
  "Tamil",
  "Telugu",
  "Hindi",
  "Kannada",
  "Malayalam",
];

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
};

const LanguageContext =
  createContext<LanguageContextValue | undefined>(
    undefined,
  );

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<SupportedLanguage>("English");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    );

    if (
      savedLanguage &&
      supportedLanguages.includes(
        savedLanguage as SupportedLanguage,
      )
    ) {
      setLanguageState(
        savedLanguage as SupportedLanguage,
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language,
    );

    document.documentElement.lang =
      htmlLanguageCodes[language];
  }, [language]);

  function setLanguage(
    nextLanguage: SupportedLanguage,
  ) {
    setLanguageState(nextLanguage);

    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      nextLanguage,
    );

    document.documentElement.lang =
      htmlLanguageCodes[nextLanguage];
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider.",
    );
  }

  return context;
}