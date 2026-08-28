import type { Env } from "./types";
import { staffFromToken } from "./staffAuth";

/**
 * Constant-time comparison of two strings to avoid timing side-channels
 * when checking a secret token.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  // crypto.subtle.timingSafeEqual requires equal-length buffers.
  if (bufA.byteLength !== bufB.byteLength) {
    return false;
  }
  return crypto.subtle.timingSafeEqual(bufA, bufB);
}

/**
 * Extract the bearer token from the Authorization header.
 */
function getBearerToken(request: Request): string | null {
  const header = request.headers.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export type Role = "admin" | "staff";

/**
 * Resolve the role of the caller from its bearer token.
 * - Matches ADMIN_TOKEN            -> "admin" (full access)
 * - Matches STAFF_TOKEN env secret -> "staff" (optional legacy shared password)
 * - Matches an active staff account session token in D1 -> "staff"
 * - Otherwise                      -> null
 */
export async function getRole(request: Request, env: Env): Promise<Role | null> {
  const token = getBearerToken(request);
  if (!token) return null;
  if (env.ADMIN_TOKEN && timingSafeEqual(token, env.ADMIN_TOKEN)) return "admin";
  if (env.STAFF_TOKEN && timingSafeEqual(token, env.STAFF_TOKEN)) return "staff";
  if (env.DB) {
    const staff = await staffFromToken(env.DB, token);
    if (staff) return "staff";
  }
  return null;
}

/**
 * Guard admin-only endpoints. Returns a 401 Response when the caller is not
 * an authenticated ADMIN, or `null` when the request may proceed.
 *
 * Fails closed: if ADMIN_TOKEN is not configured on the server, every
 * protected request is rejected so that a misconfiguration can never expose
 * sensitive data.
 */
export function requireAdmin(request: Request, env: Env): Response | null {
  const expected = env.ADMIN_TOKEN;
  if (!expected) {
    return Response.json(
      { error: "Máy chủ chưa cấu hình ADMIN_TOKEN. Vui lòng đặt secret trong Cloudflare." },
      { status: 401 }
    );
  }

  const token = getBearerToken(request);
  if (!token || !timingSafeEqual(token, expected)) {
    return Response.json(
      { error: "Không có quyền truy cập. Vui lòng đăng nhập quản trị." },
      { status: 401 }
    );
  }

  return null;
}

/**
 * Guard endpoints that both ADMIN and STAFF may use (content management,
 * viewing leads, updating lead status). Returns 401 for anyone else.
 */
export async function requireStaff(request: Request, env: Env): Promise<Response | null> {
  if (!env.ADMIN_TOKEN) {
    return Response.json(
      { error: "Máy chủ chưa cấu hình ADMIN_TOKEN. Vui lòng đặt secret trong Cloudflare." },
      { status: 401 }
    );
  }
  if ((await getRole(request, env)) === null) {
    return Response.json(
      { error: "Không có quyền truy cập. Vui lòng đăng nhập." },
      { status: 401 }
    );
  }
  return null;
}
