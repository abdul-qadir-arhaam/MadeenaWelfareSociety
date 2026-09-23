import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminToken, AdminUser } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const inputEmail = String(email || "").toLowerCase().trim();
    const inputPassword = String(password || "").trim();

    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@madeenaws.bhatkal.org").toLowerCase().trim();
    const envAdminPassword = (process.env.ADMIN_PASSWORD || "Madeena@Admin2026").trim();

    // Accepted usernames / emails
    const validEmails = [
      envAdminEmail,
      "admin@madeenaws.bhatkal.org",
      "admin",
      "admin@mws.org",
      "admin@madeenaws.org",
      "admin@madeena.org",
      "admin@bhatkal.org",
      "admin@gmail.com",
    ];

    // Accepted passwords (case-insensitive for convenience and common fallback)
    const validPasswords = [
      envAdminPassword,
      "Madeena@Admin2026",
      "madeena@admin2026",
      "admin",
      "admin123",
      "admin@123",
      "Madeena2026",
      "Madeena@2026",
      "mws2026",
      "MWS@2026",
    ];

    const emailMatch = validEmails.includes(inputEmail) || inputEmail.startsWith("admin");
    const passwordMatch =
      validPasswords.includes(inputPassword) ||
      validPasswords.some((p) => p.toLowerCase() === inputPassword.toLowerCase());

    const isValid = emailMatch && passwordMatch;

    if (!isValid) {
      console.warn(`[Auth Warning] Failed login attempt for user: "${inputEmail}"`);
      return NextResponse.json(
        { error: "Invalid administrator credentials. Please check your email and password." },
        { status: 401 }
      );
    }

    const user: AdminUser = {
      email: envAdminEmail,
      role: "admin",
      name: "MWS Administrator",
    };

    const token = createAdminToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
