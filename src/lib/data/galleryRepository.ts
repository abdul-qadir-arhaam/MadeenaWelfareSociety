import { GALLERY_ALBUMS, GalleryAlbum, GalleryPhoto } from "./galleryData";

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

let albumsStore: ManagedGalleryAlbum[] = GALLERY_ALBUMS.map((alb, idx) => ({
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

export function getGalleryAlbums(filter?: {
  status?: string;
  category?: string;
  search?: string;
}): ManagedGalleryAlbum[] {
  let list = [...albumsStore];

  if (filter?.status && filter.status !== "all") {
    list = list.filter((a) => a.status === filter.status);
  }

  if (filter?.category && filter.category !== "all") {
    list = list.filter((a) => a.category.toLowerCase() === filter.category?.toLowerCase());
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
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
  return albumsStore.find((a) => a.id === id);
}

export function getGalleryAlbumBySlug(slug: string): ManagedGalleryAlbum | undefined {
  return albumsStore.find((a) => a.slug === slug);
}

export function createGalleryAlbum(
  data: Omit<ManagedGalleryAlbum, "id">
): ManagedGalleryAlbum {
  const newAlbum: ManagedGalleryAlbum = {
    ...data,
    id: `album-${Date.now()}`,
    photos: data.photos || [],
  };

  albumsStore.unshift(newAlbum);
  return newAlbum;
}

export function updateGalleryAlbum(
  id: string,
  updates: Partial<ManagedGalleryAlbum>
): ManagedGalleryAlbum | null {
  const index = albumsStore.findIndex((a) => a.id === id);
  if (index === -1) return null;

  albumsStore[index] = {
    ...albumsStore[index],
    ...updates,
  };

  return albumsStore[index];
}

export function deleteGalleryAlbum(id: string): boolean {
  const prevLen = albumsStore.length;
  albumsStore = albumsStore.filter((a) => a.id !== id);
  return albumsStore.length < prevLen;
}

export function addPhotosToAlbum(
  albumId: string,
  newPhotos: GalleryPhoto[]
): ManagedGalleryAlbum | null {
  const album = getGalleryAlbumById(albumId);
  if (!album) return null;

  album.photos = [...album.photos, ...newPhotos];
  return album;
}

export function removePhotoFromAlbum(
  albumId: string,
  photoId: string
): ManagedGalleryAlbum | null {
  const album = getGalleryAlbumById(albumId);
  if (!album) return null;

  album.photos = album.photos.filter((p) => p.id !== photoId);
  return album;
}
