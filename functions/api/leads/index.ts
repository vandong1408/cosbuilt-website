import type { Env } from "../../_shared/types";
import { requireStaff } from "../../_shared/auth";
import { allowDaily, tooManyRequests } from "../../_shared/rateLimit";

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

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = await requireStaff(request, env);
  if (unauthorized) return unauthorized;

  const { results } = await env.DB
    .prepare("SELECT * FROM leads ORDER BY createdAt DESC")
    .all<Lead>();
  return Response.json(results);
};

const LEAD_LIMITS = { name: 100, phone: 20, email: 254, brandName: 120, category: 100, moq: 20, message: 2000 } as const;
const PHONE_RE = /^\+?[0-9][0-9 ().-]{6,18}[0-9]$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEADS_PER_DAY = 10; // per IP

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!(await allowDaily(env, request, "lead", LEADS_PER_DAY))) return tooManyRequests();

  let body: Partial<Record<keyof typeof LEAD_LIMITS, unknown>>;
  try { body = await request.json(); } catch { return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 }); }

  // Only accept plain strings and cap their length, so the table cannot be filled with junk.
  const field = (key: keyof typeof LEAD_LIMITS): string => {
    const v = body[key];
    return typeof v === "string" ? v.trim().slice(0, LEAD_LIMITS[key]) : "";
  };
  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const brandName = field("brandName");
  const category = field("category");
  const moq = field("moq");
  const message = field("message");

  if (!name || !phone) {
    return Response.json({ error: "Họ tên và số điện thoại là bắt buộc" }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return Response.json({ error: "Số điện thoại không hợp lệ" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return Response.json({ error: "Email không hợp lệ" }, { status: 400 });
  }

  const newLead: Lead = {
    id: "lead_" + crypto.randomUUID().replace(/-/g, "").slice(0, 16),
    name,
    phone,
    email,
    brandName,
    category: category || "Chăm sóc da mặt",
    moq: moq || "1000",
    message,
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
