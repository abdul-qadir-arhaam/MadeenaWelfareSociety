"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

import { getNewsList } from "@/lib/data/newsRepository";

export default function NewsPage() {
  const { t, language } = useLanguage();
  const newsItems = getNewsList({ status: "published" });

  const newsList = newsItems.map((item) => {
    const translation =
      (language === "kn" ? item.translations.kn : language === "ur" ? item.translations.ur : item.translations.en) ||
      item.translations.en;

    return {
      slug: item.slug,
      image: item.featuredImage,
      badge: item.categoryName,
      badgeVariant: "event" as const,
      title: translation?.title || item.slug,
      date: item.publishedAt,
      excerpt: translation?.excerpt || "",
    };
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Official Press & Announcements
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3">
          {t.news.sectionTitle}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          {t.news.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsList.map((item) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="group block">
            <Card className="h-full border-slate-200/80 hover:border-emerald-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
