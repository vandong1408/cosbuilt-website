import type { Env } from "../../_shared/types";
import { hashPassword, timingSafeEqualHex, randomHex, type StaffRow } from "../../_shared/staffAuth";

/**
 * Unified login. Body: { username, password }.
 * Returns { role, token } to use as the Bearer token, or 401.
 * - password === ADMIN_TOKEN            -> admin (token = ADMIN_TOKEN)
 * - password === STAFF_TOKEN env secret -> staff (legacy shared password)
 * - matches an active staff account     -> staff (fresh random session token)
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_TOKEN) {
    return Response.json(
      { error: "Máy chủ chưa cấu hình ADMIN_TOKEN. Vui lòng đặt secret trong Cloudflare." },
      { status: 401 }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await request.json<{ username?: string; password?: string }>();
    username = (body.username || "").trim();
    password = (body.password || "").trim();
  } catch {
    return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  if (!password) {
    return Response.json({ error: "Vui lòng nhập mật khẩu." }, { status: 400 });
  }

  // Admin: password is the ADMIN_TOKEN itself.
  if (password === env.ADMIN_TOKEN) {
    return Response.json({ role: "admin", token: env.ADMIN_TOKEN });
  }
  // Legacy shared staff password (optional).
  if (env.STAFF_TOKEN && password === env.STAFF_TOKEN) {
    return Response.json({ role: "staff", token: env.STAFF_TOKEN });
  }

  // DB-backed staff account (username + password).
  if (username) {
    const row = await env.DB
      .prepare("SELECT * FROM staff_accounts WHERE username = ? AND active = 1")
      .bind(username.toLowerCase())
      .first<StaffRow>();
    if (row) {
      const computed = await hashPassword(password, row.salt);
      if (timingSafeEqualHex(computed, row.password_hash)) {
        // Issue a fresh session token and persist it (revocable server-side).
        const token = randomHex(24);
        await env.DB.prepare("UPDATE staff_accounts SET token = ? WHERE id = ?").bind(token, row.id).run();
        return Response.json({ role: "staff", token, displayName: row.display_name || row.username });
      }
    }
  }

  return Response.json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác." }, { status: 401 });
};
