"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Images, ZoomIn } from "lucide-react";
import { GALLERY_ALBUMS } from "@/lib/data/galleryData";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function AlbumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const album = GALLERY_ALBUMS.find((a) => a.slug === slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!album) {
    notFound();
  }

  const handleOpenPhoto = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#047857] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>Back to All Albums</span>
        </Link>
      </div>

      {/* Album Header */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge variant="event">{album.category}</Badge>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{album.date}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#047857] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            <Images className="w-3.5 h-3.5" />
            {album.photos.length} Photos in Album
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2238] tracking-tight">
          {album.title}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {album.description}
        </p>
      </div>

      {/* Photo Grid displaying all photos in the album */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {album.photos.map((photo, index) => (
          <Card
            key={photo.id}
            className="border-slate-200 hover:border-emerald-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
            onClick={() => handleOpenPhoto(index)}
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-3 bg-black/60 rounded-full">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-[#0B2238] group-hover:text-[#047857] transition-colors leading-snug">
                  {photo.title}
                </h3>
                {photo.caption && (
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 pt-0 text-[11px] text-slate-400 font-medium">
              Photo {index + 1} of {album.photos.length}
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox for browsing through all album photos */}
      <Lightbox
        photos={album.photos}
        currentIndex={photoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(newIdx) => setPhotoIndex(newIdx)}
      />
    </div>
  );
}
