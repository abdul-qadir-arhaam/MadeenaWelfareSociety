import { NextResponse } from "next/server";
import { getNewsList, createNews, NewsArticle } from "@/lib/data/newsRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  const news = getNewsList({ status, category, search });
  return NextResponse.json({ news });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const title = body.title || body.translations?.en?.title;
    if (!title || !body.categoryId) {
      return NextResponse.json(
        { error: "Title and Category are required" },
        { status: 400 }
      );
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newArticle = createNews({
      slug,
      categoryId: body.categoryId,
      categoryName: body.categoryName || "General",
      featuredImage: body.featuredImage || "/images/real/15aug.jpeg",
      author: body.author || "MWS Media Cell",
      publishedAt: body.publishedAt || new Date().toISOString().split("T")[0],
      status: body.status || "draft",
      isFeatured: !!body.isFeatured,
      tags: body.tags || [],
      translations: {
        en: {
          language: "en",
          title: title,
          excerpt: body.excerpt || body.translations?.en?.excerpt || body.translations?.en?.summary || "",
          content: body.content || body.translations?.en?.content || "",
          seoTitle: body.seoTitle || body.translations?.en?.seoTitle,
          seoDescription: body.seoDescription || body.translations?.en?.seoDescription,
        },
        kn: body.translations?.kn,
        ur: body.translations?.ur,
      },
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating article";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
