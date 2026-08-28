// Helpers for DB-backed staff accounts (created & managed by the admin in the
// CRM). Passwords are stored as PBKDF2-SHA256 hashes with a per-account salt;
// a random opaque session token is issued at login and validated on each call
// (so deactivating/deleting an account revokes access immediately).

function bytesToHex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

export function randomHex(nBytes: number): string {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(nBytes)));
}

/** PBKDF2-SHA256 hash of `password` with a hex salt → hex string. */
export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBytes(saltHex), iterations: 100000, hash: "SHA-256" },
    key,
    256
  );
  return bytesToHex(new Uint8Array(bits));
}

/** Constant-time hex-string comparison. */
export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = hexToBytes(a);
  const bufB = hexToBytes(b);
  if (bufA.byteLength !== bufB.byteLength) return false;
  return crypto.subtle.timingSafeEqual(bufA, bufB);
}

export interface StaffRow {
  id: string;
  username: string;
  display_name: string | null;
  password_hash: string;
  salt: string;
  token: string | null;
  active: number;
  createdAt: string;
}

/** Resolve a bearer token to an active staff account, or null. */
export async function staffFromToken(db: D1Database, token: string): Promise<StaffRow | null> {
  if (!token) return null;
  const row = await db
    .prepare("SELECT * FROM staff_accounts WHERE token = ? AND active = 1")
    .bind(token)
    .first<StaffRow>();
  return row || null;
}
