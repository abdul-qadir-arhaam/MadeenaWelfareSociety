"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { NewsArticle } from "@/lib/data/newsRepository";

export function LatestNewsStrip({ initialNews }: { initialNews?: NewsArticle[] } = {}) {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>(initialNews || []);

  useEffect(() => {
    async function loadStripNews() {
      try {
        const res = await fetch("/api/news?status=published&limit=4", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.news && Array.isArray(data.news)) {
            setNews(data.news);
          }
        }
      } catch (e) {
        console.error("Failed to load news ticker:", e);
      }
    }
    loadStripNews();
  }, []);

  const headlines =
    news.length > 0
      ? news.map((item) => {
          const trans =
            (language === "kn"
              ? item.translations?.kn
              : language === "ur"
              ? item.translations?.ur
              : item.translations?.en) || item.translations?.en;
          return {
            title: trans?.title || item.slug,
            href: `/news/${item.slug}`,
          };
        })
      : [
          {
            title: "Cosmos Golden Jubilee Trophy Champions — MWS Youth clinch grand title & ₹75,000",
            href: "/sports",
          },
          {
            title: "Madina Ta'leemi Merit Scholarships milestone crosses ₹10 Lakhs in Bhatkal",
            href: "/achievements",
          },
        ];

  return (
    <div className="bg-[#0B2238] border-b border-blue-950 text-white py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2.5 py-0.5 bg-red-600 text-[10px] font-extrabold uppercase rounded-full tracking-wider flex items-center gap-1.5 shadow-xs shadow-red-600/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Bulletin</span>
          </span>
        </div>

        {/* Rolling Headlines */}
        <div className="flex-1 overflow-hidden whitespace-nowrap text-slate-200">
          <div className="inline-flex items-center gap-6">
            {headlines.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-red-400 transition-colors inline-flex items-center gap-2 group"
              >
                <span className="group-hover:underline underline-offset-2">{item.title}</span>
                <span className="text-blue-400/60">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Action */}
        <Link
          href="/news"
          className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-300 flex-shrink-0 group hover:translate-x-0.5 transition-transform"
        >
          <span>All Bulletins</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

