import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNewsList, createNews } from "@/lib/data/newsRepository";
import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  const news = await getNewsList({ status, category, search });
  return NextResponse.json({ news });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const title =
      body.title ||
      body.translations?.en?.title ||
      body.translations?.kn?.title ||
      body.translations?.ur?.title;

    if (!title || !String(title).trim()) {
      return NextResponse.json(
        { error: "Article title is required" },
        { status: 400 }
      );
    }

    const cleanTitle = String(title).trim();
    const rawSlug =
      body.slug ||
      cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const slug = rawSlug || `article-${Date.now()}`;

    const newArticle = await createNews({
      slug,
      categoryId: body.categoryId || "cat-1",
      categoryName: body.categoryName || "General",
      featuredImage: body.featuredImage || "/images/real/15aug.jpeg",
      author: body.author || "MWS Media Cell",
      publishedAt: body.publishedAt || new Date().toISOString().split("T")[0],
      status: body.status || "published",
      isFeatured: !!body.isFeatured,
      tags: Array.isArray(body.tags) ? body.tags : [],
      translations: {
        en: {
          language: "en",
          title: body.translations?.en?.title || cleanTitle,
          excerpt:
            body.excerpt ||
            body.translations?.en?.excerpt ||
            body.translations?.en?.summary ||
            "",
          content: body.content || body.translations?.en?.content || "",
          seoTitle: body.seoTitle || body.translations?.en?.seoTitle || cleanTitle,
          seoDescription:
            body.seoDescription ||
            body.translations?.en?.seoDescription ||
            body.excerpt ||
            "",
        },
        kn: body.translations?.kn,
        ur: body.translations?.ur,
      },
    });

    try {
      revalidatePath("/");
      revalidatePath("/news");
      revalidatePath(`/news/${slug}`);
      revalidatePath("/category", "layout");
      revalidatePath("/search");
      revalidatePath("/admin/news");
      revalidatePath("/sitemap.xml");
    } catch (e) {
      console.error("revalidatePath error:", e);
    }

    return NextResponse.json({ success: true, article: newArticle });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating article";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
