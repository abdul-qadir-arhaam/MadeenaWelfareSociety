"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Images } from "lucide-react";
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
      count: "4 Assets",
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
    <section className="py-12 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-extrabold uppercase tracking-wider rounded-full border border-red-200 mb-2">
              <Camera className="w-3.5 h-3.5 text-red-600" />
              <span>Media Archive</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2238] tracking-tight">
              {t.gallery.sectionTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              {t.gallery.sectionSubtitle}
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Link href="/gallery" className="block sm:inline-block w-full sm:w-auto">
              <Button
                variant="outline-red"
                size="md"
                className="w-full sm:w-auto justify-center font-bold text-xs sm:text-sm group min-h-[44px]"
              >
                <span>{t.gallery.viewAllPhotos}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {galleryItems.map((item) => (
            <Link key={item.id} href={item.href} className="group block active:scale-[0.98] transition-transform">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50 aspect-4/3 relative shadow-xs group-hover:shadow-xl group-hover:border-blue-400 transition-all duration-300">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="absolute bottom-2.5 end-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
                  <Images className="w-3 h-3 text-red-400" />
                  <span>{item.count}</span>
                </span>
              </div>

              <h4 className="mt-3 text-xs sm:text-sm font-bold text-[#0B2238] group-hover:text-blue-700 transition-colors truncate">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
