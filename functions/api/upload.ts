import type { Env } from "../_shared/types";
import { requireStaff } from "../_shared/auth";

// Raster images only. SVG is excluded on purpose: it can carry script, and uploads are
// served from the site's own origin.
const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp"
};
const MAX_BYTES = 5 * 1024 * 1024;

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Check the file's real signature, so a renamed file cannot pass as an image. */
function sniffImageExt(bytes: Uint8Array): string | null {
  const startsWith = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  if (startsWith([0x89, 0x50, 0x4e, 0x47])) return ".png";
  if (startsWith([0xff, 0xd8, 0xff])) return ".jpg";
  if (startsWith([0x47, 0x49, 0x46, 0x38])) return ".gif";
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) return ".webp";
  return null;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Image upload for content — admin and staff.
  const unauthorized = await requireStaff(request, env);
  if (unauthorized) return unauthorized;

  try {
    const { filename, base64 } = await request.json<{ filename?: string; base64?: string }>();
    if (!filename || !base64) {
      return Response.json({ error: "Thiếu tên file hoặc dữ liệu hình ảnh (base64)." }, { status: 400 });
    }

    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    // base64 is ~4/3 of the byte size; reject oversized payloads before decoding.
    if (cleanBase64.length > (MAX_BYTES * 4) / 3 + 4) {
      return Response.json({ error: "File quá lớn (tối đa 5 MB)." }, { status: 413 });
    }
    const bytes = base64ToUint8Array(cleanBase64);
    if (bytes.byteLength > MAX_BYTES) {
      return Response.json({ error: "File quá lớn (tối đa 5 MB)." }, { status: 413 });
    }

    // The extension must match the real content, not just the filename.
    const detected = sniffImageExt(bytes);
    if (!detected) {
      return Response.json({ error: "File không phải ảnh PNG, JPG, GIF hoặc WEBP hợp lệ." }, { status: 400 });
    }

    const dotIndex = filename.lastIndexOf(".");
    const baseName = (dotIndex >= 0 ? filename.slice(0, dotIndex) : filename).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 80) || "image";
    const uniqueFilename = `${baseName}_${Date.now()}${detected}`;

    await env.UPLOADS.put(uniqueFilename, bytes, {
      httpMetadata: { contentType: CONTENT_TYPES[detected] }
    });

    return Response.json({ success: true, url: `/uploads/${uniqueFilename}` });
  } catch (error: any) {
    // Log the detail server-side only; don't return internal error text to the client.
    console.error("Upload error:", error);
    return Response.json({ error: "Lỗi lưu file ảnh." }, { status: 500 });
  }
};
