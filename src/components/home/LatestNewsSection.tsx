"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function LatestNewsSection() {
  const { t } = useLanguage();

  const newsItems = [
    {
      id: "independence-day",
      image: "/images/real/15aug.jpeg",
      badge: t.news.badgeEvent,
      badgeVariant: "event" as const,
      title: t.news.news1Title,
      date: "Aug 15, 2026",
      href: "/news/independence-day-celebration",
    },
    {
      id: "awards-ceremony",
      image: "/images/instagram/insta_post_11.jpg",
      badge: t.news.badgeNotice,
      badgeVariant: "notice" as const,
      title: t.news.news2Title,
      date: "Aug 15, 2026",
      href: "/news/educational-awards-ceremony",
    },
    {
      id: "sports-event",
      image: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      badge: t.news.badgeGallery,
      badgeVariant: "gallery" as const,
      title: t.news.news3Title,
      date: "Aug 10, 2026",
      href: "/news/community-sports-event",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 'View All' Pill Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2238] tracking-tight">
              {t.news.sectionTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500">
              {t.news.sectionSubtitle}
            </p>
          </div>
          <div>
            <Link href="/news">
              <Button variant="outline-pill" size="sm" className="font-semibold text-xs sm:text-sm">
                <span>{t.news.viewAllNews}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {newsItems.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <Card className="h-full border-slate-200/80 hover:border-emerald-300 flex flex-col justify-between">
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                    </div>

                    <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
