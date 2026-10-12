import type { Env } from "./types";

/**
 * Soft per-IP daily limit for public endpoints, stored in D1 kv_store.
 * Counts every call (valid or not) so abusive clients get throttled.
 * Returns true when the request is allowed, false when the limit is reached.
 */
export async function allowDaily(env: Env, request: Request, scope: string, limit: number): Promise<boolean> {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const key = `rl:${scope}:${ip}:${day}`;
  const row = await env.DB
    .prepare(
      "INSERT INTO kv_store (key, value) VALUES (?, '1') ON CONFLICT(key) DO UPDATE SET value = CAST(kv_store.value AS INTEGER) + 1 RETURNING value"
    )
    .bind(key)
    .first<{ value: string }>();
  return Number(row?.value || 0) <= limit;
}

export const tooManyRequests = () =>
  Response.json({ error: "Bạn đã gửi quá nhiều yêu cầu hôm nay. Vui lòng thử lại vào ngày mai." }, { status: 429 });
