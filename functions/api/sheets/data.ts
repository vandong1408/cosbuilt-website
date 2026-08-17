import type { Env } from "../../_shared/types";
import { loadSheetsConfig, saveSheetsConfig, syncToGoogleSheets } from "../../_shared/sheetsConfig";
import { requireAdmin } from "../../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const config = await loadSheetsConfig(env.DB);
  return Response.json({
    articles: config.articles || [],
    images: config.images || [],
    logos: config.logos || [],
    websiteLogo: config.websiteLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
    footerLogo: config.footerLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
    products: config.products || []
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  try {
    const { articles, images, logos, websiteLogo, footerLogo, products, actionInfo } = await request.json<any>();
    const config = await loadSheetsConfig(env.DB);

    if (articles !== undefined) config.articles = articles;
    if (images !== undefined) config.images = images;
    if (logos !== undefined) config.logos = logos;
    if (websiteLogo !== undefined) config.websiteLogo = websiteLogo;
    if (footerLogo !== undefined) config.footerLogo = footerLogo;
    if (products !== undefined) config.products = products;

    await saveSheetsConfig(env.DB, config);

    // Background sync to Google Sheets via Web App if configured
    if (actionInfo && config.webAppUrl) {
      const { action, sheetName, index, data } = actionInfo;
      waitUntil(
        syncToGoogleSheets(env.DB, action, sheetName, index, data).catch(err => {
          console.error("Background sync to Google Sheets failed:", err);
        })
      );
    } else if (config.webAppUrl) {
      if (articles !== undefined) {
        waitUntil(syncToGoogleSheets(env.DB, "sync", "Bài viết", undefined, articles).catch(err => console.error(err)));
      }
      if (images !== undefined) {
        waitUntil(syncToGoogleSheets(env.DB, "sync", "Hình ảnh", undefined, images).catch(err => console.error(err)));
      }
      if (products !== undefined) {
        waitUntil(syncToGoogleSheets(env.DB, "sync", "Sản phẩm", undefined, products).catch(err => console.error(err)));
      }
    }

    return Response.json({
      success: true,
      message: "Cập nhật dữ liệu hệ thống thành công!",
      data: {
        articles: config.articles || [],
        images: config.images || [],
        logos: config.logos || [],
        websiteLogo: config.websiteLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
        footerLogo: config.footerLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
        products: config.products || []
      }
    });
  } catch (error: any) {
    console.error("Failed to update custom data:", error);
    return Response.json({ error: "Không thể lưu dữ liệu", details: error.message }, { status: 500 });
  }
};
