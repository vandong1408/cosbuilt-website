// Extracts spreadsheetId from a full Google Sheets URL or raw ID
export function extractSpreadsheetId(input: string): string {
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
}

// Robust custom CSV line parser supporting double quotes and commas
export function parseCSVLine(line: string): string[] {
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
export function parseSheetCSV(csvText: string) {
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
export function findColumnValue(row: Record<string, string>, keys: string[]): string {
  for (const key of keys) {
    if (row[key] !== undefined) return row[key];
    const foundKey = Object.keys(row).find(k => k.includes(key) || key.includes(k));
    if (foundKey) return row[foundKey];
  }
  return "";
}

// Load spreadsheet from URL with fallbacks for multiple potential sheet names
export async function fetchSheetWithFallbacks(spreadsheetId: string, sheetNames: string[]): Promise<string | null> {
  for (const name of sheetNames) {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(name)}`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
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
export function mapRowsToArticles(rows: any[]) {
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
export function mapRowsToImages(rows: any[]) {
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
export function mapRowsToProducts(rows: any[]) {
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
