"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Madeena Welfare Society Bhatkal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3">
          {t.nav.about}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Serving the community of Bhatkal with compassion, commitment, and dedication.
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
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2238]">Our Vision & Mission</h2>
          <p>
            Madeena Welfare Society Bhatkal was founded with the core mission of uplifting the community through accessible education, medical aid, disaster relief, youth empowerment, and cultural sports activities.
          </p>
          <p>
            We strive to foster unity, provide dependable assistance to underprivileged families, celebrate community achievements, and create a healthier, stronger, and more resilient society.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="p-6 border-slate-200">
          <h3 className="font-bold text-[#0B2238] text-lg">Compassionate Service</h3>
          <p className="text-sm text-slate-500 mt-2">
            Directly addressing grassroots needs through food drives, emergency medical relief, and family support in Madeena Colony and Bhatkal taluk.
          </p>
        </Card>
        <Card className="p-6 border-slate-200">
          <h3 className="font-bold text-[#0B2238] text-lg">Youth & Education</h3>
          <p className="text-sm text-slate-500 mt-2">
            Hosting the annual Madina Ta'leemi Award, honoring 80+ meritorious students annually across Hifz, Fazilat, SSLC, PUC, and professional degrees.
          </p>
        </Card>
        <Card className="p-6 border-slate-200">
          <h3 className="font-bold text-[#0B2238] text-lg">Sports & Unity</h3>
          <p className="text-sm text-slate-500 mt-2">
            Fielding the renowned MWS sports team across BMYF cricket and football tournaments, inspiring youth through active sportsmanship.
          </p>
        </Card>
      </div>

      {/* Leadership & Executive Body */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
        <h2 className="text-2xl font-bold text-[#0B2238] mb-6">Executive Leadership & Governance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase text-[#047857]">President</span>
            <h3 className="text-lg font-bold text-[#0B2238] mt-1">Maulana Irfan Nadwi</h3>
            <p className="text-xs text-slate-500 mt-1">Leading community welfare, institutional oversight, and public initiatives.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase text-[#047857]">General Secretary</span>
            <h3 className="text-lg font-bold text-[#0B2238] mt-1">Maulana Abdul Samee Nadwi</h3>
            <p className="text-xs text-slate-500 mt-1">Managing administration, community outreach, and educational programs.</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Headquarters: Madeena Welfare Society Campus, Madeena Colony, Bhatkal, Karnataka — 581320 (Regd. USA 1960).
          </p>
          <a
            href="https://www.instagram.com/madeenawelfaresociety?stkn=dzMwd3I0bm1leXk2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] hover:underline"
          >
            <span>Follow our updates on Instagram @madeenawelfaresociety →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
