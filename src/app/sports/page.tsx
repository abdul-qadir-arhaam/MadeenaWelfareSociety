"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Award,
  Medal,
  Users,
  Flame,
  ArrowRight,
  Shield,
  Activity,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SportsItem {
  id: string;
  category: "Cricket" | "Football" | "Night League" | "Player Spotlight" | "Tournaments";
  title: string;
  date: string;
  image: string;
  description: string;
  highlightBadge: string;
  stats?: string[];
  playerRole?: string;
}

export default function SportsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const disciplines = ["All", "Cricket", "Player Spotlight", "Night League", "Football", "Tournaments"];

  const sportsItems: SportsItem[] = [
    {
      id: "cosmos-trophy",
      category: "Cricket",
      title: "Cosmos Golden Jubilee Trophy Winner (₹75,000 Cash Prize)",
      date: "Season Finale 2025–2026",
      image: "/images/instagram/insta_post_10.jpg",
      description:
        "Madeena Welfare Society cricket team clinched the grand Cosmos Golden Jubilee Championship trophy in Bhatkal, taking home the ₹75,000 first prize after a thrilling undefeated campaign.",
      highlightBadge: "CHAMPIONS 🏆",
      stats: ["First Prize: ₹75,000", "Undefeated Final", "Grand Trophy"],
    },
    {
      id: "player-ilyas",
      category: "Player Spotlight",
      title: "Ilyas Motia — Player of the Match Blitzkrieg",
      date: "Semi-Final Clash",
      image: "/images/instagram/insta_post_15.jpg",
      description:
        "Match-winning whirlwind performance by Ilyas Motia smashing 43 runs off just 15 deliveries under intense pressure to carry Madeena into the tournament final.",
      highlightBadge: "PLAYER OF THE MATCH ⭐",
      playerRole: "All-Rounder",
      stats: ["43 Runs off 15 Balls", "Strike Rate: 286.6", "4 Sixes & 3 Fours"],
    },
    {
      id: "player-shamoun",
      category: "Player Spotlight",
      title: "Shamoun Shabandri — Lethal Bowling Masterclass",
      date: "League Stage Masterclass",
      image: "/images/instagram/insta_post_17.jpg",
      description:
        "Deadly swing bowling display with figures of 3-0-18-3 to dismantle the opposition top-order in the Bhatkal Premier League championship encounter.",
      highlightBadge: "BEST BOWLER 🎯",
      playerRole: "Strike Fast Bowler",
      stats: ["Figures: 3-0-18-3", "Economy: 6.00", "Double-Wicket Maiden Over"],
    },
    {
      id: "player-ubadah",
      category: "Player Spotlight",
      title: "Ubadah Barmawar — Six Gigantic Sixes Power Show",
      date: "Powerplay Record",
      image: "/images/instagram/insta_post_19.jpg",
      description:
        "Explosive power-hitting exhibition by Ubadah Barmawar, clearing the boundary ropes with six massive maximums across the ground in Madeena Colony.",
      highlightBadge: "MAXIMUM SIXES AWARD 🔥",
      playerRole: "Power Hitter",
      stats: ["6 Massive Sixes", "Match Strike Rate: 240.0", "Fastest 50 Contender"],
    },
    {
      id: "night-turf",
      category: "Night League",
      title: "Bhatkal Night Turf Cricket Championship Under Floodlights",
      date: "Winter Night Cup",
      image: "/images/instagram/posts/post_DUcvUHVkYX-_1.jpg",
      description:
        "High-voltage night cricket on synthetic turf under state-of-the-art stadium floodlights, drawing hundreds of passionate youth fans.",
      highlightBadge: "FLOODLIGHT CUP 🌙",
      stats: ["Synthetic Turf", "Full Stadium Floodlights", "16 Youth Squads"],
    },
    {
      id: "gold-medals",
      category: "Tournaments",
      title: "Championship Victory Felicitation & Gold Medals Ceremony",
      date: "Grand Felicitation",
      image: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      description:
        "The entire victorious squad decorated with gold medals, trophies, and citations by club elders and dignitaries in recognition of sporting excellence.",
      highlightBadge: "GOLD MEDALISTS 🥇",
      stats: ["16 Gold Medals", "Honorary Citations", "Bhatkal Street Celebration"],
    },
  ];

  const filteredItems =
    activeTab === "All"
      ? sportsItems
      : sportsItems.filter((item) => item.category === activeTab);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Youth & Fitness Division
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2238] tracking-tight mt-3">
          Sports Tournaments & Club Champions
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Nurturing sportsmanship, physical fitness, and brotherhood. Explore our championship wins, match heroics, player spotlights, and upcoming league fixtures across Bhatkal.
        </p>
      </div>

      {/* Trophy Spotlight Banner */}
      <div className="bg-gradient-to-r from-[#0B2238] to-[#123658] text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-lg border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest">
              Current Titleholders
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              Cosmos Golden Jubilee Trophy Champions (₹75,000)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Madeena Welfare Society cricket team defeated top coastal Karnataka teams to bring the prestigious trophy home to Madeena Colony.
            </p>
          </div>
        </div>

        <Link href="/gallery/community-sports-event">
          <Button variant="secondary" className="whitespace-nowrap flex items-center gap-2 font-semibold text-xs sm:text-sm shadow-sm">
            <span>View Trophy Photos</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
        {disciplines.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActiveTab(d)}
            className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === d
                ? "bg-[#047857] text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
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
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-1 bg-[#0B2238]/90 backdrop-blur-xs text-[10px] font-bold text-amber-400 rounded-md shadow-xs border border-slate-700">
                    {item.highlightBadge}
                  </span>
                </div>
                {item.playerRole && (
                  <div className="absolute bottom-3 start-3">
                    <span className="px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-800 rounded shadow-xs">
                      {item.playerRole}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-medium">
                  <span className="text-[#047857] font-semibold">{item.category}</span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {item.stats && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {item.stats.map((st, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                href="/gallery/community-sports-event"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857] hover:underline"
              >
                <span>View Tournament Album</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
