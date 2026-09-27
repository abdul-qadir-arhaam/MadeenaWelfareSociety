"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function LatestNewsSection() {
  const { t } = useLanguage();

  const featuredNews = {
    id: "independence-day",
    image: "/images/real/15aug.jpeg",
    badge: t.news.badgeEvent,
    badgeVariant: "event" as const,
    title: t.news.news1Title,
    date: "August 15, 2026",
    excerpt:
      "Grand patriotic celebration, national tricolor flag hoisting, and distribution of student merit kits organized by Madeena Welfare Society in Bhatkal.",
    href: "/news/independence-day-celebration",
  };

  const sideNews = [
    {
      id: "awards-ceremony",
      image: "/images/instagram/insta_post_11.jpg",
      badge: t.news.badgeNotice,
      badgeVariant: "notice" as const,
      title: t.news.news2Title,
      date: "August 15, 2026",
      href: "/news/educational-awards-ceremony",
    },
    {
      id: "sports-event",
      image: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      badge: t.news.badgeGallery,
      badgeVariant: "sports" as const,
      title: t.news.news3Title,
      date: "August 10, 2026",
      href: "/news/community-sports-event",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider rounded-full border border-blue-200 mb-2">
              <Newspaper className="w-3.5 h-3.5 text-blue-700" />
              <span>Official Press & Journal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2238] tracking-tight">
              {t.news.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              {t.news.sectionSubtitle}
            </p>
          </div>

          <div>
            <Link href="/news">
              <Button
                variant="outline-pill"
                size="md"
                className="font-bold text-xs sm:text-sm group"
              >
                <span>{t.news.viewAllNews}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Editorial Asymmetric News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Lead Story (Col 7) */}
          <div className="lg:col-span-7">
            <Link href={featuredNews.href} className="group block h-full">
              <Card className="h-full border-slate-200/90 hover:border-blue-400 p-0 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 start-4">
                      <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md">
                        {featuredNews.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span>{featuredNews.date}</span>
                      </span>
                      <span>•</span>
                      <span className="text-red-600 font-bold">Featured Lead</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#0B2238] group-hover:text-blue-700 transition-colors leading-snug">
                      {featuredNews.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-700 group-hover:text-red-600 transition-colors">
                  <span>Read Full Report</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 transition-transform" />
                </div>
              </Card>
            </Link>
          </div>

          {/* Side Stacked Stories (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sideNews.map((item) => (
              <Link key={item.id} href={item.href} className="group block flex-1">
                <Card className="h-full border-slate-200/90 hover:border-blue-400 p-5 flex flex-col sm:flex-row gap-5 items-center transition-all duration-300">
                  <div className="relative w-full sm:w-36 aspect-16/10 sm:aspect-square rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                      </div>

                      <h4 className="text-base font-bold text-[#0B2238] group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>{item.date}</span>
                      <span className="text-blue-700 group-hover:text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
