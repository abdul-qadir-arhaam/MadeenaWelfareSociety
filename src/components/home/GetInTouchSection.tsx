"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

export function GetInTouchSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0]/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          {/* Left: Icon and Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-full bg-[#047857] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#047857]">
                {t.getInTouch.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 max-w-xl">
                {t.getInTouch.subtitle}
              </p>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-shrink-0">
            <Link href="/contact">
              <Button size="md" className="rounded-lg shadow-sm font-semibold">
                <span>{t.getInTouch.button}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
