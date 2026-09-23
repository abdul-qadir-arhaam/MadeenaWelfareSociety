"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, Star, Calendar, Filter, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Achievement } from "@/lib/data/achievementsRepository";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const res = await fetch("/api/admin/achievements?status=published");
        const data = await res.json();
        if (data.achievements) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAchievements();
  }, []);

  const categories = ["All", "Sports", "Social Work", "Education"];

  const filtered =
    activeCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Championships & Milestones
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2238] tracking-tight mt-3">
          Our Achievements & Honors
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Honoring three decades of dedication, sporting triumphs, academic milestones, and humanitarian service in Bhatkal.
        </p>
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
                ? "bg-[#047857] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading verified honors...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No achievements in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 start-3 px-2.5 py-1 bg-amber-500 text-white rounded-md text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{item.year}</span>
                  </div>
                  <div className="absolute top-3 end-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 rounded-full text-[10px] font-semibold border border-slate-200">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-[#047857] font-semibold">
                <span className="flex items-center gap-1 text-slate-600 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Club Honor</span>
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
                  {item.year}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
