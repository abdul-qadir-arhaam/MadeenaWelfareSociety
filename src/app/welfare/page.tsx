"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  HandHeart,
  Users,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface WelfareProgram {
  id: string;
  category: "Community Support" | "Education" | "Food Distribution" | "Health Programs" | "Charity" | "Youth Welfare";
  title: string;
  description: string;
  image: string;
  date: string;
  impactMetric: string;
  relatedNewsSlug?: string;
}

export default function WelfarePage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const impactStats = [
    { label: "Educational Aid Distributed", value: "₹10+ Lakhs", icon: GraduationCap },
    { label: "Food & Ration Kits Provided", value: "1,200+", icon: HandHeart },
    { label: "Medical Aid & Surgeries", value: "350+ Cases", icon: Heart },
    { label: "Active Service in Bhatkal", value: "33+ Years", icon: Users },
  ];

  const categories = [
    "All",
    "Education",
    "Health Programs",
    "Food Distribution",
    "Community Support",
    "Charity",
    "Youth Welfare",
  ];

  const programs: WelfareProgram[] = [
    {
      id: "edu-scholarships",
      category: "Education",
      title: "Madina Ta'leemi Merit Scholarships & Academic Awards",
      description:
        "Providing school supplies, merit kits, and multi-year scholarships for deserving students in SSLC, PUC, Hifz, Fazilat, and professional degrees across Bhatkal.",
      image: "/images/instagram/insta_post_11.jpg",
      date: "Academic Year 2025–2026",
      impactMetric: "83+ Students Benefited",
      relatedNewsSlug: "educational-awards-ceremony",
    },
    {
      id: "health-aid",
      category: "Health Programs",
      title: "Emergency Medical Relief, Surgery Grants & Diagnostics",
      description:
        "Direct financial assistance for critical illness treatments, dialysis support, emergency ambulance coordination, and free community diagnostic checkups.",
      image: "/images/real/15aug4.jpeg",
      date: "Ongoing Mission",
      impactMetric: "350+ Emergency Aid Grants",
    },
    {
      id: "ramadan-food-drive",
      category: "Food Distribution",
      title: "Seasonal Ramadan & Monsoon Food Ration Kits",
      description:
        "Discreet, dignified distribution of comprehensive essential grocery packages, grains, cooking oil, and dates to vulnerable families and widows across Madeena Colony.",
      image: "/images/instagram/insta_post_13.jpg",
      date: "Annual Holy Month Initiative",
      impactMetric: "1,200+ Household Ration Kits",
    },
    {
      id: "eid-community-outreach",
      category: "Charity",
      title: "Eid Ul Fitr & Festive Goodwill Campaign",
      description:
        "Spreading festive joy, new clothes for underprivileged children, and festive food packs to ensure no family is left behind during holy celebrations.",
      image: "/images/instagram/insta_post_12.jpg",
      date: "Festive Season 2026",
      impactMetric: "450+ Children & Families Supported",
    },
    {
      id: "civic-support",
      category: "Community Support",
      title: "Civic Empowerment, Cleanliness & Senior Welfare",
      description:
        "Neighborhood sanitation drives, senior citizen support networks, public water cooler maintenance, and youth leadership mentorship programs.",
      image: "/images/real/15aug5.jpeg",
      date: "Community Service",
      impactMetric: "Entire Madeena Colony & Bhatkal Surrounds",
    },
    {
      id: "youth-mentorship",
      category: "Youth Welfare",
      title: "Youth Sports, Career Counseling & Moral Guidance",
      description:
        "Channeling youth energy into constructive sports, discipline, competitive tournaments, and moral leadership to prevent delinquency and build future leaders.",
      image: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      date: "Year-Round Programs",
      impactMetric: "150+ Young Athletes Mentored",
      relatedNewsSlug: "community-sports-event",
    },
  ];

  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Humanitarian Initiatives
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2238] tracking-tight mt-3">
          Welfare Services & Community Programs
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Serving Bhatkal since 1993 with transparency, dignity, and compassion. Discover our key programs in education, medical assistance, and emergency relief.
        </p>
      </div>

      {/* Impact Statistics Counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {impactStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#047857] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B2238] block tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? "bg-[#047857] text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPrograms.map((prog) => (
          <Card
            key={prog.id}
            className="border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#047857] rounded-md shadow-xs border border-slate-200">
                    {prog.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{prog.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="mt-4 p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100/80 text-[11px] text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{prog.impactMetric}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              {prog.relatedNewsSlug ? (
                <Link
                  href={`/news/${prog.relatedNewsSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857] hover:underline"
                >
                  <span>Read Event Coverage</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#047857]"
                >
                  <span>Inquire / Support Program</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Support / Contact Hotline Banner */}
      <div className="mt-16 bg-[#0B2238] text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Join Hands With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
            Support Our Community Welfare Mission
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every contribution directly aids a deserving student, delivers emergency medical support, or feeds a family in need. All donations are 100% verified and accounted for.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto font-semibold text-xs sm:text-sm">
              <PhoneCall className="w-4 h-4 me-2" />
              <span>Contact Welfare Desk</span>
            </Button>
          </Link>
          <a
            href="https://wa.me/918386226193?text=Salam,%20I%20would%20like%20to%20inquire%20about%20Madeena%20Welfare%20Society%20programs"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold text-center transition-colors shadow-xs"
          >
            WhatsApp Helpline
          </a>
        </div>
      </div>
    </div>
  );
}
