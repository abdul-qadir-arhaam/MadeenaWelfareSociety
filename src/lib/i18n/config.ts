export type Language = "en" | "ur";

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "EN",
    direction: "ltr",
  },
  ur: {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    direction: "rtl",
  },
};

export const DEFAULT_LANGUAGE: Language = "en";
