import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "mws_admin_session";

export interface AdminUser {
  email: string;
  role: "admin";
  name: string;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    if (decoded && decoded.role === "admin" && decoded.email) {
      return decoded as AdminUser;
    }
  } catch {
    return null;
  }

  return null;
}

export function createAdminToken(user: AdminUser): string {
  const payload = {
    ...user,
    timestamp: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}
