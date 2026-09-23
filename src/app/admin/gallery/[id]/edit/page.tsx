"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Image as ImageIcon,
  Trash2,
  Check,
  Languages,
  Calendar,
  Layers,
  Info,
  ExternalLink,
  Star,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ManagedGalleryAlbum } from "@/lib/data/galleryRepository";
import { FileUploadDropzone } from "@/components/admin/FileUploadDropzone";

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

export default function EditGalleryAlbumPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params?.id as string;

  const [activeLangTab, setActiveLangTab] = useState<"en" | "kn" | "ur">("en");
  const [titleEn, setTitleEn] = useState("");
  const [titleKn, setTitleKn] = useState("");
  const [titleUr, setTitleUr] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descKn, setDescKn] = useState("");
  const [descUr, setDescUr] = useState("");

  const [category, setCategory] = useState("Sports");
  const [eventDate, setEventDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [slug, setSlug] = useState("");
  const [photos, setPhotos] = useState<
    Array<{ id: string; src: string; title: string; caption?: string; date: string }>
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbum() {
      try {
        const res = await fetch(`/api/admin/gallery/${albumId}`);
        const data = await res.json();
        if (data.album) {
          const alb: ManagedGalleryAlbum = data.album;
          setTitleEn(alb.title || "");
          setTitleKn(alb.translations?.kn?.title || alb.title || "");
          setTitleUr(alb.translations?.ur?.title || alb.title || "");

          setDescEn(alb.description || "");
          setDescKn(alb.translations?.kn?.description || alb.description || "");
          setDescUr(alb.translations?.ur?.description || alb.description || "");

          setCategory(alb.category || "General");
          setEventDate(alb.date || "");
          setCoverImage(alb.coverImage || "");
          setStatus(alb.status || "published");
          setSlug(alb.slug || "");
          setPhotos(alb.photos || []);
        } else {
          setErrorMessage("Album not found");
        }
      } catch (err) {
        setErrorMessage("Failed to load album data");
      } finally {
        setIsLoading(false);
      }
    }
    loadAlbum();
  }, [albumId]);

  const handleAddPhoto = (mediaSrc: string, mediaLabel: string) => {
    if (photos.some((p) => p.src === mediaSrc)) return;
    setPhotos((prev) => [
      ...prev,
      {
        id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        src: mediaSrc,
        title: mediaLabel,
        caption: `Captured during ${titleEn}.`,
        date: eventDate,
      },
    ]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUploadedPhotos = (uploaded: Array<{ url: string; name: string }>) => {
    const newItems = uploaded.map((u) => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      src: u.url,
      title: u.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      caption: `Uploaded image for ${titleEn || "album"}.`,
      date: eventDate || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));
    setPhotos((prev) => [...prev, ...newItems]);
    if (!coverImage && newItems.length > 0) {
      setCoverImage(newItems[0].src);
    }
  };

  const handleSubmit = async (submitStatus: "published" | "draft") => {
    if (!titleEn.trim()) {
      setErrorMessage("Please enter an English title for the album.");
      setActiveLangTab("en");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title: titleEn,
      category,
      date: eventDate,
      coverImage,
      description: descEn,
      status: submitStatus,
      photos,
      translations: {
        en: { title: titleEn, description: descEn },
        kn: { title: titleKn || titleEn, description: descKn || descEn },
        ur: { title: titleUr || titleEn, description: descUr || descEn },
      },
    };

    try {
      const res = await fetch(`/api/admin/gallery/${albumId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update album");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-400 text-sm">Loading album details...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/gallery"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0B2238]">Edit Photo Album</h1>
            <p className="text-xs text-slate-500">
              Update album title, translations, photos, and publication status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {slug && (
            <Link
              href={`/gallery/${slug}`}
              target="_blank"
              className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>View Public</span>
            </Link>
          )}
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="text-xs"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
            className="text-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Update Album</span>
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Multilingual Title & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            {/* Language Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-emerald-600" />
                <span>Album Translations</span>
              </span>
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveLangTab("en")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeLangTab === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab("kn")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeLangTab === "kn" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  ಕನ್ನಡ (Kannada)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab("ur")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeLangTab === "ur" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  اردو (Urdu)
                </button>
              </div>
            </div>

            {/* Tab: English */}
            {activeLangTab === "en" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Album Title (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Album Description (English)
                  </label>
                  <textarea
                    rows={4}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
              </div>
            )}

            {/* Tab: Kannada */}
            {activeLangTab === "kn" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ಆಲ್ಬಮ್ ಶೀರ್ಷಿಕೆ (ಕನ್ನಡ)
                  </label>
                  <input
                    type="text"
                    value={titleKn}
                    onChange={(e) => setTitleKn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ವಿವರಣೆ (ಕನ್ನಡ)
                  </label>
                  <textarea
                    rows={4}
                    value={descKn}
                    onChange={(e) => setDescKn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
              </div>
            )}

            {/* Tab: Urdu */}
            {activeLangTab === "ur" && (
              <div className="space-y-4" dir="rtl">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-right font-serif">
                    البم کا عنوان (اردو)
                  </label>
                  <input
                    type="text"
                    value={titleUr}
                    onChange={(e) => setTitleUr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-right font-serif focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-right font-serif">
                    البم کی تفصیل (اردو)
                  </label>
                  <textarea
                    rows={4}
                    value={descUr}
                    onChange={(e) => setDescUr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-right font-serif focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Photo Management Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Photo Management Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0B2238] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Album Photos ({photos.length})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Upload new photos from your computer, or pick from authentic club archives.
                </p>
              </div>
            </div>

            {/* System File Upload Dropzone */}
            <FileUploadDropzone
              onUploadComplete={handleUploadedPhotos}
              multiple={true}
              label="Upload new photos from your computer"
              sublabel="Select or drag & drop one or multiple photos to add to this album"
            />

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`relative group border rounded-xl overflow-hidden bg-slate-50 transition-all ${
                    coverImage === photo.src ? "ring-2 ring-emerald-600 border-emerald-600" : "border-slate-200"
                  }`}
                >
                  <div className="relative aspect-4/3">
                    <Image src={photo.src} alt={photo.title} fill className="object-cover" />
                  </div>
                  <div className="p-2 text-[11px] flex items-center justify-between">
                    <p className="font-semibold text-slate-800 truncate flex-1">{photo.title}</p>
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute top-1.5 end-1.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCoverImage(photo.src)}
                      className={`p-1.5 rounded-md transition-all shadow-xs cursor-pointer ${
                        coverImage === photo.src
                          ? "bg-amber-500 text-white"
                          : "bg-white/90 text-slate-700 hover:bg-amber-50 hover:text-amber-600 opacity-90 group-hover:opacity-100"
                      }`}
                      title={coverImage === photo.src ? "Current Album Cover" : "Set as Album Cover"}
                    >
                      <Star className={`w-3.5 h-3.5 ${coverImage === photo.src ? "fill-white" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="p-1.5 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {coverImage === photo.src && (
                    <span className="absolute bottom-9 start-1.5 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded-md shadow-xs flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      <span>Album Cover</span>
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Media Selector */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Or Add More Photos from Authentic Club Archive:
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
                {AVAILABLE_MEDIA.map((item, idx) => {
                  const isAdded = photos.some((p) => p.src === item.src);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPhoto(item.src, item.label)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        isAdded
                          ? "border-emerald-500 opacity-60 pointer-events-none"
                          : "border-transparent hover:border-emerald-600 cursor-pointer"
                      }`}
                      title={item.label}
                    >
                      <Image src={item.src} alt={item.label} fill className="object-cover" />
                      {isAdded && (
                        <div className="absolute inset-0 bg-emerald-700/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Settings */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Album Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
              >
                <option value="Sports">Sports</option>
                <option value="Celebration">Celebration</option>
                <option value="Community">Community</option>
                <option value="Welfare">Welfare</option>
                <option value="Heritage">Heritage</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Event Date</span>
              </label>
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            {/* Cover Image Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Album Cover Image
                </label>
              </div>

              {/* Upload Cover from System Button */}
              <FileUploadDropzone
                compact
                multiple={false}
                label="Choose Cover from System"
                onUploadComplete={(files) => {
                  if (files.length > 0) {
                    setCoverImage(files[0].url);
                    // Also add to album photos if not present
                    if (!photos.some((p) => p.src === files[0].url)) {
                      setPhotos((prev) => [
                        {
                          id: `photo-${Date.now()}`,
                          src: files[0].url,
                          title: files[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                          caption: `Cover photo for ${titleEn || "album"}.`,
                          date: eventDate || "Recent",
                        },
                        ...prev,
                      ]);
                    }
                  }
                }}
              />

              <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                {coverImage ? (
                  <Image src={coverImage} alt="Album Cover Preview" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                    No cover selected
                  </div>
                )}
                <span className="absolute bottom-2 start-2 px-2 py-0.5 bg-[#0B2238]/80 text-white rounded text-[10px] font-semibold">
                  Active Cover Preview
                </span>
              </div>

              {/* Click to Select from Album Photos */}
              {photos.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                    Or select cover from album photos:
                  </span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 max-h-20">
                    {photos.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setCoverImage(p.src)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                          coverImage === p.src ? "border-emerald-600 scale-105" : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                        title={p.title}
                      >
                        <Image src={p.src} alt={p.title} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Or enter image URL:
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/images/... or https://..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
