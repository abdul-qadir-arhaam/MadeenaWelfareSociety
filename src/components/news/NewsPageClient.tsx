"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Card, Skeleton } from "@/components/ui/Card";
import { NewsArticle } from "@/lib/data/newsRepository";

interface NewsPageClientProps {
  initialNews: NewsArticle[];
}

export function NewsPageClient({ initialNews }: NewsPageClientProps) {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>(initialNews || []);
  const [loading, setLoading] = useState(!initialNews || initialNews.length === 0);

  useEffect(() => {
    async function fetchPublishedNews() {
      try {
        const res = await fetch("/api/news?status=published", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.news && Array.isArray(data.news)) {
            setNews(data.news);
          }
        }
      } catch (err) {
        console.error("Failed to load news articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublishedNews();
  }, []);

  const newsList = news.map((item) => {
    const translation =
      (language === "kn"
        ? item.translations?.kn
        : language === "ur"
        ? item.translations?.ur
        : item.translations?.en) || item.translations?.en;

    return {
      slug: item.slug,
      image: item.featuredImage || "/images/real/15aug.jpeg",
      badge: item.categoryName || "General",
      badgeVariant: "event" as const,
      title: translation?.title || item.slug,
      date: item.publishedAt,
      excerpt: translation?.excerpt || "",
    };
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          {language === "ur" ? "سرکاری پریس و اعلانات" : "Official Press & Announcements"}
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black text-[#0B2238] mt-3 ${language === "ur" ? "font-urdu" : ""}`}>
          {t.news.sectionTitle}
        </h1>
        <p className={`mt-3 text-base text-slate-600 ${language === "ur" ? "font-urdu" : ""}`}>
          {t.news.sectionSubtitle}
        </p>
      </div>

      {loading && newsList.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-96 p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : newsList.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-base font-bold text-slate-700">{t.news.noArticles}</p>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ur" ? "براہ کرم تازہ ترین اعلانات کے لیے جلد دوبارہ ملاحظہ فرمائیں۔" : "Please check back soon for latest community bulletins."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="group block">
              <Card className="h-full border-slate-200/90 hover:border-blue-400 flex flex-col justify-between transition-all duration-300">
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
                    <h2 className="text-lg font-bold text-[#0B2238] group-hover:text-blue-700 transition-colors leading-snug">
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
      )}
    </div>
  );
}
