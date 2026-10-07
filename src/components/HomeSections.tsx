import { useState, FormEvent } from "react";
import {
  ShieldCheck, FlaskConical, Factory, PackageCheck, ArrowRight, ArrowUpRight, Phone, MessageCircle,
  Check, ChevronDown, Boxes, Palette, FileText, Truck, Award, Send, Loader2, CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type Tr = (vi: string, en: string, ko: string) => string;
const useL = (): Tr => {
  const { language } = useLanguage();
  return (vi, en, ko) => (language === "en" ? en : language === "ko" ? ko : vi);
};

const HOTLINE = "0966 373 686";
const ZALO = "https://zalo.me/0966373686";

/* ---------- Section heading shared by the new blocks ---------- */
export function SectionHead({ eyebrow, title, desc, light = false }: { eyebrow: string; title: string; desc?: string; light?: boolean }) {
  return (
    <div className="text-center space-y-3 max-w-3xl mx-auto">
      <span className={`eyebrow ${light ? "!text-satin-gold" : ""}`}>{eyebrow}</span>
      <h2 className={`text-3xl md:text-4xl font-serif font-bold leading-tight ${light ? "text-white" : "text-stone-900"}`}>{title}</h2>
      <div className="gold-rule"><i></i></div>
      {desc && <p className={`text-sm md:text-base leading-relaxed ${light ? "text-stone-300" : "text-stone-600"}`}>{desc}</p>}
    </div>
  );
}

/* ---------- Hero quick-lead card (name + phone only → /api/leads) ---------- */
export function QuickLeadCard({ onMore }: { onMore: () => void }) {
  const L = useL();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Chăm sóc da mặt");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), category, message: "Gửi từ form nhanh ở trang chủ" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setName(""); setPhone("");
    } catch {
      setState("error");
    }
  };

  const cats: [string, string, string, string][] = [
    ["Chăm sóc da mặt", "Facial care", "스킨케어", "Chăm sóc da mặt"],
    ["Mặt nạ", "Sheet mask", "마스크팩", "Mặt nạ"],
    ["Chăm sóc cơ thể", "Body care", "바디케어", "Chăm sóc cơ thể"],
    ["Chăm sóc tóc", "Hair care", "헤어케어", "Chăm sóc tóc"],
    ["Trang điểm", "Makeup", "메이크업", "Trang điểm"],
    ["Khác", "Other", "기타", "Khác"],
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] border border-white/20 text-left">
      {state === "done" ? (
        <div className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-green mx-auto" />
          <h3 className="font-serif font-bold text-xl text-stone-900">{L("Đã nhận thông tin!", "Request received!", "접수되었습니다!")}</h3>
          <p className="text-sm text-stone-600">{L("Chuyên viên Cosbuilt sẽ liên hệ bạn trong giờ làm việc (09:00–18:00, T2–T6).", "A Cosbuilt specialist will contact you during working hours (09:00–18:00, Mon–Fri).", "코스빌트 담당자가 근무 시간(09:00–18:00, 월–금)에 연락드립니다.")}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3.5">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">{L("Nhận tư vấn & báo giá miễn phí", "Get a free consultation & quote", "무료 상담 및 견적")}</h3>
            <p className="text-xs text-stone-500 mt-1">{L("Để lại thông tin, chuyên viên gọi lại trong giờ làm việc.", "Leave your details and we will call you back during working hours.", "연락처를 남기시면 근무 시간 내에 연락드립니다.")}</p>
          </div>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={L("Họ và tên *", "Full name *", "이름 *")} autoComplete="name"
            className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-green focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-colors" />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={L("Số điện thoại / Zalo *", "Phone / Zalo *", "전화번호 / Zalo *")} inputMode="tel" autoComplete="tel"
            className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-green focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-colors" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label={L("Dòng sản phẩm quan tâm", "Product line", "관심 제품군")}
            className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-green rounded-xl px-4 py-3 text-sm outline-none">
            {cats.map(([vi, en, ko, value]) => <option key={value} value={value}>{L(vi, en, ko)}</option>)}
          </select>
          {state === "error" && (
            <p className="text-xs text-red-600">{L("Chưa gửi được. Vui lòng thử lại hoặc gọi", "Could not send. Please try again or call", "전송하지 못했습니다. 다시 시도하거나 전화주세요")} {HOTLINE}.</p>
          )}
          <button type="submit" disabled={state === "sending"}
            className="btn-sheen w-full bg-gradient-to-b from-emerald-green-bright to-emerald-green-dark text-white font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer">
            {state === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {L("Gửi yêu cầu tư vấn", "Request a consultation", "상담 요청하기")}
          </button>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-green" />{L("Bảo mật thông tin dự án", "Your project stays confidential", "프로젝트 정보 보호")}</span>
            <button type="button" onClick={onMore} className="font-semibold text-emerald-green hover:underline cursor-pointer">{L("Form chi tiết", "Detailed form", "상세 문의")}</button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ---------- Trust pillars ---------- */
export function TrustPillars({ onAbout }: { onAbout: (sub: string) => void }) {
  const L = useL();
  const items = [
    { icon: ShieldCheck, sub: "certifications",
      title: L("Nhà máy chuẩn ISO 22716 GMP", "ISO 22716 GMP-certified factory", "ISO 22716 GMP 인증 공장"),
      desc: L("Chứng nhận GMP mỹ phẩm do UNI-CERT cấp (KU0025-GMP). Giấy tờ pháp lý minh bạch, xem được trực tiếp trên website.", "Cosmetic GMP certificate issued by UNI-CERT (KU0025-GMP). Transparent legal documents you can view on this site.", "UNI-CERT 발급 화장품 GMP 인증(KU0025-GMP). 법적 서류를 웹사이트에서 직접 확인하실 수 있습니다.") },
    { icon: FlaskConical, sub: "rd-team",
      title: L("Phòng R&D chuyên trách", "Dedicated R&D department", "전담 R&D 연구소"),
      desc: L("Phòng R&D được KOITA – Hiệp hội Xúc tiến Công nghệ Công nghiệp Hàn Quốc – công nhận, do các nhà nghiên cứu dày dặn kinh nghiệm dẫn dắt.", "R&D department recognised by KOITA (Korea Industrial Technology Association), led by seasoned researchers.", "한국산업기술진흥협회(KOITA)가 인정한 전담 연구소, 풍부한 경력의 연구원이 이끕니다.") },
    { icon: Factory, sub: "factory-capacity",
      title: L("Công suất lớn, 2 nhà máy", "Large capacity, 2 factories", "대규모 생산, 2개 공장"),
      desc: L("Nhà máy tại Incheon & Gimpo: 24 triệu mặt nạ/năm, 7,2 triệu sản phẩm skin care/năm, 5 triệu sản phẩm dạng tuýp/năm.", "Factories in Incheon & Gimpo: 24M sheet masks/year, 7.2M skin-care products/year, 5M tube products/year.", "인천·김포 공장: 마스크팩 연 2,400만 개, 스킨케어 연 720만 개, 튜브 연 500만 개.") },
    { icon: PackageCheck, sub: "oem-odm",
      title: L("Một đầu mối – trọn gói", "One partner, end-to-end", "원스톱 서비스"),
      desc: L("Công thức độc quyền, bao bì, kiểm nghiệm & hồ sơ công bố, sản xuất và vận chuyển – thương hiệu chỉ cần tập trung bán hàng.", "Exclusive formulas, packaging, testing & registration, production and logistics – you focus on selling.", "독점 처방, 용기, 시험·등록, 생산, 물류까지 – 브랜드는 판매에만 집중하세요.") },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHead
        eyebrow={L("Vì sao khách hàng tin tưởng", "Why brands trust us", "고객이 신뢰하는 이유")}
        title={L("Bốn lý do để bạn yên tâm giao sản phẩm cho Cosbuilt", "Four reasons to hand your product to Cosbuilt", "코스빌트에 제품을 맡기셔도 되는 네 가지 이유")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <button key={i} type="button" onClick={() => onAbout(it.sub)}
            className="group text-left bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-sm hover:shadow-md hover:border-satin-gold/50 transition-all cursor-pointer">
            <span className="w-12 h-12 rounded-2xl bg-emerald-green-light text-emerald-green flex items-center justify-center group-hover:bg-emerald-green group-hover:text-white transition-colors">
              <it.icon className="w-6 h-6" />
            </span>
            <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">{it.title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{it.desc}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-green">{L("Xem chi tiết", "Learn more", "자세히 보기")} <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Services (what we do) ---------- */
export function ServicesGrid({ services, onOpen }: { services: { title: string; description: string; icon: string }[]; onOpen: (tabId: string) => void }) {
  const L = useL();
  const ids = ["oem-odm", "formula-development", "packaging-print", "legal-service", "logistics"];
  const icons: Record<string, typeof Boxes> = { Boxes, FlaskConical, Palette, FileText, Truck };
  const list = services.slice(0, 5);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHead
        eyebrow={L("Dịch vụ của chúng tôi", "Our services", "서비스")}
        title={L("Mọi thứ để ra mắt một dòng mỹ phẩm, trong một đầu mối", "Everything to launch a cosmetics line, in one place", "화장품 브랜드 론칭에 필요한 모든 것을 한곳에서")}
        desc={L("Từ ý tưởng đến thành phẩm giao tận tay – bạn không cần tự đầu tư nhà xưởng hay làm việc với nhiều nhà cung cấp.", "From idea to delivered product – no factory investment or juggling suppliers.", "아이디어부터 완제품 납품까지 – 공장 투자나 여러 공급사 관리가 필요 없습니다.")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((s, i) => {
          const Icon = icons[s.icon] || Boxes;
          return (
            <button key={i} type="button" onClick={() => onOpen(ids[i])}
              className="group text-left bg-white rounded-3xl border border-stone-200 p-7 space-y-3 hover:shadow-md hover:border-satin-gold/50 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-stone-100 text-emerald-green flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <span className="font-serif text-3xl text-stone-200 font-bold">0{i + 1}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">{s.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">{s.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-green">{L("Tìm hiểu", "Learn more", "자세히")} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
            </button>
          );
        })}
        <button type="button" onClick={() => onOpen("cooperation-benefits")}
          className="group text-left rounded-3xl p-7 bg-stone-950 text-white flex flex-col justify-between gap-6 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-satin-gold/10 blur-2xl" />
          <Award className="w-8 h-8 text-satin-gold relative" />
          <div className="space-y-2 relative">
            <h3 className="font-serif font-bold text-lg">{L("Lợi ích khi hợp tác cùng Cosbuilt", "Benefits of partnering with Cosbuilt", "코스빌트와의 협업 혜택")}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-satin-gold">{L("Xem tất cả lợi ích", "See all benefits", "모든 혜택 보기")} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
          </div>
        </button>
      </div>
    </section>
  );
}

/* ---------- Process timeline ---------- */
export function ProcessTimeline({ steps, onContact }: { steps: string[]; onContact: () => void }) {
  const L = useL();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHead
        eyebrow={L("Quy trình hợp tác", "How we work", "협업 절차")}
        title={L("6 bước rõ ràng từ tư vấn đến bàn giao", "6 clear steps from consultation to delivery", "상담부터 납품까지 명확한 6단계")}
        desc={L("Minh bạch từng giai đoạn để bạn luôn chủ động về tiến độ, chi phí và chất lượng.", "Every stage is transparent so you stay in control of timeline, cost and quality.", "모든 단계가 투명하여 일정, 비용, 품질을 직접 관리하실 수 있습니다.")}
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const [title, desc] = step.split(": ");
          return (
            <li key={i} className="relative bg-white rounded-3xl border border-stone-200 p-6 pl-20 min-h-[120px]">
              <span className="absolute left-5 top-5 w-11 h-11 rounded-full bg-emerald-green text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">{i + 1}</span>
              <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">{title}</h3>
              {desc && <p className="text-sm text-stone-600 leading-relaxed mt-1.5">{desc}</p>}
            </li>
          );
        })}
      </ol>
      <div className="text-center">
        <button onClick={onContact} className="btn-sheen inline-flex items-center gap-2 bg-gradient-to-b from-emerald-green-bright to-emerald-green-dark text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg cursor-pointer">
          {L("Bắt đầu với bước 1 – tư vấn miễn phí", "Start with step 1 – free consultation", "1단계 시작 – 무료 상담")} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ---------- Capacity band with factory photos ---------- */
export function CapacityBand({ images, onFactory }: { images: { image: string; title: string }[]; onFactory: () => void }) {
  const L = useL();
  const nums = [
    { v: "24", u: L("triệu/năm", "million/yr", "백만/년"), l: L("Mặt nạ giấy", "Sheet masks", "마스크팩") },
    { v: "7,2", u: L("triệu/năm", "million/yr", "백만/년"), l: L("Sản phẩm Skin Care", "Skin-care products", "스킨케어 제품") },
    { v: "5", u: L("triệu/năm", "million/yr", "백만/년"), l: L("Sản phẩm dạng tuýp", "Tube products", "튜브 제품") },
    { v: "400", u: L("tấn/tháng", "tons/month", "톤/월"), l: L("Tổng công suất bồn khuấy (Agi Mixer + Homo Mixer)", "Total mixing capacity (Agi + Homo Mixer)", "총 혼합 용량 (Agi + Homo Mixer)") },
  ];
  const pics = images.filter((x) => x?.image).slice(0, 3);
  return (
    <section className="relative bg-stone-950 text-white py-20 md:py-24 overflow-hidden grain">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,color-mix(in_srgb,var(--color-emerald-green)_35%,transparent),transparent_70%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHead light
          eyebrow={L("Năng lực sản xuất", "Production capacity", "생산 능력")}
          title={L("Quy mô đủ lớn để đồng hành cùng thương hiệu từ lô đầu đến khi mở rộng", "Scale to support you from the first batch to expansion", "첫 생산부터 확장까지 함께할 수 있는 규모")}
          desc={L("Hệ thống bồn khuấy, nước siêu tinh khiết và dây chuyền chiết rót tự động khép kín tại 2 nhà máy Incheon & Gimpo, Hàn Quốc.", "Mixers, ultrapure water and closed automated filling lines at our two factories in Incheon & Gimpo, Korea.", "한국 인천·김포 2개 공장의 믹서, 초순수 시스템, 자동 충진 라인.")}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-white/10">
          {nums.map((n, i) => (
            <div key={i} className="text-center px-4 py-3">
              <div className="font-serif font-bold text-4xl md:text-5xl text-satin-gold">{n.v}</div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-stone-400 mt-1">{n.u}</div>
              <div className="text-sm text-stone-200 mt-2">{n.l}</div>
            </div>
          ))}
        </div>
        {pics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pics.map((p, i) => (
              <figure key={i} onContextMenu={(e) => e.preventDefault()} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 select-none">
                <img src={p.image} alt={p.title} loading="lazy" draggable={false} className="pointer-events-none w-full h-full object-cover" referrerPolicy="no-referrer" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold bg-gradient-to-t from-black/80 to-transparent">{p.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="text-center">
          <button onClick={onFactory} className="inline-flex items-center gap-2 border border-white/30 hover:border-satin-gold/70 hover:bg-white/5 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all cursor-pointer">
            {L("Xem toàn bộ nhà máy & năng lực", "See the full factory & capacity", "공장 및 생산 능력 전체 보기")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Certificates showcase (opens the existing viewer) ---------- */
export function CertShowcase({ certs, onView, onAll }: { certs: any[]; onView: (i: number) => void; onAll: () => void }) {
  const L = useL();
  const list = certs.slice(0, 4);
  if (!list.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHead
        eyebrow={L("Chứng nhận & pháp lý", "Certifications & legal", "인증 및 법적 서류")}
        title={L("Giấy tờ thật, kiểm chứng được", "Real documents you can verify", "직접 확인 가능한 실제 서류")}
        desc={L("Bấm vào từng giấy chứng nhận để xem bản gốc – chúng tôi công khai để bạn an tâm khi lựa chọn đối tác sản xuất.", "Click any certificate to view the original – we publish them so you can choose a manufacturing partner with confidence.", "각 인증서를 클릭해 원본을 확인하세요 – 안심하고 제조 파트너를 선택하실 수 있도록 공개합니다.")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((c, i) => (
          <button key={i} type="button" onClick={() => c.image && onView(i)} disabled={!c.image}
            className="group text-left bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-md hover:border-satin-gold/50 transition-all flex flex-col cursor-pointer disabled:cursor-default">
            <div className="aspect-[4/3] bg-stone-50 border-b border-stone-100 flex items-center justify-center overflow-hidden">
              {c.image ? (
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500" referrerPolicy="no-referrer" />
              ) : (
                <ShieldCheck className="w-10 h-10 text-emerald-green/30" />
              )}
            </div>
            <div className="p-5 space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-2">{c.name}</h3>
              {c.issuer && <p className="text-xs text-stone-500 line-clamp-2">{c.issuer}</p>}
            </div>
          </button>
        ))}
      </div>
      <div className="text-center">
        <button onClick={onAll} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:underline cursor-pointer">
          {L("Xem tất cả chứng nhận", "View all certifications", "모든 인증 보기")} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ---------- Partners / brands made ---------- */
export function PartnersBand({ partners, onAll }: { partners: { name: string; type?: string }[]; onAll: () => void }) {
  const L = useL();
  if (!partners.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHead
        eyebrow={L("Đối tác & khách hàng", "Partners & clients", "파트너 및 고객")}
        title={L("Đã sản xuất cho các thương hiệu tại nhiều thị trường", "Manufacturing for brands across markets", "다양한 시장의 브랜드를 위해 생산합니다")}
        desc={L("Bao gồm dòng PB cho hệ thống Watsons tại Đông Nam Á & Hồng Kông, cùng nhiều nhãn hàng chăm sóc da, tóc và mặt nạ.", "Including private-brand lines for Watsons in Southeast Asia & Hong Kong, plus many skin, hair and mask brands.", "동남아·홍콩 Watsons PB 라인 및 다양한 스킨·헤어·마스크 브랜드를 생산합니다.")}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {partners.slice(0, 6).map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 text-center space-y-1">
            <div className="font-serif font-bold text-stone-900 text-sm md:text-base leading-snug">{p.name}</div>
            {p.type && <div className="text-xs text-stone-500 leading-snug">{p.type}</div>}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={onAll} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:underline cursor-pointer">
          {L("Xem thêm đối tác", "See more partners", "파트너 더 보기")} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqSection({ onContact }: { onContact: () => void }) {
  const L = useL();
  const [open, setOpen] = useState<number | null>(0);
  const items: [string, string][] = [
    [L("MOQ gia công tối thiểu là bao nhiêu?", "What is the minimum order quantity?", "최소 주문 수량(MOQ)은 얼마인가요?"),
     L("Với lô đầu tiên, Cosbuilt hỗ trợ chia nhỏ lô thử nghiệm từ 500–1.000 đơn vị để giảm áp lực tồn kho cho thương hiệu mới. MOQ cụ thể tùy dòng sản phẩm và bao bì.", "For your first batch we support trial runs from 500–1,000 units to ease stock pressure for new brands. Exact MOQ depends on product line and packaging.", "첫 생산은 500–1,000개 소량 시험 생산을 지원하여 신규 브랜드의 재고 부담을 줄여드립니다. 정확한 MOQ는 제품군과 용기에 따라 달라집니다.")],
    [L("Thời gian phát triển sản phẩm mất bao lâu?", "How long does development take?", "제품 개발에는 얼마나 걸리나요?"),
     L("Mẫu thử thường có sau khoảng 1–2 tuần kể từ khi chốt brief. Thời gian sản xuất hàng loạt phụ thuộc số lượng, bao bì và hồ sơ công bố – chuyên viên sẽ báo tiến độ chi tiết khi báo giá.", "Samples are usually ready 1–2 weeks after the brief is confirmed. Mass-production time depends on quantity, packaging and registration – we confirm the timeline with your quote.", "샘플은 브리프 확정 후 보통 1–2주 소요됩니다. 양산 기간은 수량, 용기, 등록 절차에 따라 다르며 견적 시 안내해 드립니다.")],
    [L("Cosbuilt có hỗ trợ thương hiệu mới không?", "Do you support new brands?", "신규 브랜드도 지원하나요?"),
     L("Có. Chúng tôi hỗ trợ từ định vị thương hiệu, chọn công thức từ thư viện 3.500+ công thức sẵn có, thiết kế bao bì đến tư liệu hình ảnh/video nhà máy phục vụ marketing.", "Yes. From brand positioning and choosing from 3,500+ ready formulas to packaging design and factory photo/video material for your marketing.", "네. 브랜드 포지셔닝, 3,500개 이상의 기존 처방 선택, 용기 디자인, 마케팅용 공장 사진·영상까지 지원합니다.")],
    [L("Cosbuilt có hỗ trợ công bố sản phẩm không?", "Do you handle product registration?", "제품 등록도 대행하나요?"),
     L("Có. Cosbuilt thay mặt doanh nghiệp kiểm nghiệm vi sinh, kim loại nặng, soạn hồ sơ công bố gửi Bộ Y tế và hỗ trợ CFS cho sản phẩm xuất khẩu.", "Yes. We handle microbial and heavy-metal testing, prepare the Ministry of Health notification dossier and support CFS for exports.", "네. 미생물·중금속 시험, 보건부 등록 서류 작성, 수출용 CFS 발급을 대행합니다.")],
    [L("Công thức của tôi có được bảo mật không?", "Is my formula kept confidential?", "제 처방은 비밀이 보장되나요?"),
     L("Tuyệt đối. Thông tin dự án và công thức gia công độc quyền được bảo mật theo hợp đồng.", "Absolutely. Project information and exclusive formulas are protected under contract.", "물론입니다. 프로젝트 정보와 독점 처방은 계약에 따라 철저히 보호됩니다.")],
  ];
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 w-full">
      <SectionHead eyebrow={L("Câu hỏi thường gặp", "FAQ", "자주 묻는 질문")} title={L("Những điều khách hàng thường hỏi trước khi bắt đầu", "What clients ask before starting", "시작 전 자주 묻는 질문")} />
      <div className="space-y-3">
        {items.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`bg-white rounded-2xl border transition-colors ${isOpen ? "border-satin-gold/60 shadow-sm" : "border-stone-200"}`}>
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer">
                <span className="font-serif font-bold text-stone-900 text-base">{q}</span>
                <ChevronDown className={`w-5 h-5 text-emerald-green shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="px-6 pb-5 -mt-1 text-sm text-stone-600 leading-relaxed">{a}</p>}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <button onClick={onContact} className="text-sm font-semibold text-emerald-green hover:underline cursor-pointer">{L("Còn câu hỏi khác? Liên hệ chuyên viên", "More questions? Talk to a specialist", "다른 질문이 있으신가요? 담당자에게 문의")}</button>
      </div>
    </section>
  );
}

/* ---------- Mobile sticky action bar ---------- */
export function MobileActionBar({ onQuote }: { onQuote: () => void }) {
  const L = useL();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-3 py-2.5 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)]">
      <a href={`tel:+84966373686`} className="flex-1 flex items-center justify-center gap-2 border border-stone-300 text-stone-900 font-semibold text-sm rounded-full py-3">
        <Phone className="w-4 h-4 text-emerald-green" />{L("Gọi ngay", "Call", "전화")}
      </a>
      <a href={ZALO} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-stone-300 text-stone-900 font-semibold text-sm rounded-full py-3">
        <MessageCircle className="w-4 h-4 text-emerald-green" />Zalo
      </a>
      <button onClick={onQuote} className="flex-[1.4] bg-gradient-to-b from-emerald-green-bright to-emerald-green-dark text-white font-semibold text-sm rounded-full py-3 cursor-pointer">
        {L("Nhận báo giá", "Get a quote", "견적 받기")}
      </button>
    </div>
  );
}

export const TrustChips = () => {
  const L = useL();
  const benefits = [
    L("Lô đầu chỉ từ 500 sản phẩm", "First batch from just 500 units", "첫 생산 500개부터"),
    L("Có mẫu thử sau khoảng 1–2 tuần", "Samples in about 1–2 weeks", "약 1–2주 내 샘플 제공"),
    L("Miễn phí thiết kế & test mẫu", "Free design & sample testing", "디자인 및 샘플 테스트 무료"),
    L("Cosbuilt làm hồ sơ công bố cho bạn", "We prepare your product registration", "제품 등록 서류 대행"),
    L("Bảo mật công thức theo hợp đồng", "Formulas protected by contract", "계약에 따른 처방 비밀 보장"),
  ];
  const proof = [
    L("ISO 22716 GMP", "ISO 22716 GMP", "ISO 22716 GMP"),
    L("Phòng R&D được KOITA công nhận", "R&D dept. recognised by KOITA", "KOITA 인정 R&D 연구소"),
    L("Sản xuất dòng PB cho Watsons", "Private-brand lines for Watsons", "Watsons PB 라인 생산"),
  ];
  return (
    <div className="space-y-4 pt-1">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
        {benefits.map((c) => (
          <li key={c} className="flex items-start gap-2 text-sm text-stone-100">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-satin-gold" />{c}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/15 pt-3 text-[11px] font-semibold tracking-wide text-satin-gold/90 uppercase">
        {proof.map((c, i) => (
          <span key={c} className="flex items-center gap-4">{i > 0 && <span className="w-1 h-1 rounded-full bg-satin-gold/60" />}{c}</span>
        ))}
      </div>
    </div>
  );
};
