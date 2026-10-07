// Site-wide search: diacritic-insensitive, multi-word (every word must appear),
// ranked by where the match is (title > body). Indexes products, articles,
// services, categories, About content, pricing and key pages.

export type SearchType = "product" | "article" | "service" | "category" | "about" | "pricing" | "page";

export interface SearchItem {
  id: string;
  type: SearchType;
  title: string;
  /** Short line shown under the title when the match is not in the title. */
  summary: string;
  /** Full searchable text (original case/diacritics). */
  text: string;
  /** Opaque payload handed back to the caller on select. */
  ref: unknown;
  // precomputed
  nTitle?: string;
  nText?: string;
}

export interface SearchHit {
  item: SearchItem;
  score: number;
  snippet: string;
}

const isLatinLetter = /[À-ɏḀ-ỿ]/;

// Lowercase + strip Latin diacritics (incl. Vietnamese) while keeping the string
// the same length as its NFC form, so match offsets can be mapped back for highlighting.
export function norm(input: string): string {
  let out = "";
  for (const ch of (input || "").normalize("NFC")) {
    if (ch.length > 1) { out += ch; continue; }
    if (ch === "đ" || ch === "Đ") { out += "d"; continue; }
    if (isLatinLetter.test(ch)) {
      const base = ch.normalize("NFD")[0];
      out += base.toLowerCase();
    } else {
      out += ch.toLowerCase();
    }
  }
  return out;
}

export function stripHtml(html: string): string {
  return (html || "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Gather every human-readable string in a nested value (skips URLs / image paths).
export function collectText(v: unknown, depth = 0): string {
  if (v == null || depth > 5) return "";
  if (typeof v === "string") {
    if (/^(https?:|\/|data:)/i.test(v) || v.length > 6000) return "";
    return v;
  }
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map((x) => collectText(x, depth + 1)).join(" ");
  if (typeof v === "object") return Object.values(v as object).map((x) => collectText(x, depth + 1)).join(" ");
  return "";
}

export function prepare(item: SearchItem): SearchItem {
  item.nTitle = norm(item.title);
  item.nText = norm(item.title + " " + item.text);
  return item;
}

function makeSnippet(item: SearchItem, tokens: string[]): string {
  const raw = item.text.normalize("NFC");
  const n = norm(raw);
  let idx = -1;
  for (const t of tokens) {
    const i = n.indexOf(t);
    if (i >= 0 && (idx < 0 || i < idx)) idx = i;
  }
  if (idx < 0) return item.summary;
  const start = Math.max(0, idx - 40);
  const end = Math.min(raw.length, idx + 110);
  return (start > 0 ? "…" : "") + raw.slice(start, end).trim() + (end < raw.length ? "…" : "");
}

export function search(items: SearchItem[], query: string, limit = 10): SearchHit[] {
  const q = norm(query).trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];
  for (const item of items) {
    const nText = item.nText || "";
    if (!tokens.every((t) => nText.includes(t))) continue;
    const nTitle = item.nTitle || "";
    let score = 1;
    if (nTitle === q) score += 200;
    else if (nTitle.startsWith(q)) score += 120;
    else if (nTitle.includes(q)) score += 90;
    for (const t of tokens) if (nTitle.includes(t)) score += 20;
    if (nText.includes(q)) score += 15;
    if (item.type === "page") score += 5;
    hits.push({ item, score, snippet: "" });
  }
  hits.sort((a, b) => b.score - a.score);
  const top = hits.slice(0, limit);
  for (const h of top) {
    h.snippet = tokens.some((t) => (h.item.nTitle || "").includes(t)) && h.item.summary ? h.item.summary : makeSnippet(h.item, tokens);
  }
  return top;
}

// Split text into [plain, match, plain, match…] parts for <mark> rendering.
export function highlightParts(text: string, query: string): { t: string; m: boolean }[] {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  const src = text.normalize("NFC");
  const n = norm(src);
  const mask = new Array(src.length).fill(false);
  for (const t of tokens) {
    let from = 0;
    while (true) {
      const i = n.indexOf(t, from);
      if (i < 0) break;
      for (let k = i; k < i + t.length; k++) mask[k] = true;
      from = i + t.length;
    }
  }
  const parts: { t: string; m: boolean }[] = [];
  let cur = "";
  let curM = false;
  for (let i = 0; i < src.length; i++) {
    if (i > 0 && mask[i] !== curM) { parts.push({ t: cur, m: curM }); cur = ""; }
    curM = mask[i];
    cur += src[i];
  }
  if (cur) parts.push({ t: cur, m: curM });
  return parts;
}
