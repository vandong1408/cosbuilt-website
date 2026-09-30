// Trình quản lý nội dung trang landing ẩn /catalogue (CRM → Quản lý nội dung →
// "Landing page"). Hiển thị ngay trong trang quản trị (không phải popup).
// Mỗi phần được mô tả bằng SECTIONS; trình sửa tự dựng ô nhập theo mô tả đó.
// Lưu vào field `landingPage` của /api/sheets/data (admin & nhân viên).
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown, ArrowUp, ChevronDown, Copy, ExternalLink, Eye, EyeOff, ImagePlus, Loader2, Plus,
  RotateCcw, Save, Trash2, X,
} from "lucide-react";
import { authHeaders } from "../lib/adminAuth";
import { DEFAULT_LANDING, mergeLanding, type LandingContent } from "../lib/landingContent";

type Field =
  | { key: string; label: string; type: "text" | "textarea" | "image"; hint?: string }
  | { key: string; label: string; type: "strings"; itemLabel: string; hint?: string }
  | { key: string; label: string; type: "list"; itemLabel: string; titleKey: string; fields: Field[]; hint?: string };

type Section = { key: keyof LandingContent; label: string; desc: string; hideable?: boolean; fields: Field[] };

const SECTIONS: Section[] = [
  {
    key: "hero", label: "Phần đầu trang", desc: "Ảnh nền, tiêu đề lớn, nút bấm, số liệu và khung quy trình 4 bước.",
    fields: [
      { key: "image", label: "Ảnh nền", type: "image", hint: "Ảnh ngang, tối thiểu 1600px. Ảnh được phủ lớp tối để chữ dễ đọc." },
      { key: "badge", label: "Nhãn nhỏ phía trên tiêu đề", type: "text" },
      { key: "titleBefore", label: "Tiêu đề — phần đầu", type: "text" },
      { key: "titleHighlight", label: "Tiêu đề — cụm nổi bật (chữ màu vàng)", type: "text" },
      { key: "titleAfter", label: "Tiêu đề — phần cuối", type: "text" },
      { key: "subtitle", label: "Đoạn mô tả", type: "textarea" },
      { key: "primaryCta", label: "Chữ nút chính", type: "text" },
      { key: "secondaryCta", label: "Chữ nút Zalo", type: "text" },
      { key: "stats", label: "Số liệu nổi bật (tối đa 3)", type: "list", itemLabel: "số liệu", titleKey: "value", fields: [
        { key: "value", label: "Con số", type: "text" }, { key: "label", label: "Mô tả", type: "text" },
      ] },
      { key: "stepsTitle", label: "Tiêu đề khung quy trình", type: "text" },
      { key: "steps", label: "Các bước trong khung", type: "list", itemLabel: "bước", titleKey: "title", fields: [
        { key: "title", label: "Tên bước", type: "text" }, { key: "desc", label: "Mô tả ngắn", type: "text" },
      ] },
      { key: "trustTitle", label: "Ô chứng nhận — dòng đậm", type: "text" },
      { key: "trustDesc", label: "Ô chứng nhận — dòng mô tả", type: "text" },
    ],
  },
  {
    key: "categories", label: "Danh mục sản phẩm", desc: "Các nhóm sản phẩm gia công, mỗi nhóm có ảnh, mô tả và danh sách dòng sản phẩm.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "items", label: "Danh mục", type: "list", itemLabel: "danh mục", titleKey: "title", fields: [
        { key: "title", label: "Tên danh mục", type: "text" },
        { key: "image", label: "Ảnh", type: "image" },
        { key: "description", label: "Mô tả", type: "textarea" },
        { key: "points", label: "Các dòng sản phẩm", type: "strings", itemLabel: "dòng sản phẩm" },
        { key: "tags", label: "Nhãn đặc điểm (hiển thị dạng thẻ vàng)", type: "strings", itemLabel: "nhãn" },
      ] },
    ],
  },
  {
    key: "factory", label: "Năng lực nhà máy", desc: "Số liệu công suất, bộ ảnh nhà máy/lab và các thế mạnh.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "capacity", label: "Số liệu công suất", type: "list", itemLabel: "số liệu", titleKey: "label", fields: [
        { key: "value", label: "Con số", type: "text" }, { key: "unit", label: "Đơn vị", type: "text" }, { key: "label", label: "Mô tả", type: "text" },
      ] },
      { key: "images", label: "Ảnh nhà máy / phòng lab", type: "list", itemLabel: "ảnh", titleKey: "title", hint: "Để TRỐNG danh sách này để dùng ảnh trong mục \"Thư viện ảnh\" (khuyên dùng — sửa một nơi, cả trang chủ lẫn landing cùng đổi). Chỉ thêm ảnh ở đây nếu muốn landing có bộ ảnh riêng.", fields: [
        { key: "image", label: "Ảnh", type: "image" }, { key: "title", label: "Tiêu đề ảnh", type: "text" }, { key: "description", label: "Mô tả ngắn", type: "textarea" },
      ] },
      { key: "strengths", label: "Thế mạnh / chứng nhận nhà máy", type: "strings", itemLabel: "thế mạnh" },
    ],
  },
  {
    key: "rnd", label: "R&D đồng hành", desc: "Giới thiệu nhà nghiên cứu trưởng.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "image", label: "Ảnh chân dung", type: "image", hint: "Để trống sẽ dùng ảnh nhà nghiên cứu trong Thư viện ảnh." },
      { key: "badge", label: "Nhãn chức danh", type: "text" },
      { key: "name", label: "Họ tên", type: "text" },
      { key: "role", label: "Vai trò", type: "text" },
      { key: "intro", label: "Giới thiệu", type: "textarea" },
      { key: "bullets", label: "Điểm nổi bật", type: "strings", itemLabel: "điểm" },
      { key: "awards", label: "Giải thưởng", type: "strings", itemLabel: "giải thưởng" },
      { key: "cta", label: "Chữ nút", type: "text" },
    ],
  },
  {
    key: "services", label: "Vì sao chọn Cosbuilt", desc: "Các thẻ dịch vụ / lợi ích.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "items", label: "Thẻ lợi ích", type: "list", itemLabel: "thẻ", titleKey: "title", fields: [
        { key: "title", label: "Tiêu đề", type: "text" }, { key: "description", label: "Mô tả", type: "textarea" },
      ] },
    ],
  },
  {
    key: "process", label: "Quy trình", desc: "Các bước hợp tác từ tư vấn đến bàn giao.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "steps", label: "Các bước", type: "list", itemLabel: "bước", titleKey: "title", fields: [
        { key: "title", label: "Tên bước", type: "text" }, { key: "detail", label: "Mô tả", type: "textarea" },
      ] },
    ],
  },
  {
    key: "certifications", label: "Chứng nhận", desc: "Tiêu đề phần chứng nhận. Danh sách chứng nhận lấy từ mục \"Chứng nhận\" bên trái.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
    ],
  },
  {
    key: "form", label: "Form tư vấn", desc: "Chữ quanh form và các lựa chọn nhóm sản phẩm. Khách gửi form sẽ vào tab Khách hàng (CRM).",
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "desc", label: "Mô tả", type: "textarea" },
      { key: "benefits", label: "Cam kết (tối đa 3 dòng)", type: "strings", itemLabel: "cam kết" },
      { key: "formTitle", label: "Tiêu đề form", type: "text" },
      { key: "formSubtitle", label: "Dòng phụ dưới tiêu đề form", type: "text" },
      { key: "categoryOptions", label: "Lựa chọn \"Nhóm sản phẩm quan tâm\"", type: "strings", itemLabel: "lựa chọn" },
      { key: "successTitle", label: "Tiêu đề khi gửi thành công", type: "text" },
      { key: "successDesc", label: "Lời nhắn khi gửi thành công", type: "text" },
    ],
  },
  {
    key: "faq", label: "Câu hỏi thường gặp", desc: "Danh sách hỏi – đáp.", hideable: true,
    fields: [
      { key: "eyebrow", label: "Nhãn nhỏ", type: "text" },
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "items", label: "Câu hỏi", type: "list", itemLabel: "câu hỏi", titleKey: "q", fields: [
        { key: "q", label: "Câu hỏi", type: "text" }, { key: "a", label: "Trả lời", type: "textarea" },
      ] },
    ],
  },
  {
    key: "cta", label: "Kêu gọi cuối trang", desc: "Khung màu tối trước chân trang.", hideable: true,
    fields: [
      { key: "titleBefore", label: "Tiêu đề — phần đầu", type: "text" },
      { key: "titleHighlight", label: "Tiêu đề — cụm nổi bật", type: "text" },
      { key: "desc", label: "Mô tả", type: "text" },
      { key: "button", label: "Chữ nút", type: "text" },
    ],
  },
  {
    key: "contact", label: "Thông tin liên hệ", desc: "Hotline, Zalo và địa chỉ dùng trên toàn trang (nút gọi, nút Zalo, khung liên hệ).",
    fields: [
      { key: "hotline", label: "Hotline", type: "text" },
      { key: "zalo", label: "Link Zalo", type: "text", hint: "Dạng https://zalo.me/0966373686" },
      { key: "hours", label: "Giờ làm việc", type: "text" },
      { key: "office", label: "Địa chỉ văn phòng", type: "text" },
      { key: "factory", label: "Địa chỉ nhà máy", type: "text" },
    ],
  },
];

type Json = any;

// Giá trị rỗng cho 1 mục mới trong danh sách, theo mô tả trường.
const emptyItem = (fields: Field[]) =>
  Object.fromEntries(fields.map((f) => [f.key, f.type === "strings" || f.type === "list" ? [] : ""]));

const move = <T,>(arr: T[], from: number, to: number) => {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
};

const inputCls = "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/15 outline-none transition";
const iconBtn = "grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg border border-stone-200 bg-white text-stone-500 hover:text-emerald-green hover:border-emerald-green/40 disabled:opacity-30 disabled:pointer-events-none transition";

function Label({ field }: { field: Field }) {
  return (
    <div className="mb-1.5">
      <span className="text-xs font-bold text-stone-700">{field.label}</span>
      {field.hint && <span className="block text-[11px] text-stone-400 mt-0.5">{field.hint}</span>}
    </div>
  );
}

function ImageInput({ value, onChange, onUpload }: { value: string; onChange: (v: string) => void; onUpload: (f: File) => Promise<string> }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await onUpload(file));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Tải ảnh thất bại");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative h-28 w-full sm:w-40 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[11px] text-stone-400">Chưa có ảnh</div>}
        {busy && <div className="absolute inset-0 grid place-items-center bg-white/70"><Loader2 className="w-5 h-5 animate-spin text-emerald-green" /></div>}
      </div>
      <div className="flex-1 space-y-2">
        <input className={inputCls} placeholder="Dán link ảnh (https://...) hoặc tải ảnh lên" value={value} onChange={(e) => onChange(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-green px-3 py-2 text-xs font-bold text-white hover:bg-emerald-green-dark disabled:opacity-60">
            <ImagePlus className="w-3.5 h-3.5" /> {busy ? "Đang tải…" : "Tải ảnh lên"}
          </button>
          {value && (
            <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-red-600">
              <X className="w-3.5 h-3.5" /> Bỏ ảnh
            </button>
          )}
        </div>
        {err && <p className="text-xs text-red-600">{err}</p>}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      </div>
    </div>
  );
}

function StringsInput({ value, onChange, itemLabel }: { value: string[]; onChange: (v: string[]) => void; itemLabel: string }) {
  return (
    <div className="space-y-2">
      {value.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputCls} value={s} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
          <button type="button" className={iconBtn} title="Lên" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))}><ArrowUp className="w-3.5 h-3.5" /></button>
          <button type="button" className={iconBtn} title="Xuống" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))}><ArrowDown className="w-3.5 h-3.5" /></button>
          <button type="button" className={`${iconBtn} hover:!text-red-600`} title="Xóa" onClick={() => onChange(value.filter((_, j) => j !== i))}><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ""])} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-green hover:underline">
        <Plus className="w-3.5 h-3.5" /> Thêm {itemLabel}
      </button>
    </div>
  );
}

function FieldInput({ field, value, onChange, onUpload }: { field: Field; value: Json; onChange: (v: Json) => void; onUpload: (f: File) => Promise<string> }) {
  if (field.type === "text") return <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  if (field.type === "textarea") return <textarea className={`${inputCls} min-h-24 resize-y`} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  if (field.type === "image") return <ImageInput value={value ?? ""} onChange={onChange} onUpload={onUpload} />;
  if (field.type === "strings") return <StringsInput value={Array.isArray(value) ? value : []} onChange={onChange} itemLabel={field.itemLabel} />;
  if (field.type === "list") return <ListInput field={field} value={Array.isArray(value) ? value : []} onChange={onChange} onUpload={onUpload} />;
  return null;
}

function ListInput({ field, value, onChange, onUpload }: { field: Extract<Field, { type: "list" }>; value: Json[]; onChange: (v: Json[]) => void; onUpload: (f: File) => Promise<string> }) {
  const [open, setOpen] = useState<number | null>(null);
  const imageKey = field.fields.find((f) => f.type === "image")?.key;
  return (
    <div className="space-y-2">
      {value.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`rounded-2xl border bg-white ${isOpen ? "border-emerald-green/40 shadow-sm" : "border-stone-200"}`}>
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5">
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex flex-1 min-w-0 items-center gap-2 sm:gap-3 text-left">
                {imageKey && (
                  <span className="hidden sm:block h-10 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    {item?.[imageKey] && <img src={item[imageKey]} alt="" className="h-full w-full object-cover" />}
                  </span>
                )}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-green-light text-[10px] font-bold text-emerald-green">{i + 1}</span>
                <span className="line-clamp-2 text-[13px] sm:text-sm font-semibold leading-snug text-stone-800">{item?.[field.titleKey] || <em className="font-normal text-stone-400">({field.itemLabel} chưa có tên)</em>}</span>
                <ChevronDown className={`ml-auto w-4 h-4 shrink-0 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <button type="button" className={iconBtn} title="Lên" disabled={i === 0} onClick={() => { onChange(move(value, i, i - 1)); setOpen(isOpen ? i - 1 : open); }}><ArrowUp className="w-3.5 h-3.5" /></button>
              <button type="button" className={iconBtn} title="Xuống" disabled={i === value.length - 1} onClick={() => { onChange(move(value, i, i + 1)); setOpen(isOpen ? i + 1 : open); }}><ArrowDown className="w-3.5 h-3.5" /></button>
              <button type="button" className={`${iconBtn} hidden sm:grid`} title="Nhân bản" onClick={() => { const next = [...value]; next.splice(i + 1, 0, structuredClone(item)); onChange(next); }}><Copy className="w-3.5 h-3.5" /></button>
              <button type="button" className={`${iconBtn} hover:!text-red-600`} title="Xóa"
                onClick={() => { if (window.confirm(`Xóa ${field.itemLabel} "${item?.[field.titleKey] || i + 1}"?`)) { onChange(value.filter((_, j) => j !== i)); setOpen(null); } }}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {isOpen && (
              <div className="space-y-4 border-t border-stone-100 p-4">
                {field.fields.map((f) => (
                  <div key={f.key}>
                    <Label field={f} />
                    <FieldInput field={f} value={item?.[f.key]} onUpload={onUpload}
                      onChange={(v) => onChange(value.map((x, j) => (j === i ? { ...x, [f.key]: v } : x)))} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <button type="button" onClick={() => { onChange([...value, emptyItem(field.fields)]); setOpen(value.length); }}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-emerald-green/40 px-4 py-2.5 text-xs font-bold text-emerald-green hover:bg-emerald-green-light">
        <Plus className="w-3.5 h-3.5" /> Thêm {field.itemLabel}
      </button>
    </div>
  );
}

export default function LandingPageManager({ onUpload }: { onUpload: (file: File) => Promise<string> }) {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [saved, setSaved] = useState("");
  const [active, setActive] = useState<keyof LandingContent>("hero");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/api/sheets/data")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Lỗi ${r.status}`))))
      .then((data) => {
        const merged = mergeLanding(data.landingPage);
        setContent(merged);
        setSaved(JSON.stringify(merged));
      })
      .catch((e) => setLoadError(e.message || "Không tải được nội dung"));
  }, []);

  const dirty = useMemo(() => !!content && JSON.stringify(content) !== saved, [content, saved]);

  // Cảnh báo khi đóng tab/tải lại trang lúc còn thay đổi chưa lưu.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/sheets/data", { method: "POST", headers: authHeaders(true), body: JSON.stringify({ landingPage: content }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || (res.status === 401 ? "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại." : `Lỗi ${res.status}`));
      setSaved(JSON.stringify(content));
      setMsg({ text: "Đã lưu! Trang /catalogue đã cập nhật.", type: "success" });
    } catch (e) {
      setMsg({ text: e instanceof Error ? e.message : "Lưu thất bại", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loadError) return <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">Không tải được nội dung landing page: {loadError}</div>;
  if (!content) return <div className="grid place-items-center rounded-3xl border border-stone-200 bg-white p-16"><Loader2 className="w-6 h-6 animate-spin text-emerald-green" /></div>;

  const section = SECTIONS.find((s) => s.key === active)!;
  const part = content[active] as Record<string, Json>;
  const setPart = (next: Record<string, Json>) => setContent({ ...content, [active]: next } as LandingContent);

  return (
    <div className="space-y-5">
      {/* Thanh công cụ */}
      <div className="sticky top-2 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl border border-stone-200 bg-white/95 backdrop-blur p-4 shadow-sm">
        <div>
          <h3 className="font-serif font-bold text-lg text-stone-900">Landing page /catalogue</h3>
          <p className="text-[11px] text-stone-500">
            Trang ẩn, chỉ ai có link mới xem được.{" "}
            {dirty ? <span className="font-bold text-amber-600">● Có thay đổi chưa lưu</span> : <span className="text-emerald-green">Đã lưu</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/catalogue" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-700 hover:border-emerald-green hover:text-emerald-green">
            <ExternalLink className="w-3.5 h-3.5" /> Xem trang
          </a>
          <button type="button" onClick={save} disabled={!dirty || saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-green px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-green/20 hover:bg-emerald-green-dark disabled:opacity-50">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Lưu thay đổi
          </button>
        </div>
      </div>
      {msg && (
        <div className={`rounded-2xl border px-4 py-3 text-xs font-medium ${msg.type === "success" ? "border-emerald-green/20 bg-emerald-green/5 text-emerald-green-dark" : "border-red-100 bg-red-50 text-red-700"}`}>{msg.text}</div>
      )}

      <div className="grid md:grid-cols-[210px_1fr] gap-5">
        {/* Danh sách phần */}
        <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 [scrollbar-width:none]">
          {SECTIONS.map((s) => {
            const isActive = s.key === active;
            const hidden = s.hideable && (content[s.key] as { hidden?: boolean }).hidden;
            return (
              <button key={s.key} type="button" onClick={() => setActive(s.key)}
                className={`shrink-0 flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-xs transition whitespace-nowrap ${isActive ? "bg-emerald-green text-white font-bold" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-medium"}`}>
                <span className={hidden ? "line-through opacity-60" : ""}>{s.label}</span>
                {hidden && <EyeOff className="w-3.5 h-3.5 shrink-0 opacity-70" />}
              </button>
            );
          })}
        </nav>

        {/* Nội dung phần đang chọn */}
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-4 sm:p-6 space-y-5 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-stone-900">{section.label}</h4>
              <p className="text-xs text-stone-500 mt-0.5">{section.desc}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {section.hideable && (
                <button type="button" onClick={() => setPart({ ...part, hidden: !part.hidden })}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border ${part.hidden ? "border-amber-300 bg-amber-50 text-amber-700" : "border-stone-200 bg-white text-stone-600"}`}>
                  {part.hidden ? <><EyeOff className="w-3.5 h-3.5" /> Đang ẩn</> : <><Eye className="w-3.5 h-3.5" /> Đang hiển thị</>}
                </button>
              )}
              <button type="button" title="Khôi phục nội dung gốc cho phần này"
                onClick={() => { if (window.confirm(`Khôi phục nội dung gốc cho phần "${section.label}"? (chưa lưu cho tới khi bấm Lưu)`)) setPart(structuredClone(DEFAULT_LANDING[active]) as Record<string, Json>); }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-600 hover:text-emerald-green">
                <RotateCcw className="w-3.5 h-3.5" /> Mặc định
              </button>
            </div>
          </div>

          {section.fields.map((f) => (
            <div key={f.key} className={f.type === "list" || f.type === "strings" ? "rounded-2xl border border-stone-200 bg-white/60 p-4" : ""}>
              <Label field={f} />
              <FieldInput field={f} value={part[f.key]} onUpload={onUpload} onChange={(v) => setPart({ ...part, [f.key]: v })} />
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button type="button" onClick={save} disabled={!dirty || saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-green px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-green-dark disabled:opacity-50">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
