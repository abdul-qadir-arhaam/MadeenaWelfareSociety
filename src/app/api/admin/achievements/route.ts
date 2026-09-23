import { NextResponse } from "next/server";
import { getAchievements, createAchievement } from "@/lib/data/achievementsRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";

  const achievements = getAchievements({ status, category, search });
  return NextResponse.json({ achievements });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json({ error: "Achievement title is required" }, { status: 400 });
    }

    const newAch = createAchievement({
      title: body.title,
      year: body.year || new Date().getFullYear().toString(),
      category: body.category || "General",
      image: body.image || "/images/instagram/insta_post_10.jpg",
      description: body.description || "",
      isFeatured: !!body.isFeatured,
      status: body.status || "published",
    });

    return NextResponse.json({ success: true, achievement: newAch });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating achievement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
