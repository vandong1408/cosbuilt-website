import { DEFAULT_IMAGES, DEFAULT_PRODUCTS } from "./defaults";

export interface SheetsConfig {
  spreadsheetId: string;
  webAppUrl: string;
  lastSynced: string;
  articles: any[];
  images: any[];
  products: any[];
  logos?: any[];
  websiteLogo?: { name: string; slogan?: string; image?: string };
  footerLogo?: { name: string; slogan?: string; image?: string };
}

const KEY = "sheets_config";

export async function loadSheetsConfig(db: D1Database): Promise<SheetsConfig> {
  try {
    const row = await db.prepare("SELECT value FROM kv_store WHERE key = ?").bind(KEY).first<{ value: string }>();
    if (row) {
      const config = JSON.parse(row.value);
      if (!config.images || config.images.length === 0) {
        config.images = DEFAULT_IMAGES;
      }
      if (!config.products || config.products.length === 0) {
        config.products = DEFAULT_PRODUCTS;
      }
      return config;
    }
  } catch (error) {
    console.error("Error reading sheets config:", error);
  }
  return {
    spreadsheetId: "",
    webAppUrl: "",
    lastSynced: "",
    articles: [],
    images: DEFAULT_IMAGES,
    products: DEFAULT_PRODUCTS
  };
}

export async function saveSheetsConfig(db: D1Database, config: SheetsConfig): Promise<void> {
  try {
    await db
      .prepare("INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
      .bind(KEY, JSON.stringify(config))
      .run();
  } catch (error) {
    console.error("Error writing sheets config:", error);
  }
}

// Sync changes to a Google Sheets Apps Script Web App
export async function syncToGoogleSheets(
  db: D1Database,
  action: "add" | "update" | "delete" | "sync",
  sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm",
  index?: number,
  data?: any
): Promise<boolean> {
  const config = await loadSheetsConfig(db);
  const webAppUrl = config.webAppUrl;
  if (!webAppUrl) {
    console.log("No Google Sheets Web App URL configured. Skipping remote sync.");
    return false;
  }

  try {
    console.log(`Syncing action "${action}" to Google Sheets tab "${sheetName}"`);
    const res = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, sheetName, index, data })
    });
    if (res.ok) {
      const result: any = await res.json();
      console.log("Remote Google Sheets sync result:", result);
      return result.success;
    } else {
      console.error("Failed to sync to Google Sheets, status code:", res.status);
    }
  } catch (error) {
    console.error("Failed to sync to Google Sheets remote endpoint:", error);
  }
  return false;
}
