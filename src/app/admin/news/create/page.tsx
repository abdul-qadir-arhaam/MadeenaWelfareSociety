"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Globe,
  Image as ImageIcon,
  Star,
  Tag,
  Calendar,
  AlertCircle,
  Loader2,
  Type,
  List,
  Quote,
  Heading2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CategoryItem } from "@/lib/data/categoryRepository";
import { FileUploadDropzone } from "@/components/admin/FileUploadDropzone";

export default function CreateNewsPage() {
  const router = useRouter();

  // Tab state for multilingual editing
  const [activeTab, setActiveTab] = useState<"en" | "kn" | "ur">("en");

  // Common metadata
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [author, setAuthor] = useState("MWS Media Cell");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft"
  );
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("/images/real/15aug.jpeg");
  const [tagsInput, setTagsInput] = useState("Bhatkal, MadeenaWelfare");

  // English translation fields
  const [titleEn, setTitleEn] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [seoTitleEn, setSeoTitleEn] = useState("");
  const [seoDescEn, setSeoDescEn] = useState("");

  // Kannada translation fields
  const [titleKn, setTitleKn] = useState("");
  const [excerptKn, setExcerptKn] = useState("");
  const [contentKn, setContentKn] = useState("");

  // Urdu translation fields
  const [titleUr, setTitleUr] = useState("");
  const [excerptUr, setExcerptUr] = useState("");
  const [contentUr, setContentUr] = useState("");

  // System states
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available real photo library presets for quick selection
  const photoPresets = [
    { label: "Community Assembly (15 Aug)", src: "/images/real/15aug.jpeg" },
    { label: "Flag Unfurling", src: "/images/real/15aug1.jpeg" },
    { label: "Leadership Tribute", src: "/images/real/15aug4.jpeg" },
    { label: "Campus Gathering", src: "/images/real/15aug6.jpeg" },
    { label: "Cosmos Trophy Champions", src: "/images/instagram/insta_post_10.jpg" },
    { label: "Gold Medals Felicitation", src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg" },
    { label: "Official Podium Address", src: "/images/instagram/insta_post_11.jpg" },
    { label: "Eid Ul Fitr Welfare", src: "/images/instagram/insta_post_12.jpg" },
  ];

  useEffect(() => {
    // Fetch categories
    fetch("/api/admin/categories?type=news")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
          setCategoryId(data.categories[0].id);
          setCategoryName(data.categories[0].name);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Auto generate slug from English title
  const handleTitleEnChange = (val: string) => {
    setTitleEn(val);
    if (!slug || slug === titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleCategoryChange = (catId: string) => {
    setCategoryId(catId);
    const found = categories.find((c) => c.id === catId);
    if (found) setCategoryName(found.name);
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    if (activeTab === "en") {
      setContentEn((prev) => `${prev}\n${prefix}Text${suffix}\n`);
    } else if (activeTab === "kn") {
      setContentKn((prev) => `${prev}\n${prefix}ಪಠ್ಯ${suffix}\n`);
    } else {
      setContentUr((prev) => `${prev}\n${prefix}متن${suffix}\n`);
    }
  };

  const handleSubmit = async (submitStatus: "draft" | "published") => {
    if (!titleEn.trim()) {
      setErrorMessage("Please enter an English title for the article.");
      setActiveTab("en");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title: titleEn,
      slug: slug || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      categoryId,
      categoryName,
      featuredImage,
      author,
      publishedAt,
      status: submitStatus,
      isFeatured,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: excerptEn,
      content: contentEn,
      seoTitle: seoTitleEn || titleEn,
      seoDescription: seoDescEn || excerptEn,
      translations: {
        kn: titleKn.trim()
          ? {
              language: "kn",
              title: titleKn,
              excerpt: excerptKn,
              content: contentKn,
            }
          : undefined,
        ur: titleUr.trim()
          ? {
              language: "ur",
              title: titleUr,
              excerpt: excerptUr,
              content: contentUr,
            }
          : undefined,
      },
    };

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create article");
      }

      router.push("/admin/news");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating article";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B2238]">
              Create News Article
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish news with multilingual translations in English, Kannada, and Urdu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Publish Article</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Multilingual Translation Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 overflow-hidden">
            {/* Language Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 pt-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
                  activeTab === "en"
                    ? "bg-white text-[#047857] border-[#047857] shadow-xs"
                    : "text-slate-500 hover:text-slate-800 border-transparent"
                }`}
              >
                <span>English (Default)</span>
                {titleEn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("kn")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
                  activeTab === "kn"
                    ? "bg-white text-blue-700 border-blue-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 border-transparent"
                }`}
              >
                <span>ಕನ್ನಡ (Kannada)</span>
                {titleKn && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ur")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
                  activeTab === "ur"
                    ? "bg-white text-purple-700 border-purple-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 border-transparent"
                }`}
              >
                <span>اردو (Urdu RTL)</span>
                {titleUr && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
              </button>
            </div>

            {/* Tab 1: English */}
            {activeTab === "en" && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Article Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => handleTitleEnChange(e.target.value)}
                    placeholder="e.g. 80th Independence Day Celebration at MWS Campus"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Short Excerpt / Lead Summary
                  </label>
                  <textarea
                    rows={2}
                    value={excerptEn}
                    onChange={(e) => setExcerptEn(e.target.value)}
                    placeholder="Brief 1-2 sentence overview shown on news cards and search results..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>

                {/* Editor Toolbar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Full Article Body
                    </label>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-slate-600">
                      <button
                        type="button"
                        onClick={() => insertFormatting("## ")}
                        title="Heading 2"
                        className="p-1 hover:bg-white rounded transition-colors text-xs font-bold"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("**", "**")}
                        title="Bold"
                        className="p-1 hover:bg-white rounded transition-colors text-xs font-bold px-1.5"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("*", "*")}
                        title="Italic"
                        className="p-1 hover:bg-white rounded transition-colors text-xs italic px-1.5"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("- ")}
                        title="Bullet List"
                        className="p-1 hover:bg-white rounded transition-colors text-xs"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting("> ")}
                        title="Blockquote"
                        className="p-1 hover:bg-white rounded transition-colors text-xs"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={10}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    placeholder="Write detailed report with paragraphs, quotes, and speeches..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 font-sans focus:outline-none focus:ring-2 focus:ring-[#047857] leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    SEO Metadata (Optional)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={seoTitleEn}
                      onChange={(e) => setSeoTitleEn(e.target.value)}
                      placeholder="Custom SEO Title (defaults to Title)"
                      className="px-3 py-2 text-xs rounded-lg border border-slate-200"
                    />
                    <input
                      type="text"
                      value={seoDescEn}
                      onChange={(e) => setSeoDescEn(e.target.value)}
                      placeholder="Custom SEO Meta Description"
                      className="px-3 py-2 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Kannada */}
            {activeTab === "kn" && (
              <div className="p-6 space-y-4">
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-800">
                  Provide Kannada headline and body for regional readers.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ಶೀರ್ಷಿಕೆ (Kannada Title)
                  </label>
                  <input
                    type="text"
                    value={titleKn}
                    onChange={(e) => setTitleKn(e.target.value)}
                    placeholder="ಉದಾ: ಭಟ್ಕಳದ ಮದೀನಾ ವೆಲ್ಫೇರ್ ಸೊಸೈಟಿಯಲ್ಲಿ ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆ"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ (Kannada Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={excerptKn}
                    onChange={(e) => setExcerptKn(e.target.value)}
                    placeholder="ಸುದ್ದಿಯ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ಪೂರ್ಣ ಸುದ್ದಿ (Kannada Body)
                  </label>
                  <textarea
                    rows={8}
                    value={contentKn}
                    onChange={(e) => setContentKn(e.target.value)}
                    placeholder="ಸುದ್ದಿಯ ಸಂಪೂರ್ಣ ವಿವರವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Urdu (RTL) */}
            {activeTab === "ur" && (
              <div className="p-6 space-y-4" dir="rtl">
                <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs text-purple-800" dir="ltr">
                  اردو خبر کی سرخی اور متن درج کریں۔ (Urdu RTL content supported natively)
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 text-start font-urdu">
                    خبر کا عنوان (Urdu Title)
                  </label>
                  <input
                    type="text"
                    value={titleUr}
                    onChange={(e) => setTitleUr(e.target.value)}
                    placeholder="مثال: مدینہ ویلفیئر سوسائٹی بھٹکل کے زیر اہتمام شاندار تقریب"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-start font-urdu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 text-start font-urdu">
                    خلاصہ (Urdu Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={excerptUr}
                    onChange={(e) => setExcerptUr(e.target.value)}
                    placeholder="خبر کا مختصر خلاصہ..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-start font-urdu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 text-start font-urdu">
                    تفصیلی خبر (Urdu Body)
                  </label>
                  <textarea
                    rows={8}
                    value={contentUr}
                    onChange={(e) => setContentUr(e.target.value)}
                    placeholder="خبر کی مکمل تفصیلات یہاں لکھیں..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 leading-relaxed text-start font-urdu"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Settings, Images & Metadata */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <Card className="p-5 border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Publication Settings
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="article-slug-url"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#047857] font-mono text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Bhatkal, Youth, Welfare"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Pin to Featured Carousel
              </span>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 text-[#047857] focus:ring-[#047857] rounded"
              />
            </div>
          </Card>

          {/* Featured Image Selector */}
          <Card className="p-5 border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#047857]" />
                <span>Featured Photo</span>
              </h3>
            </div>

            {/* Choose from System Button */}
            <FileUploadDropzone
              compact
              multiple={false}
              label="Choose Photo from System"
              onUploadComplete={(files) => {
                if (files.length > 0) {
                  setFeaturedImage(files[0].url);
                }
              }}
            />

            {/* Active Preview */}
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={featuredImage}
                alt="Selected preview"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/images/real/15aug.jpeg"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-600"
              />
            </div>

            {/* Quick Pick Presets */}
            <div>
              <span className="block text-[11px] font-bold text-slate-500 mb-2">
                Quick Select from Authentic Library:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {photoPresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFeaturedImage(p.src)}
                    title={p.label}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      featuredImage === p.src
                        ? "border-[#047857] scale-105 shadow-xs"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={p.src} alt={p.label} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
