import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data/settingsRepository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json(
      { settings },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
