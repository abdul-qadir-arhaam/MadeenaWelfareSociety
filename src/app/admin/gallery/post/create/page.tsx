"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Image as ImageIcon,
  FolderPlus,
  FolderInput,
  Layers,
  Sparkles,
  Check,
  Trash2,
  Calendar,
  Languages,
  Info,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FileUploadDropzone } from "@/components/admin/FileUploadDropzone";
import { ManagedGalleryAlbum } from "@/lib/data/galleryRepository";

const AVAILABLE_MEDIA = [
  { src: "/images/real/15aug.jpeg", label: "Independence Day Gathering" },
  { src: "/images/real/15aug1.jpeg", label: "National Flag Unfurling" },
  { src: "/images/real/15aug2.jpeg", label: "National Anthem Salute" },
  { src: "/images/real/15aug5.jpeg", label: "Community Youth Assembly" },
  { src: "/images/instagram/insta_post_10.jpg", label: "Cosmos Golden Jubilee Trophy" },
  { src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg", label: "Championship Gold Medals" },
  { src: "/images/instagram/insta_post_8.jpg", label: "Community Champions Poster" },
  { src: "/images/instagram/insta_post_9.jpg", label: "Bhatkal Street Procession" },
  { src: "/images/instagram/insta_post_11.jpg", label: "Madina Ta'leemi Dais Rostrum" },
  { src: "/images/instagram/posts/post_DUcvUHVkYX-_1.jpg", label: "Night Turf Championship" },
  { src: "/images/instagram/insta_post_15.jpg", label: "Player of the Match Honor" },
  { src: "/images/instagram/insta_post_16.jpg", label: "Pitch Rush Victory Celebration" },
  { src: "/images/instagram/insta_post_12.jpg", label: "Eid Ul Fitr Welfare Greeting" },
  { src: "/images/instagram/insta_post_13.jpg", label: "Ramadan Mubarak Charity Drive" },
];

function CreateGalleryPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedAlbumId = searchParams.get("albumId") || "";

  // Albums list for dropdown
  const [albums, setAlbums] = useState<ManagedGalleryAlbum[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  // Album choice mode: "existing" | "new" | "none"
  const [albumOption, setAlbumOption] = useState<"existing" | "new" | "none">(
    preselectedAlbumId ? "existing" : "existing"
  );
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(preselectedAlbumId);

  // New Album fields
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumCategory, setNewAlbumCategory] = useState("Sports");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");

  // Post fields
  const [activeLangTab, setActiveLangTab] = useState<"en" | "ur">("en");
  const [titleEn, setTitleEn] = useState("");
  const [titleUr, setTitleUr] = useState("");

  const [captionEn, setCaptionEn] = useState("");
  const [captionUr, setCaptionUr] = useState("");

  const [category, setCategory] = useState("Sports");
  const [eventDate, setEventDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );

  // Photos
  const [photos, setPhotos] = useState<
    Array<{ id: string; src: string; title: string; caption: string; date: string }>
  >([]);
  const [coverIndex, setCoverIndex] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load existing albums
  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("/api/admin/gallery");
        const data = await res.json();
        if (data.albums) {
          setAlbums(data.albums);
          if (preselectedAlbumId) {
            setSelectedAlbumId(preselectedAlbumId);
            setAlbumOption("existing");
          } else if (data.albums.length > 0 && !selectedAlbumId) {
            setSelectedAlbumId(data.albums[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load albums", err);
      } finally {
        setLoadingAlbums(false);
      }
    }
    fetchAlbums();
  }, [preselectedAlbumId]);

  const handleAddFromLibrary = (mediaSrc: string, mediaLabel: string) => {
    if (photos.some((p) => p.src === mediaSrc)) return;
    setPhotos((prev) => [
      ...prev,
      {
        id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        src: mediaSrc,
        title: mediaLabel,
        caption: `Captured during ${titleEn || "club event"}.`,
        date: eventDate,
      },
    ]);
  };

  const handleUploadedFiles = (uploaded: Array<{ url: string; name: string }>) => {
    const newItems = uploaded.map((u) => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      src: u.url,
      title: u.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      caption: `Uploaded image for ${titleEn || "post"}.`,
      date: eventDate,
    }));
    setPhotos((prev) => [...prev, ...newItems]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== index));
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
    }
  };

  const selectedAlbum = albums.find((a) => a.id === selectedAlbumId);

  const handleSubmit = async (status: "published" | "draft") => {
    if (!titleEn.trim()) {
      setErrorMessage("Please enter an English title for the post.");
      setActiveLangTab("en");
      return;
    }

    if (albumOption === "new" && !newAlbumTitle.trim()) {
      setErrorMessage("Please provide a name for the new album, or select an existing album.");
      return;
    }

    if (photos.length === 0) {
      setErrorMessage("Please upload or select at least one photo for this post.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const coverPhoto = photos[coverIndex] || photos[0];

    const payload = {
      title: titleEn.trim(),
      caption: captionEn.trim(),
      content: captionEn.trim(),
      category: albumOption === "new" ? newAlbumCategory : category,
      date: eventDate,
      coverImage: coverPhoto.src,
      photos: photos,
      albumOption,
      albumId: albumOption === "existing" ? selectedAlbumId : undefined,
      newAlbumTitle: albumOption === "new" ? newAlbumTitle.trim() : undefined,
      newAlbumCategory: albumOption === "new" ? newAlbumCategory : undefined,
      newAlbumDescription: albumOption === "new" ? newAlbumDescription.trim() : undefined,
      status,
      translations: {
        en: { title: titleEn.trim(), caption: captionEn.trim() },
        ur: { title: titleUr.trim() || titleEn.trim(), caption: captionUr.trim() || captionEn.trim() },
      },
    };

    try {
      const res = await fetch("/api/admin/gallery/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setSuccessMessage(data.message || "Gallery post published successfully!");
      setTimeout(() => {
        router.push("/admin/gallery");
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating post";
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Link
            href="/admin/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#047857] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>Back to Gallery</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2238]">
            Create Gallery Post / Upload Photo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish photo stories to the gallery and choose whether to attach them to an existing album or create a new album.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
            className="bg-[#047857] hover:bg-[#036449] text-white"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
          <span className="font-bold">Error:</span> {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMessage} Redirecting to gallery...</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. ALBUM DESTINATION SELECTOR (USER'S EXPLICIT REQUIREMENT)    */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border-2 border-emerald-200/80 p-6 shadow-xs space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#047857] text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Album Organization</span>
          </div>
          <h2 className="text-lg font-bold text-[#0B2238]">
            Where would you like to add this photo / post?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose whether to add this post into an existing album, create a brand-new album, or publish as a standalone post.
          </p>
        </div>

        {/* 3 Interactive Mode Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Add to Existing Album */}
          <div
            onClick={() => setAlbumOption("existing")}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col justify-between ${
              albumOption === "existing"
                ? "border-[#047857] bg-emerald-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2.5 rounded-lg ${
                  albumOption === "existing"
                    ? "bg-[#047857] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <FolderInput className="w-5 h-5" />
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  albumOption === "existing"
                    ? "border-[#047857] bg-[#047857] text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {albumOption === "existing" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-bold text-sm text-[#0B2238]">Add to Existing Album</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Assign this post and append photo(s) to a previously created club album.
              </p>
            </div>
          </div>

          {/* Card 2: Create a New Album */}
          <div
            onClick={() => setAlbumOption("new")}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col justify-between ${
              albumOption === "new"
                ? "border-[#047857] bg-emerald-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2.5 rounded-lg ${
                  albumOption === "new"
                    ? "bg-[#047857] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <FolderPlus className="w-5 h-5" />
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  albumOption === "new"
                    ? "border-[#047857] bg-[#047857] text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {albumOption === "new" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-bold text-sm text-[#0B2238]">Create a New Album</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Create a new dedicated album simultaneously and place this post inside it.
              </p>
            </div>
          </div>

          {/* Card 3: Standalone Post */}
          <div
            onClick={() => setAlbumOption("none")}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col justify-between ${
              albumOption === "none"
                ? "border-[#047857] bg-emerald-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2.5 rounded-lg ${
                  albumOption === "none"
                    ? "bg-[#047857] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  albumOption === "none"
                    ? "border-[#047857] bg-[#047857] text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {albumOption === "none" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-bold text-sm text-[#0B2238]">Standalone Post (No Album)</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Publish directly into the public gallery stream without requiring an album.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Details based on chosen mode */}
        {albumOption === "existing" && (
          <div className="pt-3 border-t border-slate-200/80 space-y-3">
            <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide">
              Select Existing Album <span className="text-red-500">*</span>
            </label>
            {loadingAlbums ? (
              <div className="text-xs text-slate-400">Loading existing albums...</div>
            ) : albums.length === 0 ? (
              <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                No existing albums found. Please select &ldquo;Create a New Album&rdquo;.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {albums.map((album) => {
                  const isSelected = album.id === selectedAlbumId;
                  return (
                    <div
                      key={album.id}
                      onClick={() => setSelectedAlbumId(album.id)}
                      className={`cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all ${
                        isSelected
                          ? "border-[#047857] bg-white ring-2 ring-emerald-500/20 shadow-xs"
                          : "border-slate-200 bg-slate-50 hover:bg-white"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                        <Image
                          src={album.coverImage || "/images/real/15aug.jpeg"}
                          alt={album.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0B2238] truncate">
                          {album.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {album.category}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700">
                            {album.photos.length} photos
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#047857] flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {selectedAlbum && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100">
                <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Photos from this post will also be automatically added to <strong>&ldquo;{selectedAlbum.title}&rdquo;</strong> (currently has {selectedAlbum.photos.length} photos).
                </span>
              </div>
            )}
          </div>
        )}

        {albumOption === "new" && (
          <div className="pt-3 border-t border-slate-200/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
                  New Album Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  placeholder="e.g. Annual Ramadan Welfare Distribution 2026"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
                  New Album Category
                </label>
                <select
                  value={newAlbumCategory}
                  onChange={(e) => setNewAlbumCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white"
                >
                  <option value="Sports">Sports & Tournaments</option>
                  <option value="Celebration">Celebration & Independence</option>
                  <option value="Welfare">Community Welfare & Relief</option>
                  <option value="Social Media">Social Media Archives</option>
                  <option value="Identity">Heritage & Identity</option>
                  <option value="Education">Youth & Education</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
                New Album Description (Optional)
              </label>
              <textarea
                value={newAlbumDescription}
                onChange={(e) => setNewAlbumDescription(e.target.value)}
                rows={2}
                placeholder="Brief summary of this album's collection..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>
          </div>
        )}

        {albumOption === "none" && (
          <div className="pt-2 border-t border-slate-200/80">
            <p className="text-xs text-slate-500">
              This post will be listed independently in the visual gallery feed with its category tag. You can later assign it to an album at any time.
            </p>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 2. POST DETAILS (TITLE, CAPTION, CATEGORY, DATE)               */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-[#0B2238]">Post Content & Details</h2>

          {/* Multilingual Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <Languages className="w-3.5 h-3.5 text-slate-400 ms-1.5 me-0.5" />
            {(["en", "ur"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLangTab(lang)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  activeLangTab === lang
                    ? "bg-white text-[#047857] shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {lang === "en" ? "English" : "اردو (Urdu)"}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input based on active language */}
        <div>
          <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
            Post Title ({activeLangTab.toUpperCase()}) <span className="text-red-500">*</span>
          </label>
          {activeLangTab === "en" && (
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Final Over Thriller — Cosmos Cup Champions"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          )}
          {activeLangTab === "ur" && (
            <input
              type="text"
              dir="rtl"
              value={titleUr}
              onChange={(e) => setTitleUr(e.target.value)}
              placeholder="پوسٹ کا عنوان اردو میں..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857] font-urdu"
            />
          )}
        </div>

        {/* Caption / Story */}
        <div>
          <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
            Post Caption / Story ({activeLangTab.toUpperCase()})
          </label>
          {activeLangTab === "en" && (
            <textarea
              value={captionEn}
              onChange={(e) => setCaptionEn(e.target.value)}
              rows={3}
              placeholder="Add details, photographer credit, or match commentary..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          )}
          {activeLangTab === "ur" && (
            <textarea
              dir="rtl"
              value={captionUr}
              onChange={(e) => setCaptionUr(e.target.value)}
              rows={3}
              placeholder="پوسٹ کی تفصیل یا واقعہ..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857] font-urdu"
            />
          )}
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white"
            >
              <option value="Sports">Sports</option>
              <option value="Celebration">Celebration</option>
              <option value="Welfare">Welfare</option>
              <option value="Social Media">Social Media</option>
              <option value="Identity">Identity</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-1">
              Date Captured / Display Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="e.g. August 15, 2026"
                className="w-full px-3.5 py-2.5 ps-9 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
              <Calendar className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. PHOTO UPLOAD & MEDIA LIBRARY                                */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#0B2238]">Upload or Select Photos</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            You can upload multiple high-resolution photos for this post. Drag and drop local images or choose from existing media.
          </p>
        </div>

        {/* Upload Dropzone */}
        <FileUploadDropzone
          onUploadComplete={handleUploadedFiles}
          multiple={true}
        />

        {/* Media Library Quick Pick */}
        <div className="border-t border-slate-100 pt-4">
          <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wide mb-2">
            Quick Pick from Society Media Library
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
            {AVAILABLE_MEDIA.map((item, idx) => {
              const isAdded = photos.some((p) => p.src === item.src);
              return (
                <div
                  key={idx}
                  onClick={() => handleAddFromLibrary(item.src, item.label)}
                  title={item.label}
                  className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    isAdded
                      ? "border-[#047857] opacity-60"
                      : "border-transparent hover:border-emerald-400 hover:scale-105"
                  }`}
                >
                  <Image src={item.src} alt={item.label} fill className="object-cover" />
                  {isAdded && (
                    <div className="absolute inset-0 bg-[#047857]/60 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Photos List with Cover Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#0B2238] uppercase tracking-wide">
              Selected Photos in this Post ({photos.length})
            </label>
            <span className="text-[11px] text-slate-400">
              Click the star to designate the Cover Photo
            </span>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
              No photos added yet. Upload files above or choose from the media library.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, idx) => {
                const isCover = coverIndex === idx;
                return (
                  <div
                    key={photo.id}
                    className={`rounded-xl border overflow-hidden bg-slate-50 transition-all ${
                      isCover
                        ? "border-[#047857] ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />

                      {/* Cover badge / selector */}
                      <button
                        type="button"
                        onClick={() => setCoverIndex(idx)}
                        className={`absolute top-2 start-2 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
                          isCover
                            ? "bg-[#047857] text-white shadow-xs"
                            : "bg-black/60 text-white hover:bg-black/80"
                        }`}
                      >
                        <Star className={`w-3 h-3 ${isCover ? "fill-white" : ""}`} />
                        <span>{isCover ? "Cover Photo" : "Set Cover"}</span>
                      </button>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-2 end-2 p-1.5 rounded-md bg-black/60 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3 space-y-2">
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPhotos((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, title: val } : p))
                          );
                        }}
                        placeholder="Photo title / subject"
                        className="w-full px-2 py-1 text-xs font-bold rounded border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        value={photo.caption || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPhotos((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, caption: val } : p))
                          );
                        }}
                        placeholder="Short caption or context"
                        className="w-full px-2 py-1 text-[11px] text-slate-600 rounded border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-5">
        <Link href="/admin/gallery">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
            className="bg-[#047857] hover:bg-[#036449] text-white px-6 font-bold"
          >
            {isSubmitting ? "Publishing Post..." : "Publish Post to Gallery"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateGalleryPostPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading editor...</div>}>
      <CreateGalleryPostContent />
    </Suspense>
  );
}
