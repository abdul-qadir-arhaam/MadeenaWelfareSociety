"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Heart, HandHeart, Users, ArrowRight, Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";

export function WelfarePrograms() {
  const { t } = useLanguage();

  const programs = [
    {
      title: t.programs.eduTitle,
      description: t.programs.eduDesc,
      icon: BookOpen,
      themeColor: "blue",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      accentBg: "bg-blue-600",
      topStripe: "from-blue-600 to-blue-700",
      href: "/welfare#education",
      tag: "Scholarships & Merit",
    },
    {
      title: t.programs.healthTitle,
      description: t.programs.healthDesc,
      icon: Heart,
      themeColor: "red",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      accentBg: "bg-red-600",
      topStripe: "from-red-600 to-red-700",
      href: "/welfare#healthcare",
      tag: "Medical Aid & Camps",
    },
    {
      title: t.programs.reliefTitle,
      description: t.programs.reliefDesc,
      icon: HandHeart,
      themeColor: "navy",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      accentBg: "bg-[#0B2238]",
      topStripe: "from-[#0B2238] to-blue-900",
      href: "/welfare#relief",
      tag: "Food & Disaster Aid",
    },
    {
      title: t.programs.communityTitle,
      description: t.programs.communityDesc,
      icon: Users,
      themeColor: "red",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      accentBg: "bg-red-700",
      topStripe: "from-red-600 to-red-800",
      href: "/welfare#community",
      tag: "Youth & Social Care",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="text-start">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider rounded-full border border-blue-200 mb-2">
              Community Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2238] tracking-tight">
              {t.programs.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              {t.programs.sectionSubtitle}
            </p>
          </div>

          <Link
            href="/welfare"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-red-600 transition-colors group flex-shrink-0"
          >
            <span>Explore All Initiatives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
          </Link>
        </div>

        {/* 4-Card Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link key={index} href={program.href} className="group block">
                <Card className="h-full flex flex-col justify-between relative border-slate-200/90 hover:border-blue-400/90 transition-all duration-300">
                  {/* Top Color Accent Stripe */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${program.topStripe} group-hover:h-2 transition-all duration-300`}
                  />

                  <div className="p-6">
                    {/* Top Row: Icon + Subtag */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${program.accentBg} text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${program.badgeColor}`}
                      >
                        {program.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2238] group-hover:text-blue-700 transition-colors leading-snug">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Card Footer Indicator */}
                  <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-blue-700 transition-colors border-t border-slate-100">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
