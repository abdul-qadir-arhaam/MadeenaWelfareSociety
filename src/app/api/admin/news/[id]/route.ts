import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNewsById, updateNews, deleteNews, togglePublishStatus } from "@/lib/data/newsRepository";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = getNewsById(id);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ article });
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

    if (body.action === "toggle-publish") {
      const updated = togglePublishStatus(id);
      if (!updated) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }

      try {
        revalidatePath("/");
        revalidatePath("/news");
        revalidatePath(`/news/${updated.slug}`);
        revalidatePath("/category", "layout");
        revalidatePath("/search");
        revalidatePath("/admin/news");
        revalidatePath("/sitemap.xml");
      } catch (e) {
        console.error("revalidatePath error:", e);
      }

      return NextResponse.json({ success: true, article: updated });
    }

    const updated = updateNews(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
      revalidatePath("/news");
      revalidatePath(`/news/${updated.slug}`);
      revalidatePath("/category", "layout");
      revalidatePath("/search");
      revalidatePath("/admin/news");
      revalidatePath("/sitemap.xml");
    } catch (e) {
      console.error("revalidatePath error:", e);
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating article";
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
  const success = deleteNews(id);

  if (!success) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  // Bust cache across the entire application
  try {
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/category", "layout");
    revalidatePath("/search");
    revalidatePath("/admin/news");
    revalidatePath("/sitemap.xml");
  } catch (e) {
    console.error("revalidatePath error:", e);
  }

  return NextResponse.json({ success: true, message: "Article deleted successfully" });
}
