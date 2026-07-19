import type { Env } from "../../_shared/types";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  brandName: string;
  category: string;
  moq: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB
    .prepare("SELECT * FROM leads ORDER BY createdAt DESC")
    .all<Lead>();
  return Response.json(results);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { name, phone, email, brandName, category, moq, message } = await request.json<Partial<Lead>>();
  if (!name || !phone) {
    return Response.json({ error: "Họ tên và số điện thoại là bắt buộc" }, { status: 400 });
  }

  const newLead: Lead = {
    id: "lead_" + Math.random().toString(36).substring(2, 11),
    name,
    phone,
    email: email || "",
    brandName: brandName || "",
    category: category || "Chăm sóc da mặt",
    moq: moq || "1000",
    message: message || "",
    status: "Chờ xử lý",
    notes: "",
    createdAt: new Date().toISOString()
  };

  await env.DB
    .prepare(
      `INSERT INTO leads (id, name, phone, email, brandName, category, moq, message, status, notes, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      newLead.id, newLead.name, newLead.phone, newLead.email, newLead.brandName,
      newLead.category, newLead.moq, newLead.message, newLead.status, newLead.notes, newLead.createdAt
    )
    .run();

  return Response.json({ success: true, lead: newLead });
};
