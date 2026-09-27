"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGES, type Language } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const languageList: Language[] = ["en", "ur", "kn"];

  return (
    <div
      dir="ltr"
      className={cn(
        "inline-flex items-center rounded-full p-1 bg-slate-100/90 border border-slate-200/90 shadow-2xs backdrop-blur-xs",
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      {languageList.map((langCode) => {
        const isActive = language === langCode;
        return (
          <button
            key={langCode}
            onClick={() => setLanguage(langCode)}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95",
              isActive
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
            )}
            title={LANGUAGES[langCode].name}
          >
            {LANGUAGES[langCode].nativeName}
          </button>
        );
      })}
    </div>
  );
}
