// Client-side helpers for admin authentication.
//
// The admin token is the value of the server-side ADMIN_TOKEN secret. It is
// what the owner types as the admin password; every protected /api call sends
// it as an "Authorization: Bearer <token>" header, and the server verifies it.

const TOKEN_KEY = "cosbuilt_admin_token";
const ROLE_KEY = "cosbuilt_admin_role";

export type AdminRole = "admin" | "staff";

export function getAdminToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function getStoredRole(): AdminRole {
  return localStorage.getItem(ROLE_KEY) === "staff" ? "staff" : "admin";
}

export function setStoredRole(role: AdminRole): void {
  localStorage.setItem(ROLE_KEY, role);
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
  return (await verifyRole(token)) !== null;
}

/**
 * Exchange username + password for a session token and role. Admin uses the
 * ADMIN_TOKEN as the password; staff use their account credentials.
 * Returns { role, token } on success, or null when rejected.
 */
export async function login(username: string, password: string): Promise<{ role: AdminRole; token: string } | null> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    const role: AdminRole = data.role === "staff" ? "staff" : "admin";
    if (!data.token) return null;
    return { role, token: data.token };
  } catch {
    return null;
  }
}

/**
 * Verify a candidate token and return its role ("admin" | "staff"), or null when
 * the server rejects it. Used at login to adapt the admin UI to the account.
 */
export async function verifyRole(token: string): Promise<AdminRole | null> {
  try {
    const res = await fetch("/api/whoami", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.role === "staff" ? "staff" : data.role === "admin" ? "admin" : null;
  } catch {
    return null;
  }
}
