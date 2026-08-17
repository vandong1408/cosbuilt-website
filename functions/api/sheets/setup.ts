import type { Env } from "../../_shared/types";
import { loadSheetsConfig } from "../../_shared/sheetsConfig";
import { requireAdmin } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  try {
    const config = await loadSheetsConfig(env.DB);
    const webAppUrl = config.webAppUrl;
    if (!webAppUrl) {
      return Response.json({ error: "Chưa cấu hình URL của Google Apps Script Web App." }, { status: 400 });
    }

    console.log("Triggering auto-setup for Google Sheet via Web App...");
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "setup",
        articles: config.articles || [],
        images: config.images || [],
        products: config.products || []
      })
    });

    if (response.ok) {
      const result = await response.json();
      return Response.json(result);
    } else {
      return Response.json({ error: `Apps Script trả về lỗi, status: ${response.status}` }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Failed to run sheets setup:", error);
    return Response.json({ error: "Không thể tự động khởi tạo bảng", details: error.message }, { status: 500 });
  }
};
