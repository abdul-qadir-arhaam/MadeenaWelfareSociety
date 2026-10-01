"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ZoomIn,
  Images,
  ArrowRight,
  Search,
  Filter,
  Grid,
  Layers,
  Heart,
  Share2,
  Calendar,
  FolderInput,
  Camera,
  Check,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  GALLERY_ALBUMS,
  INITIAL_GALLERY_POSTS,
  GalleryAlbum,
  GalleryPost,
  GalleryPhoto,
} from "@/lib/data/galleryData";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function GalleryPage() {
  const { t } = useLanguage();

  // View mode: "posts" (default) or "albums"
  const [viewMode, setViewMode] = useState<"posts" | "albums">("posts");

  // Data states initialized with static fallback, then refreshed from API
  const [posts, setPosts] = useState<GalleryPost[]>(INITIAL_GALLERY_POSTS);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(GALLERY_ALBUMS);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAlbumFilter, setSelectedAlbumFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive likes state (stored in session/local state)
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lightbox modal state
  const [lightboxPhotos, setLightboxPhotos] = useState<GalleryPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fetch latest data from APIs
  useEffect(() => {
    async function loadData() {
      try {
        const [postsRes, albumsRes] = await Promise.all([
          fetch("/api/gallery/posts"),
          fetch("/api/gallery/albums"),
        ]);
        if (postsRes.ok) {
          const pData = await postsRes.json();
          if (pData.posts && pData.posts.length > 0) {
            setPosts(pData.posts);
          }
        }
        if (albumsRes.ok) {
          const aData = await albumsRes.json();
          if (aData.albums && aData.albums.length > 0) {
            setAlbums(aData.albums);
          }
        }
      } catch (err) {
        console.warn("Using fallback gallery data:", err);
      }
    }
    loadData();
  }, []);

  // Compute categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    albums.forEach((a) => {
      if (a.category) cats.add(a.category);
    });
    return Array.from(cats);
  }, [posts, albums]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === "all" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesAlbum =
        selectedAlbumFilter === "all" ||
        post.albumSlug === selectedAlbumFilter ||
        post.albumId === selectedAlbumFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        (post.caption && post.caption.toLowerCase().includes(q)) ||
        (post.albumTitle && post.albumTitle.toLowerCase().includes(q));
      return matchesCat && matchesAlbum && matchesSearch;
    });
  }, [posts, selectedCategory, selectedAlbumFilter, searchQuery]);

  // Filtered albums
  const filteredAlbums = useMemo(() => {
    return albums.filter((alb) => {
      const matchesCat =
        selectedCategory === "all" ||
        alb.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        alb.title.toLowerCase().includes(q) ||
        alb.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [albums, selectedCategory, searchQuery]);

  // Open Lightbox for a specific post
  const handleOpenPostLightbox = (post: GalleryPost, photoIndex = 0) => {
    const photosToDisplay =
      post.photos && post.photos.length > 0
        ? post.photos
        : [
            {
              id: post.id,
              src: post.coverImage,
              title: post.title,
              caption: post.caption,
              date: post.date,
            },
          ];
    setLightboxPhotos(photosToDisplay);
    setLightboxIndex(photoIndex);
    setIsLightboxOpen(true);
  };

  // Open Lightbox for an album
  const handleOpenAlbumLightbox = (album: GalleryAlbum, index = 0) => {
    setLightboxPhotos(album.photos);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Toggle Like
  const handleToggleLike = (postId: string, initialLikes = 0) => {
    setLikedPosts((prev) => {
      const wasLiked = !!prev[postId];
      const nextLiked = !wasLiked;

      setLikesCount((prevCount) => {
        const current = prevCount[postId] ?? initialLikes;
        return {
          ...prevCount,
          [postId]: nextLiked ? current + 1 : Math.max(0, current - 1),
        };
      });

      return { ...prev, [postId]: nextLiked };
    });
  };

  // Share post
  const handleShare = (post: GalleryPost) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.caption || post.title,
          url,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-200/80">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#047857] text-xs font-extrabold uppercase tracking-wider rounded-full border border-emerald-100 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>MWS Visual Archive & Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] tracking-tight">
            Moments, Memories & Photo Stories
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse authentic photo stories, youth sports championships, community welfare drives, and historic moments from Madeena Welfare Society Bhatkal.
          </p>
        </div>

        {/* View Switcher: Posts Feed vs Albums */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto flex-shrink-0">
          <button
            onClick={() => setViewMode("posts")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              viewMode === "posts"
                ? "bg-white text-[#047857] shadow-xs"
                : "text-slate-600 hover:text-[#0B2238]"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Posts ({posts.length})</span>
          </button>

          <button
            onClick={() => setViewMode("albums")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              viewMode === "albums"
                ? "bg-white text-[#047857] shadow-xs"
                : "text-slate-600 hover:text-[#0B2238]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Albums ({albums.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedAlbumFilter("all");
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex-shrink-0 ${
                selectedCategory === "all" && selectedAlbumFilter === "all"
                  ? "bg-[#047857] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#047857] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
            <input
              type="text"
              placeholder={
                viewMode === "posts" ? "Search photo posts..." : "Search albums..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          </div>
        </div>

        {/* Active album filter notice */}
        {selectedAlbumFilter !== "all" && (
          <div className="flex items-center justify-between bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-100 text-xs text-emerald-800">
            <div className="flex items-center gap-1.5">
              <FolderInput className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Filtering posts from album: <strong>{selectedAlbumFilter}</strong>
              </span>
            </div>
            <button
              onClick={() => setSelectedAlbumFilter("all")}
              className="text-[11px] font-bold underline hover:text-emerald-950"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/* 1. ALL POSTS VIEW (PRIMARY DEFAULT FEED)                         */}
      {/* ================================================================ */}
      {viewMode === "posts" && (
        <div>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No gallery posts found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting &ldquo;All Categories&rdquo; or clearing your search term.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedAlbumFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => {
                const isLiked = !!likedPosts[post.id];
                const currentLikes = likesCount[post.id] ?? post.likes ?? 0;
                const photoCount = post.photos?.length || 1;

                return (
                  <Card
                    key={post.id}
                    className="border-slate-200/90 hover:border-emerald-300 flex flex-col justify-between group overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-xl"
                  >
                    <div>
                      {/* Photo Container */}
                      <div
                        className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => handleOpenPostLightbox(post, 0)}
                      >
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            <ZoomIn className="w-4 h-4" />
                            <span>View Full Photo</span>
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-3 start-3 end-3 flex items-center justify-between pointer-events-none">
                          <Badge variant="event" className="shadow-xs backdrop-blur-md">
                            {post.category}
                          </Badge>

                          {photoCount > 1 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full shadow-xs">
                              <Images className="w-3 h-3 text-emerald-400" />
                              <span>{photoCount} Photos</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Date & Album info */}
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>

                          {post.albumTitle && (
                            <button
                              onClick={() => {
                                setSelectedAlbumFilter(post.albumSlug || post.albumId || "all");
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-100 truncate max-w-[160px] transition-colors"
                              title={`View all posts in ${post.albumTitle}`}
                            >
                              <FolderInput className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{post.albumTitle}</span>
                            </button>
                          )}
                        </div>

                        {/* Post Title */}
                        <h3
                          onClick={() => handleOpenPostLightbox(post, 0)}
                          className="text-base font-bold text-[#0B2238] group-hover:text-[#047857] transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          {post.title}
                        </h3>

                        {/* Caption */}
                        {post.caption && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {post.caption}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      {/* Zoom Button */}
                      <button
                        onClick={() => handleOpenPostLightbox(post, 0)}
                        className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>View Slideshow</span>
                      </button>

                      {/* Like & Share */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleLike(post.id, post.likes || 15)}
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-all ${
                            isLiked
                              ? "text-red-600 bg-red-50"
                              : "text-slate-500 hover:text-red-500 hover:bg-slate-100"
                          }`}
                          title="Like this photo post"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span>{currentLikes}</span>
                        </button>

                        <button
                          onClick={() => handleShare(post)}
                          className="p-1.5 text-slate-400 hover:text-[#047857] hover:bg-slate-100 rounded-md transition-colors"
                          title="Share post"
                        >
                          {copiedId === post.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* 2. ALBUMS VIEW (CURATED COLLECTIONS)                             */}
      {/* ================================================================ */}
      {viewMode === "albums" && (
        <div>
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No albums found</h3>
              <p className="text-xs text-slate-500 mt-1">Try refining your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredAlbums.map((album) => (
                <Card
                  key={album.slug}
                  className="border-slate-200/90 hover:border-emerald-300 flex flex-col justify-between group overflow-hidden shadow-2xs hover:shadow-xl transition-all"
                >
                  <div>
                    {/* Cover Photo */}
                    <div
                      className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                      onClick={() => handleOpenAlbumLightbox(album, 0)}
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
                        onClick={() => handleOpenAlbumLightbox(album, 0)}
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
                      onClick={() => {
                        setSelectedAlbumFilter(album.slug);
                        setViewMode("posts");
                      }}
                      className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>View Posts Feed</span>
                    </button>

                    <Link
                      href={`/gallery/${album.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#047857]"
                    >
                      <span>Album Detail</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Lightbox Modal */}
      {isLightboxOpen && lightboxPhotos.length > 0 && (
        <Lightbox
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
