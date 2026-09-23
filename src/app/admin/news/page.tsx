"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  Star,
  Globe,
  CheckCircle,
  Clock,
  Archive,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { NewsArticle } from "@/lib/data/newsRepository";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (selectedStatus !== "all") params.set("status", selectedStatus);

      const res = await fetch(`/api/admin/news?${params.toString()}`);
      const data = await res.json();
      if (data.news) {
        setNews(data.news);
      }
    } catch (err) {
      console.error("Failed to load news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews();
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-publish" }),
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchNews();
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#047857] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            News & Press Management
          </span>
          <h1 className="text-2xl font-extrabold text-[#0B2238] mt-1.5">
            All Articles ({news.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, publish, and manage multilingual translations in English, Kannada, and Urdu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/categories">
            <Button variant="outline" size="sm">
              <Tag className="w-4 h-4" />
              <span>Manage Categories</span>
            </Button>
          </Link>
          <Link href="/admin/news/create">
            <Button size="sm">
              <PlusCircle className="w-4 h-4" />
              <span>Create New Article</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, keywords..."
            className="w-full ps-9 pe-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#047857]"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#047857]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#047857]"
          >
            <option value="all">All Categories</option>
            <option value="Events">Events</option>
            <option value="Achievements">Achievements</option>
            <option value="Sports">Sports</option>
            <option value="Welfare">Welfare</option>
            <option value="General">General</option>
            <option value="Announcements">Announcements</option>
          </select>

          <Button variant="outline" size="sm" onClick={fetchNews}>
            Refresh
          </Button>
        </div>
      </div>

      {/* News Table / List */}
      <Card className="border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading articles...
          </div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Archive className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-700">No articles found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search criteria or create a new article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-start">Article</th>
                  <th className="py-3 px-4 text-start">Category</th>
                  <th className="py-3 px-4 text-start">Status</th>
                  <th className="py-3 px-4 text-start">Translations</th>
                  <th className="py-3 px-4 text-start">Date</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          <Image
                            src={item.featuredImage}
                            alt={item.translations.en?.title || item.slug}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-md">
                          <div className="flex items-center gap-1.5">
                            {item.isFeatured && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                            )}
                            <Link
                              href={`/admin/news/${item.id}/edit`}
                              className="font-bold text-slate-900 hover:text-[#047857] transition-colors line-clamp-1 text-sm"
                            >
                              {item.translations.en?.title || item.slug}
                            </Link>
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            /{item.slug} • By {item.author}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="event">{item.categoryName}</Badge>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === "published" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Published
                        </span>
                      ) : item.status === "draft" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Draft
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <Archive className="w-3 h-3 text-slate-400" />
                          Archived
                        </span>
                      )}
                    </td>

                    {/* Translations indicator */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          title="English"
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800"
                        >
                          EN
                        </span>
                        <span
                          title={item.translations.kn ? "Kannada translated" : "Kannada missing"}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.translations.kn
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-400 opacity-60"
                          }`}
                        >
                          KN
                        </span>
                        <span
                          title={item.translations.ur ? "Urdu translated" : "Urdu missing"}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.translations.ur
                              ? "bg-purple-100 text-purple-800"
                              : "bg-slate-100 text-slate-400 opacity-60"
                          }`}
                        >
                          UR
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                      {item.publishedAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleTogglePublish(item.id)}
                          title={item.status === "published" ? "Unpublish to draft" : "Publish article"}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                        >
                          {item.status === "published" ? (
                            <EyeOff className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>

                        <Link
                          href={`/admin/news/${item.id}/edit`}
                          title="Edit article"
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-[#047857] transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Delete article"
                          className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 text-base">Delete this article?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This action will permanently remove this news article and its translations.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
