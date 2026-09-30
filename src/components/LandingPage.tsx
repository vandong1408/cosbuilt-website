// Trang landing ẩn (không có trong menu/sitemap, gắn noindex) — chỉ ai có link
// mới xem được. Đường dẫn cấu hình ở LANDING_PATH (src/main.tsx dùng hằng này).
// Bố cục tham khảo trang "Sản xuất mỹ phẩm theo định hướng" của AstraCos,
// nội dung lấy từ data.ts + dữ liệu live (/api/sheets/data).
// Bảng màu: nền ngà, rượu vang thương hiệu làm điểm nhấn, vàng champagne.
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Clock, Lock, MapPin, Minus, Phone, Plus } from "lucide-react";
import {
  ABOUT_SECTIONS, DEFAULT_GALLERY_IMAGES, MANUFACTURING_CATEGORIES, RESEARCHER_HUR, SERVICES,
} from "../data";

export const LANDING_PATH = "/catalogue";

const HOTLINE = "0966 373 686";
const TEL = "tel:0966373686";
const ZALO_URL = "https://zalo.me/0966373686";

const HERO_IMAGE = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1400";
const HERO_IMAGE_2 = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=700";
const DARK_IMAGE = "https://images.unsplash.com/photo-1631438406588-3a079c32b864?q=80&w=1200";

const HERO_STATS = [
  { value: "12+", label: "Năm kinh nghiệm R&D" },
  { value: "3.500+", label: "Công thức độc quyền" },
  { value: "500", label: "MOQ lô đầu tiên từ" },
  { value: "2", label: "Nhà máy ISO 22716 tại Hàn Quốc" },
];

const TRUST = ["ISO 22716 : 2007 GMP", "US FDA · MoCRA", "R&D Center · KOITA", "Watsons PB Partner", "Cosmopack Asia Winner"];

const CAPACITY = [
  { value: "400", unit: "tấn / tháng", label: "Công suất bồn khuấy Agi Mixer" },
  { value: "24M", unit: "sản phẩm / năm", label: "Mặt nạ giấy" },
  { value: "7.2M", unit: "sản phẩm / năm", label: "Dòng Skin Care" },
  { value: "5M", unit: "sản phẩm / năm", label: "Sản phẩm dạng tuýp" },
];

const PROCESS_STEPS = [
  { title: "Tiếp nhận & tư vấn", detail: "Làm rõ tệp khách hàng, mức giá, concept và thành phần mong muốn." },
  { title: "R&D lên mẫu thử", detail: "Phát triển mẫu, duyệt hương, thể chất, màu sắc — tinh chỉnh theo phản hồi." },
  { title: "Chốt công thức & báo giá", detail: "Thống nhất công thức, chọn bao bì, báo giá chi tiết theo số lượng." },
  { title: "Hợp đồng & công bố", detail: "Ký hợp đồng, Cosbuilt thay mặt kiểm nghiệm và làm hồ sơ công bố." },
  { title: "Sản xuất hàng loạt", detail: "Chiết rót, đóng gói trên dây chuyền tự động chuẩn ISO 22716 / GMP." },
  { title: "QC & bàn giao", detail: "Kiểm tra chất lượng từng lô, bàn giao và đồng hành sau bán hàng." },
];

const FAQS = [
  { q: "MOQ gia công tối thiểu là bao nhiêu?", a: "Với lô hàng đầu tiên, Cosbuilt hỗ trợ chia nhỏ lô thử nghiệm từ 500–1.000 đơn vị để giảm áp lực tồn kho cho thương hiệu mới. MOQ cụ thể tùy dòng sản phẩm và bao bì." },
  { q: "Thời gian phát triển sản phẩm mất bao lâu?", a: "Mẫu thử thường có sau khoảng 1–2 tuần kể từ khi chốt brief. Thời gian sản xuất hàng loạt phụ thuộc số lượng, bao bì và hồ sơ công bố — chuyên viên sẽ báo tiến độ chi tiết khi báo giá." },
  { q: "Cosbuilt có hỗ trợ thương hiệu mới không?", a: "Có. Chúng tôi hỗ trợ từ định vị thương hiệu, chọn công thức từ thư viện 3.500+ công thức sẵn có, thiết kế bao bì miễn phí đến tư liệu hình ảnh/video nhà máy phục vụ marketing." },
  { q: "Cosbuilt có hỗ trợ công bố sản phẩm không?", a: "Có. Cosbuilt thay mặt doanh nghiệp kiểm nghiệm vi sinh, kim loại nặng, soạn hồ sơ công bố gửi Bộ Y tế và hỗ trợ CFS cho sản phẩm xuất khẩu." },
  { q: "Công thức của tôi có được bảo mật không?", a: "Tuyệt đối. Thông tin dự án và công thức gia công độc quyền được bảo mật theo hợp đồng." },
];

const CATEGORY_OPTIONS = ["Chăm sóc da mặt", "Chăm sóc cơ thể", "Chăm sóc tóc", "Trang điểm", "Chăm sóc cá nhân", "Khác"];

type GalleryItem = { title: string; description?: string; image: string };
type Cert = { name: string; issuer?: string; description?: string; image?: string };

const shortTitle = (t: string) => t.replace(/^Gia công /, "").replace(/\s*\(.*\)$/, "");
const pad = (n: number) => String(n).padStart(2, "0");

function useLandingMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Catalogue gia công mỹ phẩm OEM/ODM | Cosbuilt";
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

type RevealProps = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li"; key?: string };

function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase ${light ? "text-[#D9C29A]" : "text-[#9A7A45]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#D9C29A]/60" : "bg-[#B0894F]/60"}`} />
      {children}
    </span>
  );
}

function Heading({ eyebrow, title, desc, light, center }: { eyebrow: string; title: ReactNode; desc?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`font-serif text-[2rem] md:text-5xl leading-[1.15] mt-5 ${light ? "text-[#F8F4EE]" : "text-[#1E1814]"}`}>{title}</h2>
      {desc && <p className={`mt-5 text-[15px] leading-[1.8] font-light ${light ? "text-[#CFC4B6]" : "text-[#6F655C]"}`}>{desc}</p>}
    </Reveal>
  );
}

export default function LandingPage() {
  useLandingMeta();

  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY_IMAGES);
  const [certs, setCerts] = useState<Cert[]>(ABOUT_SECTIONS.certifications.list);
  const [researcherImage, setResearcherImage] = useState(RESEARCHER_HUR.image);
  const [activeCat, setActiveCat] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const selectCategory = (i: number) => {
    setActiveCat(i);
    // Trên mobile panel chi tiết nằm dưới danh sách — cuộn tới để thấy thay đổi.
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => document.getElementById("danh-muc-chi-tiet")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const cat = MANUFACTURING_CATEGORIES[activeCat];
  const services = SERVICES.filter((s) => !s.title.startsWith("Quy trình"));
  const galleryShown = gallery.slice(0, 5);
  const fieldCls = "w-full border-0 border-b border-[#D8CDBE] bg-transparent px-0 py-3 text-[15px] text-[#1E1814] placeholder:text-[#A39787] outline-none focus:border-[#7B1230] focus:ring-0 transition-colors";
  const btnPrimary = "inline-flex items-center justify-center gap-2 bg-[#7B1230] px-7 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#F8F4EE] hover:bg-[#5E0D24] transition-colors";

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1E1814] font-sans overflow-x-hidden selection:bg-[#7B1230] selection:text-white">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#F8F4EE]/92 backdrop-blur-md border-b border-[#E4DACB]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between gap-6">
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-serif text-[22px] tracking-[0.18em] text-[#1E1814]">COSBUILT</span>
            <span className="mt-1 text-[8.5px] tracking-[0.34em] text-[#9A7A45] uppercase">Korea OEM · ODM Lab</span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-[13px] tracking-wide text-[#4A423B]">
            {[["#danh-muc", "Danh mục"], ["#nha-may", "Nhà máy"], ["#rnd", "R&D"], ["#quy-trinh", "Quy trình"], ["#chung-nhan", "Chứng nhận"]].map(([href, label]) => (
              <a key={href} href={href} className="relative hover:text-[#7B1230] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#7B1230] after:transition-all hover:after:w-full">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href={TEL} className="hidden md:flex items-center gap-2 text-[13px] font-medium text-[#1E1814]">
              <Phone className="w-4 h-4 text-[#B0894F]" /> {HOTLINE}
            </a>
            <a href="#tu-van" className="border border-[#1E1814] px-4 md:px-5 py-2.5 text-[11px] md:text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-[#1E1814] hover:text-[#F8F4EE] transition-colors">Nhận tư vấn</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-[72px]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center pt-10 md:pt-16 pb-16 md:pb-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Eyebrow>Nhà máy gia công mỹ phẩm OEM / ODM Hàn Quốc</Eyebrow>
              <h1 className="font-serif text-[2.6rem] sm:text-6xl xl:text-[4.4rem] leading-[1.08] mt-7 text-[#1E1814]">
                Sản xuất mỹ phẩm theo <em className="text-[#7B1230]">định hướng riêng</em> của thương hiệu
              </h1>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.85] font-light text-[#6F655C]">
                “Mỹ phẩm được tạo nên bởi các nhà nghiên cứu.” Từ serum, kem dưỡng, mặt nạ đến chăm sóc tóc và trang điểm — Cosbuilt phát triển công thức độc quyền và sản xuất tại 2 nhà máy chuẩn ISO 22716 / GMP ở Incheon & Gimpo.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#tu-van" className={btnPrimary}>Nhận tư vấn sản phẩm <ArrowRight className="w-4 h-4" /></a>
                <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#CDBFAC] px-7 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#1E1814] hover:border-[#1E1814] transition-colors">
                  Tư vấn qua Zalo
                </a>
              </div>
            </motion.div>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-[#E4DACB]">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className={`pt-6 pb-2 pr-4 ${i > 0 ? "sm:pl-5 sm:border-l border-[#E4DACB]" : ""} ${i % 2 === 1 ? "pl-5 border-l sm:border-l" : ""}`}>
                  <dt className="font-serif text-3xl md:text-[2.2rem] text-[#7B1230]">{s.value}</dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-[#8A7F74]">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -top-5 -right-5 bottom-10 left-10 border border-[#D9C29A]" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-[#EFE7DB]">
              <img src={HERO_IMAGE} alt="Serum cao cấp gia công tại Cosbuilt" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -left-4 md:-left-12 bottom-10 w-[42%] aspect-[3/4] overflow-hidden border-[6px] border-[#F8F4EE] shadow-2xl shadow-[#1E1814]/15 hidden sm:block">
              <img src={HERO_IMAGE_2} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 md:right-8 bg-[#1E1814] text-[#F8F4EE] px-6 py-5 shadow-xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9C29A]">Made in Korea</p>
              <p className="font-serif text-lg mt-1">ISO 22716 · FDA MoCRA</p>
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <div className="border-y border-[#E4DACB] bg-[#F2ECE3]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <span key={t} className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#6F655C]">
                <span className="h-1 w-1 rotate-45 bg-[#B0894F]" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Danh mục */}
      <section id="danh-muc" className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <Heading eyebrow="Danh mục phát triển" title={<>Từ ý tưởng thị trường đến sản phẩm <em className="text-[#7B1230]">mang dấu ấn riêng</em></>} />
          <Reveal><p className="text-[15px] leading-[1.8] font-light text-[#6F655C] lg:pb-2">Định hướng công thức, kết cấu và trải nghiệm sử dụng theo tệp khách hàng mục tiêu. Chọn từ thư viện hơn 3.500 công thức sẵn có hoặc phát triển độc quyền.</p></Reveal>
        </div>

        <Reveal className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
          <ol className="border-t border-[#E4DACB]">
            {MANUFACTURING_CATEGORIES.map((c, i) => {
              const active = activeCat === i;
              return (
                <li key={c.id} className="border-b border-[#E4DACB]">
                  <button type="button" onClick={() => selectCategory(i)} aria-pressed={active}
                    className="group w-full flex items-center gap-5 py-5 text-left">
                    <span className={`font-serif text-sm w-6 ${active ? "text-[#B0894F]" : "text-[#B9AD9E]"}`}>{pad(i + 1)}</span>
                    <span className={`flex-1 font-serif text-xl md:text-2xl transition-colors ${active ? "text-[#7B1230]" : "text-[#3A332D] group-hover:text-[#7B1230]"}`}>{shortTitle(c.title)}</span>
                    <ArrowRight className={`w-5 h-5 transition-all ${active ? "text-[#7B1230] translate-x-0 opacity-100" : "text-[#B9AD9E] -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                  </button>
                </li>
              );
            })}
          </ol>

          <motion.div id="danh-muc-chi-tiet" key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="scroll-mt-24 grid sm:grid-cols-[0.95fr_1.05fr] bg-white border border-[#E4DACB]">
            <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[460px] overflow-hidden bg-[#EFE7DB]">
              <img src={cat.image} alt={cat.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-7 md:p-9 flex flex-col">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#9A7A45]">Danh mục {pad(activeCat + 1)}</span>
              <h3 className="font-serif text-2xl mt-3 leading-snug">{shortTitle(cat.title)}</h3>
              <p className="mt-3 text-sm leading-[1.75] font-light text-[#6F655C]">{cat.description}</p>
              <ul className="mt-6 space-y-3">
                {cat.subCategories.map((s) => (
                  <li key={s} className="flex gap-3 text-[13.5px] leading-snug text-[#3A332D]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#B0894F]" />{s}
                  </li>
                ))}
              </ul>
              <a href="#tu-van" className="mt-auto pt-8 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#7B1230] hover:gap-3 transition-all">
                Tư vấn dòng này <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* Nhà máy */}
      <section id="nha-may" className="bg-[#1B1310] text-[#F8F4EE] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <Heading light eyebrow="Năng lực nhà máy" title={<>Hai nhà máy, <em className="text-[#D9C29A]">một chuẩn mực</em> chất lượng</>} />
            <Reveal><p className="text-[15px] leading-[1.8] font-light text-[#CFC4B6]">Nhà máy 1 (Gimpo) và Nhà máy 2 (Incheon) vận hành hệ thống bồn khuấy Agi Mixer, Agi Homo Mixer, nước siêu tinh khiết Ultrapure cùng dây chuyền chiết rót tự động khép kín.</p></Reveal>
          </div>

          <Reveal className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {CAPACITY.map((c, i) => (
              <div key={c.label} className={`py-8 pr-4 ${i % 2 === 1 ? "pl-5 border-l border-white/10" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-white/10" : ""} ${i === 2 ? "lg:pl-5 lg:border-l" : ""}`}>
                <p className="font-serif text-4xl md:text-5xl text-[#D9C29A]">{c.value}</p>
                <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-[#8F8478]">{c.unit}</p>
                <p className="mt-1 text-sm text-[#CFC4B6]">{c.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:h-[560px]">
            {galleryShown.map((g, i) => (
              <figure key={g.image + g.title} className={`group relative overflow-hidden bg-[#2A201C] ${i === 0 ? "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-square md:aspect-auto"}`}>
                <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition duration-700" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 md:p-5">
                  <p className={`font-serif ${i === 0 ? "text-xl" : "text-sm"} leading-snug`}>{g.title}</p>
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <Reveal className="mt-14 grid md:grid-cols-2 gap-x-14 gap-y-4">
            {ABOUT_SECTIONS.factory.strengths.map((s) => (
              <p key={s} className="flex gap-4 text-[14px] leading-[1.7] font-light text-[#CFC4B6]">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#B0894F]" />{s}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* R&D */}
      <section id="rnd" className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-center">
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="absolute -bottom-5 -left-5 top-10 right-10 bg-[#EFE7DB]" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#EFE7DB] to-[#E2D5C2]">
            {researcherImage ? (
              <img src={researcherImage} alt={RESEARCHER_HUR.name} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="grid h-full place-items-center font-serif text-7xl tracking-widest text-[#7B1230]/30">{RESEARCHER_HUR.initials}</div>
            )}
          </div>
          <div className="relative -mt-12 ml-auto mr-4 w-fit max-w-[85%] bg-[#1E1814] text-[#F8F4EE] px-6 py-4">
            <p className="font-serif text-lg leading-tight">Hur Beom-Chul</p>
            <p className="mt-1 text-[10px] tracking-[0.24em] uppercase text-[#D9C29A]">Founder & Trưởng R&D</p>
          </div>
        </Reveal>

        <div>
          <Heading eyebrow="R&D đồng hành" title={<>Công thức bắt đầu từ <em className="text-[#7B1230]">bài toán kinh doanh</em></>} />
          <Reveal>
            <blockquote className="mt-8 border-l-2 border-[#B0894F] pl-6 font-serif italic text-lg md:text-xl leading-relaxed text-[#3A332D]">
              Hơn 20 năm dẫn dắt R&D tại C&C International, Cosnine, FORCOS và SKIN FOOD — “bộ não” đứng sau nhiều sản phẩm triệu đô.
            </blockquote>
            <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#9A7A45]">Kinh nghiệm</p>
                <ul className="mt-4 space-y-3">
                  {RESEARCHER_HUR.experience.slice(0, 4).map((e) => (
                    <li key={e.year} className="text-[13.5px] leading-snug">
                      <span className="block font-serif text-[#7B1230]">{e.year}</span>
                      <span className="text-[#6F655C] font-light">{e.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#9A7A45]">Giải thưởng</p>
                <ul className="mt-4 space-y-3">
                  {RESEARCHER_HUR.awards.map((a) => {
                    const [year, ...rest] = a.split(/:\s|\s–\s/);
                    return (
                      <li key={a} className="text-[13.5px] leading-snug">
                        <span className="block font-serif text-[#7B1230]">{year}</span>
                        <span className="text-[#6F655C] font-light">{rest.join(" – ")}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <a href="#tu-van" className={`${btnPrimary} mt-10`}>Nhận tư vấn R&amp;D <ArrowRight className="w-4 h-4" /></a>
          </Reveal>
        </div>
      </section>

      {/* Dịch vụ / Vì sao chọn */}
      <section className="bg-[#F2ECE3] border-y border-[#E4DACB] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Heading center eyebrow="Vì sao chọn Cosbuilt" title={<>Giải pháp trọn gói, <em className="text-[#7B1230]">một đầu mối</em></>} desc="Từ công thức, bao bì, pháp lý đến vận chuyển — thương hiệu chỉ cần tập trung bán hàng." />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4DACB] border border-[#E4DACB]">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="bg-[#F8F4EE] p-8 md:p-10 group hover:bg-white transition-colors">
                <span className="font-serif text-4xl text-[#D9C29A] group-hover:text-[#B0894F] transition-colors">{pad(i + 1)}</span>
                <h3 className="font-serif text-xl mt-5 leading-snug">{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.75] font-light text-[#6F655C]">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section id="quy-trinh" className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
        <Heading eyebrow="Quy trình trọn gói" title={<>6 bước rõ ràng <em className="text-[#7B1230]">từ brief đến bàn giao</em></>} desc="Minh bạch từng giai đoạn để thương hiệu chủ động theo dõi tiến độ phát triển và sản xuất." />
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[27px] h-px bg-[#D8CDBE]" aria-hidden />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07} className="relative">
                <div>
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#B0894F] bg-[#F8F4EE] font-serif text-lg text-[#7B1230]">{pad(i + 1)}</span>
                  <h3 className="mt-6 font-serif text-lg leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] font-light text-[#6F655C]">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Chứng nhận */}
      <section id="chung-nhan" className="bg-white border-y border-[#E4DACB] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Heading center eyebrow="Tiêu chuẩn vận hành" title={<>Minh bạch năng lực, <em className="text-[#7B1230]">nhất quán chất lượng</em></>} desc={ABOUT_SECTIONS.certifications.subtitle} />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06} className="border border-[#E4DACB] bg-[#FBF9F5] p-7 text-center">
                {c.image ? (
                  <img src={c.image} alt={c.name} loading="lazy" className="mx-auto mb-6 aspect-[3/4] w-full max-w-[180px] object-cover border border-[#E4DACB] bg-white" />
                ) : (
                  <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#D9C29A] font-serif text-lg text-[#9A7A45]">{pad(i + 1)}</div>
                )}
                <h3 className="font-serif text-lg leading-snug">{c.name}</h3>
                {c.issuer && <p className="mt-2 text-[10.5px] tracking-[0.14em] uppercase text-[#9A7A45]">{c.issuer}</p>}
                {c.description && <p className="mt-3 text-[13px] leading-[1.7] font-light text-[#6F655C]">{c.description}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form tư vấn */}
      <section id="tu-van" className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
        <Reveal className="grid lg:grid-cols-[0.9fr_1.1fr] shadow-2xl shadow-[#1E1814]/10">
          <div className="relative overflow-hidden bg-[#1B1310] text-[#F8F4EE] p-8 md:p-12 flex flex-col">
            <img src={DARK_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B1310]/60 via-[#1B1310]/80 to-[#1B1310]" />
            <div className="relative">
              <Eyebrow light>Trao đổi cùng Cosbuilt</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mt-5">Bạn đang chuẩn bị ra mắt <em className="text-[#D9C29A]">dòng mỹ phẩm riêng?</em></h2>
              <p className="mt-5 text-[14.5px] leading-[1.8] font-light text-[#CFC4B6]">Để lại thông tin, chuyên viên sẽ liên hệ để làm rõ định hướng sản phẩm, ngân sách và kế hoạch triển khai.</p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Check, text: "Tư vấn bước đầu theo nhu cầu thực tế" },
                  { icon: Lock, text: "Bảo mật thông tin dự án & công thức" },
                  { icon: Clock, text: "Phản hồi trong giờ làm việc · 09:00–18:00, T2–T6" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-[14px] text-[#E6DDD0]"><Icon className="w-4 h-4 mt-0.5 shrink-0 text-[#D9C29A]" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="relative mt-auto pt-12 space-y-3 text-[13px] text-[#CFC4B6]">
              <a href={TEL} className="flex items-center gap-3 font-serif text-2xl text-[#F8F4EE]"><Phone className="w-5 h-5 text-[#D9C29A]" />(+84) {HOTLINE}</a>
              <p className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#D9C29A]" />2.40 The Prince Residence, 19-21 Nguyễn Văn Trỗi, P. Phú Nhuận, TP.HCM</p>
              <p className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#D9C29A]" />Nhà máy: Incheon & Gimpo, Hàn Quốc</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12">
            {formState === "done" ? (
              <div className="h-full grid place-items-center text-center py-16">
                <div>
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#B0894F]"><Check className="w-7 h-7 text-[#7B1230]" /></div>
                  <h3 className="mt-6 font-serif text-3xl">Cảm ơn bạn!</h3>
                  <p className="mt-3 text-[14px] font-light text-[#6F655C]">Chuyên viên Cosbuilt sẽ liên hệ trong giờ làm việc sớm nhất.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif text-2xl md:text-3xl">Nhận tư vấn phát triển sản phẩm</h3>
                <p className="mt-2 text-[13px] text-[#8A7F74]">Các trường có dấu * là bắt buộc.</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  <input className={fieldCls} placeholder="Họ và tên *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <input className={fieldCls} placeholder="Số điện thoại / Zalo *" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  <input className={fieldCls} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className={fieldCls} placeholder="Tên thương hiệu (nếu có)" value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} />
                </div>
                <fieldset className="mt-8">
                  <legend className="text-[11px] tracking-[0.2em] uppercase text-[#9A7A45]">Nhóm sản phẩm quan tâm *</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CATEGORY_OPTIONS.map((c) => (
                      <button key={c} type="button" onClick={() => setForm({ ...form, category: c })} aria-pressed={form.category === c}
                        className={`px-4 py-2 text-[13px] border transition-colors ${form.category === c ? "border-[#7B1230] bg-[#7B1230] text-white" : "border-[#D8CDBE] text-[#4A423B] hover:border-[#7B1230]"}`}>{c}</button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="text-[11px] tracking-[0.2em] uppercase text-[#9A7A45]">Số lượng dự kiến</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[["500", "500 – 1.000"], ["1000", "1.000 – 2.000"], ["2000", "2.000 – 5.000"], ["5000", "Trên 5.000"]].map(([v, label]) => (
                      <button key={v} type="button" onClick={() => setForm({ ...form, moq: v })} aria-pressed={form.moq === v}
                        className={`px-4 py-2 text-[13px] border transition-colors ${form.moq === v ? "border-[#1E1814] bg-[#1E1814] text-white" : "border-[#D8CDBE] text-[#4A423B] hover:border-[#1E1814]"}`}>{label}</button>
                    ))}
                  </div>
                </fieldset>
                <textarea className={`${fieldCls} mt-6 min-h-24 resize-none`} placeholder="Nội dung cần tư vấn (concept, thành phần, mức giá mong muốn…)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {formError && <p className="mt-4 text-sm text-[#B42318]">{formError}</p>}
                <button type="submit" disabled={formState === "sending"} className={`${btnPrimary} mt-8 w-full disabled:opacity-60`}>
                  {formState === "sending" ? "Đang gửi…" : <>Gửi yêu cầu tư vấn <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="mt-4 text-[11.5px] leading-relaxed text-[#A39787]">Khi gửi thông tin, bạn đồng ý để Cosbuilt liên hệ tư vấn về nhu cầu phát triển sản phẩm. Thông tin dự án được bảo mật.</p>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-32 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <Heading eyebrow="Câu hỏi thường gặp" title={<>Thông tin <em className="text-[#7B1230]">trước khi bắt đầu</em></>} desc="Chưa thấy câu trả lời bạn cần? Gọi hotline hoặc nhắn Zalo để được giải đáp ngay." />
        <Reveal className="border-t border-[#E4DACB]">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-b border-[#E4DACB]">
                <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-6 py-6 text-left">
                  <span className={`font-serif text-lg md:text-xl ${open ? "text-[#7B1230]" : "text-[#1E1814]"}`}>{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${open ? "border-[#7B1230] bg-[#7B1230] text-white" : "border-[#D8CDBE] text-[#6F655C]"}`}>
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {open && <p className="pb-6 pr-14 text-[14.5px] leading-[1.8] font-light text-[#6F655C]">{f.a}</p>}
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* CTA cuối */}
      <section className="relative overflow-hidden bg-[#7B1230] text-[#F8F4EE]">
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#F8F4EE_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <Eyebrow light>Bắt đầu dự án</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] mt-5">Sẵn sàng biến định hướng thành <em className="text-[#E9D6B0]">sản phẩm?</em></h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#tu-van" className="inline-flex items-center gap-2 bg-[#F8F4EE] px-7 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase text-[#7B1230] hover:bg-white transition-colors">Nhận tư vấn ngay <ArrowUpRight className="w-4 h-4" /></a>
            <a href={TEL} className="inline-flex items-center gap-2 border border-[#F8F4EE]/40 px-7 py-4 text-[13px] font-semibold tracking-[0.12em] uppercase hover:border-[#F8F4EE] transition-colors"><Phone className="w-4 h-4" /> {HOTLINE}</a>
          </div>
        </div>
      </section>
      <footer className="bg-[#1B1310] text-[#8F8478]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px]">
          <span className="font-serif text-base tracking-[0.18em] text-[#F8F4EE]">COSBUILT</span>
          <span>© 2026 Cosbuilt · Tiêu chuẩn ISO 22716:2007 / GMP</span>
        </div>
      </footer>

      {/* Liên hệ nổi */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2.5">
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo" className="grid h-12 w-12 place-items-center rounded-full bg-[#1E1814] text-[11px] font-semibold tracking-wide text-[#F8F4EE] shadow-lg ring-1 ring-[#D9C29A]/40 hover:bg-[#7B1230] transition-colors">Zalo</a>
        <a href={TEL} aria-label="Gọi hotline" className="grid h-12 w-12 place-items-center rounded-full bg-[#7B1230] text-white shadow-lg hover:bg-[#5E0D24] transition-colors"><Phone className="w-5 h-5" /></a>
      </div>
    </div>
  );
}
