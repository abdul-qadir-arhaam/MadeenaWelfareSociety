"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Settings,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  CheckCircle2,
  Save,
  Loader2,
  ShieldCheck,
  Share2,
  Image as ImageIcon,
  Sparkles,
  Check,
  RotateCcw,
  ExternalLink,
  Eye,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteSettings } from "@/lib/data/settingsRepository";
import { FileUploadDropzone } from "@/components/admin/FileUploadDropzone";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const HERO_BG_PRESETS = [
  {
    title: "Cosmos Trophy Champions",
    subtitle: "Squad hoisting the Cosmos Jubilee Cup",
    src: "/images/instagram/insta_post_10.jpg",
    badge: "Champions Squad",
  },
  {
    title: "Medal Felicitation & Honors",
    subtitle: "Gold medalists presentation ceremony",
    src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
    badge: "Grand Celebration",
  },
  {
    title: "Independence Day Gathering",
    subtitle: "80th Independence Day Flag Hoisting",
    src: "/images/real/15aug.jpeg",
    badge: "Official Event",
  },
  {
    title: "Rabita Hall Academic Awards",
    subtitle: "Madina Ta'leemi scholarship stage felicitation",
    src: "/images/instagram/insta_post_11.jpg",
    badge: "Education",
  },
  {
    title: "Bhatkal Civic & Member Meet",
    subtitle: "General assembly & community members",
    src: "/images/instagram/insta_post_8.jpg",
    badge: "Community",
  },
  {
    title: "Sports Club & Athletic League",
    subtitle: "Youth sports and tournament action",
    src: "/images/instagram/insta_post_7.jpg",
    badge: "Sports",
  },
];

const DEFAULT_HERO_IMAGE = "/images/instagram/insta_post_10.jpg";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customBgInput, setCustomBgInput] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
          setCustomBgInput(data.settings.heroBackgroundImage || DEFAULT_HERO_IMAGE);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSetHeroBg = (url: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      heroBackgroundImage: url,
    });
    setCustomBgInput(url);
  };

  const handleUploadBgComplete = (uploaded: Array<{ url: string; name: string }>) => {
    if (uploaded && uploaded.length > 0) {
      handleSetHeroBg(uploaded[0].url);
      setSuccessMessage("Background image uploaded! Click 'Save All Settings' or 'Apply & Save Background' to publish.");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }

      setSuccessMessage("Site settings and homepage background updated successfully! Live website refreshed.");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving settings";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Loading site settings...
      </div>
    );
  }

  const currentBg = settings.heroBackgroundImage || DEFAULT_HERO_IMAGE;

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0B2238] flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-600" />
            <span>Site Settings & Homepage Controls</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure homepage background banner, club identification, contact details, and public notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" className="font-semibold text-xs gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-700" />
              <span>View User Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Button>
          </Link>
          <Button
            onClick={() => handleSubmit()}
            disabled={isSaving}
            className="flex items-center gap-2 self-start sm:self-auto cursor-pointer font-bold"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ========================================================================= */}
        {/* FEATURE: Homepage Hero Background Image Customizer */}
        {/* ========================================================================= */}
        <div
          id="hero-background"
          className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-blue-600/30 shadow-sm space-y-6 scroll-mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#0B2238]">
                    Homepage Hero Background Image
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 rounded-md">
                    Featured
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Change the main full-bleed backdrop photo on the public website homepage hero section.
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isSaving}
              size="sm"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Publish Background</span>
            </Button>
          </div>

          {/* Interactive Live Hero Backdrop Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Hero Backdrop Preview</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                {currentBg}
              </span>
            </div>

            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              {/* Background Photo */}
              <Image
                src={currentBg}
                alt="Homepage Hero Background Preview"
                fill
                className="object-cover object-center"
              />

              {/* Cinematic Overlays matching HeroSection.tsx */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071726]/98 via-[#0B2238]/90 to-[#0B2238]/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B2238]/70 via-transparent to-[#071726]/95" />

              {/* Preview Content Mirroring the Hero */}
              <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 backdrop-blur-md">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
                      Live Homepage Hero Preview
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    Aspect Ratio: 16:9 Full Bleed
                  </span>
                </div>

                <div className="max-w-md">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Madeena Welfare Society
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">
                      Bhatkal
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Empowering Community, Elevating Sports, Inspiring Youth Since 1993.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-[#0B2238]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30 w-fit">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Text readability & contrast guaranteed by dark navy mask overlay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Option A: Pick From Curated Club Photo Presets */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>1-Click Presets: Authentic Club Photographs</span>
              </label>
              <span className="text-[11px] text-slate-500">Click any card to select</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HERO_BG_PRESETS.map((preset) => {
                const isSelected = currentBg === preset.src;
                return (
                  <button
                    key={preset.src}
                    type="button"
                    onClick={() => handleSetHeroBg(preset.src)}
                    className={`relative p-2 rounded-xl border text-start transition-all cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-sm"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="relative aspect-16/10 w-full rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <Image
                        src={preset.src}
                        alt={preset.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-xs flex items-center justify-center">
                          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        </div>
                      )}
                      <span className="absolute top-1.5 start-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase rounded">
                        {preset.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700">
                        {preset.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {preset.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Option B: Upload New Custom Background Photo */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800">
              Or Upload a New Custom Photo From Your Device
            </label>
            <FileUploadDropzone
              multiple={false}
              compact={true}
              label="Click or drag a high-resolution photo to upload as hero background"
              sublabel="JPG, PNG, WebP (Landscape recommended, e.g. 1920x1080)"
              onUploadComplete={handleUploadBgComplete}
            />
          </div>

          {/* Option C: Direct Image URL or Path */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800">
              Direct Image Path / URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customBgInput}
                onChange={(e) => setCustomBgInput(e.target.value)}
                placeholder="/images/... or https://..."
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSetHeroBg(customBgInput)}
                className="text-xs font-bold"
              >
                Apply URL
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSetHeroBg(DEFAULT_HERO_IMAGE)}
                title="Reset to default Cosmos Trophy Champions photo"
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Section 1: Club Identity */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-[#0B2238]">Organization Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Official Society Name
              </label>
              <input
                type="text"
                value={settings.clubName}
                onChange={(e) => handleInputChange("clubName", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Established Year
              </label>
              <input
                type="text"
                value={settings.establishedYear}
                onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Society Registration Number
              </label>
              <input
                type="text"
                value={settings.registrationNumber}
                onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Motto / Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Section 2: Contact & Address */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-[#0B2238]">Contact & Location</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Primary Email Address</span>
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Primary Phone / Office</span>
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Street Address / Colony
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pincode</label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#047857]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Section 3: Official Social Channels */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-[#0B2238]">Official Social Channels</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Facebook Page URL</span>
              </label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                <span>YouTube Channel URL</span>
              </label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => handleInputChange("youtubeUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Helpline Number</span>
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Section 4: Public Announcement Strip */}
        {/* ========================================================================= */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-[#0B2238]">Public Announcement Strip</h2>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementActive}
                onChange={(e) => handleInputChange("announcementActive", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#047857]"></div>
              <span className="ms-2 text-xs font-semibold text-slate-600">
                {settings.announcementActive ? "Active" : "Disabled"}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Notice Text
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => handleInputChange("announcementText", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Destination Link URL
              </label>
              <input
                type="text"
                value={settings.announcementLink}
                onChange={(e) => handleInputChange("announcementLink", e.target.value)}
                placeholder="/sports or /news/..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSaving} size="lg" className="flex items-center gap-2 font-bold">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving All Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
