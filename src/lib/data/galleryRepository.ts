import fs from "fs";
import path from "path";
import { GALLERY_ALBUMS, GalleryAlbum, GalleryPhoto, GalleryPost } from "./galleryData";

export interface ManagedGalleryAlbum extends GalleryAlbum {
  id: string;
  status: "published" | "draft";
  isFeatured?: boolean;
  translations?: {
    en?: { title: string; description: string };
    kn?: { title: string; description: string };
    ur?: { title: string; description: string };
  };
}

export type { GalleryPost, GalleryPhoto, GalleryAlbum };

export interface CreateGalleryPostInput {
  title: string;
  caption?: string;
  content?: string;
  category?: string;
  date?: string;
  coverImage?: string;
  photos?: GalleryPhoto[];
  albumOption?: "existing" | "new" | "none";
  albumId?: string;
  albumSlug?: string;
  newAlbumTitle?: string;
  newAlbumCategory?: string;
  newAlbumDescription?: string;
  status?: "published" | "draft";
  isFeatured?: boolean;
  tags?: string[];
  translations?: {
    en?: { title: string; caption?: string };
    kn?: { title: string; caption?: string };
    ur?: { title: string; caption?: string };
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

interface GalleryStoreData {
  albums: ManagedGalleryAlbum[];
  posts: GalleryPost[];
}

function generateInitialStore(): GalleryStoreData {
  const albums: ManagedGalleryAlbum[] = GALLERY_ALBUMS.map((alb, idx) => ({
    ...alb,
    id: `album-${idx + 1}`,
    status: "published",
    isFeatured: idx < 2,
    translations: {
      en: { title: alb.title, description: alb.description },
      kn: { title: alb.title, description: alb.description },
      ur: { title: alb.title, description: alb.description },
    },
  }));

  const posts: GalleryPost[] = [];
  albums.forEach((album, aIdx) => {
    (album.photos || []).forEach((photo, pIdx) => {
      posts.push({
        id: `post-${photo.id}`,
        slug: `post-${photo.id}`,
        title: photo.title || `${album.title} - Photo ${pIdx + 1}`,
        caption: photo.caption || "",
        content: photo.caption || "",
        category: album.category || "General",
        date: photo.date || album.date,
        coverImage: photo.src,
        photos: [photo],
        albumId: album.id,
        albumSlug: album.slug,
        albumTitle: album.title,
        status: "published",
        isFeatured: aIdx === 0 && pIdx < 3,
        likes: 12 + ((aIdx * 7 + pIdx * 5) % 43),
        tags: [album.category, "MWS", "Bhatkal"],
        createdAt: new Date(Date.now() - (aIdx * 86400000 * 5 + pIdx * 3600000 * 4)).toISOString(),
        translations: {
          en: { title: photo.title, caption: photo.caption },
        },
      });
    });
  });

  return { albums, posts };
}

let memoryStore: GalleryStoreData | null = null;

function loadStore(): GalleryStoreData {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const raw = fs.readFileSync(GALLERY_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.albums) && Array.isArray(parsed.posts)) {
        memoryStore = parsed;
        return memoryStore!;
      }
    }
  } catch (err) {
    console.warn("[galleryRepository] Failed to read gallery.json:", err);
  }

  const initial = generateInitialStore();
  memoryStore = initial;
  saveStore(initial);
  return memoryStore;
}

function saveStore(data: GalleryStoreData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[galleryRepository] Failed to write gallery.json:", err);
  }
}

// -------------------------------------------------------------
// POSTS REPOSITORY METHODS
// -------------------------------------------------------------

export function getGalleryPosts(filter?: {
  status?: string;
  category?: string;
  albumSlug?: string;
  albumId?: string;
  search?: string;
}): GalleryPost[] {
  const store = loadStore();
  let list = [...store.posts];

  if (filter?.status && filter.status !== "all") {
    list = list.filter((p) => p.status === filter.status);
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.albumSlug && filter.albumSlug !== "all") {
    list = list.filter((p) => p.albumSlug === filter.albumSlug);
  }

  if (filter?.albumId && filter.albumId !== "all") {
    list = list.filter((p) => p.albumId === filter.albumId);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.caption && p.caption.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.albumTitle && p.albumTitle.toLowerCase().includes(q))
    );
  }

  return list;
}

export function getGalleryPostById(id: string): GalleryPost | undefined {
  const store = loadStore();
  return store.posts.find((p) => p.id === id);
}

export function getGalleryPostBySlug(slug: string): GalleryPost | undefined {
  const store = loadStore();
  return store.posts.find((p) => p.slug === slug);
}

export function createGalleryPost(input: CreateGalleryPostInput): {
  post: GalleryPost;
  album?: ManagedGalleryAlbum;
} {
  const store = loadStore();
  const dateStr =
    input.date ||
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const postId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const slug =
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || postId;

  // Prepare photos
  const rawPhotos = input.photos || [];
  const photos: GalleryPhoto[] =
    rawPhotos.length > 0
      ? rawPhotos
      : input.coverImage
      ? [
          {
            id: `photo-${Date.now()}`,
            src: input.coverImage,
            title: input.title,
            caption: input.caption || "",
            date: dateStr,
          },
        ]
      : [];

  const cover = input.coverImage || (photos.length > 0 ? photos[0].src : "/images/real/15aug.jpeg");

  let attachedAlbumId: string | undefined = undefined;
  let attachedAlbumSlug: string | undefined = undefined;
  let attachedAlbumTitle: string | undefined = undefined;
  let targetAlbum: ManagedGalleryAlbum | undefined = undefined;

  // 1. New Album requested
  if (input.albumOption === "new" && input.newAlbumTitle?.trim()) {
    const newAlbumSlug =
      input.newAlbumTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `album-${Date.now()}`;

    const newAlbum: ManagedGalleryAlbum = {
      id: `album-${Date.now()}`,
      slug: newAlbumSlug,
      title: input.newAlbumTitle.trim(),
      category: input.newAlbumCategory || input.category || "General",
      date: dateStr,
      coverImage: cover,
      description: input.newAlbumDescription || input.caption || "",
      status: input.status || "published",
      isFeatured: false,
      photos: photos,
      translations: {
        en: { title: input.newAlbumTitle.trim(), description: input.newAlbumDescription || "" },
      },
    };

    store.albums.unshift(newAlbum);
    targetAlbum = newAlbum;
    attachedAlbumId = newAlbum.id;
    attachedAlbumSlug = newAlbum.slug;
    attachedAlbumTitle = newAlbum.title;
  }
  // 2. Existing Album requested
  else if (input.albumOption === "existing" && (input.albumId || input.albumSlug)) {
    const existing = store.albums.find(
      (a) => a.id === input.albumId || a.slug === input.albumSlug
    );
    if (existing) {
      targetAlbum = existing;
      attachedAlbumId = existing.id;
      attachedAlbumSlug = existing.slug;
      attachedAlbumTitle = existing.title;

      // Add photos to this existing album if not already present
      photos.forEach((newP) => {
        if (!existing.photos.some((p) => p.src === newP.src)) {
          existing.photos.push(newP);
        }
      });
    }
  }

  const newPost: GalleryPost = {
    id: postId,
    slug,
    title: input.title,
    caption: input.caption || "",
    content: input.content || input.caption || "",
    category: input.category || targetAlbum?.category || "General",
    date: dateStr,
    coverImage: cover,
    photos,
    albumId: attachedAlbumId,
    albumSlug: attachedAlbumSlug,
    albumTitle: attachedAlbumTitle,
    status: input.status || "published",
    isFeatured: !!input.isFeatured,
    likes: 0,
    tags: input.tags || [input.category || "General"],
    createdAt: new Date().toISOString(),
    translations: input.translations || {
      en: { title: input.title, caption: input.caption },
    },
  };

  store.posts.unshift(newPost);
  saveStore(store);

  return { post: newPost, album: targetAlbum };
}

export function updateGalleryPost(
  id: string,
  updates: Partial<GalleryPost>
): GalleryPost | null {
  const store = loadStore();
  const idx = store.posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  store.posts[idx] = {
    ...store.posts[idx],
    ...updates,
  };

  saveStore(store);
  return store.posts[idx];
}

export function deleteGalleryPost(id: string): boolean {
  const store = loadStore();
  const prevLen = store.posts.length;
  store.posts = store.posts.filter((p) => p.id !== id);
  const deleted = store.posts.length < prevLen;
  if (deleted) saveStore(store);
  return deleted;
}

// -------------------------------------------------------------
// ALBUMS REPOSITORY METHODS
// -------------------------------------------------------------

export function getGalleryAlbums(filter?: {
  status?: string;
  category?: string;
  search?: string;
}): ManagedGalleryAlbum[] {
  const store = loadStore();
  let list = [...store.albums];

  if (filter?.status && filter.status !== "all") {
    list = list.filter((a) => a.status === filter.status);
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((a) => a.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getGalleryAlbumById(id: string): ManagedGalleryAlbum | undefined {
  const store = loadStore();
  return store.albums.find((a) => a.id === id);
}

export function getGalleryAlbumBySlug(slug: string): ManagedGalleryAlbum | undefined {
  const store = loadStore();
  return store.albums.find((a) => a.slug === slug);
}

export function createGalleryAlbum(
  data: Omit<ManagedGalleryAlbum, "id">
): ManagedGalleryAlbum {
  const store = loadStore();
  const newAlbum: ManagedGalleryAlbum = {
    ...data,
    id: `album-${Date.now()}`,
    photos: data.photos || [],
  };

  store.albums.unshift(newAlbum);
  saveStore(store);
  return newAlbum;
}

export function updateGalleryAlbum(
  id: string,
  updates: Partial<ManagedGalleryAlbum>
): ManagedGalleryAlbum | null {
  const store = loadStore();
  const index = store.albums.findIndex((a) => a.id === id);
  if (index === -1) return null;

  store.albums[index] = {
    ...store.albums[index],
    ...updates,
  };

  // Sync albumTitle and albumSlug on associated posts
  if (updates.title || updates.slug) {
    store.posts.forEach((p) => {
      if (p.albumId === id) {
        if (updates.title) p.albumTitle = updates.title;
        if (updates.slug) p.albumSlug = updates.slug;
      }
    });
  }

  saveStore(store);
  return store.albums[index];
}

export function deleteGalleryAlbum(id: string): boolean {
  const store = loadStore();
  const prevLen = store.albums.length;
  store.albums = store.albums.filter((a) => a.id !== id);
  const deleted = store.albums.length < prevLen;
  if (deleted) {
    // Unlink posts attached to this album instead of deleting them
    store.posts.forEach((p) => {
      if (p.albumId === id) {
        p.albumId = undefined;
        p.albumSlug = undefined;
        p.albumTitle = undefined;
      }
    });
    saveStore(store);
  }
  return deleted;
}

export function addPhotosToAlbum(
  albumId: string,
  newPhotos: GalleryPhoto[]
): ManagedGalleryAlbum | null {
  const store = loadStore();
  const album = store.albums.find((a) => a.id === albumId);
  if (!album) return null;

  album.photos = [...album.photos, ...newPhotos];
  saveStore(store);
  return album;
}

export function removePhotoFromAlbum(
  albumId: string,
  photoId: string
): ManagedGalleryAlbum | null {
  const store = loadStore();
  const album = store.albums.find((a) => a.id === albumId);
  if (!album) return null;

  album.photos = album.photos.filter((p) => p.id !== photoId);
  saveStore(store);
  return album;
}
