"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Languages,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
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

export default function CreateGalleryAlbumPage() {
  const router = useRouter();

  const [activeLangTab, setActiveLangTab] = useState<"en" | "kn" | "ur">("en");
  const [titleEn, setTitleEn] = useState("");
  const [titleKn, setTitleKn] = useState("");
  const [titleUr, setTitleUr] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descKn, setDescKn] = useState("");
  const [descUr, setDescUr] = useState("");

  const [category, setCategory] = useState("Sports");
  const [eventDate, setEventDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );
  const [coverImage, setCoverImage] = useState("/images/instagram/insta_post_10.jpg");
  const [selectedPhotos, setSelectedPhotos] = useState<
    Array<{ id: string; src: string; title: string; caption: string; date: string }>
  >([
    {
      id: "photo-1",
      src: "/images/instagram/insta_post_10.jpg",
      title: "Championship Winning Moment",
      caption: "Team celebration with the prestigious trophy and medals.",
      date: "Aug 2026",
    },
    {
      id: "photo-2",
      src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
      title: "Gold Medals Presentation",
      caption: "Squad players displaying championship awards.",
      date: "Aug 2026",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddPhoto = (mediaSrc: string, mediaLabel: string) => {
    if (selectedPhotos.some((p) => p.src === mediaSrc)) return;
    setSelectedPhotos((prev) => [
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

  const handleRemovePhoto = (id: string) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUploadedPhotos = (uploaded: Array<{ url: string; name: string }>) => {
    const newItems = uploaded.map((u) => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      src: u.url,
      title: u.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      caption: `Uploaded image for ${titleEn || "album"}.`,
      date: eventDate || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));
    setSelectedPhotos((prev) => [...prev, ...newItems]);
    if (!coverImage && newItems.length > 0) {
      setCoverImage(newItems[0].src);
    }
  };

  const handleSubmit = async (status: "published" | "draft") => {
    if (!titleEn.trim()) {
      setErrorMessage("Please enter an English title for the album.");
      setActiveLangTab("en");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const slug = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const payload = {
      slug,
      title: titleEn,
      category,
      date: eventDate,
      coverImage,
      description: descEn,
      status,
      photos: selectedPhotos,
      translations: {
        en: { title: titleEn, description: descEn },
        kn: { title: titleKn || titleEn, description: descKn || descEn },
        ur: { title: titleUr || titleEn, description: descUr || descEn },
      },
    };

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create album");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-2xl font-bold text-[#0B2238]">Create Photo Album</h1>
            <p className="text-xs text-slate-500">
              Add new photographic event archive, match celebration, or civic program.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
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
            <span>Publish Album</span>
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
                    placeholder="e.g. Annual Football League 2026 Grand Finale"
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
                    placeholder="Highlights and recap of the photo collection..."
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
                    placeholder="ಉದಾಹರಣೆ: ವಾರ್ಷಿಕ ಕ್ರೀಡಾಕೂಟದ ಸಂಭ್ರಮ"
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
                    placeholder="ಛಾಯಾಚಿತ್ರಗಳ ವಿವರ..."
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
                    placeholder="مثال: سالانہ اسپورٹس چیمپئن شپ کے یادگار لمحات"
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
                    placeholder="تصویری جھلکیوں اور انعامات کی تفصیل..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-right font-serif focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Photo Management Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0B2238] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Album Photos ({selectedPhotos.length})</span>
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
              label="Upload photos from your computer"
              sublabel="Select or drag & drop one or multiple photos to add to this album"
            />

            {/* Selected Photos List */}
            {selectedPhotos.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No photos added yet. Upload from system or select from below.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedPhotos.map((photo) => (
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
            )}

            {/* Quick Media Selector */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Click to Add From Authentic Club Media:
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
                {AVAILABLE_MEDIA.map((item, idx) => {
                  const isAdded = selectedPhotos.some((p) => p.src === item.src);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPhoto(item.src, item.label)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all group ${
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
          {/* Metadata Card */}
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
                placeholder="e.g. August 15, 2026"
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
                    if (!selectedPhotos.some((p) => p.src === files[0].url)) {
                      setSelectedPhotos((prev) => [
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
              {selectedPhotos.length > 0 && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                    Or select cover from album photos:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
                    {selectedPhotos.map((photo) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setCoverImage(photo.src)}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                          coverImage === photo.src
                            ? "border-emerald-600 ring-2 ring-emerald-600/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        title={photo.title}
                      >
                        <Image src={photo.src} alt={photo.title} fill className="object-cover" />
                        {coverImage === photo.src && (
                          <div className="absolute top-0.5 end-0.5 w-3.5 h-3.5 bg-emerald-600 rounded-full flex items-center justify-center">
                            <Star className="w-2 h-2 text-white fill-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Manual Image URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-[#047857]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
