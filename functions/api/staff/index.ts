import type { Env } from "../../_shared/types";
import { requireAdmin } from "../../_shared/auth";
import { hashPassword, randomHex, type StaffRow } from "../../_shared/staffAuth";

// Admin-only CRUD for staff accounts. Never returns password hashes/tokens.

const safe = (r: StaffRow) => ({
  id: r.id,
  username: r.username,
  displayName: r.display_name || r.username,
  active: !!r.active,
  createdAt: r.createdAt,
});

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const { results } = await env.DB
    .prepare("SELECT * FROM staff_accounts ORDER BY createdAt DESC")
    .all<StaffRow>();
  return Response.json((results || []).map(safe));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  let username = "";
  let password = "";
  let displayName = "";
  try {
    const b = await request.json<{ username?: string; password?: string; displayName?: string }>();
    username = (b.username || "").trim().toLowerCase();
    password = (b.password || "").trim();
    displayName = (b.displayName || "").trim();
  } catch {
    return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    return Response.json({ error: "Tên đăng nhập 3–32 ký tự, chỉ gồm chữ thường, số, dấu . _ -" }, { status: 400 });
  }
  if (password.length < 6) {
    return Response.json({ error: "Mật khẩu phải từ 6 ký tự trở lên." }, { status: 400 });
  }
  if (username === "admin") {
    return Response.json({ error: "Không thể dùng tên đăng nhập 'admin'." }, { status: 400 });
  }

  const existing = await env.DB.prepare("SELECT id FROM staff_accounts WHERE username = ?").bind(username).first();
  if (existing) {
    return Response.json({ error: "Tên đăng nhập đã tồn tại." }, { status: 409 });
  }

  const salt = randomHex(16);
  const password_hash = await hashPassword(password, salt);
  const row: StaffRow = {
    id: "staff_" + randomHex(8),
    username,
    display_name: displayName || username,
    password_hash,
    salt,
    token: null,
    active: 1,
    createdAt: new Date().toISOString(),
  };

  await env.DB
    .prepare(
      `INSERT INTO staff_accounts (id, username, display_name, password_hash, salt, token, active, createdAt)
       VALUES (?, ?, ?, ?, ?, NULL, 1, ?)`
    )
    .bind(row.id, row.username, row.display_name, row.password_hash, row.salt, row.createdAt)
    .run();

  return Response.json({ success: true, staff: safe(row) });
};
