import { NextResponse } from "next/server";
import { getGalleryAlbums } from "@/lib/data/galleryRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  // Public endpoint returns published albums
  const albums = getGalleryAlbums({
    status: "published",
    category,
    search,
  });

  return NextResponse.json({ albums });
}
