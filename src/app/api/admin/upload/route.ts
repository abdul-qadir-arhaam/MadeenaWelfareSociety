import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const allFilesToProcess: File[] = [];
    if (singleFile && singleFile.size > 0) {
      allFilesToProcess.push(singleFile);
    }
    if (files && files.length > 0) {
      files.forEach((f) => {
        if (f && f.size > 0 && !allFilesToProcess.includes(f)) {
          allFilesToProcess.push(f);
        }
      });
    }

    if (allFilesToProcess.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const hasSupabase =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder") &&
      Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY?.includes("placeholder");

    const uploadedUrls: Array<{ url: string; name: string; size: number }> = [];

    for (const file of allFilesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean filename
      const originalName = file.name || "image.jpg";
      const ext = path.extname(originalName) || ".jpg";
      const cleanBase = path
        .basename(originalName, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .substring(0, 40);

      const uniqueFilename = `${cleanBase}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${ext}`;

      // 1. If Supabase Storage is configured, upload directly to Supabase
      if (hasSupabase) {
        try {
          const supabase = createAdminClient();
          const bucket = "site-assets";
          const { error: uploadErr } = await supabase.storage
            .from(bucket)
            .upload(uniqueFilename, buffer, {
              contentType: file.type || "image/jpeg",
              upsert: true,
            });

          if (!uploadErr) {
            const { data: publicUrlData } = supabase.storage
              .from(bucket)
              .getPublicUrl(uniqueFilename);

            uploadedUrls.push({
              url: publicUrlData.publicUrl,
              name: originalName,
              size: file.size,
            });
            continue;
          } else {
            console.warn("Supabase storage upload failed, attempting local fallback:", uploadErr);
          }
        } catch (supabaseErr) {
          console.warn("Supabase storage error:", supabaseErr);
        }
      }

      // 2. Local filesystem storage (development / self-hosted)
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, uniqueFilename);
        await writeFile(filePath, buffer);

        uploadedUrls.push({
          url: `/uploads/${uniqueFilename}`,
          name: originalName,
          size: file.size,
        });
      } catch (fsErr) {
        console.warn("Local filesystem write failed (serverless environment):", fsErr);
        // Fallback to inline Base64 data URL on read-only serverless environments without Supabase configured
        const mimeType = file.type || "image/jpeg";
        const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
        uploadedUrls.push({
          url: base64Url,
          name: originalName,
          size: file.size,
        });
      }
    }

    return NextResponse.json({
      success: true,
      files: uploadedUrls,
      url: uploadedUrls[0]?.url,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error uploading files";
    console.error("Upload error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

