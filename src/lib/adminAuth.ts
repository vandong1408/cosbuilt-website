// Client-side helpers for admin authentication.
//
// The admin token is the value of the server-side ADMIN_TOKEN secret. It is
// what the owner types as the admin password; every protected /api call sends
// it as an "Authorization: Bearer <token>" header, and the server verifies it.

const TOKEN_KEY = "cosbuilt_admin_token";

export function getAdminToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Build fetch headers for an admin-protected request, attaching the bearer
 * token when one is stored. Pass `withJson` to also set the JSON content type.
 */
export function authHeaders(withJson = false): Record<string, string> {
  const headers: Record<string, string> = {};
  if (withJson) headers["Content-Type"] = "application/json";
  const token = getAdminToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/**
 * Verify a candidate token against the server by hitting a protected endpoint.
 * Returns true only when the server accepts the token (HTTP 200).
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch {
    return false;
  }
}
