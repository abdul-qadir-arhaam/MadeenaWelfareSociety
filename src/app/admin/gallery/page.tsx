"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  Camera,
  FolderPlus,
  FolderInput,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ManagedGalleryAlbum, GalleryPost } from "@/lib/data/galleryRepository";

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "albums">("posts");
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [albums, setAlbums] = useState<ManagedGalleryAlbum[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Deletion modals state
  const [deleteTargetPost, setDeleteTargetPost] = useState<GalleryPost | null>(null);
  const [deleteTargetAlbum, setDeleteTargetAlbum] = useState<ManagedGalleryAlbum | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [albumsRes, postsRes] = await Promise.all([
        fetch("/api/admin/gallery"),
        fetch("/api/admin/gallery/posts"),
      ]);
      const albumsData = await albumsRes.json();
      const postsData = await postsRes.json();

      if (albumsData.albums) {
        setAlbums(albumsData.albums);
      }
      if (postsData.posts) {
        setPosts(postsData.posts);
      }

      // Collect categories
      const allCats = new Set<string>();
      (albumsData.albums || []).forEach((a: ManagedGalleryAlbum) => allCats.add(a.category));
      (postsData.posts || []).forEach((p: GalleryPost) => allCats.add(p.category));
      setCategories(Array.from(allCats));
    } catch (err) {
      console.error("Failed to load gallery data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePostStatus = async (post: GalleryPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/gallery/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAlbumStatus = async (album: ManagedGalleryAlbum) => {
    const nextStatus = album.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/gallery/${album.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setAlbums((prev) =>
          prev.map((a) => (a.id === album.id ? { ...a, status: nextStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeletePost = async () => {
    if (!deleteTargetPost) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/posts/${deleteTargetPost.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteTargetPost.id));
        setDeleteTargetPost(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteAlbum = async () => {
    if (!deleteTargetAlbum) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTargetAlbum.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAlbums((prev) => prev.filter((a) => a.id !== deleteTargetAlbum.id));
        setDeleteTargetAlbum(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      (p.caption && p.caption.toLowerCase().includes(q)) ||
      (p.albumTitle && p.albumTitle.toLowerCase().includes(q));
    return matchesCat && matchesStatus && matchesSearch;
  });

  const filteredAlbums = albums.filter((alb) => {
    const matchesCat = selectedCategory === "all" || alb.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || alb.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      alb.title.toLowerCase().includes(q) ||
      alb.description.toLowerCase().includes(q);
    return matchesCat && matchesStatus && matchesSearch;
  });

  const totalPhotosCount = albums.reduce((acc, a) => acc + (a.photos?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B2238]">Photo Gallery & Posts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create photo posts, organize into albums, and manage society media archives.
          </p>
        </div>

        {/* Action Buttons: Create Post (Primary) & Create Album */}
        <div className="flex items-center gap-2.5">
          <Link href="/admin/gallery/create">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs">
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Create Album</span>
            </Button>
          </Link>

          <Link href="/admin/gallery/post/create">
            <Button
              size="sm"
              className="flex items-center gap-2 bg-[#047857] hover:bg-[#036449] text-white shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Create Post / Add Photos</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Posts
          </span>
          <span className="text-2xl font-extrabold text-[#0B2238] mt-1 block">
            {posts.length}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Photos
          </span>
          <span className="text-2xl font-extrabold text-[#047857] mt-1 block">
            {totalPhotosCount}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Albums
          </span>
          <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
            {albums.length}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Published
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
            {posts.filter((p) => p.status === "published").length}
          </span>
        </div>
      </div>

      {/* View Switcher Tabs & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Main Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "posts"
                  ? "bg-[#047857] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Gallery Posts ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("albums")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "albums"
                  ? "bg-[#047857] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Albums ({albums.length})</span>
            </button>
          </div>

          <div className="text-xs text-slate-500">
            {activeTab === "posts" ? (
              <span>Showing {filteredPosts.length} post stories</span>
            ) : (
              <span>Showing {filteredAlbums.length} albums</span>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
            <input
              type="text"
              placeholder={
                activeTab === "posts"
                  ? "Search posts by title, caption, album..."
                  : "Search albums by title, description..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: GALLERY POSTS                                           */}
      {/* ============================================================== */}
      {activeTab === "posts" && (
        <div>
          {isLoading ? (
            <div className="py-20 text-center text-slate-400 text-sm">
              Loading gallery posts...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-slate-700">No posts found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Create your first gallery post to showcase photos without needing a new album!
              </p>
              <Link href="/admin/gallery/post/create" className="inline-block mt-4">
                <Button size="sm" className="bg-[#047857] text-white">
                  Create Post Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Cover / Photo */}
                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden group">
                      <Image
                        src={post.coverImage || "/images/real/15aug.jpeg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Photo Count Pill */}
                      <div className="absolute bottom-2.5 start-2.5 px-2 py-0.5 bg-[#0B2238]/85 backdrop-blur-md text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>{post.photos?.length || 1} Photo</span>
                      </div>

                      {/* Status Toggle */}
                      <button
                        onClick={() => handleTogglePostStatus(post)}
                        className="absolute top-2.5 end-2.5 cursor-pointer"
                        title="Click to toggle status"
                      >
                        {post.status === "published" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Draft</span>
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{post.date}</span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0B2238] line-clamp-1">
                        {post.title}
                      </h3>

                      {post.caption && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {post.caption}
                        </p>
                      )}

                      {/* Attached Album Badge */}
                      <div className="pt-2">
                        {post.albumTitle ? (
                          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 truncate max-w-full">
                            <FolderInput className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">Album: {post.albumTitle}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            <span>Standalone Post</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/gallery"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#047857]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in Gallery</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeleteTargetPost(post)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: ALBUMS & COLLECTIONS                                    */}
      {/* ============================================================== */}
      {activeTab === "albums" && (
        <div>
          {isLoading ? (
            <div className="py-20 text-center text-slate-400 text-sm">
              Loading gallery albums...
            </div>
          ) : filteredAlbums.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-slate-700">No albums found</h3>
              <p className="text-xs text-slate-500 mt-1">Try refining your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden group">
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className={
                          album.containCover
                            ? "object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            : "object-cover group-hover:scale-105 transition-transform duration-300"
                        }
                      />
                      {/* Photo Count Badge */}
                      <div className="absolute bottom-2.5 start-2.5 px-2.5 py-1 bg-[#0B2238]/85 backdrop-blur-md text-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{album.photos?.length || 0} Photos</span>
                      </div>

                      {/* Status Badge */}
                      <button
                        onClick={() => handleToggleAlbumStatus(album)}
                        className="absolute top-2.5 end-2.5 cursor-pointer"
                        title="Click to toggle status"
                      >
                        {album.status === "published" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Draft</span>
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Album Info */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {album.category}
                        </span>
                        <span>{album.date}</span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0B2238] line-clamp-1">
                        {album.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                    </div>
                  </div>

                  {/* Album Quick Actions */}
                  <div className="p-4 pt-2 border-t border-slate-100 flex flex-col gap-2">
                    {/* Quick Button: Add Photos to this Album */}
                    <Link
                      href={`/admin/gallery/post/create?albumId=${album.id}`}
                      className="w-full py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#047857] text-xs font-bold rounded-lg border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Photos / Post to this Album</span>
                    </Link>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/gallery/${album.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#047857]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Album</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/gallery/${album.id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-[#047857] rounded-md hover:bg-slate-100 transition-colors"
                          title="Edit Album"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTargetAlbum(album)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete Album"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Post Modal */}
      {deleteTargetPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#0B2238]">Delete Gallery Post</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete post &ldquo;{deleteTargetPost.title}&rdquo;?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteTargetPost(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDeletePost}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Album Modal */}
      {deleteTargetAlbum && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#0B2238]">Delete Album</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete album &ldquo;{deleteTargetAlbum.title}&rdquo;? Photos attached to this album will remain in the posts archive.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteTargetAlbum(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDeleteAlbum}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
