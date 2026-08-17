import type { Env } from "./types";

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

/**
 * Guard admin-only endpoints. Returns a 401 Response when the caller is not
 * authenticated, or `null` when the request may proceed.
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
