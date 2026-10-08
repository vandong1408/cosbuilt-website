// Translates site content (Vietnamese → English / Korean) on demand and caches every
// result in D1 (kv_store), so each distinct text is machine-translated only once.
// Used for admin-managed content (products, articles, gallery…) that has no hand-made
// translation. Faithful translation only: names, numbers, units and structure are kept.
import { GoogleGenAI, Type } from "@google/genai";
import type { Env } from "../_shared/types";

const LANGS: Record<string, string> = { en: "English", ko: "Korean" };
const MAX_STRINGS = 40;
const MAX_CHARS = 8000;          // per string
const MAX_TOTAL = 40000;         // per request
const DAILY_LIMIT = 1500;        // uncached strings per IP per day

async function sha(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    return await handle(ctx);
  } catch (e: any) {
    console.error("translate fatal", e?.message || e);
    return Response.json({ error: "translate error", detail: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
};

const handle: PagesFunction<Env> = async ({ request, env }) => {
  let body: { target?: string; strings?: unknown };
  try { body = await request.json(); } catch { return Response.json({ error: "bad json" }, { status: 400 }); }
  const target = String(body.target || "");
  if (!LANGS[target]) return Response.json({ error: "unsupported language" }, { status: 400 });
  const strings = Array.isArray(body.strings) ? body.strings.filter((s): s is string => typeof s === "string") : [];
  if (!strings.length || strings.length > MAX_STRINGS) return Response.json({ error: "1-40 strings per request" }, { status: 400 });
  if (strings.some((s) => s.length > MAX_CHARS) || strings.reduce((n, s) => n + s.length, 0) > MAX_TOTAL) {
    return Response.json({ error: "text too long" }, { status: 413 });
  }

  const keys = await Promise.all(strings.map(async (s) => `tr:${target}:${await sha(s)}`));
  const result: (string | null)[] = new Array(strings.length).fill(null);

  // 1) cache lookup
  const uniqueKeys = [...new Set(keys)];
  const cached = new Map<string, string>();
  for (let i = 0; i < uniqueKeys.length; i += 40) {
    const chunk = uniqueKeys.slice(i, i + 40);
    const rows = await env.DB
      .prepare(`SELECT key, value FROM kv_store WHERE key IN (${chunk.map(() => "?").join(",")})`)
      .bind(...chunk).all<{ key: string; value: string }>();
    for (const r of rows.results || []) cached.set(r.key, r.value);
  }
  keys.forEach((k, i) => { if (cached.has(k)) result[i] = cached.get(k)!; });

  // 2) translate the misses
  const missIdx = result.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
  if (missIdx.length) {
    const uniqMiss = [...new Map(missIdx.map((i) => [strings[i], i])).keys()];
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const quotaKey = `trq:${ip}:${new Date().toISOString().slice(0, 10)}`;
    const used = Number((await env.DB.prepare("SELECT value FROM kv_store WHERE key = ?").bind(quotaKey).first<{ value: string }>())?.value || 0);
    if (used + uniqMiss.length > DAILY_LIMIT) return Response.json({ error: "daily limit" }, { status: 429 });
    if (!env.GEMINI_API_KEY) return Response.json({ error: "translation unavailable" }, { status: 503 });

    const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY, httpOptions: { headers: { "User-Agent": "aistudio-build" } } });
    const prompt =
      `Translate each Vietnamese text in this JSON array into natural, professional ${LANGS[target]} for the website of a Korean cosmetics OEM/ODM manufacturer (Cosbuilt).\n` +
      `Rules: keep brand names, product codes, INCI/ingredient names, numbers, percentages, units, currency amounts and line breaks (\\n) exactly as they are; ` +
      `do not add, remove or soften any fact; keep the same tone; return ONLY a JSON array of the same length and order.\n\n` +
      JSON.stringify(uniqMiss);
    let out: string[] | null = null;
    for (let attempt = 1; attempt <= 2 && !out; attempt++) {
      try {
        const resp = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { responseMimeType: "application/json", responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }, maxOutputTokens: 16384, temperature: 0.2 },
        });
        const parsed = JSON.parse((resp.text || "").trim());
        if (Array.isArray(parsed) && parsed.length === uniqMiss.length && parsed.every((x) => typeof x === "string")) out = parsed;
      } catch (e: any) {
        console.error("translate attempt failed", e?.message);
        await new Promise((r) => setTimeout(r, 600));
      }
    }
    if (!out) return Response.json({ error: "translation failed" }, { status: 502 });

    const byText = new Map(uniqMiss.map((s, i) => [s, out![i]]));
    const stmts: D1PreparedStatement[] = [];
    for (const i of missIdx) {
      const tr = byText.get(strings[i])!;
      result[i] = tr;
      stmts.push(env.DB.prepare("INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(keys[i], tr));
    }
    stmts.push(env.DB.prepare("INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(quotaKey, String(used + uniqMiss.length)));
    await env.DB.batch(stmts);
  }

  return Response.json({ translations: result }, { headers: { "Cache-Control": "no-store" } });
};
