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
 * Automatically creates sheets "Bài viết" and "Hình ảnh" in the Spreadsheet and writes headers & default values.
 */
export async function setupSpreadsheetTables(
  spreadsheetId: string,
  accessToken: string,
  currentArticles: GoogleArticle[],
  currentImages: GoogleImage[]
) {
  // 1. Fetch metadata to check existing sheets
  const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const existingSheets = meta.sheets || [];
  const sheetTitles = existingSheets.map((s: any) => s.properties.title);

  const requests: any[] = [];
  const hasArticles = sheetTitles.includes("Bài viết");
  const hasImages = sheetTitles.includes("Hình ảnh");

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

  await writeSheetValues(spreadsheetId, accessToken, "Bài viết!A1:G1", articleHeaders);
  await writeSheetValues(spreadsheetId, accessToken, "Hình ảnh!A1:D1", imageHeaders);

  // Clear any existing content from row 2 to 1000 to prevent stale leftover rows
  await clearSheetValues(spreadsheetId, accessToken, "Bài viết!A2:G1000");
  await clearSheetValues(spreadsheetId, accessToken, "Hình ảnh!A2:D1000");

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
 * Fetches all records from both sheets ("Bài viết" and "Hình ảnh") and returns formatted arrays.
 */
export async function syncSpreadsheetData(spreadsheetId: string, accessToken: string) {
  // Fetch metadata first to see if tabs exist
  const meta = await fetchSpreadsheetMetadata(spreadsheetId, accessToken);
  const sheetsList = (meta.sheets || []).map((s: any) => s.properties.title);

  let articles: GoogleArticle[] = [];
  let images: GoogleImage[] = [];

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

  return { articles, images };
}

/**
 * Appends a row to a sheet.
 */
export async function appendSheetRow(
  spreadsheetId: string,
  accessToken: string,
  sheetName: "Bài viết" | "Hình ảnh",
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
  sheetName: "Bài viết" | "Hình ảnh",
  index: number,
  values: any[]
) {
  const rowNum = index + 2;
  const range = `${sheetName}!A${rowNum}:${sheetName === "Bài viết" ? "G" : "D"}${rowNum}`;
  return await writeSheetValues(spreadsheetId, accessToken, range, [values]);
}

/**
 * Deletes a row from Google Sheet by index using deleteDimension.
 */
export async function deleteSheetRow(
  spreadsheetId: string,
  accessToken: string,
  sheetName: "Bài viết" | "Hình ảnh",
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
    const range = `${sheetName}!A${rowNum}:${sheetName === "Bài viết" ? "G" : "D"}${rowNum}`;
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
