import type { Env } from "../_shared/types";
import { getRole } from "../_shared/auth";

/**
 * Returns the role for the caller's bearer token so the admin UI can adapt what
 * it shows. 401 when the token matches neither ADMIN_TOKEN nor STAFF_TOKEN.
 */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const role = await getRole(request, env);
  if (!role) {
    return Response.json(
      { error: "Không có quyền truy cập. Vui lòng đăng nhập." },
      { status: 401 }
    );
  }
  return Response.json({ role });
};
