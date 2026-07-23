/**
 * Google Sheets API Integration Service
 * All requests are made client-side using the administrator's Google OAuth access token.
 */

export interface GoogleArticle {
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export interface GoogleImage {
  title: string;
  category: string;
  description: string;
  image: string;
}

/**
 * Extracts spreadsheet ID from full URL or returns the ID as-is.
 */
export function extractSpreadsheetId(urlOrId: string): string {
  if (!urlOrId) return "";
  const match = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : urlOrId.trim();
}

/**
 * Fetches sheet metadata to identify sheet titles and sheet IDs (sheetId).
 */
export async function fetchSpreadsheetMetadata(spreadsheetId: string, accessToken: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Không thể đọc cấu trúc Google Sheet (Status: ${res.status})`);
  }
  return await res.json();
}

/**
 * Creates a brand new Spreadsheet in the user's Google Drive.
 */
export async function createNewSpreadsheet(title: string, accessToken: string): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const url = "https://sheets.googleapis.com/v4/spreadsheets";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: title
      }
    })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Không thể tạo Google Sheet mới (Status: ${res.status})`);
  }
  const data = await res.json();
  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`
  };
}

/**
 * Automatically creates sheets "Bài viết", "Hình ảnh" and "Sản phẩm" in the Spreadsheet and writes headers & default values.
 */
export async function setupSpreadsheetTables(
  spreadsheetId: string,
  accessToken: string,
  currentArticles: GoogleArticle[],
  currentImages: GoogleImage[],
  currentProducts: any[] = []
) {
  // 1. Fetch metadata to check existing sheets
  const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const existingSheets = meta.sheets || [];
  const sheetTitles = existingSheets.map((s: any) => s.properties.title);

  const requests: any[] = [];
  const hasArticles = sheetTitles.includes("Bài viết");
  const hasImages = sheetTitles.includes("Hình ảnh");
  const hasProducts = sheetTitles.includes("Sản phẩm");

  if (!hasArticles) {
    requests.push({
      addSheet: {
        properties: { title: "Bài viết" }
      }
    });
  }
  if (!hasImages) {
    requests.push({
      addSheet: {
        properties: { title: "Hình ảnh" }
      }
    });
  }
  if (!hasProducts) {
    requests.push({
      addSheet: {
        properties: { title: "Sản phẩm" }
      }
    });
  }

  // 2. Add missing sheets if necessary
  if (requests.length > 0) {
    const batchRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requests })
    });
    if (!batchRes.ok) {
      const errorData = await batchRes.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Không thể khởi tạo tab trong Google Sheet.");
    }
  }

  // 3. Write Headers
  const articleHeaders = [["Tiêu đề", "Phân loại", "Tóm tắt", "Nội dung", "Hình ảnh", "Tác giả", "Ngày"]];
  const imageHeaders = [["Tiêu đề", "Phân loại", "Mô tả", "Hình ảnh"]];
  const productHeaders = [[
    "ID",
    "Tên sản phẩm",
    "Danh mục",
    "Phòng LAB",
    "Loại da",
    "Đánh giá",
    "Điểm đánh giá",
    "Số lượt đánh giá",
    "Giá khoảng",
    "Nhãn dán",
    "Số lượt test",
    "Phần trăm hot",
    "Hình ảnh",
    "Mô tả sản phẩm",
    "Thành phần",
    "Cách sử dụng",
    "Mẫu thử/Bao bì (JSON)"
  ]];

  await writeSheetValues(spreadsheetId, accessToken, "Bài viết!A1:G1", articleHeaders);
  await writeSheetValues(spreadsheetId, accessToken, "Hình ảnh!A1:D1", imageHeaders);
  await writeSheetValues(spreadsheetId, accessToken, "Sản phẩm!A1:R1", productHeaders);

  // Clear any existing content from row 2 to 1000 to prevent stale leftover rows
  await clearSheetValues(spreadsheetId, accessToken, "Bài viết!A2:G1000");
  await clearSheetValues(spreadsheetId, accessToken, "Hình ảnh!A2:D1000");
  await clearSheetValues(spreadsheetId, accessToken, "Sản phẩm!A2:S1000");

  // 4. Write all current content from the website
  if (currentArticles.length > 0) {
    const articleRows = currentArticles.map(p => [
      p.title || "",
      p.category || "",
      p.summary || "",
      p.content || "",
      p.image || "",
      p.author || "Cosbuilt",
      p.date || ""
    ]);
    await writeSheetValues(spreadsheetId, accessToken, "Bài viết!A2", articleRows);
  }

  if (currentImages.length > 0) {
    const imageRows = currentImages.map(img => [
      img.title || "",
      img.category || "",
      img.description || "",
      img.image || ""
    ]);
    await writeSheetValues(spreadsheetId, accessToken, "Hình ảnh!A2", imageRows);
  }

  if (currentProducts.length > 0) {
    const productRows = currentProducts.map(p => [
      p.id || "",
      p.title || "",
      p.category || "",
      p.lab || "Cosbuilt LAB",
      Array.isArray(p.skinTypes) ? p.skinTypes.join(", ") : (p.skinTypes || "Mọi loại da"),
      p.rating !== undefined ? Number(p.rating) : 5,
      p.ratingValue !== undefined ? Number(p.ratingValue) : 4.8,
      p.reviewsCount !== undefined ? Number(p.reviewsCount) : 120,
      p.priceRange || "",
      p.badge || "",
      p.testedCount !== undefined ? Number(p.testedCount) : 25,
      p.hotPercent !== undefined ? Number(p.hotPercent) : 50,
      p.image || "",
      p.description || "",
      p.ingredients || "",
      p.guidelines || "",
      JSON.stringify(p.packagings || [])
    ]);
    await writeSheetValues(spreadsheetId, accessToken, "Sản phẩm!A2", productRows);
  }

  return true;
}

/**
 * Helper to clear a specific range in Google Sheet.
 */
export async function clearSheetValues(spreadsheetId: string, accessToken: string, range: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  return res.ok;
}

/**
 * Helper to write/overwrite a specific range in Google Sheet.
 */
export async function writeSheetValues(
  spreadsheetId: string,
  accessToken: string,
  range: string,
  values: any[][]
) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Lỗi ghi dữ liệu vào Sheet range ${range}`);
  }
  return await res.json();
}

/**
 * Fetches all records from all sheets ("Bài viết", "Hình ảnh", and "Sản phẩm") and returns formatted arrays.
 */
export async function syncSpreadsheetData(spreadsheetId: string, accessToken: string) {
  // Fetch metadata first to see if tabs exist
  const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const sheetsList = (meta.sheets || []).map((s: any) => s.properties.title);

  let articles: GoogleArticle[] = [];
  let images: GoogleImage[] = [];
  let products: any[] = [];

  // 1. Fetch articles
  if (sheetsList.includes("Bài viết")) {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent("Bài viết!A2:G")}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (res.ok) {
      const data = await res.json();
      const rows = data.values || [];
      articles = rows.map((row: any) => ({
        title: row[0] || "",
        category: row[1] || "cẩm nang",
        summary: row[2] || "",
        content: row[3] || "",
        image: row[4] || "",
        author: row[5] || "Cosbuilt",
        date: row[6] || ""
      })).filter((item: any) => item.title && item.content);
    }
  }

  // 2. Fetch images
  if (sheetsList.includes("Hình ảnh")) {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent("Hình ảnh!A2:D")}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (res.ok) {
      const data = await res.json();
      const rows = data.values || [];
      images = rows.map((row: any) => ({
        title: row[0] || "",
        category: row[1] || "nhà máy",
        description: row[2] || "",
        image: row[3] || ""
      })).filter((item: any) => item.image);
    }
  }

  // 3. Fetch products
  if (sheetsList.includes("Sản phẩm")) {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent("Sản phẩm!A2:S")}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (res.ok) {
      const data = await res.json();
      const rows = data.values || [];
      products = rows.map((row: any) => {
        const skinTypesStr = row[4] || "Mọi loại da";
        const skinTypes = skinTypesStr.split(",").map((s: string) => s.trim()).filter(Boolean);
        let packagings: any[] = [];
        try {
          packagings = row[16] ? JSON.parse(row[16]) : [];
        } catch (e) {
          console.error("Lỗi parse packagings JSON", e);
        }
        return {
          id: row[0] || ("product_" + Math.random().toString(36).substring(2, 9)),
          title: row[1] || "Sản phẩm mới",
          category: row[2] || "makeup",
          lab: row[3] || "Cosbuilt LAB",
          skinTypes: skinTypes,
          rating: row[5] !== undefined && row[5] !== "" ? Number(row[5]) : 5,
          ratingValue: row[6] !== undefined && row[6] !== "" ? Number(row[6]) : 4.8,
          reviewsCount: row[7] !== undefined && row[7] !== "" ? Number(row[7]) : 120,
          priceRange: row[8] || "",
          badge: row[9] || "",
          testedCount: row[10] !== undefined && row[10] !== "" ? Number(row[10]) : 25,
          hotPercent: row[11] !== undefined && row[11] !== "" ? Number(row[11]) : 50,
          image: row[12] || "",
          description: row[13] || "",
          ingredients: row[14] || "",
          guidelines: row[15] || "",
          packagings: packagings
        };
      }).filter((item: any) => item.title);
    }
  }

  return { articles, images, products };
}

/**
 * Appends a row to a sheet.
 */
export async function appendSheetRow(
  spreadsheetId: string,
  accessToken: string,
  sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm",
  values: any[]
) {
  const range = `${sheetName}!A:A`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: [values] })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Lỗi khi thêm dòng mới vào Sheet ${sheetName}`);
  }
  return await res.json();
}

/**
 * Updates an existing row in Google Sheet.
 * Row number is index + 2 (since header is row 1, index 0 is row 2).
 */
export async function updateSheetRow(
  spreadsheetId: string,
  accessToken: string,
  sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm",
  index: number,
  values: any[]
) {
  const rowNum = index + 2;
  const lastCol = sheetName === "Bài viết" ? "G" : (sheetName === "Sản phẩm" ? "S" : "D");
  const range = `${sheetName}!A${rowNum}:${lastCol}${rowNum}`;
  return await writeSheetValues(spreadsheetId, accessToken, range, [values]);
}

/**
 * Deletes a row from Google Sheet by index using deleteDimension.
 */
export async function deleteSheetRow(
  spreadsheetId: string,
  accessToken: string,
  sheetName: "Bài viết" | "Hình ảnh" | "Sản phẩm",
  index: number
) {
  try {
    // 1. Fetch metadata to find correct sheetId
    const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
    const sheetObj = (meta.sheets || []).find((s: any) => s.properties.title === sheetName);
    
    if (!sheetObj) {
      throw new Error(`Không tìm thấy tab "${sheetName}" trong Google Sheet để xóa.`);
    }

    const sheetId = sheetObj.properties.sheetId;
    const startIndex = index + 1; // row index 1-based (startIndex inclusive, endIndex exclusive)
    const endIndex = index + 2;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: startIndex,
                endIndex: endIndex
              }
            }
          }
        ]
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Không thể thực hiện xóa dòng trên Sheet");
    }

    return await res.json();
  } catch (error: any) {
    console.error("Failed to delete sheet row using deleteDimension:", error);
    // Fallback: Clear values in that row instead
    const rowNum = index + 2;
    const lastCol = sheetName === "Bài viết" ? "G" : (sheetName === "Sản phẩm" ? "S" : "D");
    const range = `${sheetName}!A${rowNum}:${lastCol}${rowNum}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) {
      throw new Error(`Xóa thất bại hoàn toàn trên Google Sheet: ${error.message}`);
    }
    return { fallbackCleared: true };
  }
}

/**
 * Automatically creates sheet "Yêu cầu tư vấn" in the Spreadsheet and writes all current leads.
 */
export async function syncLeadsToSpreadsheet(
  spreadsheetId: string,
  accessToken: string,
  leads: any[]
): Promise<boolean> {
  // 1. Fetch metadata to check existing sheets
  const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const existingSheets = meta.sheets || [];
  const sheetTitles = existingSheets.map((s: any) => s.properties.title);

  const requests: any[] = [];
  const hasLeadsSheet = sheetTitles.includes("Yêu cầu tư vấn");

  if (!hasLeadsSheet) {
    requests.push({
      addSheet: {
        properties: { title: "Yêu cầu tư vấn" }
      }
    });
  }

  // 2. Add sheet if necessary
  if (requests.length > 0) {
    const batchRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requests })
    });
    if (!batchRes.ok) {
      const errorData = await batchRes.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Không thể khởi tạo tab Yêu cầu tư vấn.");
    }
  }

  // 3. Write Headers
  const leadHeaders = [[
    "Mã hồ sơ",
    "Họ tên khách hàng",
    "Số điện thoại",
    "Email",
    "Tên thương hiệu",
    "Danh mục quan tâm",
    "Số lượng dự kiến",
    "Lời nhắn từ khách",
    "Trạng thái xử lý",
    "Ghi chú quản trị",
    "Thời gian đăng ký"
  ]];

  await writeSheetValues(spreadsheetId, accessToken, "Yêu cầu tư vấn!A1:K1", leadHeaders);

  // Clear any existing content to prevent stale leftover rows
  await clearSheetValues(spreadsheetId, accessToken, "Yêu cầu tư vấn!A2:K1000");

  // 4. Write all leads
  if (leads.length > 0) {
    const leadRows = leads.map(l => [
      l.id || "",
      l.name || "",
      l.phone || "",
      l.email || "",
      l.brandName || "",
      l.category || "",
      l.moq || "",
      l.message || "",
      l.status || "Chờ xử lý",
      l.notes || "",
      l.createdAt ? new Date(l.createdAt).toLocaleString("vi-VN") : ""
    ]);
    await writeSheetValues(spreadsheetId, accessToken, "Yêu cầu tư vấn!A2", leadRows);
  }

  return true;
}

