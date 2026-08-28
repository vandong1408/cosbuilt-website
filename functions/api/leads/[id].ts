import type { Env } from "../../_shared/types";
import { requireAdmin, requireStaff } from "../../_shared/auth";

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  // Staff may update a lead's status/notes; only admin may delete (below).
  const unauthorized = await requireStaff(request, env);
  if (unauthorized) return unauthorized;

  const id = params.id as string;
  const { status, notes } = await request.json<{ status?: string; notes?: string }>();

  const existing = await env.DB.prepare("SELECT * FROM leads WHERE id = ?").bind(id).first();
  if (!existing) {
    return Response.json({ error: "Không tìm thấy khách hàng yêu cầu" }, { status: 404 });
  }

  const nextStatus = status !== undefined ? status : (existing as any).status;
  const nextNotes = notes !== undefined ? notes : (existing as any).notes;

  await env.DB
    .prepare("UPDATE leads SET status = ?, notes = ? WHERE id = ?")
    .bind(nextStatus, nextNotes, id)
    .run();

  const updated = await env.DB.prepare("SELECT * FROM leads WHERE id = ?").bind(id).first();
  return Response.json({ success: true, lead: updated });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const id = params.id as string;
  const result = await env.DB.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();

  if (!result.meta.changes) {
    return Response.json({ error: "Không tìm thấy khách hàng yêu cầu" }, { status: 404 });
  }

  return Response.json({ success: true, message: "Xóa thông tin khách hàng thành công" });
};
