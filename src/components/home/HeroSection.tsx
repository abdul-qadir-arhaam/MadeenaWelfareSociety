"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  initialBackgroundImage?: string;
}

export function HeroSection({ initialBackgroundImage }: HeroSectionProps) {
  const { t } = useLanguage();
  const [bgImage, setBgImage] = useState<string>(
    initialBackgroundImage || "/images/instagram/insta_post_10.jpg"
  );

  useEffect(() => {
    if (initialBackgroundImage) {
      setBgImage(initialBackgroundImage);
    }

    async function fetchFreshBg() {
      try {
        const res = await fetch("/api/settings", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.settings?.heroBackgroundImage) {
            setBgImage(data.settings.heroBackgroundImage);
          }
        }
      } catch (e) {
        // fallback to current
      }
    }
    fetchFreshBg();
  }, [initialBackgroundImage]);

  return (
    <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center py-10 sm:py-16 lg:py-24 border-b border-blue-950">
      {/* 1. Full-Bleed Trophy Winning Photo in Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage || "/images/instagram/insta_post_10.jpg"}
          alt="Madeena Welfare Society Bhatkal - Home Banner"
          fill
          className="object-cover object-center scale-105 transition-all duration-700"
          priority
        />

        {/* 2. Cinematic Multi-Layer Gradient Overlays */}
        {/* Left Dark Navy Mask ensuring 100% text readability while letting the trophy and celebration shine on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071726]/98 via-[#0B2238]/90 to-[#0B2238]/60" />

        {/* Vertical Depth & Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2238]/70 via-transparent to-[#071726]/95" />

        {/* Dynamic Red & Blue Color Lights */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3. Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-4 sm:space-y-6">
            {/* Eyebrow Badge with Live Pulse */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 backdrop-blur-md shadow-lg shadow-red-950/30">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-red-300 uppercase">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 max-w-xl leading-relaxed font-normal drop-shadow-xs">
              {t.hero.subtitle}
            </p>

            {/* Dual CTA Button Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link href="/welfare" className="w-full sm:w-auto">
                <Button
                  variant="red"
                  size="lg"
                  className="w-full sm:w-auto rounded-xl shadow-xl shadow-red-600/30 font-bold group min-h-[48px] justify-center"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Button>
              </Link>

              <Link href="/achievements" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center font-bold px-6 py-3.5 text-base rounded-xl gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-98 transition-all duration-200 cursor-pointer group min-h-[48px]">
                  <Trophy className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>{t.hero.honorsBtn}</span>
                </button>
              </Link>
            </div>

            {/* Authentic Club Milestones Strip (Glassmorphism) */}
            <div className="pt-5 sm:pt-6 border-t border-white/15 w-full grid grid-cols-3 gap-2 sm:gap-6 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-white/10 sm:border-0 backdrop-blur-xs">
              <div className="flex flex-col text-center sm:text-start">
                <span className="text-xl sm:text-3xl font-black text-white drop-shadow-xs">
                  {t.hero.statsLegacy}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300/90 mt-0.5 leading-tight">
                  {t.hero.statsLegacyLabel}
                </span>
              </div>
              <div className="flex flex-col text-center sm:text-start">
                <span className="text-xl sm:text-3xl font-black text-red-400 drop-shadow-xs">
                  {t.hero.statsChampions}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300/90 mt-0.5 leading-tight">
                  {t.hero.statsChampionsLabel}
                </span>
              </div>
              <div className="flex flex-col text-center sm:text-start">
                <span className="text-xl sm:text-3xl font-black text-blue-300 drop-shadow-xs">
                  {t.hero.statsScholars}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300/90 mt-0.5 leading-tight">
                  {t.hero.statsScholarsLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Medal Celebration Spotlight */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glass Frame Card */}
              <div className="relative p-2.5 sm:p-3.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl group hover:border-white/40 transition-all duration-300">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg bg-slate-900">
                  <Image
                    src="/images/instagram/posts/post_DSh4VECErEA_1.jpg"
                    alt="Madeena Welfare Society Bhatkal - Medal Felicitation and Championship Celebration"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Caption Bar inside photo */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-600 text-white rounded-md text-[10px] font-black uppercase tracking-wider mb-1.5 shadow-xs">
                      <Trophy className="w-3 h-3 text-amber-300" />
                      <span>{t.hero.championshipSubtitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {t.hero.championshipTitle}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 line-clamp-2">
                      {t.hero.championshipFelicitation}
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1: Top Left / Athletic League */}
                <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 bg-[#0B2238]/95 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl flex items-center gap-2 sm:gap-3 animate-float-slow">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/30">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                  </div>
                  <div className="text-start pr-1">
                    <span className="block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                      {t.sports.championBadge}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                      {t.hero.statsChampionsLabel}
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Right / Verified Society */}
                <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 max-w-[calc(100%-1rem)] sm:max-w-none bg-[#0B2238]/95 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl text-white flex items-center gap-2 sm:gap-2.5">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                  <div className="text-start min-w-0">
                    <span className="block text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wider truncate">
                      {t.hero.regdBadge}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate block">
                      {t.orgSubtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
