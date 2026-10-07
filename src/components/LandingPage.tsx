// Trang landing ẩn (không có trong menu/sitemap, gắn noindex) — chỉ ai có link
// mới xem được. Đường dẫn cấu hình ở LANDING_PATH (src/main.tsx dùng hằng này).
// Nội dung (chữ + ảnh) do admin quản lý: CRM → Quản lý nội dung → "Landing page",
// lưu ở field `landingPage` của /api/sheets/data; mặc định ở lib/landingContent.
// Giao diện đồng bộ website chính: logo thật, đỏ đô #9C1C40 + vàng, nền kem,
// tiêu đề Playfair Display đậm, chữ Montserrat, thẻ bo tròn, nút dạng pill.
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, Award, Boxes, Check, CheckCircle2, ChevronDown, Clock, Factory, FileText, FlaskConical,
  Gem, Lock, MapPin, MessageCircle, Palette, Phone, ShieldCheck, Truck,
} from "lucide-react";
import { ABOUT_SECTIONS } from "../data";
import CertificateViewer from "./CertificateViewer";
import { DEFAULT_LANDING, mergeLanding, safeHttpUrl, telHref, type LandingContent } from "../lib/landingContent";

export const LANDING_PATH = "/catalogue";

const LOGO_DARK = "/uploads/COSBUILT_Logo_Horizontal_Black_1787199294674.png";
const LOGO_WHITE = "/uploads/COSBUILT_Logo_White_1787199360370.png";

const SERVICE_ICONS = [Boxes, FlaskConical, Palette, FileText, Truck, Gem];
const CERT_ICONS = [ShieldCheck, FlaskConical, Award, FileText];
const BENEFIT_ICONS = [CheckCircle2, Lock, Clock];
const MOQ_OPTIONS: [string, string][] = [["500", "500 – 1.000"], ["1000", "1.000 – 2.000"], ["2000", "2.000 – 5.000"], ["5000", "Trên 5.000"]];

type Cert = { name: string; issuer?: string; description?: string; image?: string };

const pad = (n: number) => String(n).padStart(2, "0");

// Gradient chữ giống tiêu đề hero của website chính.
const GOLD_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-[#E8A0B4] via-amber-200 to-satin-gold";

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

type RevealProps = { children: ReactNode; className?: string; delay?: number; key?: string };

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, desc, light, center = true }: { eyebrow: string; title: ReactNode; desc?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className={`text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase ${light ? "text-satin-gold" : "text-emerald-green"}`}>{eyebrow}</span>}
      <h2 className={`font-serif font-bold text-[28px] leading-[1.25] md:text-[40px] md:leading-[1.2] mt-3 ${light ? "text-white" : "text-stone-900"}`}>{title}</h2>
      {desc && <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-stone-300" : "text-stone-600"}`}>{desc}</p>}
    </Reveal>
  );
}

export default function LandingPage() {
  useLandingMeta();

  const [content, setContent] = useState<LandingContent>(DEFAULT_LANDING);
  const [certs, setCerts] = useState<Cert[]>(ABOUT_SECTIONS.certifications.list);
  const [researcherImage, setResearcherImage] = useState("");
  const [library, setLibrary] = useState<{ title: string; description?: string; image: string }[]>([]);
  const [logos, setLogos] = useState({ dark: LOGO_DARK, white: LOGO_WHITE });
  const [activeCat, setActiveCat] = useState(0);
  const [viewCert, setViewCert] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", email: "", brandName: "", category: "", moq: "1000", message: "" });
  const [formState, setFormState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/api/sheets/data")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.landingPage) setContent(mergeLanding(data.landingPage));
        if (Array.isArray(data.certifications) && data.certifications.length) setCerts(data.certifications);
        if (data.researcherImage) setResearcherImage(data.researcherImage);
        if (Array.isArray(data.images)) setLibrary(data.images.filter((g: { image?: string }) => g?.image));
        setLogos({ dark: data.websiteLogo?.image || LOGO_DARK, white: data.footerLogo?.image || LOGO_WHITE });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { contact, hero, categories, factory, rnd, services, process, form: formText, faq, cta } = content;
  const TEL = telHref(contact.hotline);
  const ZALO_URL = safeHttpUrl(contact.zalo, DEFAULT_LANDING.contact.zalo);
  const categoryOptions = formText.categoryOptions.length ? formText.categoryOptions : DEFAULT_LANDING.form.categoryOptions;
  const selectedCategory = form.category || categoryOptions[0];

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
        body: JSON.stringify({ ...form, category: selectedCategory, message: `[Landing page] ${form.message}`.trim() }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Gửi thất bại");
      setFormState("done");
    } catch (err) {
      setFormState("error");
      setFormError(err instanceof Error ? err.message : "Gửi thất bại, vui lòng thử lại hoặc gọi hotline.");
    }
  };

  // Ảnh năng lực: riêng của landing nếu admin có nhập, không thì lấy "Thư viện ảnh".
  const factoryImages = (factory.images.length ? factory.images : library).filter((g) => g.image);

  const catIndex = Math.min(activeCat, Math.max(categories.items.length - 1, 0));
  const cat = categories.items[catIndex];
  const nav = [
    !categories.hidden && ["#danh-muc", "Danh mục"],
    !factory.hidden && ["#nha-may", "Nhà máy"],
    !rnd.hidden && ["#rnd", "R&D"],
    !process.hidden && ["#quy-trinh", "Quy trình"],
    !content.certifications.hidden && ["#chung-nhan", "Chứng nhận"],
  ].filter(Boolean) as [string, string][];

  const inputCls = "w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3.5 text-[15px] text-stone-900 placeholder:text-stone-400 outline-none focus:bg-white focus:border-emerald-green focus:ring-4 focus:ring-emerald-green/10 transition";
  const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-emerald-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-green/25 hover:bg-emerald-green-dark transition";
  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[13px] font-medium transition ${active ? "border-emerald-green bg-emerald-green text-white" : "border-stone-200 bg-white text-stone-700 hover:border-emerald-green/60"}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans overflow-x-hidden pb-[72px] md:pb-0">
      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_#e7e5e4,0_8px_24px_-12px_rgba(0,0,0,0.12)]" : "border-b border-stone-100"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <a href="#top" className="shrink-0" aria-label="Cosbuilt">
            <img src={logos.dark} alt="Cosbuilt" className="h-9 md:h-11 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-emerald-green transition-colors">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href={TEL} className="hidden md:flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-green-light text-emerald-green"><Phone className="w-4 h-4" /></span>
              <span className="leading-tight">
                <span className="block text-[11px] text-stone-500">Hotline tư vấn</span>
                <span className="block text-sm font-bold text-stone-900">{contact.hotline}</span>
              </span>
            </a>
            <a href="#tu-van" className="rounded-full bg-emerald-green px-4 md:px-6 py-2.5 text-[13px] md:text-sm font-semibold text-white hover:bg-emerald-green-dark transition">Nhận tư vấn</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden bg-stone-950">
        {hero.image && <img src={hero.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-60" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-stone-950/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-24 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {hero.badge && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-green/20 border border-emerald-green/40 px-4 py-1.5 text-[11px] md:text-xs font-bold tracking-wider uppercase text-[#F4B8C8]">
{hero.badge}
              </span>
            )}
            <h1 className="mt-6 font-serif font-bold text-white text-[36px] leading-[1.18] sm:text-5xl lg:text-[60px] lg:leading-[1.12] tracking-tight">
              {hero.titleBefore} {hero.titleHighlight && <span className={GOLD_TEXT}>{hero.titleHighlight}</span>} {hero.titleAfter}
            </h1>
            {hero.subtitle && <p className="mt-6 max-w-xl text-[15px] md:text-base leading-relaxed text-stone-300">{hero.subtitle}</p>}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#tu-van" className={btnPrimary}>{hero.primaryCta} <ArrowRight className="w-4 h-4" /></a>
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition">
                <MessageCircle className="w-4 h-4" /> {hero.secondaryCta}
              </a>
            </div>
            {hero.stats.length > 0 && (
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 max-w-lg">
                {hero.stats.slice(0, 3).map((s, i) => (
                  <div key={i}>
                    <dt className="font-serif font-bold text-2xl md:text-3xl text-white">{s.value}</dt>
                    <dd className="mt-1 text-[11px] md:text-xs uppercase tracking-wide text-stone-400">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>

          {hero.steps.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-satin-gold">{hero.stepsTitle}</p>
              <ol className="mt-4 space-y-2">
                {hero.steps.map((s, i) => (
                  <li key={i} className="flex items-center gap-3.5 rounded-2xl bg-white/5 border border-white/10 px-3.5 py-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-green text-xs font-bold text-white">{pad(i + 1)}</span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{s.title}</span>
                      <span className="block text-xs text-stone-400">{s.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {hero.trustTitle && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                  <ShieldCheck className="w-8 h-8 shrink-0 text-emerald-green" />
                  <span className="text-[13px] leading-snug text-stone-700"><b className="text-stone-900">{hero.trustTitle}</b><br />{hero.trustDesc}</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Danh mục */}
      {!categories.hidden && cat && (
        <section id="danh-muc" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={categories.eyebrow} title={categories.title} desc={categories.desc} />

            {/* Tabs: cuộn ngang trên mobile */}
            <div className="mt-10 -mx-4 px-4 md:mx-0 md:px-0 flex md:flex-wrap md:justify-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.items.map((c, i) => (
                <button key={i} type="button" onClick={() => setActiveCat(i)} aria-pressed={catIndex === i}
                  className={`shrink-0 ${chip(catIndex === i)}`}>{c.title}</button>
              ))}
            </div>

            <motion.div key={catIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="mt-6 grid md:grid-cols-2 overflow-hidden rounded-3xl bg-white border border-stone-100 shadow-sm">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[440px] bg-stone-100">
                {cat.image && <img src={cat.image} alt={cat.title} className="absolute inset-0 h-full w-full object-cover" />}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-emerald-green">{pad(catIndex + 1)} / {pad(categories.items.length)}</span>
              </div>
              <div className="p-6 md:p-10">
                <h3 className="font-serif font-bold text-2xl md:text-[28px] leading-snug text-stone-900">{cat.title}</h3>
                {cat.description && <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{cat.description}</p>}
                <ul className="mt-6 space-y-3">
                  {cat.points.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug text-stone-800">
                      <CheckCircle2 className="w-[18px] h-[18px] mt-px shrink-0 text-emerald-green" />{s}
                    </li>
                  ))}
                </ul>
                {cat.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cat.tags.map((f, i) => (
                      <span key={i} className="rounded-full bg-satin-gold-light px-3 py-1 text-xs font-medium text-amber-900">{f}</span>
                    ))}
                  </div>
                )}
                <a href="#tu-van" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-green border-b-2 border-emerald-green/30 pb-0.5 hover:border-emerald-green transition">
                  Tư vấn dòng sản phẩm này <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Nhà máy */}
      {!factory.hidden && (
        <section id="nha-may" className="bg-gradient-to-br from-stone-950 via-stone-900 to-[#2a0f18] py-16 md:py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead light eyebrow={factory.eyebrow} title={factory.title} desc={factory.desc} />

            {factory.capacity.length > 0 && (
              <Reveal className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {factory.capacity.map((c, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
                    <p className="font-serif font-bold text-3xl md:text-4xl text-satin-gold">{c.value}<span className="ml-1.5 font-sans text-xs font-medium text-stone-400">{c.unit}</span></p>
                    <p className="mt-1.5 text-[13px] md:text-sm text-stone-300">{c.label}</p>
                  </div>
                ))}
              </Reveal>
            )}

            {/* Ảnh: trượt ngang trên mobile, lưới trên desktop */}
            {factoryImages.length > 0 && (
              <div className="mt-8 -mx-4 px-4 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {factoryImages.map((g, i) => (
                  <figure key={i} className="snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto overflow-hidden rounded-2xl bg-stone-800">
                    {/* Ảnh khóa: không bấm xem, không kéo/lưu bằng chuột phải */}
                    <div onContextMenu={(e) => e.preventDefault()} className="aspect-[4/3] overflow-hidden select-none">
                      <img src={g.image} alt={g.title} loading="lazy" draggable={false} className="pointer-events-none h-full w-full object-cover" />
                    </div>
                    <figcaption className="p-4">
                      <p className="text-sm font-semibold text-white">{g.title}</p>
                      {g.description && <p className="mt-1 text-xs leading-relaxed text-stone-400 line-clamp-2">{g.description}</p>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {factory.strengths.length > 0 && (
              <Reveal className="mt-10 grid md:grid-cols-2 gap-3">
                {factory.strengths.map((s, i) => (
                  <p key={i} className="flex gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm leading-relaxed text-stone-300">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-satin-gold" />{s}
                  </p>
                ))}
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* R&D */}
      {!rnd.hidden && (
        <section id="rnd" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={rnd.eyebrow} title={rnd.title} desc={rnd.desc} />
            <Reveal className="mt-10 grid lg:grid-cols-[0.8fr_1.2fr] overflow-hidden rounded-3xl bg-white border border-stone-100 shadow-sm">
              <div className="relative aspect-[4/3.4] lg:aspect-auto bg-gradient-to-br from-emerald-green-light to-stone-100">
                {rnd.image || researcherImage ? (
                  <img src={rnd.image || researcherImage} alt={rnd.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center font-serif font-bold text-7xl text-emerald-green/25">HBC</div>
                )}
              </div>
              <div className="p-6 md:p-10">
                {rnd.badge && <span className="inline-block rounded-full bg-emerald-green-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-green">{rnd.badge}</span>}
                <h3 className="mt-3 font-serif font-bold text-2xl md:text-3xl text-stone-900">{rnd.name}</h3>
                {rnd.role && <p className="mt-1 text-sm font-medium text-satin-gold-dark">{rnd.role}</p>}
                {rnd.intro && <p className="mt-4 text-[15px] leading-relaxed text-stone-600">{rnd.intro}</p>}
                {rnd.bullets.length > 0 && (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {rnd.bullets.map((s, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-stone-800"><Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-green" />{s}</li>
                    ))}
                  </ul>
                )}
                {rnd.awards.length > 0 && (
                  <div className="mt-6 rounded-2xl bg-[#FAF8F5] border border-stone-100 p-4 space-y-2">
                    {rnd.awards.map((a, i) => (
                      <p key={i} className="flex gap-2.5 text-[13px] leading-snug text-stone-700"><Award className="w-4 h-4 shrink-0 text-satin-gold" />{a}</p>
                    ))}
                  </div>
                )}
                <a href="#tu-van" className={`${btnPrimary} mt-8 w-full sm:w-auto`}>{rnd.cta} <ArrowRight className="w-4 h-4" /></a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Vì sao chọn */}
      {!services.hidden && (
        <section className="bg-white border-y border-stone-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={services.eyebrow} title={services.title} desc={services.desc} />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {services.items.map((s, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                return (
                  <Reveal key={String(i)} delay={(i % 3) * 0.06} className="group rounded-3xl border border-stone-100 bg-[#FAF8F5] p-6 md:p-7 hover:bg-white hover:shadow-xl hover:shadow-stone-900/5 hover:-translate-y-1 transition duration-300">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-green-light text-emerald-green group-hover:bg-emerald-green group-hover:text-white transition"><Icon className="w-5 h-5" /></span>
                    <h3 className="mt-5 font-serif font-bold text-lg md:text-xl text-stone-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quy trình */}
      {!process.hidden && process.steps.length > 0 && (
        <section id="quy-trinh" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={process.eyebrow} title={process.title} desc={process.desc} />
            {/* Mobile: timeline dọc — Desktop: các cột ngang */}
            <ol className="mt-10 relative grid lg:grid-flow-col lg:auto-cols-fr gap-0 lg:gap-5">
              <span className="lg:hidden absolute left-[21px] top-2 bottom-2 w-px bg-emerald-green/20" aria-hidden />
              <span className="hidden lg:block absolute left-[8%] right-[8%] top-[22px] h-px bg-emerald-green/20" aria-hidden />
              {process.steps.map((s, i) => (
                <li key={i} className="relative flex lg:flex-col lg:items-center lg:text-center gap-4 pb-7 lg:pb-0">
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-green text-sm font-bold text-white ring-4 ring-[#FAF8F5]">{pad(i + 1)}</span>
                  <div className="lg:mt-2">
                    <h3 className="font-serif font-bold text-lg text-stone-900">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Chứng nhận — danh sách lấy từ mục "Chứng nhận" trong admin */}
      {!content.certifications.hidden && certs.length > 0 && (
        <section id="chung-nhan" className="bg-white border-y border-stone-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={content.certifications.eyebrow} title={content.certifications.title} desc={content.certifications.desc} />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {certs.map((c, i) => {
                const Icon = CERT_ICONS[i % CERT_ICONS.length];
                return (
                  <Reveal key={c.name + i} delay={i * 0.05} className="rounded-3xl border border-stone-100 bg-[#FAF8F5] p-6">
                    {c.image ? (
                      <button type="button" onClick={() => setViewCert(i)} className="group relative mb-5 block w-full cursor-zoom-in" aria-label={`Xem ${c.name}`}>
                        <img src={c.image} alt={c.name} loading="lazy" className="aspect-[3/4] w-full rounded-xl object-cover object-top bg-white border border-stone-100" />
                        <span className="absolute bottom-2 right-2 rounded-full bg-stone-950/75 px-3 py-1.5 text-[11px] font-semibold text-white sm:opacity-0 sm:group-hover:opacity-100 transition">Xem giấy tờ</span>
                      </button>
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-satin-gold-light text-satin-gold-dark"><Icon className="w-5 h-5" /></span>
                    )}
                    <h3 className="mt-4 font-serif font-bold text-lg leading-snug text-stone-900">{c.name}</h3>
                    {c.issuer && <p className="mt-1 text-xs font-semibold text-emerald-green">{c.issuer}</p>}
                    {c.description && <p className="mt-2 text-sm leading-relaxed text-stone-600">{c.description}</p>}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Form tư vấn */}
      <section id="tu-van" className="py-16 md:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHead center={false} eyebrow={formText.eyebrow} title={formText.title} desc={formText.desc} />
            {formText.benefits.length > 0 && (
              <ul className="mt-6 space-y-3">
                {formText.benefits.map((text, i) => {
                  const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                  return <li key={i} className="flex gap-3 text-[15px] text-stone-700"><Icon className="w-5 h-5 shrink-0 text-emerald-green" />{text}</li>;
                })}
              </ul>
            )}
            <div className="mt-8 rounded-3xl bg-stone-950 p-6 text-white">
              <a href={TEL} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-green"><Phone className="w-5 h-5" /></span>
                <span><span className="block text-xs text-stone-400">Hotline tư vấn · {contact.hours}</span><span className="font-serif font-bold text-xl">{contact.hotline}</span></span>
              </a>
              <div className="mt-5 space-y-2.5 text-[13px] leading-relaxed text-stone-300">
                {contact.office && <p className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-satin-gold" />{contact.office}</p>}
                {contact.factory && <p className="flex gap-2.5"><Factory className="w-4 h-4 mt-0.5 shrink-0 text-satin-gold" />{contact.factory}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-stone-100 p-5 sm:p-8 md:p-10 shadow-xl shadow-stone-900/5">
            {formState === "done" ? (
              <div className="py-14 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-green-light"><Check className="w-8 h-8 text-emerald-green" /></span>
                <h3 className="mt-5 font-serif font-bold text-2xl md:text-3xl">{formText.successTitle}</h3>
                <p className="mt-2 text-[15px] text-stone-600">{formText.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif font-bold text-2xl md:text-[28px] text-stone-900">{formText.formTitle}</h3>
                  {formText.formSubtitle && <p className="mt-1.5 text-sm text-stone-500">{formText.formSubtitle}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Họ và tên *" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <input className={inputCls} placeholder="Số điện thoại / Zalo *" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  <input className={inputCls} placeholder="Email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className={inputCls} placeholder="Tên thương hiệu (nếu có)" value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} />
                </div>
                <fieldset>
                  <legend className="text-sm font-semibold text-stone-800">Nhóm sản phẩm quan tâm <span className="text-emerald-green">*</span></legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {categoryOptions.map((c) => (
                      <button key={c} type="button" onClick={() => setForm({ ...form, category: c })} aria-pressed={selectedCategory === c} className={chip(selectedCategory === c)}>{c}</button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold text-stone-800">Số lượng dự kiến</legend>
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MOQ_OPTIONS.map(([v, label]) => (
                      <button key={v} type="button" onClick={() => setForm({ ...form, moq: v })} aria-pressed={form.moq === v} className={chip(form.moq === v)}>{label}</button>
                    ))}
                  </div>
                </fieldset>
                <textarea className={`${inputCls} min-h-28 resize-none`} placeholder="Nội dung cần tư vấn (concept, thành phần, mức giá mong muốn…)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {formError && <p className="text-sm text-red-600">{formError}</p>}
                <button type="submit" disabled={formState === "sending"} className={`${btnPrimary} w-full py-4 text-[15px] disabled:opacity-60`}>
                  {formState === "sending" ? "Đang gửi…" : <>Gửi yêu cầu tư vấn <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-xs leading-relaxed text-stone-400">Khi gửi thông tin, bạn đồng ý để Cosbuilt liên hệ tư vấn về nhu cầu phát triển sản phẩm. Thông tin dự án được bảo mật.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {!faq.hidden && faq.items.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <SectionHead eyebrow={faq.eyebrow} title={faq.title} />
            <div className="mt-8 space-y-3">
              {faq.items.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className={`rounded-2xl border bg-white transition ${open ? "border-emerald-green/30 shadow-sm" : "border-stone-100"}`}>
                    <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left">
                      <span className={`text-[15px] md:text-base font-semibold ${open ? "text-emerald-green" : "text-stone-900"}`}>{f.q}</span>
                      <ChevronDown className={`w-5 h-5 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180 text-emerald-green" : ""}`} />
                    </button>
                    {open && <p className="px-5 pb-5 md:px-6 text-[15px] leading-relaxed text-stone-600 whitespace-pre-line">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA cuối */}
      {!cta.hidden && (
        <section className="px-4 md:px-8 pb-16 md:pb-24">
          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-green-dark px-6 py-12 md:px-14 md:py-16 text-center md:text-left">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-green/30 blur-3xl" aria-hidden />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h2 className="font-serif font-bold text-[28px] leading-tight md:text-4xl text-white">{cta.titleBefore} {cta.titleHighlight && <span className={GOLD_TEXT}>{cta.titleHighlight}</span>}</h2>
                {cta.desc && <p className="mt-3 text-[15px] text-stone-300">{cta.desc}</p>}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 shrink-0">
                <a href="#tu-van" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-green hover:bg-stone-100 transition">{cta.button} <ArrowRight className="w-4 h-4" /></a>
                <a href={TEL} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"><Phone className="w-4 h-4" /> {contact.hotline}</a>
              </div>
            </div>
          </div>
        </section>
      )}

      <CertificateViewer docs={certs} index={viewCert} onClose={() => setViewCert(null)} onIndexChange={setViewCert} />

      <footer className="bg-stone-950 text-stone-400">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <img src={logos.white} alt="Cosbuilt" className="h-9 w-auto" />
          <span className="text-center">© 2026 Cosbuilt · Tiêu chuẩn ISO 22716:2007 / GMP</span>
        </div>
      </footer>

      {/* Desktop: nút liên hệ nổi */}
      <div className="hidden md:flex fixed bottom-6 right-5 z-40 flex-col gap-3">
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo" className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#0068FF] text-xs font-bold text-white shadow-lg hover:scale-105 transition">Zalo</a>
        <a href={TEL} aria-label="Gọi hotline" className="grid h-[52px] w-[52px] place-items-center rounded-full bg-emerald-green text-white shadow-lg hover:scale-105 transition"><Phone className="w-5 h-5" /></a>
      </div>

      {/* Mobile: thanh hành động cố định */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1fr_1.4fr] gap-2 border-t border-stone-200 bg-white/95 backdrop-blur px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]" aria-label="Liên hệ nhanh">
        <a href={TEL} className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-stone-700"><Phone className="w-5 h-5 text-emerald-green" />Gọi ngay</a>
        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-stone-700"><MessageCircle className="w-5 h-5 text-[#0068FF]" />Zalo</a>
        <a href="#tu-van" className="flex items-center justify-center rounded-full bg-emerald-green text-[13px] font-bold text-white">Nhận tư vấn</a>
      </nav>
    </div>
  );
}
