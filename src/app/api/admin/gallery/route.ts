import { NextResponse } from "next/server";
import { getGalleryAlbums, createGalleryAlbum } from "@/lib/data/galleryRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  const albums = getGalleryAlbums({ status, category, search });
  return NextResponse.json({ albums });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json({ error: "Album title is required" }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newAlbum = createGalleryAlbum({
      slug,
      title: body.title,
      category: body.category || "General",
      date: body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      coverImage: body.coverImage || "/images/real/15aug.jpeg",
      description: body.description || "",
      containCover: !!body.containCover,
      status: body.status || "published",
      isFeatured: !!body.isFeatured,
      photos: body.photos || [],
      translations: {
        en: {
          title: body.title,
          description: body.description || "",
        },
        kn: body.translations?.kn || {
          title: body.title,
          description: body.description || "",
        },
        ur: body.translations?.ur || {
          title: body.title,
          description: body.description || "",
        },
      },
    });

    return NextResponse.json({ success: true, album: newAlbum });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating album";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
