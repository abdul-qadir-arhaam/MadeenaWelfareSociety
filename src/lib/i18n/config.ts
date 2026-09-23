export type Language = "en" | "kn" | "ur";

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
  kn: {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
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
