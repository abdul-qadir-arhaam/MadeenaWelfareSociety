import { NextResponse } from "next/server";
import { getGalleryPosts, createGalleryPost } from "@/lib/data/galleryRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const albumSlug = searchParams.get("album") || "all";
  const albumId = searchParams.get("albumId") || "all";
  const search = searchParams.get("search") || "";

  const posts = getGalleryPosts({
    status,
    category,
    albumSlug,
    albumId,
    search,
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: "Post title is required." },
        { status: 400 }
      );
    }

    const { post, album } = createGalleryPost({
      title: body.title.trim(),
      caption: body.caption || "",
      content: body.content || body.caption || "",
      category: body.category || "General",
      date: body.date || "",
      coverImage: body.coverImage || "",
      photos: body.photos || [],
      albumOption: body.albumOption || (body.albumId ? "existing" : "none"),
      albumId: body.albumId,
      albumSlug: body.albumSlug,
      newAlbumTitle: body.newAlbumTitle,
      newAlbumCategory: body.newAlbumCategory,
      newAlbumDescription: body.newAlbumDescription,
      status: body.status || "published",
      isFeatured: !!body.isFeatured,
      tags: body.tags || [],
      translations: body.translations,
    });

    return NextResponse.json({
      success: true,
      post,
      album,
      message: album
        ? body.albumOption === "new"
          ? `Created post and new album "${album.title}"`
          : `Added post and photo(s) to album "${album.title}"`
        : "Created standalone gallery post",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating gallery post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
