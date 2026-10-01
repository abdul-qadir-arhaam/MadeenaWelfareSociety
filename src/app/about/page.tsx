"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          {t.orgName}
        </span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3 ${isUrdu ? "font-urdu" : ""}`}>
          {t.about.pageTitle}
        </h1>
        <p className={`mt-3 text-base text-slate-600 ${isUrdu ? "font-urdu" : ""}`}>
          {t.about.pageSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/real/15aug5.jpeg"
            alt="Madeena Welfare Society Community Members and Leadership"
            fill
            className="object-cover"
          />
        </div>
        <div className={`space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base ${isUrdu ? "font-urdu" : ""}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2238]">{t.about.visionTitle}</h2>
          <p>{t.about.visionP1}</p>
          <p>{t.about.visionP2}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="p-6 border-slate-200">
          <h3 className={`font-bold text-[#0B2238] text-lg ${isUrdu ? "font-urdu" : ""}`}>{t.about.card1Title}</h3>
          <p className={`text-sm text-slate-500 mt-2 ${isUrdu ? "font-urdu" : ""}`}>{t.about.card1Desc}</p>
        </Card>
        <Card className="p-6 border-slate-200">
          <h3 className={`font-bold text-[#0B2238] text-lg ${isUrdu ? "font-urdu" : ""}`}>{t.about.card2Title}</h3>
          <p className={`text-sm text-slate-500 mt-2 ${isUrdu ? "font-urdu" : ""}`}>{t.about.card2Desc}</p>
        </Card>
        <Card className="p-6 border-slate-200">
          <h3 className={`font-bold text-[#0B2238] text-lg ${isUrdu ? "font-urdu" : ""}`}>{t.about.card3Title}</h3>
          <p className={`text-sm text-slate-500 mt-2 ${isUrdu ? "font-urdu" : ""}`}>{t.about.card3Desc}</p>
        </Card>
      </div>

      {/* Leadership & Executive Body */}
      <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200 mb-10 sm:mb-12">
        <h2 className={`text-xl sm:text-2xl font-bold text-[#0B2238] mb-4 sm:mb-6 ${isUrdu ? "font-urdu" : ""}`}>
          {isUrdu ? "انتظامیہ و مجلسِ عاملہ" : "Executive Leadership & Governance"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase text-[#047857]">
              {isUrdu ? "صدر" : "President"}
            </span>
            <h3 className={`text-lg font-bold text-[#0B2238] mt-1 ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "مولانا عرفان ندوی" : "Maulana Irfan Nadwi"}
            </h3>
            <p className={`text-xs text-slate-500 mt-1 ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "ادارہ جاتی سرپرستی، عوامی فلاح اور اجتماعی رہنمائی۔" : "Leading community welfare, institutional oversight, and public initiatives."}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase text-[#047857]">
              {isUrdu ? "جنرل سکریٹری" : "General Secretary"}
            </span>
            <h3 className={`text-lg font-bold text-[#0B2238] mt-1 ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "مولانا عبد السمیع ندوی" : "Maulana Abdul Samee Nadwi"}
            </h3>
            <p className={`text-xs text-slate-500 mt-1 ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "انتظامی امور، تعلیمی منصوبے اور پریس و ابلاغ۔" : "Managing administration, community outreach, and educational programs."}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs text-slate-500 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "مرکزی دفتر: مدینہ ویلفیئر سوسائٹی کیمپس، مدینہ کالونی، بھٹکل، کرناٹک — 581320" : "Headquarters: Madeena Welfare Society Campus, Madeena Colony, Bhatkal, Karnataka — 581320."}
          </p>
          <a
            href="https://www.instagram.com/madeenawelfaresociety?stkn=dzMwd3I0bm1leXk2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] hover:underline"
          >
            <span>Instagram @madeenawelfaresociety →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
