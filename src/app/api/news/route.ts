import { NextResponse } from "next/server";
import { getNewsList } from "@/lib/data/newsRepository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "published";
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

    let news = await getNewsList({ status, category, search });
    if (limit && !isNaN(limit)) {
      news = news.slice(0, limit);
    }

    return NextResponse.json(
      { news },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching news";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
