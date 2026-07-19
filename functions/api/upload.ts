import type { Env } from "../_shared/types";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { filename, base64 } = await request.json<{ filename?: string; base64?: string }>();
    if (!filename || !base64) {
      return Response.json({ error: "Thiếu tên file hoặc dữ liệu hình ảnh (base64)." }, { status: 400 });
    }

    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const bytes = base64ToUint8Array(cleanBase64);

    const dotIndex = filename.lastIndexOf(".");
    const ext = dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : ".png";
    const baseName = (dotIndex >= 0 ? filename.slice(0, dotIndex) : filename).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${baseName}_${Date.now()}${ext}`;

    await env.UPLOADS.put(uniqueFilename, bytes, {
      httpMetadata: { contentType: CONTENT_TYPES[ext] || "application/octet-stream" }
    });

    return Response.json({ success: true, url: `/uploads/${uniqueFilename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return Response.json({ error: "Lỗi lưu file ảnh.", details: error.message }, { status: 500 });
  }
};
