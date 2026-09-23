"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GalleryPhoto } from "@/lib/data/galleryData";

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function Lightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: LightboxProps) {
  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0); // loop back
    }
  }, [currentIndex, photos.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(photos.length - 1); // loop back to end
    }
  }, [currentIndex, photos.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between text-white z-10 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/15">
            Photo {currentIndex + 1} of {photos.length}
          </span>
          <span className="text-xs text-slate-300 hidden sm:inline-block">
            {currentPhoto.date}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area with Prev / Next Buttons */}
      <div
        className="relative flex-1 flex items-center justify-center my-2 max-h-[72vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute start-2 sm:start-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>
        )}

        {/* The Photo */}
        <div className="relative w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.title}
            fill
            className="object-contain rounded-lg shadow-2xl"
            priority
          />
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute end-2 sm:end-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>
        )}
      </div>

      {/* Caption & Thumbnail Strip */}
      <div
        className="flex flex-col items-center gap-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Caption */}
        <div className="text-center max-w-2xl px-4">
          <h4 className="text-white text-sm sm:text-base font-bold">
            {currentPhoto.title}
          </h4>
          {currentPhoto.caption && (
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5 line-clamp-2">
              {currentPhoto.caption}
            </p>
          )}
        </div>

        {/* Thumbnails Navigation Strip */}
        {photos.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 scrollbar-none">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? "border-emerald-500 scale-105 opacity-100 shadow-md"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={p.src} alt={p.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
