"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ManagedGalleryAlbum } from "@/lib/data/galleryRepository";

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<ManagedGalleryAlbum[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ManagedGalleryAlbum | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAlbums = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.albums) {
        setAlbums(data.albums);
        const uniqueCats = Array.from(new Set(data.albums.map((a: ManagedGalleryAlbum) => a.category))) as string[];
        setCategories(uniqueCats);
      }
    } catch (err) {
      console.error("Failed to load albums", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleToggleStatus = async (album: ManagedGalleryAlbum) => {
    const nextStatus = album.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/gallery/${album.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setAlbums((prev) =>
          prev.map((a) => (a.id === album.id ? { ...a, status: nextStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlbums((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredAlbums = albums.filter((alb) => {
    const matchesCat = selectedCategory === "all" || alb.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || alb.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      alb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alb.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2238]">Photo Gallery & Albums</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage high-resolution club event albums, Instagram media showcases, and match photos.
          </p>
        </div>
        <Link href="/admin/gallery/create">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Create New Album</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
          <input
            type="text"
            placeholder="Search albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#047857]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Albums Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Loading gallery albums...
        </div>
      ) : filteredAlbums.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">No albums found</h3>
          <p className="text-xs text-slate-500 mt-1">Try refining your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden group">
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className={
                      album.containCover
                        ? "object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        : "object-cover group-hover:scale-105 transition-transform duration-300"
                    }
                  />
                  {/* Photo Count Badge */}
                  <div className="absolute bottom-2.5 start-2.5 px-2.5 py-1 bg-[#0B2238]/85 backdrop-blur-md text-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{album.photos?.length || 0} Photos</span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2.5 end-2.5">
                    {album.status === "published" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Album Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                    <span className="text-[#047857] font-semibold">{album.category}</span>
                    <span>{album.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0B2238] line-clamp-1">{album.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {album.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/gallery/${album.slug}`}
                  target="_blank"
                  className="p-1.5 text-slate-500 hover:text-[#047857] hover:bg-emerald-50 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                  title="View Public Album"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStatus(album)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    {album.status === "published" ? "Unpublish" : "Publish"}
                  </button>

                  <Link
                    href={`/admin/gallery/${album.id}/edit`}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Edit Album"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(album)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-[#0B2238]">Delete Album</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete <span className="font-semibold text-slate-800">&quot;{deleteTarget.title}&quot;</span>? All linked photo metadata will be removed.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-xs"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
