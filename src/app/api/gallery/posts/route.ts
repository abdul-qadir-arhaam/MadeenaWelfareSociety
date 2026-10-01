import { NextResponse } from "next/server";
import { getGalleryPosts } from "@/lib/data/galleryRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const albumSlug = searchParams.get("album") || "all";
  const search = searchParams.get("search") || "";

  // Public endpoint only returns published posts
  const posts = getGalleryPosts({
    status: "published",
    category,
    albumSlug,
    search,
  });

  return NextResponse.json({ posts });
}
