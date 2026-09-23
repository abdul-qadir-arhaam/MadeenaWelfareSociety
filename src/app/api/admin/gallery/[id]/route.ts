import { NextResponse } from "next/server";
import {
  getGalleryAlbumById,
  updateGalleryAlbum,
  deleteGalleryAlbum,
} from "@/lib/data/galleryRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const album = getGalleryAlbumById(id);

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json({ album });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const updated = updateGalleryAlbum(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, album: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating album";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const success = deleteGalleryAlbum(id);

  if (!success) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Album deleted successfully" });
}
