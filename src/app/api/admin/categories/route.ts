import { NextResponse } from "next/server";
import { getCategories, createCategory } from "@/lib/data/categoryRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;

  const categories = getCategories(type);
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const type = body.type || "news";
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCat = createCategory({
      name: body.name,
      slug,
      type: type,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return NextResponse.json({ success: true, category: newCat });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating category";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
