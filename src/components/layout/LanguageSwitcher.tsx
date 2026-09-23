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
      className={cn(
        "inline-flex items-center rounded-full p-1 bg-slate-100 border border-slate-200/80 shadow-xs",
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
              "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-[#047857] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
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
