"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Heart, HandHeart, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";

export function WelfarePrograms() {
  const { t } = useLanguage();

  const programs = [
    {
      title: t.programs.eduTitle,
      description: t.programs.eduDesc,
      icon: BookOpen,
      iconBg: "bg-emerald-600",
      href: "/welfare#education",
    },
    {
      title: t.programs.healthTitle,
      description: t.programs.healthDesc,
      icon: Heart,
      iconBg: "bg-blue-600",
      href: "/welfare#healthcare",
    },
    {
      title: t.programs.reliefTitle,
      description: t.programs.reliefDesc,
      icon: HandHeart,
      iconBg: "bg-rose-500",
      href: "/welfare#relief",
    },
    {
      title: t.programs.communityTitle,
      description: t.programs.communityDesc,
      icon: Users,
      iconBg: "bg-purple-600",
      href: "/welfare#community",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F8FAFC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-start">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2238] tracking-tight">
            {t.programs.sectionTitle}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500">
            {t.programs.sectionSubtitle}
          </p>
        </div>

        {/* 4-Card Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link key={index} href={program.href} className="group block">
                <Card className="p-6 h-full flex flex-col justify-between border-slate-200/70 hover:border-emerald-200 transition-all duration-300">
                  <div>
                    {/* Circle Icon Badge */}
                    <div
                      className={`w-13 h-13 rounded-full ${program.iconBg} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="mt-5 pt-2 flex items-center text-[#047857] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
