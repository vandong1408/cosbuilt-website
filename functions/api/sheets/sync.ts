import type { Env } from "../../_shared/types";
import { extractSpreadsheetId, fetchSheetWithFallbacks, parseSheetCSV, mapRowsToArticles, mapRowsToImages, mapRowsToProducts } from "../../_shared/csv";
import { loadSheetsConfig, saveSheetsConfig } from "../../_shared/sheetsConfig";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { spreadsheetId: inputId } = await request.json<{ spreadsheetId?: string }>();
    const config = await loadSheetsConfig(env.DB);

    const spreadsheetId = inputId ? extractSpreadsheetId(inputId) : config.spreadsheetId;

    if (!spreadsheetId) {
      return Response.json({ error: "Chưa cấu hình Spreadsheet ID hoặc URL Google Sheet." }, { status: 400 });
    }

    console.log(`Starting sync for Spreadsheet ID: ${spreadsheetId}`);

    const articlesCSV = await fetchSheetWithFallbacks(spreadsheetId, ["Bài viết", "Articles", "News", "Sheet1"]);
    let articles: any[] = [];
    if (articlesCSV) {
      const rows = parseSheetCSV(articlesCSV);
      articles = mapRowsToArticles(rows);
      console.log(`Synced ${articles.length} articles from sheet.`);
    } else {
      console.log("No articles sheet found or read failed, fallback to defaults.");
    }

    const imagesCSV = await fetchSheetWithFallbacks(spreadsheetId, ["Hình ảnh", "Images", "Gallery", "Sheet2"]);
    let images: any[] = [];
    if (imagesCSV) {
      const rows = parseSheetCSV(imagesCSV);
      images = mapRowsToImages(rows);
      console.log(`Synced ${images.length} images from sheet.`);
    } else {
      console.log("No images sheet found or read failed, fallback to defaults.");
    }

    const productsCSV = await fetchSheetWithFallbacks(spreadsheetId, ["Sản phẩm", "Products", "Sheet3"]);
    let products: any[] = [];
    if (productsCSV) {
      const rows = parseSheetCSV(productsCSV);
      products = mapRowsToProducts(rows);
      console.log(`Synced ${products.length} products from sheet.`);
    } else {
      console.log("No products sheet found or read failed, fallback to defaults.");
    }

    if (!articlesCSV && !imagesCSV && !productsCSV) {
      return Response.json({
        error: "Không thể đọc dữ liệu từ Google Sheet. Hãy kiểm tra chắc chắn rằng bạn đã bật chế độ chia sẻ: 'Bất kỳ ai có liên kết đều có thể xem' (Anyone with link can view)."
      }, { status: 400 });
    }

    config.spreadsheetId = spreadsheetId;
    config.lastSynced = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    if (articles.length > 0) config.articles = articles;
    if (images.length > 0) config.images = images;
    if (products.length > 0) config.products = products;

    await saveSheetsConfig(env.DB, config);

    return Response.json({
      success: true,
      message: "Đồng bộ dữ liệu thành công!",
      lastSynced: config.lastSynced,
      articlesCount: articles.length,
      imagesCount: images.length,
      productsCount: products.length
    });
  } catch (error: any) {
    console.error("Sheets sync failed:", error);
    return Response.json({ error: "Đã xảy ra lỗi khi đồng bộ", details: error.message }, { status: 500 });
  }
};
