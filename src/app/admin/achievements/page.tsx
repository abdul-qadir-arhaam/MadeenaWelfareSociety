"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  PlusCircle,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  Sparkles,
  Calendar,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Achievement } from "@/lib/data/achievementsRepository";
import { FileUploadDropzone } from "@/components/admin/FileUploadDropzone";

const AVAILABLE_MEDALS = [
  { src: "/images/instagram/insta_post_10.jpg", label: "Cosmos Golden Jubilee Trophy" },
  { src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg", label: "Championship Gold Medals" },
  { src: "/images/instagram/insta_post_8.jpg", label: "State Level Excellence Honor" },
  { src: "/images/instagram/insta_post_11.jpg", label: "Ta'leemi Merit Award" },
  { src: "/images/instagram/posts/post_DUcvUHVkYX-_1.jpg", label: "Night Turf Championship" },
  { src: "/images/instagram/insta_post_15.jpg", label: "Player of the Match" },
  { src: "/images/instagram/insta_post_17.jpg", label: "Bowling Masterclass Award" },
];

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalYear, setModalYear] = useState("2026");
  const [modalCategory, setModalCategory] = useState("Sports");
  const [modalImage, setModalImage] = useState("/images/instagram/insta_post_10.jpg");
  const [modalDescription, setModalDescription] = useState("");
  const [modalIsFeatured, setModalIsFeatured] = useState(true);
  const [modalStatus, setModalStatus] = useState<"published" | "draft">("published");
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAchievements = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/achievements");
      const data = await res.json();
      if (data.achievements) {
        setAchievements(data.achievements);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setModalTitle("");
    setModalYear("2026");
    setModalCategory("Sports");
    setModalImage("/images/instagram/insta_post_10.jpg");
    setModalDescription("");
    setModalIsFeatured(true);
    setModalStatus("published");
    setIsModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setEditingId(ach.id);
    setModalTitle(ach.title);
    setModalYear(ach.year);
    setModalCategory(ach.category);
    setModalImage(ach.image);
    setModalDescription(ach.description);
    setModalIsFeatured(ach.isFeatured);
    setModalStatus(ach.status);
    setIsModalOpen(true);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim()) return;

    setIsSaving(true);
    const payload = {
      title: modalTitle,
      year: modalYear,
      category: modalCategory,
      image: modalImage,
      description: modalDescription,
      isFeatured: modalIsFeatured,
      status: modalStatus,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/achievements/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setAchievements((prev) =>
            prev.map((a) => (a.id === editingId ? data.achievement : a))
          );
        }
      } else {
        const res = await fetch("/api/admin/achievements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setAchievements((prev) => [data.achievement, ...prev]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/achievements/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAchievements((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = achievements.filter((a) => {
    const matchesCat = categoryFilter === "all" || a.category === categoryFilter;
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2238] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Honors & Achievements</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage club championship trophies, academic excellence awards, and humanitarian honors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/achievements"
            target="_blank"
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>View Public Page</span>
          </Link>
          <Button onClick={openCreateModal} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Add Achievement</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
          <input
            type="text"
            placeholder="Search honors & trophies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 pe-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#047857]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
          >
            <option value="all">All Categories</option>
            <option value="Sports">Sports</option>
            <option value="Social Work">Social Work</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading achievements...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">No achievements found</h3>
          <p className="text-xs text-slate-500 mt-1">Click &quot;Add Achievement&quot; to create your first honor entry.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2.5 start-2.5 px-2.5 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{item.year}</span>
                  </div>
                  <div className="absolute top-2.5 end-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-slate-800 rounded-full text-[10px] font-semibold border border-slate-200 shadow-xs">
                    {item.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#0B2238] line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#047857]">
                  {item.isFeatured ? "★ Featured Spotlight" : "Standard Milestone"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Achievement"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Achievement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B2238] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>{editingId ? "Edit Achievement" : "Add New Achievement"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Achievement Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="e.g. Cosmos Golden Jubilee Trophy Winner"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year / Season
                  </label>
                  <input
                    type="text"
                    value={modalYear}
                    onChange={(e) => setModalYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={modalCategory}
                    onChange={(e) => setModalCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  >
                    <option value="Sports">Sports</option>
                    <option value="Social Work">Social Work</option>
                    <option value="Education">Education</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="Details of the victory, cash prize, organizers, or community milestone..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Achievement Photo
                  </label>
                  <FileUploadDropzone
                    compact
                    multiple={false}
                    label="Choose from System"
                    onUploadComplete={(files) => {
                      if (files.length > 0) {
                        setModalImage(files[0].url);
                      }
                    }}
                  />
                </div>

                {modalImage && (
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mb-2">
                    <Image
                      src={modalImage}
                      alt="Achievement preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={modalImage}
                  onChange={(e) => setModalImage(e.target.value)}
                  className="w-full px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {AVAILABLE_MEDALS.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalImage(m.src)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                        modalImage === m.src ? "border-emerald-600 scale-105" : "border-slate-200"
                      }`}
                      title={m.label}
                    >
                      <Image src={m.src} alt={m.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="featured-check"
                  type="checkbox"
                  checked={modalIsFeatured}
                  onChange={(e) => setModalIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#047857] rounded border-slate-300"
                />
                <label htmlFor="featured-check" className="text-xs font-medium text-slate-700">
                  Feature in Homepage & Spotlights
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <Button type="submit" disabled={isSaving} className="text-xs">
                  {isSaving ? "Saving..." : editingId ? "Update Achievement" : "Save Achievement"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-[#0B2238]">Delete Achievement</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete <span className="font-semibold text-slate-800">&quot;{deleteTarget.title}&quot;</span>?
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-xs cursor-pointer"
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
