"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Award, Users, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20 border-b border-slate-200/80">
      {/* Background Soft Lighting Accents */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/90 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-xs font-extrabold tracking-wider text-red-700 uppercase">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B2238] tracking-tight leading-[1.12]">
              Madeena Welfare Society
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-red-600 mt-1 sm:mt-2">
                Bhatkal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Dual CTA Button Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/welfare">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-xl shadow-md shadow-blue-700/20 font-bold group"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Button>
              </Link>

              <Link href="/achievements">
                <Button
                  variant="outline-red"
                  size="lg"
                  className="rounded-xl font-bold gap-2 group"
                >
                  <Trophy className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
                  <span>Championship Honors</span>
                </Button>
              </Link>
            </div>

            {/* Authentic Club Milestones Strip */}
            <div className="pt-6 border-t border-slate-200/90 w-full grid grid-cols-3 gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[#0B2238]">60+</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Years of Legacy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-red-600">₹75K</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Cosmos Champions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-blue-700">83+</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Merit Scholars</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Image Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main Photo Frame */}
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <Image
                  src="/images/instagram/insta_post_10.jpg"
                  alt="Madeena Welfare Society Bhatkal - Cosmos Trophy Winners"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Caption Bar inside photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-block px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold uppercase tracking-wider mb-1">
                    Cosmos Trophy 2026
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white/95 leading-tight">
                    ₹75,000 Championship Triumph in Bhatkal
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Left / Athletic League */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Trophy className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-start pr-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-red-600">
                    Grand Winners
                  </span>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Cosmos Jubilee Cup
                  </span>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right / Verified Society */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-[#0B2238] border border-blue-900 rounded-2xl p-3 shadow-xl text-white flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div className="text-start">
                  <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Regd. USA 1960
                  </span>
                  <span className="text-xs font-bold text-white leading-tight">
                    Bhatkal, Karnataka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
