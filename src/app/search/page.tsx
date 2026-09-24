"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface SearchItem {
  id: string;
  title: string;
  type: "News" | "Gallery";
  category: string;
  date: string;
  image: string;
  href: string;
  excerpt: string;
}

interface ApiNewsItem {
  id: string;
  slug: string;
  categoryName?: string;
  publishedAt?: string;
  featuredImage?: string;
  translations?: Record<string, { title?: string; excerpt?: string; summary?: string }>;
}

interface ApiGalleryItem {
  id: string;
  slug: string;
  title: string;
  category?: string;
  date?: string;
  coverImage?: string;
  description?: string;
  photos?: unknown[];
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<"all" | "News" | "Gallery">("all");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [newsRes, galleryRes] = await Promise.all([
          fetch("/api/admin/news?status=published"),
          fetch("/api/admin/gallery?status=published"),
        ]);

        const newsData = await newsRes.json();
        const galleryData = await galleryRes.json();

        const combined: SearchItem[] = [];

        if (newsData.news) {
          newsData.news.forEach((n: ApiNewsItem) => {
            const tr = n.translations?.en || n.translations?.kn || n.translations?.ur;
            combined.push({
              id: n.id,
              title: tr?.title || n.slug,
              type: "News",
              category: n.categoryName || "General",
              date: n.publishedAt || "Recent",
              image: n.featuredImage || "/images/real/15aug.jpeg",
              href: `/news/${n.slug}`,
              excerpt: tr?.excerpt || tr?.summary || "",
            });
          });
        }

        if (galleryData.albums) {
          galleryData.albums.forEach((g: ApiGalleryItem) => {
            combined.push({
              id: g.id,
              title: g.title,
              type: "Gallery",
              category: g.category || "Media",
              date: g.date || "Recent",
              image: g.coverImage || "/images/real/15aug.jpeg",
              href: `/gallery/${g.slug}`,
              excerpt: g.description || `Collection of ${g.photos?.length || 0} event photographs.`,
            });
          });
        }

        setItems(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = items.filter((item) => {
    const matchesType = activeType === "all" || item.type === activeType;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      q === "" ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0B2238]">Search the Portal</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Find news, announcements, gallery albums, match reports, and welfare programs.
        </p>

        <div className="mt-6 relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
            <SearchIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, events, sports, albums, welfare..."
            className="w-full ps-11 pe-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] shadow-xs"
          />
        </div>

        {/* Filter Chips */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
          </span>
          <button
            type="button"
            onClick={() => setActiveType("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
              activeType === "all"
                ? "bg-[#047857] text-white border-[#047857]"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            All ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveType("News")}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
              activeType === "News"
                ? "bg-[#047857] text-white border-[#047857]"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            News & Articles
          </button>
          <button
            type="button"
            onClick={() => setActiveType("Gallery")}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
              activeType === "Gallery"
                ? "bg-[#047857] text-white border-[#047857]"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Photo Albums
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Searching portal archives...</div>
      ) : (
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Link key={item.id} href={item.href} className="group block">
                <Card className="p-4 sm:p-5 border-slate-200 hover:border-emerald-300 flex flex-col sm:flex-row gap-4 items-center transition-all hover:shadow-md">
                  <div className="relative w-full sm:w-44 aspect-16/10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.type === "News" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">{item.category}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center text-slate-400 group-hover:text-[#047857] transition-colors">
                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <SearchIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &quot;Independence&quot;, &quot;Sports&quot;, &quot;Cricket&quot;, or &quot;Awards&quot;.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
