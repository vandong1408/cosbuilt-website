// Chuẩn hoá nội dung bài viết để hiển thị. Bài cũ là chữ thuần (xuống dòng =
// đoạn), bài soạn trong admin (Quill) là HTML — cả hai đều được đổi thành HTML
// đã lọc an toàn (DOMPurify), gắn id cho tiêu đề h2/h3 và tạo mục lục từ đó.
import DOMPurify from "dompurify";
import { slugify } from "./slug";

export interface TocItem { id: string; text: string; level: 2 | 3 }

const looksLikeHtml = (s: string) => /<(p|h[1-6]|ul|ol|li|strong|em|br|div|span|a|img|blockquote)\b[^>]*>/i.test(s);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Dòng tiêu đề mục trong bài chữ thuần: viết HOA toàn bộ, ngắn (vd "1. CHUẨN BỊ HỒ SƠ").
const isPlainHeading = (line: string) =>
  line.length <= 100 && /\p{Lu}/u.test(line) && line === line.toLocaleUpperCase("vi") && !/[.!?]$/.test(line);

// Mỗi dòng là một đoạn; dòng tiêu đề HOA → <h2>.
const plainToHtml = (text: string) =>
  text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => (isPlainHeading(line) ? `<h2>${escapeHtml(line)}</h2>` : `<p>${escapeHtml(line)}</p>`))
    .join("");

// Đưa nội dung vào trình soạn thảo: chữ thuần được đổi sang đoạn <p> để giữ xuống dòng.
export const toEditorHtml = (content: string) => (!content || looksLikeHtml(content) ? content : plainToHtml(content));

export function renderArticle(content: string | undefined): { html: string; toc: TocItem[] } {
  const raw = content || "";
  const source = looksLikeHtml(raw) ? raw : plainToHtml(raw);
  const clean = DOMPurify.sanitize(source, { USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "form", "input", "button"] });

  const doc = new DOMParser().parseFromString(`<div>${clean}</div>`, "text/html");
  const root = doc.body.firstElementChild as HTMLElement;
  const toc: TocItem[] = [];
  const used = new Set<string>();
  root.querySelectorAll("h2, h3").forEach((h) => {
    const text = (h.textContent || "").trim();
    if (!text) return;
    let id = slugify(text) || "muc";
    for (let n = 2; used.has(id); n++) id = `${slugify(text)}-${n}`;
    used.add(id);
    h.id = id;
    toc.push({ id, text, level: h.tagName === "H2" ? 2 : 3 });
  });
  // Link ngoài mở tab mới, an toàn.
  root.querySelectorAll("a[href]").forEach((a) => {
    if (/^https?:\/\//i.test(a.getAttribute("href") || "")) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
  return { html: root.innerHTML, toc };
}
