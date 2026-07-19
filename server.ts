import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

import fs from "fs";

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", brand: "cosbuilt" });
});

// 1.1 Native image upload endpoint
app.post("/api/upload", (req, res) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      return res.status(400).json({ error: "Thiếu tên file hoặc dữ liệu hình ảnh (base64)." });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean up base64 string (remove prefix)
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    // Generate unique filename
    const ext = path.extname(filename) || ".png";
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save file to disk
    fs.writeFileSync(filePath, buffer);

    // Return relative URL
    const fileUrl = `/uploads/${uniqueFilename}`;
    res.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Lỗi lưu file ảnh.", details: error.message });
  }
});

// --- GOOGLE SHEETS INTEGRATION CONFIG AND SYNCHRONIZATION ---

// Helper to extract spreadsheetId from a full Google Sheets URL or raw ID
function extractSpreadsheetId(input: string): string {
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
}

// Robust custom CSV line parser supporting double quotes and commas
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Convert CSV text to an array of key-value row objects
function parseSheetCSV(csvText: string) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];
  
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        rowObj[header] = values[index];
      }
    });
    rows.push(rowObj);
  }
  return rows;
}

// Match columns by multiple possible synonyms (English or Vietnamese, with/without diacritics)
function findColumnValue(row: Record<string, string>, keys: string[]): string {
  for (const key of keys) {
    if (row[key] !== undefined) return row[key];
    const foundKey = Object.keys(row).find(k => k.includes(key) || key.includes(k));
    if (foundKey) return row[foundKey];
  }
  return "";
}

// Load spreadsheet from URL with fallbacks for multiple potential sheet names
async function fetchSheetWithFallbacks(spreadsheetId: string, sheetNames: string[]): Promise<string | null> {
  for (const name of sheetNames) {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(name)}`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        // Skip HTML redirect or error pages
        if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
          continue;
        }
        if (text.trim().length > 10) {
          return text;
        }
      }
    } catch (e) {
      console.error(`Failed to fetch sheet "${name}":`, e);
    }
  }
  
  // Try fetching the default (first) sheet
  try {
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      if (!text.trim().startsWith("<!DOCTYPE") && !text.trim().startsWith("<html") && text.trim().length > 10) {
        return text;
      }
    }
  } catch (e) {
    console.error("Failed default sheet fetch:", e);
  }
  
  return null;
}

// Map CSV row objects to the standard BlogPost structures
function mapRowsToArticles(rows: any[]) {
  const titleKeys = ["title", "tiêu đề", "tieu de", "name", "tên"];
  const categoryKeys = ["category", "danh mục", "danh muc", "phân loại", "phan loai"];
  const summaryKeys = ["summary", "tóm tắt", "tom tat", "mô tả ngắn", "mo ta ngan"];
  const contentKeys = ["content", "nội dung", "noi dung", "bài viết", "bai viet"];
  const dateKeys = ["date", "ngày", "ngay", "thời gian", "thoi gian"];
  const authorKeys = ["author", "tác giả", "tac gia", "người viết", "nguoi viet"];
  const imageKeys = ["image", "hình ảnh", "hinh anh", "ảnh", "anh", "url", "picture", "link"];

  return rows.map(row => {
    return {
      title: findColumnValue(row, titleKeys) || "Bài viết mới",
      category: findColumnValue(row, categoryKeys) || "cẩm nang",
      summary: findColumnValue(row, summaryKeys) || "",
      content: findColumnValue(row, contentKeys) || "",
      date: findColumnValue(row, dateKeys) || new Date().toLocaleDateString("vi-VN"),
      author: findColumnValue(row, authorKeys) || "Cosbuilt Editorial",
      image: findColumnValue(row, imageKeys) || "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600"
    };
  }).filter(item => item.title && item.content);
}

// Map CSV row objects to gallery/product image structures
function mapRowsToImages(rows: any[]) {
  const titleKeys = ["title", "tiêu đề", "tieu de", "tên", "name"];
  const categoryKeys = ["category", "danh mục", "danh muc", "phân loại", "phan loai", "album", "bộ sưu tập"];
  const imageKeys = ["image", "hình ảnh", "hinh anh", "ảnh", "anh", "url", "picture", "link"];
  const descriptionKeys = ["description", "mô tả", "mo ta", "chi tiết", "chi tiet"];

  return rows.map(row => {
    return {
      title: findColumnValue(row, titleKeys) || "Hình ảnh Cosbuilt",
      category: findColumnValue(row, categoryKeys) || "nhà máy",
      image: findColumnValue(row, imageKeys) || "",
      description: findColumnValue(row, descriptionKeys) || ""
    };
  }).filter(item => item.image);
}

// Map CSV row objects to products
function mapRowsToProducts(rows: any[]) {
  const idKeys = ["id", "mã", "ma"];
  const titleKeys = ["title", "tiêu đề", "tieu de", "name", "tên", "tên sản phẩm", "ten san pham"];
  const categoryKeys = ["category", "danh mục", "danh muc", "phân loại", "phan loai"];
  const labKeys = ["lab", "phòng lab", "phong lab", "phòng thí nghiệm", "phong thi nghiem"];
  const skinTypesKeys = ["skintype", "skintypes", "loại da", "loai da", "da"];
  const ratingKeys = ["rating", "đánh giá", "danh gia", "sao", "rate"];
  const ratingValueKeys = ["ratingvalue", "điểm đánh giá", "diem danh gia", "điểm", "diem"];
  const reviewsCountKeys = ["reviewscount", "số đánh giá", "so gia", "lượt đánh giá", "luot danh gia", "reviews"];
  const originalPriceKeys = ["originalprice", "giá gốc", "gia goc", "giá cũ", "gia cu"];
  const priceKeys = ["price", "giá", "gia", "giá bán", "gia ban", "giá khuyến mãi", "gia khuyen mai"];
  const discountPercentKeys = ["discountpercent", "phần trăm giảm giá", "phan tram giam gia", "% giảm", "% giam"];
  const badgeKeys = ["badge", "nhãn", "nhan", "thẻ", "the", "tag", "nhãn dán", "nhan dan"];
  const testedCountKeys = ["testedcount", "số lượt test", "so luot test", "số mẫu thử", "so mau thu"];
  const hotPercentKeys = ["hotpercent", "phần trăm hot", "phan tram hot", "độ hot", "do hot", "% hot"];
  const imageKeys = ["image", "hình ảnh", "hinh anh", "ảnh", "anh", "url", "link", "picture"];
  const descriptionKeys = ["description", "mô tả", "mo ta", "giới thiệu", "gioi thieu"];
  const ingredientsKeys = ["ingredients", "thành phần", "thanh phan", "công thức", "cong thuc"];
  const guidelinesKeys = ["guidelines", "hướng dẫn", "huong dan", "cách dùng", "cach dung", "sử dụng", "su dung"];

  return rows.map(row => {
    const skinTypesStr = findColumnValue(row, skinTypesKeys) || "Mọi loại da";
    const skinTypes = skinTypesStr.split(",").map((s: string) => s.trim()).filter(Boolean);
    const priceVal = Number(findColumnValue(row, priceKeys)) || 0;
    return {
      id: findColumnValue(row, idKeys) || ("product_" + Math.random().toString(36).substring(2, 9)),
      title: findColumnValue(row, titleKeys) || "Sản phẩm mới",
      category: findColumnValue(row, categoryKeys) || "makeup",
      lab: findColumnValue(row, labKeys) || "Cosbuilt LAB",
      skinTypes: skinTypes,
      rating: Number(findColumnValue(row, ratingKeys)) || 5,
      ratingValue: Number(findColumnValue(row, ratingValueKeys)) || 4.8,
      reviewsCount: Number(findColumnValue(row, reviewsCountKeys)) || 120,
      originalPrice: Number(findColumnValue(row, originalPriceKeys)) || 0,
      price: priceVal,
      discountPercent: Number(findColumnValue(row, discountPercentKeys)) || 0,
      badge: findColumnValue(row, badgeKeys) || "",
      testedCount: Number(findColumnValue(row, testedCountKeys)) || 25,
      hotPercent: Number(findColumnValue(row, hotPercentKeys)) || 50,
      image: findColumnValue(row, imageKeys) || "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
      description: findColumnValue(row, descriptionKeys) || "",
      ingredients: findColumnValue(row, ingredientsKeys) || "",
      guidelines: findColumnValue(row, guidelinesKeys) || ""
    };
  }).filter(item => item.title);
}

// Local cache configuration paths
const CONFIG_FILE_PATH = path.join(process.cwd(), "sheets_config.json");

const DEFAULT_PRODUCTS = [
  {
    id: "lip-tint",
    title: "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi (Mẫu thử gia công)",
    category: "makeup",
    lab: "Premium Eco",
    skinTypes: ["Mọi loại da", "Dành cho da khô", "Dành cho da nhạy cảm"],
    rating: 5,
    ratingValue: 4.8,
    reviewsCount: 220,
    originalPrice: 20000,
    price: 16000,
    discountPercent: 20,
    badge: "LÊN MÀU CHUẨN",
    testedCount: 28,
    hotPercent: 28,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600",
    description: "Công thức son kem bùn bọc nước độc đáo mang kết cấu xốp mịn như nhung. Màu lên chuẩn sắc chỉ sau một lần quẹt, nhẹ tênh không gây khô môi hay lộ rãnh môi nhờ chứa dầu bơ và Vitamin E giữ ẩm sâu. Độ bám màu lên đến 8 tiếng.",
    ingredients: "Dầu bơ ép lạnh hữu cơ, Vitamin E tự nhiên, Màu khoáng tiêu chuẩn FDA Mỹ, Sáp ong trắng tinh khiết.",
    guidelines: "Thoa một lớp mỏng lên môi, bặm nhẹ và đợi 30 giây để lớp son tự set màu. Cảm nhận độ xốp, mướt mịn và khả năng giữ màu sau khi ăn uống nhẹ."
  },
  {
    id: "cushion",
    title: "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu SPF50 (Mẫu thử gia công)",
    category: "makeup",
    lab: "Premium Eco",
    skinTypes: ["Mọi loại da", "Dành cho da dầu mụn", "Dành cho da nhạy cảm"],
    rating: 5,
    ratingValue: 4.7,
    reviewsCount: 140,
    originalPrice: 42000,
    price: 35000,
    discountPercent: 16,
    badge: "CHE PHỦ 100%",
    testedCount: 73,
    hotPercent: 73,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    description: "Cushion thế hệ mới tích hợp màng lọc chống nắng vật lý phổ rộng và hạt phấn nano siêu mịn. Mang lại lớp nền mỏng nhẹ tự nhiên nhưng che phủ hoàn hảo các khuyết điểm, mụn thâm, lỗ chân lông to và kiểm soát dầu thừa suốt 12 tiếng.",
    ingredients: "Chiết xuất tràm trà, Niacinamide 2%, Zinc Oxide, Titanium Dioxide, Vitamin B5 phục hồi.",
    guidelines: "Dùng bông mút dặm nhẹ phấn lên da mặt từ trong ra ngoài. Cảm nhận độ che phủ, tính kiềm dầu và độ mỏng nhẹ không bí bách của lớp nền."
  },
  {
    id: "serum-b5",
    title: "Serum B5 & Exosome phục hồi da chuyên sâu (Mẫu thử gia công)",
    category: "facial-care",
    lab: "Advanced Clinical",
    skinTypes: ["Dành cho da nhạy cảm", "Dành cho da khô", "Mọi loại da"],
    rating: 5,
    ratingValue: 4.9,
    reviewsCount: 310,
    originalPrice: 55000,
    price: 45000,
    discountPercent: 18,
    badge: "PHỤC HỒI CẤP TỐC",
    testedCount: 154,
    hotPercent: 85,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    description: "Công thức phục hồi tế bào thế hệ mới kết hợp Panthenol (Vitamin B5) nồng độ cao và hoạt chất Exosome siêu nhỏ chiết xuất từ rau má. Giúp làm dịu mẩn đỏ tức thì, kích thích tăng sinh collagen tự thân và củng cố hàng rào bảo vệ da mạnh mẽ.",
    ingredients: "Panthenol 10%, Exosome chiết xuất rau má, Centella Asiatica Extract, Hyaluronic Acid đa tầng, Ceramide NP.",
    guidelines: "Thoa 3-4 giọt lên da mặt sạch sau bước toner. Vỗ nhẹ để dưỡng chất thẩm thấu sâu. Phù hợp sử dụng sau các liệu trình laser, peel da hoặc treatment nặng."
  }
];

const DEFAULT_IMAGES = [
  {
    title: "Dây chuyền chiết rót mỹ phẩm tự động",
    category: "nhà máy",
    description: "Hệ thống chiết rót công nghệ tự động hóa khép kín nhập khẩu từ Đức và Hàn Quốc, chuẩn CGMP ASEAN.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Phòng thí nghiệm nghiên cứu R&D vô trùng",
    category: "R&D",
    description: "Nơi đội ngũ tiến sĩ, thạc sĩ sinh hóa nghiên cứu, phát triển và thử nghiệm các công thức mỹ phẩm đột phá.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600"
  },
  {
    title: "Hệ thống bồn nhũ hóa hút chân không đồng hóa",
    category: "nhà máy",
    description: "Bồn khuấy trộn nhũ hóa siêu mịn giúp chất kem đạt độ đồng đều tối đa và giữ trạng thái ổn định lâu dài.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600"
  },
  {
    title: "Thử nghiệm lâm sàng và kiểm tra kích ứng da",
    category: "R&D",
    description: "Các công thức mẫu thử được kiểm nghiệm lâm sàng nghiêm ngặt nhằm đảm bảo an toàn tuyệt đối trước khi công bố.",
    image: "https://images.unsplash.com/photo-1527799822341-478a783b83d0?q=80&w=600"
  },
  {
    title: "Kho nguyên liệu thô nhập khẩu đạt chuẩn",
    category: "nhà máy",
    description: "Nguồn nguyên liệu thô nhập khẩu chính ngạch trực tiếp từ Nhật Bản, Thụy Sĩ, Pháp, lưu giữ trong điều kiện tối ưu.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600"
  },
  {
    title: "Quy trình đóng gói màng co vô trùng hoàn thiện",
    category: "đóng gói",
    description: "Sản phẩm được làm sạch bụi lọ, đóng màng co vô trùng và in hạn sử dụng tự động trước khi xuất xưởng.",
    image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?q=80&w=600"
  }
];

function loadSheetsConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      const config = JSON.parse(data);
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

function saveSheetsConfig(config: any) {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing sheets config:", error);
  }
}

// Helper to sync changes to Google Sheets Apps Script Web App
async function syncToGoogleSheets(action: "add" | "update" | "delete" | "sync", sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm", index?: number, data?: any) {
  const config = loadSheetsConfig();
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
      body: JSON.stringify({
        action,
        sheetName,
        index,
        data
      })
    });
    if (res.ok) {
      const result = await res.json();
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

// Sheets config API endpoints
app.get("/api/sheets/config", (req, res) => {
  const config = loadSheetsConfig();
  res.json({
    spreadsheetId: config.spreadsheetId,
    webAppUrl: config.webAppUrl || "",
    lastSynced: config.lastSynced,
    hasArticles: (config.articles || []).length > 0,
    hasImages: (config.images || []).length > 0
  });
});

app.post("/api/sheets/config", (req, res) => {
  const { spreadsheetId: inputId, webAppUrl } = req.body;
  let config = loadSheetsConfig();
  
  if (inputId !== undefined) {
    config.spreadsheetId = extractSpreadsheetId(inputId);
  }
  if (webAppUrl !== undefined) {
    config.webAppUrl = webAppUrl.trim();
  }
  
  saveSheetsConfig(config);
  res.json({ 
    success: true, 
    spreadsheetId: config.spreadsheetId, 
    webAppUrl: config.webAppUrl || "",
    message: "Đã lưu cấu hình Google Sheet thành công!" 
  });
});

app.get("/api/sheets/data", (req, res) => {
  const config = loadSheetsConfig();
  res.json({
    articles: config.articles || [],
    images: config.images || [],
    logos: config.logos || [],
    websiteLogo: config.websiteLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
    products: config.products || []
  });
});

app.post("/api/sheets/data", async (req, res) => {
  try {
    const { articles, images, logos, websiteLogo, products, actionInfo } = req.body;
    let config = loadSheetsConfig();
    
    if (articles !== undefined) config.articles = articles;
    if (images !== undefined) config.images = images;
    if (logos !== undefined) config.logos = logos;
    if (websiteLogo !== undefined) config.websiteLogo = websiteLogo;
    if (products !== undefined) config.products = products;
    
    saveSheetsConfig(config);
    
    // Background sync to Google Sheets via Web App if configured
    if (actionInfo && config.webAppUrl) {
      const { action, sheetName, index, data } = actionInfo;
      syncToGoogleSheets(action, sheetName, index, data).catch(err => {
        console.error("Background sync to Google Sheets failed:", err);
      });
    } else if (config.webAppUrl) {
      // Direct full sync if complete arrays were updated without explicit action info
      if (articles !== undefined) {
        syncToGoogleSheets("sync", "Bài viết", undefined, articles).catch(err => console.error(err));
      }
      if (images !== undefined) {
        syncToGoogleSheets("sync", "Hình ảnh", undefined, images).catch(err => console.error(err));
      }
      if (products !== undefined) {
        syncToGoogleSheets("sync", "Sản phẩm", undefined, products).catch(err => console.error(err));
      }
    }
    
    res.json({
      success: true,
      message: "Cập nhật dữ liệu hệ thống thành công!",
      data: {
        articles: config.articles || [],
        images: config.images || [],
        logos: config.logos || [],
        websiteLogo: config.websiteLogo || { name: "COSBUILT", slogan: "ESTD 1999" },
        products: config.products || []
      }
    });
  } catch (error: any) {
    console.error("Failed to update custom data:", error);
    res.status(500).json({ error: "Không thể lưu dữ liệu", details: error.message });
  }
});

app.post("/api/sheets/sync", async (req, res) => {
  try {
    const { spreadsheetId: inputId } = req.body;
    let config = loadSheetsConfig();
    
    const spreadsheetId = inputId ? extractSpreadsheetId(inputId) : config.spreadsheetId;
    
    if (!spreadsheetId) {
      return res.status(400).json({ error: "Chưa cấu hình Spreadsheet ID hoặc URL Google Sheet." });
    }
    
    console.log(`Starting sync for Spreadsheet ID: ${spreadsheetId}`);
    
    // 1. Fetch Articles / Blog Posts
    const articlesCSV = await fetchSheetWithFallbacks(spreadsheetId, ["Bài viết", "Articles", "News", "Sheet1"]);
    let articles: any[] = [];
    if (articlesCSV) {
      const rows = parseSheetCSV(articlesCSV);
      articles = mapRowsToArticles(rows);
      console.log(`Synced ${articles.length} articles from sheet.`);
    } else {
      console.log("No articles sheet found or read failed, fallback to defaults.");
    }
    
    // 2. Fetch Images / Gallery
    const imagesCSV = await fetchSheetWithFallbacks(spreadsheetId, ["Hình ảnh", "Images", "Gallery", "Sheet2"]);
    let images: any[] = [];
    if (imagesCSV) {
      const rows = parseSheetCSV(imagesCSV);
      images = mapRowsToImages(rows);
      console.log(`Synced ${images.length} images from sheet.`);
    } else {
      console.log("No images sheet found or read failed, fallback to defaults.");
    }

    // 3. Fetch Products / Formula Products
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
      return res.status(400).json({ 
        error: "Không thể đọc dữ liệu từ Google Sheet. Hãy kiểm tra chắc chắn rằng bạn đã bật chế độ chia sẻ: 'Bất kỳ ai có liên kết đều có thể xem' (Anyone with link can view)." 
      });
    }
    
    config.spreadsheetId = spreadsheetId;
    config.lastSynced = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    if (articles.length > 0) config.articles = articles;
    if (images.length > 0) config.images = images;
    if (products.length > 0) config.products = products;
    
    saveSheetsConfig(config);
    
    res.json({
      success: true,
      message: "Đồng bộ dữ liệu thành công!",
      lastSynced: config.lastSynced,
      articlesCount: articles.length,
      imagesCount: images.length,
      productsCount: products.length
    });
  } catch (error: any) {
    console.error("Sheets sync failed:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi đồng bộ", details: error.message });
  }
});

app.post("/api/sheets/setup", async (req, res) => {
  try {
    const config = loadSheetsConfig();
    const webAppUrl = config.webAppUrl;
    if (!webAppUrl) {
      return res.status(400).json({ error: "Chưa cấu hình URL của Google Apps Script Web App." });
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
      res.json(result);
    } else {
      res.status(400).json({ error: `Apps Script trả về lỗi, status: ${response.status}` });
    }
  } catch (error: any) {
    console.error("Failed to run sheets setup:", error);
    res.status(500).json({ error: "Không thể tự động khởi tạo bảng", details: error.message });
  }
});

// --- CRM LEADS DATABASE MANAGEMENT ---
const LEADS_FILE_PATH = path.join(process.cwd(), "leads_data.json");

function loadLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const data = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading leads data:", error);
  }
  return [];
}

function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing leads data:", error);
  }
}

// Get all leads
app.get("/api/leads", (req, res) => {
  const leads = loadLeads();
  // Return sorted by date descending
  const sorted = [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(sorted);
});

// Create a new lead
app.post("/api/leads", (req, res) => {
  const { name, phone, email, brandName, category, moq, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Họ tên và số điện thoại là bắt buộc" });
  }

  const leads = loadLeads();
  const newLead = {
    id: "lead_" + Math.random().toString(36).substring(2, 11),
    name,
    phone,
    email: email || "",
    brandName: brandName || "",
    category: category || "Chăm sóc da mặt",
    moq: moq || "1000",
    message: message || "",
    status: "Chờ xử lý", // Chờ xử lý, Đang liên hệ, Đã hoàn thành, Hủy
    notes: "",
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);
  saveLeads(leads);
  res.json({ success: true, lead: newLead });
});

// Update lead status/notes
app.put("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const leads = loadLeads();
  const leadIndex = leads.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(444).json({ error: "Không tìm thấy khách hàng yêu cầu" });
  }

  if (status !== undefined) {
    leads[leadIndex].status = status;
  }
  if (notes !== undefined) {
    leads[leadIndex].notes = notes;
  }

  saveLeads(leads);
  res.json({ success: true, lead: leads[leadIndex] });
});

// Delete a lead
app.delete("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const leads = loadLeads();
  const filtered = leads.filter(l => l.id !== id);
  
  if (leads.length === filtered.length) {
    return res.status(444).json({ error: "Không tìm thấy khách hàng yêu cầu" });
  }

  saveLeads(filtered);
  res.json({ success: true, message: "Xóa thông tin khách hàng thành công" });
});

// 2. AI Cosmetics Formula R&D & Pricing estimation endpoint
app.post("/api/ai/formula", async (req, res) => {
  try {
    const { productType, targetEffect, budgetTier, volume, targetAudience, extraDemands } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: "Dịch vụ AI chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY trong cấu hình Secrets."
      });
    }

    const prompt = `
      Bạn là Trưởng phòng R&D kiêm Chuyên gia định giá cao cấp tại "cosbuilt" (Nhà máy gia công mỹ phẩm đạt chuẩn CGMP ASEAN hàng đầu).
      Hãy thiết kế một công thức mỹ phẩm chuyên nghiệp và báo giá chi tiết dựa trên yêu cầu sau:
      - Phân loại danh mục gia công: ${productType || "Chăm sóc da mặt"}
      - Công dụng mục tiêu: ${targetEffect || "Dưỡng ẩm, làm sáng da"}
      - Phân khúc ngân sách: ${budgetTier || "Trung cấp"}
      - Quy mô lô sản xuất (số lượng chai/hũ): ${volume || 5000} sản phẩm
      - Khách hàng mục tiêu: ${targetAudience || "Mọi loại da, kể cả da nhạy cảm"}
      - Yêu cầu bổ sung đặc biệt: ${extraDemands || "Không có"}

      Hãy phản hồi bằng một cấu trúc JSON chính xác theo Schema sau:
      {
        "suggestedName": "Tên thương mại gợi ý cho sản phẩm (phải sang trọng, hiện đại, bắt tai)",
        "conceptDescription": "Mô tả ý tưởng sản phẩm ngắn gọn, định vị thị trường",
        "ingredients": [
          {
            "name": "Tên nguyên liệu/hoạt chất (tiếng Anh chuẩn INCI)",
            "percentage": "Tỷ lệ % (phải khoa học, tổng công thức xấp xỉ 100%)",
            "role": "Vai trò của thành phần (ví dụ: Hoạt chất chính sáng da, dung môi, chất nhũ hóa, bảo quản)",
            "origin": "Xuất xứ nguyên liệu (Pháp, Hàn Quốc, Nhật Bản, Mỹ, v.v. để tăng uy tín)"
          }
        ],
        "processingSteps": [
          "Các bước quy trình gia công đạt chuẩn CGMP tại nhà máy cosbuilt"
        ],
        "packagingDesign": {
          "bottleType": "Loại chai/lọ đề xuất (ví dụ: Chai thủy tinh mờ có dropper, Hũ acrylic 2 lớp)",
          "volumeMl": "Dung tích khuyến nghị (ml hoặc g)",
          "printingMethod": "Phương pháp in ấn bao bì đề xuất (In lụa trực tiếp, dán decal cán mờ, ép kim)"
        },
        "pricingEstimation": {
          "rawMaterialCostPerUnit": "Chi phí nguyên liệu/bán thành phẩm cho 1 sản phẩm (VND, ví dụ: 12000)",
          "packagingCostPerUnit": "Chi phí chai lọ, bao bì, hộp giấy cho 1 sản phẩm (VND, ví dụ: 8000)",
          "manufacturingCostPerUnit": "Chi phí nhân công, vận hành máy móc, đóng gói cho 1 sản phẩm (VND, ví dụ: 3000)",
          "totalCostPerUnit": "Tổng giá thành sản xuất cho 1 sản phẩm (VND, ví dụ: 23000)",
          "totalBatchCost": "Tổng chi phí cho cả lô hàng (VND)",
          "registrationFee": "Phí kiểm nghiệm lâm sàng và công bố pháp lý trọn gói (VND)",
          "deliveryLeadTimeDays": "Thời gian hoàn thành dự kiến (ngày, ví dụ: 25)"
        },
        "regulatoryAdvice": "Lời khuyên pháp lý, hồ sơ công bố mỹ phẩm của Bộ Y Tế và thủ tục giấy tờ",
        "rdRecommendation": "Nhận xét và đề xuất nâng cấp công thức từ chuyên gia R&D của cosbuilt để cạnh tranh vượt trội"
      }

      Hãy chắc chắn trả về phản hồi CHỈ gồm chuỗi JSON hợp lệ để có thể parse trực tiếp, không chứa các ký tự định dạng markdown như \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ AI.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("AI Formula generation failed:", error);
    res.status(500).json({
      error: "Đã xảy ra lỗi trong quá trình xử lý công thức và định giá.",
      details: error.message
    });
  }
});

// 3. Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[cosbuilt] Server running on http://localhost:${PORT}`);
  });
}

startServer();
