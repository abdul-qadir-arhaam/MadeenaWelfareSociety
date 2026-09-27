"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, MapPin, Phone, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

export function GetInTouchSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0B2238] border border-blue-900/80 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Background Radial Highlights */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Ribbon Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-red-600" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Icon, Headings and Quick Location Badges */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/30 hover:rotate-6 transition-transform">
                <HeartHandshake className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-red-400 mb-1">
                  Community Action & Inquiries
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {t.getInTouch.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  {t.getInTouch.subtitle}
                </p>

                {/* Location & Quick Meta Chips */}
                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>Madeena Colony, Bhatkal</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>admin@madeenaws.bhatkal.org</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Red CTA Button */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <Link href="/contact" className="block sm:inline-block w-full">
                <Button
                  variant="red"
                  size="lg"
                  className="w-full sm:w-auto rounded-xl font-black text-base shadow-lg shadow-red-600/30 group"
                >
                  <span>{t.getInTouch.button}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
