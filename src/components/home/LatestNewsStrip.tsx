"use client";

import React from "react";
import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";

export function LatestNewsStrip() {
  const headlines = [
    { title: "Cosmos Golden Jubilee Trophy Champions — MWS Youth bagged first prize & ₹75,000", href: "/sports" },
    { title: "80th Independence Day Flag Hoisting & Merit Kits Distribution Highlights Live", href: "/news/independence-day-celebration" },
    { title: "Madina Ta'leemi Merit Scholarships milestone crosses ₹10 Lakhs in Bhatkal", href: "/achievements" },
  ];

  return (
    <div className="bg-[#0B2238] border-b border-slate-800 text-white py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 bg-[#047857] text-[10px] font-bold uppercase rounded-md tracking-wider flex items-center gap-1">
            <Megaphone className="w-3 h-3" />
            <span>Bulletin</span>
          </span>
        </div>

        <div className="flex-1 overflow-hidden whitespace-nowrap text-slate-300">
          <div className="inline-flex items-center gap-6 animate-pulse">
            {headlines.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{item.title}</span>
                <span className="text-slate-600">•</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/news"
          className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex-shrink-0"
        >
          <span>All News</span>
          <ArrowRight className="w-3 h-3 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
