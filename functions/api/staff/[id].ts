import type { Env } from "../../_shared/types";
import { requireAdmin } from "../../_shared/auth";
import { hashPassword, randomHex, type StaffRow } from "../../_shared/staffAuth";

// Admin-only: update (rename / activate-deactivate / reset password) or delete a
// staff account. Deactivating or deleting clears its session token → instant
// revocation.

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const id = params.id as string;
  const row = await env.DB.prepare("SELECT * FROM staff_accounts WHERE id = ?").bind(id).first<StaffRow>();
  if (!row) return Response.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });

  let displayName: string | undefined;
  let active: boolean | undefined;
  let password: string | undefined;
  try {
    const b = await request.json<{ displayName?: string; active?: boolean; password?: string }>();
    if (b.displayName !== undefined) displayName = b.displayName.trim();
    if (b.active !== undefined) active = !!b.active;
    if (b.password !== undefined && b.password.trim() !== "") password = b.password.trim();
  } catch {
    return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const nextName = displayName !== undefined ? (displayName || row.username) : row.display_name;
  const nextActive = active !== undefined ? (active ? 1 : 0) : row.active;

  if (password !== undefined) {
    if (password.length < 6) {
      return Response.json({ error: "Mật khẩu phải từ 6 ký tự trở lên." }, { status: 400 });
    }
    const salt = randomHex(16);
    const hash = await hashPassword(password, salt);
    // Changing the password also clears the session token (forces re-login).
    await env.DB
      .prepare("UPDATE staff_accounts SET display_name = ?, active = ?, password_hash = ?, salt = ?, token = NULL WHERE id = ?")
      .bind(nextName, nextActive, hash, salt, id)
      .run();
  } else {
    // Deactivating clears the token so the account loses access immediately.
    const clearToken = nextActive === 0;
    await env.DB
      .prepare(`UPDATE staff_accounts SET display_name = ?, active = ?${clearToken ? ", token = NULL" : ""} WHERE id = ?`)
      .bind(nextName, nextActive, id)
      .run();
  }

  return Response.json({ success: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const id = params.id as string;
  const result = await env.DB.prepare("DELETE FROM staff_accounts WHERE id = ?").bind(id).run();
  if (!result.meta.changes) {
    return Response.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
  }
  return Response.json({ success: true });
};
