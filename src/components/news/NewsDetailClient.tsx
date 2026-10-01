"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Share2, Tag, MessageCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { NewsArticle } from "@/lib/data/newsRepository";
import { CategoryItem } from "@/lib/data/categoryRepository";

interface NewsDetailClientProps {
  newsItem: NewsArticle;
  otherNews: NewsArticle[];
  categories: CategoryItem[];
}

export function NewsDetailClient({ newsItem, otherNews, categories }: NewsDetailClientProps) {
  const { t, language } = useLanguage();

  // Dynamic language resolution:
  // 1. Target language (e.g. Urdu if language === 'ur')
  // 2. English fallback (if target translation wasn't provided)
  // 3. Any available translation
  const translation =
    (language === "ur"
      ? newsItem.translations?.ur
      : newsItem.translations?.en) ||
    newsItem.translations?.en ||
    newsItem.translations?.ur;

  const title = translation?.title || newsItem.slug;
  const excerpt = translation?.excerpt || "";
  const content = translation?.content || "";

  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const isRtl = language === "ur";
  const hasTargetTranslation = Boolean(newsItem.translations?.[language]?.title);

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-[#047857]">{t.nav.home}</Link>
        <span>/</span>
        <Link href="/news" className="hover:text-[#047857]">{t.nav.news}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{title}</span>
      </nav>

      {/* Main 70% / Sidebar 30% Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Article Content (70% - 8 cols) */}
        <article className="lg:col-span-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/category/${newsItem.categoryId.replace("cat-", "")}`}>
                <Badge variant="event" className="hover:bg-emerald-100 cursor-pointer">
                  {newsItem.categoryName}
                </Badge>
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{newsItem.publishedAt}</span>
              </div>
              <span className="text-xs text-slate-400">• {t.news.byAuthor} {newsItem.author}</span>
            </div>

            <h1 className={`text-2xl sm:text-4xl font-extrabold text-[#0B2238] tracking-tight leading-tight ${isRtl ? "font-urdu" : ""}`}>
              {title}
            </h1>

            {excerpt && (
              <p className={`text-base sm:text-lg text-slate-600 leading-relaxed font-medium ${isRtl ? "font-urdu" : ""}`}>
                {excerpt}
              </p>
            )}
          </div>

          {/* Featured Hero Banner */}
          <div className="mt-8 relative aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100">
            <Image
              src={newsItem.featuredImage || "/images/real/15aug.jpeg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Language notification banner */}
          {!hasTargetTranslation && language === "ur" && (
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between font-urdu">
              <span>
                یہ مضمون فی الوقت انگریزی میں دستیاب ہے، کیونکہ اس کی اردو تفصیل ابھی شامل نہیں کی گئی ہے۔
              </span>
            </div>
          )}

          {/* Article Body */}
          <div className={`mt-8 space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg ${isRtl ? "font-urdu leading-loose" : "font-sans"}`}>
            {paragraphs.map((p, index) => {
              if (p.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl sm:text-2xl font-bold text-[#0B2238] pt-4">
                    {p.replace("## ", "")}
                  </h2>
                );
              }
              return <p key={index}>{p}</p>;
            })}
          </div>

          {/* Tags */}
          {newsItem.tags && newsItem.tags.length > 0 && (
            <div className="mt-6 pt-4 flex flex-wrap items-center gap-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {newsItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Sharing Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#047857]" />
              {t.news.shareArticle}:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${title} - Read more on Madeena Welfare Society: http://localhost:3000/news/${newsItem.slug}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </article>

        {/* Sidebar (30% - 4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Latest News Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B2238] pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
              <span>{t.news.relatedNews}</span>
              <Link href="/news" className="text-xs text-[#047857] hover:underline font-semibold">
                {t.news.viewAllNews}
              </Link>
            </h3>
            <div className="space-y-4">
              {otherNews.map((item) => {
                const tr =
                  (language === "ur"
                    ? item.translations?.ur
                    : item.translations?.en) ||
                  item.translations?.en ||
                  item.translations?.ur;
                return (
                  <Link key={item.id} href={`/news/${item.slug}`} className="group block">
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        <Image
                          src={item.featuredImage || "/images/real/15aug.jpeg"}
                          alt={tr?.title || item.slug}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#047857] uppercase tracking-wider block">
                          {item.categoryName}
                        </span>
                        <h4 className="text-xs font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors line-clamp-2 leading-snug">
                          {tr?.title || item.slug}
                        </h4>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{item.publishedAt}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B2238] pb-3 border-b border-slate-100 mb-3">
              {t.gallery.allCategories}
            </h3>
            <div className="space-y-1.5">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#047857] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>{cat.name}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-300 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </div>

          {/* Photo Gallery Spotlight */}
          <div className="bg-[#0B2238] text-white p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              {t.gallery.sectionTitle}
            </span>
            <h3 className="text-sm font-bold text-white mt-2">
              {t.gallery.pageTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {t.gallery.sectionSubtitle}
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mt-3 transition-colors"
            >
              <span>{t.gallery.viewAllPhotos}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
