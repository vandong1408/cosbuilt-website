import type { Env } from "../../_shared/types";
import { extractSpreadsheetId } from "../../_shared/csv";
import { loadSheetsConfig, saveSheetsConfig } from "../../_shared/sheetsConfig";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const config = await loadSheetsConfig(env.DB);
  return Response.json({
    spreadsheetId: config.spreadsheetId,
    webAppUrl: config.webAppUrl || "",
    lastSynced: config.lastSynced,
    hasArticles: (config.articles || []).length > 0,
    hasImages: (config.images || []).length > 0
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { spreadsheetId: inputId, webAppUrl } = await request.json<{ spreadsheetId?: string; webAppUrl?: string }>();
  const config = await loadSheetsConfig(env.DB);

  if (inputId !== undefined) {
    config.spreadsheetId = extractSpreadsheetId(inputId);
  }
  if (webAppUrl !== undefined) {
    config.webAppUrl = webAppUrl.trim();
  }

  await saveSheetsConfig(env.DB, config);
  return Response.json({
    success: true,
    spreadsheetId: config.spreadsheetId,
    webAppUrl: config.webAppUrl || "",
    message: "Đã lưu cấu hình Google Sheet thành công!"
  });
};
