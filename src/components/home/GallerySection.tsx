"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";

export function GallerySection() {
  const { t } = useLanguage();

  const galleryItems = [
    {
      id: "gallery-1",
      image: "/images/real/15aug.jpeg",
      title: t.gallery.item1,
      href: "/gallery/independence-day-celebration",
      count: "8 Photos",
    },
    {
      id: "gallery-2",
      image: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      title: t.gallery.item2,
      href: "/gallery/community-sports-event",
      count: "12 Photos",
    },
    {
      id: "gallery-3",
      image: "/images/official-logo.png",
      title: t.gallery.item3,
      href: "/gallery/our-logo-heritage",
      contain: true,
      count: "4 Photos",
    },
    {
      id: "gallery-4",
      image: "/images/instagram/insta_post_12.jpg",
      title: t.gallery.item4,
      href: "/gallery/community-support-welfare",
      count: "6 Photos",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 'View All' Pill Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2238] tracking-tight">
              {t.gallery.sectionTitle}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500">
              {t.gallery.sectionSubtitle}
            </p>
          </div>
          <div>
            <Link href="/gallery">
              <Button variant="outline-pill" size="sm" className="font-semibold text-xs sm:text-sm">
                <span>{t.gallery.viewAllPhotos}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 aspect-4/3 relative shadow-xs group-hover:shadow-md group-hover:border-emerald-300 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={
                    item.contain
                      ? "object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      : "object-cover group-hover:scale-105 transition-transform duration-500"
                  }
                />
                <span className="absolute bottom-2 end-2 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
                  {item.count}
                </span>
              </div>
              <h4 className="mt-2.5 text-xs sm:text-sm font-semibold text-[#0B2238] group-hover:text-[#047857] transition-colors truncate">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
