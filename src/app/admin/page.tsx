"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Image as ImageIcon,
  Trophy,
  Users,
  PlusCircle,
  Eye,
  Edit3,
  Tag,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NewsArticle } from "@/lib/data/newsRepository";
import { GALLERY_ALBUMS } from "@/lib/data/galleryData";

export default function AdminDashboardPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.news) {
          setNews(data.news);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalPhotos = GALLERY_ALBUMS.reduce(
    (acc, alb) => acc + alb.photos.length,
    0
  );
  const publishedCount = news.filter((n) => n.status === "published").length;
  const draftCount = news.filter((n) => n.status === "draft").length;

  const stats = [
    {
      label: "Total News Articles",
      count: String(news.length || 4),
      change: `${publishedCount} published`,
      icon: Newspaper,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Drafts in Review",
      count: String(draftCount),
      change: "Ready for publication",
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Gallery Albums",
      count: String(GALLERY_ALBUMS.length),
      change: `${totalPhotos} photos total`,
      icon: ImageIcon,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Achievements Recorded",
      count: "3",
      change: "Cosmos Trophy & Awards",
      icon: Trophy,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2238]">
            Welcome to Madeena Welfare Society CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage multilingual news, media galleries, welfare activities, and official announcements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/news/create">
            <Button size="sm" className="font-semibold">
              <PlusCircle className="w-4 h-4" />
              <span>Add New Article</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-5 border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="text-2xl font-extrabold text-[#0B2238] mt-1.5">
                    {stat.count}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 mt-1 block">
                    {stat.change}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-200 hover:border-emerald-300">
          <h3 className="font-bold text-[#0B2238] text-sm">Publish News Article</h3>
          <p className="text-xs text-slate-500 mt-1">
            Draft articles in English, Kannada, and Urdu with rich text formatting.
          </p>
          <div className="mt-3">
            <Link href="/admin/news/create">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                Open News Editor →
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 hover:border-emerald-300">
          <h3 className="font-bold text-[#0B2238] text-sm">Manage Categories</h3>
          <p className="text-xs text-slate-500 mt-1">
            Configure taxonomy for news, sports, welfare, and gallery archives.
          </p>
          <div className="mt-3">
            <Link href="/admin/categories">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                Manage Categories →
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 hover:border-emerald-300">
          <h3 className="font-bold text-[#0B2238] text-sm">View Photo Gallery</h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse authentic Instagram and community event photo archives.
          </p>
          <div className="mt-3">
            <Link href="/gallery" target="_blank">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                View Public Gallery →
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Content Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-[#0B2238] text-base">Recently Updated Articles</h3>
          <Link href="/admin/news" className="text-xs font-semibold text-[#047857] hover:underline flex items-center gap-1">
            <span>View All ({news.length})</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="px-5 py-3 text-start">Article Title</th>
                <th className="px-5 py-3 text-start">Category</th>
                <th className="px-5 py-3 text-start">Status</th>
                <th className="px-5 py-3 text-start">Date</th>
                <th className="px-5 py-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {news.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#0B2238] max-w-xs truncate">
                    {item.translations.en?.title || item.slug}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="event">{item.categoryName}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${
                        item.status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{item.publishedAt}</td>
                  <td className="px-5 py-3.5 text-end">
                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="text-[#047857] hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
