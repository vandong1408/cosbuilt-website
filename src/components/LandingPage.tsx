// Trang landing ẩn (không có trong menu/sitemap, gắn noindex) — chỉ ai có link
// mới xem được. Đường dẫn cấu hình ở LANDING_PATH (src/main.tsx dùng hằng này).
// Bố cục tham khảo trang "Sản xuất mỹ phẩm theo định hướng" của AstraCos,
// nội dung lấy từ data.ts + dữ liệu live (/api/sheets/data).
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight, Award, Boxes, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  Clock, FileText, FlaskConical, Gem, Lock, MapPin, MessageCircle, Palette, Phone,
  ShieldCheck, Truck,
} from "lucide-react";
import {
  ABOUT_SECTIONS, DEFAULT_GALLERY_IMAGES, MANUFACTURING_CATEGORIES, RESEARCHER_HUR, SERVICES,
} from "../data";

export const LANDING_PATH = "/catalogue";

const HOTLINE = "0966 373 686";
const ZALO_URL = "https://zalo.me/0966373686";

const HERO_STEPS = ["Tiếp nhận yêu cầu", "Phát triển mẫu", "Xác nhận mẫu", "Sản xuất"];

const HERO_STATS = [
  { value: "ISO 22716", label: "GMP · US FDA MoCRA" },
  { value: "3.500+", label: "Công thức độc quyền" },
  { value: "500–1.000", label: "MOQ lô đầu tiên" },
  { value: "24M+", label: "Mặt nạ / năm" },
];

const PROCESS_STEPS = [
  { title: "Tiếp nhận & tư vấn", detail: "Tiếp nhận brief về tệp khách hàng, mức giá, concept và thành phần mong muốn; tư vấn định hướng dòng sản phẩm phù hợp." },
  { title: "R&D lên mẫu thử", detail: "Phòng R&D phát triển mẫu thử (test sample) gửi khách duyệt hương thơm, thể kem, màu sắc — tinh chỉnh theo phản hồi." },
  { title: "Chốt công thức & báo giá", detail: "Thống nhất công thức, lựa chọn bao bì và gửi báo giá chi tiết theo số lượng." },
  { title: "Hợp đồng & công bố", detail: "Ký hợp đồng gia công, Cosbuilt thay mặt thương hiệu thực hiện kiểm nghiệm và hồ sơ công bố mỹ phẩm." },
  { title: "Sản xuất hàng loạt", detail: "Sản xuất trên dây chuyền tự động khép kín, chiết rót và đóng gói hoàn thiện theo chuẩn ISO 22716 / GMP." },
  { title: "QC & bàn giao", detail: "Kiểm tra chất lượng cuối cùng theo từng lô, bàn giao sản phẩm và đồng hành hỗ trợ sau bán hàng." },
];

const FAQS = [
  { q: "MOQ gia công tối thiểu là bao nhiêu?", a: "Với lô hàng đầu tiên, Cosbuilt hỗ trợ chia nhỏ lô thử nghiệm từ 500–1.000 đơn vị để giảm áp lực tồn kho cho thương hiệu mới. MOQ cụ thể tùy dòng sản phẩm và bao bì." },
  { q: "Thời gian phát triển sản phẩm mất bao lâu?", a: "Mẫu thử thường có sau khoảng 1–2 tuần kể từ khi chốt brief. Thời gian sản xuất hàng loạt phụ thuộc số lượng, bao bì và hồ sơ công bố — chuyên viên sẽ báo tiến độ chi tiết khi báo giá." },
  { q: "Cosbuilt có hỗ trợ thương hiệu mới không?", a: "Có. Chúng tôi hỗ trợ từ định vị thương hiệu, chọn công thức từ thư viện 3.500+ công thức sẵn có, thiết kế bao bì miễn phí đến tư liệu hình ảnh/video nhà máy phục vụ marketing." },
  { q: "Cosbuilt có hỗ trợ công bố sản phẩm không?", a: "Có. Cosbuilt thay mặt doanh nghiệp kiểm nghiệm vi sinh, kim loại nặng, soạn hồ sơ công bố gửi Bộ Y tế và hỗ trợ CFS cho sản phẩm xuất khẩu." },
  { q: "Công thức của tôi có được bảo mật không?", a: "Tuyệt đối. Thông tin dự án và công thức gia công độc quyền được bảo mật theo hợp đồng." },
];

const SERVICE_ICONS: Record<string, typeof Boxes> = {
  Boxes, FlaskConical, Palette, FileText, Truck, Gem,
};

const CATEGORY_OPTIONS = ["Chăm sóc da mặt", "Chăm sóc cơ thể", "Chăm sóc tóc", "Trang điểm", "Chăm sóc cá nhân", "Khác"];

type GalleryItem = { title: string; description?: string; image: string };
type Cert = { name: string; issuer?: string; description?: string; image?: string };

function useLandingMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Gia công mỹ phẩm theo định hướng riêng | Cosbuilt";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);
}

function SectionHeading({ eyebrow, title, desc, light }: { eyebrow: string; title: string; desc?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${light ? "text-satin-gold" : "text-emerald-green"}`}>{eyebrow}</span>
      <h2 className={`font-serif text-3xl md:text-4xl font-bold mt-3 leading-tight ${light ? "text-white" : "text-stone-900"}`}>{title}</h2>
      {desc && <p className={`mt-4 text-sm md:text-base leading-relaxed ${light ? "text-stone-300" : "text-stone-600"}`}>{desc}</p>}
    </div>
  );
}

export default function LandingPage() {
  useLandingMeta();

  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY_IMAGES);
  const [certs, setCerts] = useState<Cert[]>(ABOUT_SECTIONS.certifications.list);
  const [researcherImage, setResearcherImage] = useState(RESEARCHER_HUR.image);
  const [openCategory, setOpenCategory] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", phone: "", email: "", brandName: "", category: CATEGORY_OPTIONS[0], moq: "1000", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/api/sheets/data")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (Array.isArray(data.images) && data.images.length) setGallery(data.images.filter((i: GalleryItem) => i?.image));
        if (Array.isArray(data.certifications) && data.certifications.length) setCerts(data.certifications);
        if (data.researcherImage) setResearcherImage(data.researcherImage);
      })
      .catch(() => {});
  }, []);

  const scrollGallery = (dir: 1 | -1) => {
    const el = galleryRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    setFormState("sending");
    setFormError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `[Landing page] ${form.message}`.trim() }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Gửi thất bại");
      setFormState("done");
    } catch (err) {
      setFormState("error");
      setFormError(err instanceof Error ? err.message : "Gửi thất bại, vui lòng thử lại hoặc gọi hotline.");
    }
  };

  const inputCls = "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-emerald-green focus:ring-2 focus:ring-emerald-green/15 transition";
  const whyItems = SERVICES.filter((s) => !s.title.startsWith("Quy trình"));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="font-serif font-bold text-xl tracking-wider text-emerald-green">COSBUILT</a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a href="#danh-muc" className="hover:text-emerald-green">Sản phẩm</a>
            <a href="#nha-may" className="hover:text-emerald-green">Nhà máy</a>
            <a href="#rnd" className="hover:text-emerald-green">R&amp;D</a>
            <a href="#quy-trinh" className="hover:text-emerald-green">Quy trình</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${HOTLINE.replace(/\s/g, "")}`} className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Hotline</span>
              <span className="text-sm font-bold text-emerald-green">{HOTLINE}</span>
            </a>
            <a href="#tu-van" className="rounded-full bg-emerald-green px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-green-dark transition">Nhận tư vấn</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden bg-stone-950 text-white">
        <img src={gallery[0]?.image || DEFAULT_GALLERY_IMAGES[0].image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-green-dark/95 via-stone-950/85 to-stone-950/60" />
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-satin-gold">Nhà máy gia công / sản xuất mỹ phẩm OEM · ODM Hàn Quốc</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mt-5 max-w-3xl">
            Sản xuất mỹ phẩm theo <em className="text-satin-gold">định hướng riêng</em> của thương hiệu
          </h1>
          <p className="mt-6 max-w-2xl text-stone-300 text-sm md:text-base leading-relaxed">
            Phát triển serum, kem dưỡng, mặt nạ, chăm sóc tóc, trang điểm và chăm sóc cá nhân — do chính đội ngũ nhà nghiên cứu Hàn Quốc tạo ra, sản xuất tại 2 nhà máy chuẩn ISO 22716 / GMP ở Incheon & Gimpo.
          </p>
          <ol className="mt-8 flex flex-wrap gap-2">
            {HERO_STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs">
                <span className="font-mono text-satin-gold">0{i + 1}</span>{s}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#tu-van" className="inline-flex items-center gap-2 rounded-full bg-satin-gold px-6 py-3 text-sm font-bold text-stone-950 hover:bg-satin-gold-dark transition">
              Nhận tư vấn sản phẩm <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
              <MessageCircle className="w-4 h-4" /> Tư vấn qua Zalo
            </a>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-stone-950/60 px-5 py-5">
                <div className="font-serif text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-stone-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Danh mục */}
      <section id="danh-muc" className="max-w-6xl mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="Danh mục phát triển"
          title="Từ ý tưởng thị trường đến sản phẩm mang dấu ấn riêng"
          desc="Định hướng công thức, kết cấu và trải nghiệm sử dụng theo tệp khách hàng mục tiêu của thương hiệu."
        />
        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {MANUFACTURING_CATEGORIES.map((c, i) => {
              const open = openCategory === i;
              return (
                <div key={c.id}>
                  <button type="button" onClick={() => setOpenCategory(i)} className="w-full flex items-center gap-4 py-5 text-left" aria-expanded={open}>
                    <span className={`font-mono text-sm ${open ? "text-emerald-green" : "text-stone-400"}`}>0{i + 1}</span>
                    <span className={`flex-1 font-semibold text-sm md:text-base ${open ? "text-emerald-green" : "text-stone-800"}`}>{c.title.replace(/^Gia công /, "")}</span>
                    <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="pb-6 pl-9 pr-2">
                      <p className="text-sm text-stone-600 leading-relaxed">{c.description}</p>
                      <ul className="mt-4 space-y-2">
                        {c.subCategories.map((s) => (
                          <li key={s} className="flex gap-2 text-sm text-stone-700"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-green" />{s}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.features.map((f) => (
                          <span key={f} className="rounded-full bg-emerald-green-light px-3 py-1 text-[11px] font-medium text-emerald-green-dark">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-3xl bg-stone-200 lg:sticky lg:top-24">
            <img key={openCategory} src={MANUFACTURING_CATEGORIES[openCategory].image} alt={MANUFACTURING_CATEGORIES[openCategory].title} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="font-serif text-xl text-white">{MANUFACTURING_CATEGORIES[openCategory].title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nhà máy */}
      <section id="nha-may" className="bg-stone-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading light eyebrow="Năng lực nhà máy" title="Không gian sản xuất chuyên nghiệp dành cho thương hiệu" desc={ABOUT_SECTIONS.factory.description} />
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={() => scrollGallery(-1)} aria-label="Ảnh trước" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
              <button type="button" onClick={() => scrollGallery(1)} aria-label="Ảnh sau" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div ref={galleryRef} className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((g) => (
              <figure key={g.image + g.title} className="snap-start shrink-0 w-[80%] sm:w-[45%] lg:w-[31%]">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-800">
                  <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <figcaption className="mt-3">
                  <p className="font-semibold text-sm">{g.title}</p>
                  {g.description && <p className="mt-1 text-xs text-stone-400 leading-relaxed">{g.description}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-3">
            {ABOUT_SECTIONS.factory.strengths.map((s) => (
              <li key={s} className="flex gap-3 text-sm text-stone-300"><ShieldCheck className="w-5 h-5 shrink-0 text-satin-gold" />{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* R&D */}
      <section id="rnd" className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-green-light to-stone-200">
            {researcherImage ? (
              <img src={researcherImage} alt={RESEARCHER_HUR.name} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="grid h-full place-items-center font-serif text-7xl text-emerald-green/40">{RESEARCHER_HUR.initials}</div>
            )}
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-xl shadow-stone-900/10 border border-stone-100">
            <p className="font-serif font-bold text-stone-900">{RESEARCHER_HUR.name}</p>
            <p className="text-xs text-stone-500 mt-0.5">{RESEARCHER_HUR.role}</p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="R&D đồng hành" title="Công thức bắt đầu từ bài toán kinh doanh" desc={RESEARCHER_HUR.intro} />
          <ul className="mt-6 space-y-3">
            {["Tư vấn concept và cấu trúc danh mục sản phẩm", "Phát triển, tinh chỉnh mẫu theo phản hồi của thương hiệu", "Định hướng bao bì và hồ sơ công bố", "Kiểm soát chất lượng theo từng lô"].map((s) => (
              <li key={s} className="flex gap-3 text-sm text-stone-700"><CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-green" />{s}</li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-satin-gold/30 bg-satin-gold-light/60 p-4 space-y-1.5">
            {RESEARCHER_HUR.awards.map((a) => (
              <p key={a} className="flex gap-2 text-xs text-stone-700"><Award className="w-4 h-4 shrink-0 text-satin-gold-dark" />{a}</p>
            ))}
          </div>
          <a href="#tu-van" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-green px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-green-dark transition">
            Nhận tư vấn R&amp;D <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Vì sao chọn */}
      <section className="bg-emerald-green-light/60 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="Vì sao chọn Cosbuilt" title="Nền tảng để thương hiệu phát triển bền vững" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyItems.map((s) => {
              const Icon = SERVICE_ICONS[s.icon] || Boxes;
              return (
                <article key={s.title} className="rounded-2xl bg-white p-6 border border-stone-200/70 hover:shadow-lg hover:-translate-y-0.5 transition">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-green text-white"><Icon className="w-5 h-5" /></div>
                  <h3 className="mt-4 font-bold text-stone-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.details.slice(0, 3).map((d) => (
                      <li key={d} className="flex gap-2 text-xs text-stone-500"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-satin-gold" />{d}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section id="quy-trinh" className="max-w-6xl mx-auto px-4 py-20">
        <SectionHeading eyebrow="Quy trình sản xuất trọn gói" title={`${PROCESS_STEPS.length} bước rõ ràng từ tư vấn đến bàn giao`} desc="Quy trình minh bạch giúp thương hiệu chủ động theo dõi từng giai đoạn phát triển và sản xuất sản phẩm." />
        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-2">
          {PROCESS_STEPS.map((s, i) => (
            <button key={s.title} type="button" onClick={() => setActiveStep(i)}
              className={`rounded-xl border px-3 py-3 text-left transition ${activeStep === i ? "border-emerald-green bg-emerald-green text-white" : "border-stone-200 bg-white text-stone-700 hover:border-emerald-green/50"}`}>
              <span className={`font-mono text-xs ${activeStep === i ? "text-satin-gold-light" : "text-emerald-green"}`}>0{i + 1}</span>
              <span className="block mt-1 text-xs font-semibold leading-snug">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white border border-stone-200 p-6 md:p-8">
          <button type="button" onClick={() => setActiveStep((activeStep + PROCESS_STEPS.length - 1) % PROCESS_STEPS.length)} aria-label="Bước trước" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 hover:bg-stone-50"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex-1">
            <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-green">BƯỚC 0{activeStep + 1}</span>
            <h3 className="font-serif text-2xl font-bold mt-1">{PROCESS_STEPS[activeStep].title}</h3>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">{PROCESS_STEPS[activeStep].detail}</p>
          </div>
          <button type="button" onClick={() => setActiveStep((activeStep + 1) % PROCESS_STEPS.length)} aria-label="Bước sau" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 hover:bg-stone-50"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </section>

      {/* Chứng nhận */}
      <section className="bg-white border-y border-stone-200 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="Tiêu chuẩn vận hành" title="Minh bạch năng lực, nhất quán chất lượng" desc={ABOUT_SECTIONS.certifications.subtitle} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certs.map((c, i) => (
              <article key={c.name} className="rounded-2xl border border-stone-200 p-5 bg-[#FAF8F5]">
                {c.image ? (
                  <img src={c.image} alt={c.name} loading="lazy" className="mb-4 aspect-[3/4] w-full rounded-lg object-cover bg-white" />
                ) : (
                  <span className="font-mono text-sm text-emerald-green">0{i + 1}</span>
                )}
                <h3 className="mt-2 font-bold text-stone-900 text-sm">{c.name}</h3>
                {c.issuer && <p className="mt-1 text-[11px] font-medium text-satin-gold-dark">{c.issuer}</p>}
                {c.description && <p className="mt-2 text-xs text-stone-600 leading-relaxed">{c.description}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Form tư vấn */}
      <section id="tu-van" className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <SectionHeading eyebrow="Trao đổi cùng Cosbuilt" title="Bạn đang chuẩn bị ra mắt dòng mỹ phẩm riêng?" desc="Để lại thông tin. Chuyên viên sẽ liên hệ để làm rõ định hướng sản phẩm, mức ngân sách và kế hoạch triển khai." />
          <ul className="mt-6 space-y-3">
            {[
              { icon: CheckCircle2, text: "Tư vấn bước đầu theo nhu cầu thực tế" },
              { icon: Lock, text: "Bảo mật thông tin dự án & công thức" },
              { icon: Clock, text: "Phản hồi trong giờ làm việc (09:00–18:00, T2–T6)" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-sm text-stone-700"><Icon className="w-5 h-5 shrink-0 text-emerald-green" />{text}</li>
            ))}
          </ul>
          <div className="mt-8 space-y-3 text-sm text-stone-600">
            <p className="flex gap-3"><Phone className="w-5 h-5 shrink-0 text-satin-gold-dark" /><a href={`tel:${HOTLINE.replace(/\s/g, "")}`} className="font-semibold text-stone-900">(+84) {HOTLINE}</a></p>
            <p className="flex gap-3"><MapPin className="w-5 h-5 shrink-0 text-satin-gold-dark" />Văn phòng: 2.40 The Prince Residence, 19-21 Nguyễn Văn Trỗi, P. Phú Nhuận, TP.HCM</p>
            <p className="flex gap-3"><MapPin className="w-5 h-5 shrink-0 text-satin-gold-dark" />Nhà máy: Incheon & Gimpo, Hàn Quốc</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8 shadow-xl shadow-stone-900/5">
          {formState === "done" ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-green" />
              <h3 className="mt-4 font-serif text-2xl font-bold">Đã nhận thông tin!</h3>
              <p className="mt-2 text-sm text-stone-600">Chuyên viên Cosbuilt sẽ liên hệ với bạn trong giờ làm việc sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold">Nhận tư vấn phát triển sản phẩm</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className={inputCls} placeholder="Họ và tên *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className={inputCls} placeholder="Số điện thoại / Zalo *" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <input className={inputCls} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className={inputCls} placeholder="Tên thương hiệu (nếu có)" value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold text-stone-500">Nhóm sản phẩm quan tâm *</span>
                  <select className={`${inputCls} mt-1`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-stone-500">Số lượng dự kiến</span>
                  <select className={`${inputCls} mt-1`} value={form.moq} onChange={(e) => setForm({ ...form, moq: e.target.value })}>
                    <option value="500">500 – 1.000</option>
                    <option value="1000">1.000 – 2.000</option>
                    <option value="2000">2.000 – 5.000</option>
                    <option value="5000">Trên 5.000</option>
                  </select>
                </label>
              </div>
              <textarea className={`${inputCls} min-h-28`} placeholder="Nội dung cần tư vấn (concept, thành phần, mức giá mong muốn…)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {formError && <p className="text-sm text-red-600">{formError}</p>}
              <button type="submit" disabled={formState === "sending"} className="w-full rounded-full bg-emerald-green py-3.5 text-sm font-bold text-white hover:bg-emerald-green-dark disabled:opacity-60 transition">
                {formState === "sending" ? "Đang gửi…" : "NHẬN TƯ VẤN"}
              </button>
              <p className="text-[11px] text-stone-400 leading-relaxed">Khi gửi thông tin, bạn đồng ý để Cosbuilt liên hệ tư vấn về nhu cầu phát triển sản phẩm. Thông tin dự án được bảo mật.</p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <SectionHeading eyebrow="Câu hỏi thường gặp" title="Thông tin trước khi bắt đầu" />
        <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-stone-800" aria-expanded={openFaq === i}>
                {f.q}
                <ChevronDown className={`w-5 h-5 shrink-0 text-stone-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="pb-5 text-sm text-stone-600 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA cuối */}
      <section className="bg-emerald-green text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Sẵn sàng biến định hướng thành sản phẩm?</h2>
            <p className="mt-3 text-white/80 text-sm">Trao đổi với chuyên viên Cosbuilt để bắt đầu từ một brief rõ ràng.</p>
          </div>
          <a href="#tu-van" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-satin-gold px-7 py-3.5 text-sm font-bold text-stone-950 hover:bg-satin-gold-dark transition">
            Nhận tư vấn ngay <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      <footer className="bg-stone-950 text-stone-500 text-[11px] text-center py-6 px-4">
        © 2026 Cosbuilt. Tiêu chuẩn ISO 22716:2007 / GMP.
      </footer>

      {/* Nút liên hệ nổi */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3">
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo" className="grid h-12 w-12 place-items-center rounded-full bg-[#0068FF] text-white text-xs font-bold shadow-lg">Zalo</a>
        <a href={`tel:${HOTLINE.replace(/\s/g, "")}`} aria-label="Gọi hotline" className="grid h-12 w-12 place-items-center rounded-full bg-emerald-green text-white shadow-lg"><Phone className="w-5 h-5" /></a>
      </div>
    </div>
  );
}
