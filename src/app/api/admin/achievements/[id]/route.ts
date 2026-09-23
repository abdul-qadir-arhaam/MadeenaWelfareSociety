import { NextResponse } from "next/server";
import {
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "@/lib/data/achievementsRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ach = getAchievementById(id);

  if (!ach) {
    return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  }

  return NextResponse.json({ achievement: ach });
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
    const updated = updateAchievement(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, achievement: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating achievement";
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
  const success = deleteAchievement(id);

  if (!success) {
    return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Achievement deleted successfully" });
}
