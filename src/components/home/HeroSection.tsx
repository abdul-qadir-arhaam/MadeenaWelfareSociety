"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Eyebrow Tagline */}
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#047857] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {t.hero.eyebrow}
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2238] tracking-tight leading-[1.15]">
              Madeena Welfare Society
              <span className="block text-[#0B2238] mt-1 sm:mt-2">Bhatkal</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="/welfare">
                <Button size="lg" className="rounded-lg shadow-sm hover:shadow-md text-sm sm:text-base font-semibold">
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 group">
              <Image
                src="/images/instagram/insta_post_10.jpg"
                alt="Madeena Welfare Society Bhatkal - Community Champions and Youth"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
