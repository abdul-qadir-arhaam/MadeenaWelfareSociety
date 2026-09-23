"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, Images, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GALLERY_ALBUMS, GalleryAlbum } from "@/lib/data/galleryData";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const handleOpenAlbum = (album: GalleryAlbum, index = 0) => {
    setActiveAlbum(album);
    setPhotoIndex(index);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Photo Albums & Archives
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3">
          {t.gallery.sectionTitle}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Explore complete photo albums and documented memories from our community welfare drives, sports championships, and celebrations.
        </p>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {GALLERY_ALBUMS.map((album) => (
          <Card
            key={album.slug}
            className="border-slate-200/80 hover:border-emerald-300 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Cover Photo */}
              <div
                className="relative aspect-4/3 overflow-hidden bg-slate-50 cursor-pointer"
                onClick={() => handleOpenAlbum(album, 0)}
              >
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className={
                    album.containCover
                      ? "object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      : "object-cover group-hover:scale-105 transition-transform duration-500"
                  }
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium text-sm">
                  <ZoomIn className="w-5 h-5" />
                  <span>View Photos ({album.photos.length})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="event">{album.category}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    <Images className="w-3.5 h-3.5" />
                    {album.photos.length} Photos
                  </span>
                </div>

                <h3
                  onClick={() => handleOpenAlbum(album, 0)}
                  className="text-base sm:text-lg font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors cursor-pointer leading-snug line-clamp-1"
                >
                  {album.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {album.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
              <button
                onClick={() => handleOpenAlbum(album, 0)}
                className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Open Slideshow</span>
              </button>

              <Link
                href={`/gallery/${album.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#047857]"
              >
                <span>All {album.photos.length} Photos</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeAlbum && (
        <Lightbox
          photos={activeAlbum.photos}
          currentIndex={photoIndex}
          isOpen={!!activeAlbum}
          onClose={() => setActiveAlbum(null)}
          onSelectIndex={(newIdx) => setPhotoIndex(newIdx)}
        />
      )}
    </div>
  );
}
