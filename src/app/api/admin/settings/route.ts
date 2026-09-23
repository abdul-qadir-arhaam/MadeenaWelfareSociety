import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/data/settingsRepository";
import { getAdminSession } from "@/lib/auth/session";

export async function GET() {
  const settings = getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
