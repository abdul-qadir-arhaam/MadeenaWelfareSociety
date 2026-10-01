"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowRight, Award, Star, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AchievementsSpotlight() {
  const achievements = [
    {
      title: "Cosmos Golden Jubilee Trophy Champion (₹75,000)",
      year: "2026",
      category: "Sports Championship",
      categoryColor: "bg-red-50 text-red-700 border-red-200",
      image: "/images/instagram/insta_post_10.jpg",
      description:
        "MWS Youth Cricket squad clinched the historic Cosmos Golden Jubilee Trophy in Bhatkal, decorated with gold medals and ₹75,000 first prize.",
      highlight: "₹75,000 1st Prize",
    },
    {
      title: "State Level Community Excellence & Humanitarian Honor",
      year: "2026",
      category: "Humanitarian Honor",
      categoryColor: "bg-blue-50 text-blue-800 border-blue-200",
      image: "/images/instagram/insta_post_8.jpg",
      description:
        "Recognized by regional authorities for exemplary medical relief, flood rescue, and continuous ration distribution across Uttar Kannada.",
      highlight: "Excellence Citation",
    },
    {
      title: "Madina Ta'leemi Academic Merit Milestone (₹10+ Lakhs)",
      year: "2025–2026",
      category: "Educational Merit",
      categoryColor: "bg-slate-100 text-slate-800 border-slate-200",
      image: "/images/instagram/insta_post_11.jpg",
      description:
        "Empowering 83+ students in Hifz, SSLC, PUC, and professional engineering/medical degrees through merit-based ta'leemi scholarships.",
      highlight: "83+ Students Funded",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-extrabold uppercase tracking-wider rounded-full border border-red-200 mb-2">
              <Trophy className="w-3.5 h-3.5 text-red-600" />
              <span>Championship Heritage</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2238] tracking-tight">
              Honors, Trophies & Milestones
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Celebrating landmark triumphs of our youth squads, academic merit scholars, and humanitarian volunteers.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Link href="/achievements" className="block sm:inline-block w-full sm:w-auto">
              <Button
                variant="outline-red"
                size="md"
                className="w-full sm:w-auto justify-center font-bold text-xs sm:text-sm group min-h-[44px]"
              >
                <span>View Full Trophy Cabinet</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Honors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {achievements.map((item, idx) => (
            <Card
              key={idx}
              className="border-slate-200/90 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-red-300 hover:shadow-xl group transition-all duration-300 active:scale-[0.99]"
            >
              <div>
                {/* Photo container with floating badges */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 sm:mb-5 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Year Tag */}
                  <div className="absolute top-3 start-3 px-2.5 py-1 bg-red-600 text-white rounded-lg text-[11px] font-black shadow-md flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>{item.year}</span>
                  </div>

                  {/* Category Pill */}
                  <div
                    className={`absolute top-3 end-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-xs ${item.categoryColor}`}
                  >
                    {item.category}
                  </div>

                  {/* Highlight Ribbon at bottom */}
                  <div className="absolute bottom-2.5 start-3 px-2 py-0.5 bg-blue-900/90 backdrop-blur-xs text-white rounded text-[10px] font-bold">
                    {item.highlight}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B2238] group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom verified badge */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-800 font-bold">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Verified Club Honor</span>
                </span>
                <span className="flex items-center gap-1 text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
