// /sitemap.xml — tạo động từ dữ liệu trong D1 (sản phẩm + bài viết), nên luôn
// khớp với nội dung admin đang quản lý. Trang /catalogue (ẩn) và /admin không có ở đây.
import type { Env } from "./_shared/types";
import { loadSheetsConfig } from "./_shared/sheetsConfig";

const BASE = "https://cosbuilt.vn";

// Giống src/lib/slug.ts — URL sản phẩm/bài viết phải trùng với router phía client.
const slugify = (input: string): string =>
  (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const STATIC_PATHS = [
  "/", "/gioi-thieu", "/dich-vu", "/danh-muc-gia-cong", "/bang-gia-gia-cong", "/tin-tuc", "/lien-he",
  ...["ve-chung-toi", "nha-may-nang-luc", "chung-nhan-tieu-chuan", "doi-ngu-nghien-cuu", "doi-tac"].map((s) => `/gioi-thieu/${s}`),
  ...["gia-cong-tron-goi", "phat-trien-cong-thuc", "bao-bi-in-an", "phap-ly-cong-bo", "van-chuyen-thong-quan", "quy-trinh-hop-tac", "loi-ich-hop-tac"].map((s) => `/dich-vu/${s}`),
  ...["cham-soc-da-mat", "cham-soc-co-the", "cham-soc-toc", "trang-diem", "cham-soc-ca-nhan", "cong-nghe-moi"].map((s) => `/danh-muc-gia-cong/${s}`),
];

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const config = await loadSheetsConfig(env.DB);
  const urls = new Set<string>(STATIC_PATHS);
  for (const p of config.products || []) {
    const slug = slugify(String(p?.title || "").replace(/\([^)]*\)/g, " ")) || p?.id;
    if (slug) urls.add(`/san-pham/${slug}`);
  }
  for (const a of config.articles || []) {
    if ((a?.status || "published") === "draft") continue;
    const slug = a?.slug || slugify(a?.title || "");
    if (slug) urls.add(`/tin-tuc/${slug}`);
  }
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls].map((u) => `  <url><loc>${xmlEscape(BASE + u)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
};
