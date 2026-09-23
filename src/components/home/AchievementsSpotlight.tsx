"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowRight, Award, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AchievementsSpotlight() {
  const achievements = [
    {
      title: "Cosmos Golden Jubilee Trophy Winner (₹75,000)",
      year: "2026",
      category: "Sports",
      image: "/images/instagram/insta_post_10.jpg",
      description: "MWS Cricket squad crowned champions in the landmark Bhatkal district youth tournament.",
    },
    {
      title: "State Level Community Excellence & Humanitarian Honor",
      year: "2026",
      category: "Social Work",
      image: "/images/instagram/insta_post_8.jpg",
      description: "Recognized for exemplary emergency medical relief and food distribution across Uttar Kannada.",
    },
    {
      title: "Madina Ta'leemi Academic Merit Milestone (₹10+ Lakhs)",
      year: "2025–2026",
      category: "Education",
      image: "/images/instagram/insta_post_11.jpg",
      description: "Empowering 83+ students in Hifz, SSLC, PUC, and higher professional education.",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Honors & Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2238] tracking-tight mt-2.5">
              Championship Trophies & Honors
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500">
              Celebrating triumphs of our youth, sports squads, and humanitarian volunteers.
            </p>
          </div>
          <div>
            <Link href="/achievements">
              <Button variant="outline-pill" size="sm" className="font-semibold text-xs sm:text-sm">
                <span>View All Honors</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((item, idx) => (
            <Card
              key={idx}
              className="border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 start-3 px-2 py-0.5 bg-amber-500 text-white rounded-md text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{item.year}</span>
                  </div>
                  <div className="absolute top-3 end-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-slate-800 rounded-full text-[10px] font-semibold border border-slate-200">
                    {item.category}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#047857] font-semibold">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#047857]" />
                  <span>Verified Club Honor</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
