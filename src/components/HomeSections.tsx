import { useState, FormEvent } from "react";
import {
  ShieldCheck, FlaskConical, Factory, PackageCheck, ArrowRight, ArrowUpRight, Phone, MessageCircle,
  Check, ChevronDown, Boxes, Palette, FileText, Truck, Award, Send, Loader2, CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCurrency } from "../contexts/CurrencyContext";

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

/* ---------- Trust strip: four proofs separated by hairlines ---------- */
export function TrustPillars({ onAbout }: { onAbout: (sub: string) => void }) {
  const L = useL();
  const items = [
    { icon: ShieldCheck, sub: "certifications",
      title: L("ISO 22716 GMP", "ISO 22716 GMP", "ISO 22716 GMP"),
      desc: L("Nhà máy được UNI-CERT chứng nhận GMP mỹ phẩm (KU0025-GMP). Giấy tờ xem được ngay trên website.", "Factory certified for cosmetic GMP by UNI-CERT (KU0025-GMP). Documents viewable on this site.", "UNI-CERT 화장품 GMP 인증(KU0025-GMP). 서류를 웹사이트에서 확인하실 수 있습니다.") },
    { icon: FlaskConical, sub: "rd-team",
      title: L("Phòng R&D chuyên trách", "Dedicated R&D department", "전담 R&D 연구소"),
      desc: L("Được KOITA – Hiệp hội Xúc tiến Công nghệ Công nghiệp Hàn Quốc – công nhận.", "Recognised by KOITA, the Korea Industrial Technology Association.", "한국산업기술진흥협회(KOITA)가 인정한 전담 연구소.") },
    { icon: Factory, sub: "factory-capacity",
      title: L("2 nhà máy tại Hàn Quốc", "2 factories in Korea", "한국 2개 공장"),
      desc: L("Incheon & Gimpo – 24 triệu mặt nạ, 7,2 triệu sản phẩm skin care mỗi năm.", "Incheon & Gimpo – 24M sheet masks and 7.2M skin-care products a year.", "인천·김포 – 마스크팩 연 2,400만 개, 스킨케어 연 720만 개.") },
    { icon: PackageCheck, sub: "oem-odm",
      title: L("Trọn gói một đầu mối", "One partner, end-to-end", "원스톱 서비스"),
      desc: L("Công thức, bao bì, kiểm nghiệm & công bố, sản xuất, vận chuyển.", "Formula, packaging, testing & registration, production, logistics.", "처방, 용기, 시험·등록, 생산, 물류.") },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-stone-200 divide-y sm:divide-y-0 lg:divide-x divide-stone-200">
        {items.map((it, i) => (
          <button key={i} type="button" onClick={() => onAbout(it.sub)} className="group text-left px-0 sm:px-6 py-7 first:lg:pl-0 last:lg:pr-0 cursor-pointer">
            <it.icon className="w-6 h-6 text-satin-gold-dark mb-4" strokeWidth={1.5} />
            <h3 className="font-serif font-semibold text-lg text-stone-900 group-hover:text-emerald-green transition-colors">{it.title}</h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">{it.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Three ways to start ---------- */
export function Pathways({ onContact, onCatalogue }: { onContact: () => void; onCatalogue: () => void }) {
  const L = useL();
  const paths = [
    { n: "01",
      title: L("Chọn công thức có sẵn", "Choose a ready formula", "기존 처방 선택"),
      desc: L("Chọn trong thư viện 3.500+ công thức sẵn có, tinh chỉnh hương, thể chất, màu sắc và bao bì theo thương hiệu. Cách nhanh nhất để ra mắt.", "Pick from 3,500+ existing formulas and tune scent, texture, colour and packaging to your brand. The fastest way to launch.", "3,500개 이상의 기존 처방에서 선택하고 향, 제형, 색상, 용기를 브랜드에 맞게 조정합니다. 가장 빠른 론칭 방법입니다."),
      who: L("Phù hợp thương hiệu mới, ngân sách vừa phải", "Best for new brands and tighter budgets", "신규 브랜드·합리적인 예산에 적합"),
      cta: L("Xem công thức mẫu", "Browse sample formulas", "샘플 처방 보기"), act: onCatalogue },
    { n: "02",
      title: L("Tùy chỉnh theo brief", "Customise to your brief", "브리프에 맞춘 맞춤 개발"),
      desc: L("Bạn cho biết tệp khách hàng, mức giá, concept và thành phần mong muốn. R&D lên mẫu, duyệt hương – thể chất – màu sắc và tinh chỉnh theo phản hồi của bạn.", "Share your target customer, price point, concept and desired ingredients. R&D builds samples and refines scent, texture and colour with your feedback.", "타깃 고객, 가격대, 콘셉트, 원하는 성분을 알려주세요. R&D가 샘플을 만들고 피드백에 따라 조정합니다."),
      who: L("Phù hợp thương hiệu đã có định hướng rõ", "Best for brands with a clear direction", "방향이 명확한 브랜드에 적합"),
      cta: L("Gửi brief cho chuyên viên", "Send your brief", "브리프 보내기"), act: onContact },
    { n: "03",
      title: L("Công thức độc quyền", "Exclusive formula", "독점 처방 개발"),
      desc: L("Đội ngũ R&D sáng tạo công thức mới, đảm bảo tính độc quyền, an toàn và hiệu quả. Thông tin dự án và công thức được bảo mật theo hợp đồng.", "Our R&D team creates a new formula that is exclusive, safe and effective. Project details and formulas are protected under contract.", "R&D 팀이 독점적이고 안전하며 효과적인 새 처방을 개발합니다. 프로젝트 정보와 처방은 계약에 따라 보호됩니다."),
      who: L("Phù hợp thương hiệu muốn khác biệt hoàn toàn", "Best for brands that want to stand apart", "완전한 차별화를 원하는 브랜드에 적합"),
      cta: L("Trao đổi với R&D", "Talk to R&D", "R&D와 상담"), act: onContact },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">{L("Bắt đầu như thế nào", "How to start", "시작 방법")}</span>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 leading-[1.1]">
          {L("Ba cách để có sản phẩm mang thương hiệu của bạn", "Three ways to get a product with your name on it", "내 브랜드 제품을 만드는 세 가지 방법")}
        </h2>
        <p className="text-stone-600 leading-relaxed">{L("Dù bạn đã có sẵn ý tưởng hay mới bắt đầu, Cosbuilt có lộ trình phù hợp. Lô đầu từ khoảng 500 sản phẩm để giảm áp lực tồn kho.", "Whether you have a clear idea or are just starting, Cosbuilt has a route for you. First batches start at around 500 units to ease stock pressure.", "아이디어가 있든 이제 시작하든, 코스빌트에는 알맞은 경로가 있습니다. 첫 생산은 약 500개부터 가능합니다.")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x divide-stone-200 border-t border-stone-200">
        {paths.map((p) => (
          <div key={p.n} className="py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0 space-y-5 flex flex-col">
            <span className="font-serif text-5xl text-satin-gold font-light">{p.n}</span>
            <h3 className="font-serif font-semibold text-2xl text-stone-900">{p.title}</h3>
            <p className="text-stone-600 leading-relaxed flex-1">{p.desc}</p>
            <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase border-l-2 border-satin-gold pl-3">{p.who}</p>
            <button onClick={p.act} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:gap-3 transition-all cursor-pointer w-fit">
              {p.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Capabilities: editorial alternating rows ---------- */
export function Capabilities({ images, onContact }: { images: { skin: string; mask: string; nano: string }; onContact: () => void }) {
  const L = useL();
  const rows = [
    { img: images.skin, stat: L("7,2 triệu sản phẩm / năm", "7.2M products / year", "연 720만 개"),
      eyebrow: L("Dòng chăm sóc da", "Skin care line", "스킨케어 라인"),
      title: L("Từ làm sạch đến kem dưỡng hoàn thiện", "From cleansing to finishing creams", "클렌징부터 마무리 크림까지"),
      desc: L("Cosbuilt có năng lực nghiên cứu và phát triển toàn bộ nhóm sản phẩm skin care.", "Cosbuilt can research and develop the full range of skin-care products.", "코스빌트는 스킨케어 전 제품군을 연구·개발할 수 있습니다."),
      points: [L("Làm sạch và chăm sóc tóc", "Cleansing and hair care", "클렌징 및 헤어케어"), L("Toner, lotion, kem dưỡng, nhũ tương", "Toner, lotion, cream, emulsion", "스킨, 로션, 크림, 에멀전"), L("Sản phẩm chức năng: cải thiện nếp nhăn, làm sáng da, ngừa mụn", "Functional care: wrinkle improvement, whitening, acne care", "기능성: 주름 개선, 미백, 여드름 케어")] },
    { img: images.mask, stat: L("24 triệu mặt nạ / năm", "24M sheet masks / year", "마스크팩 연 2,400만 개"),
      eyebrow: L("Dòng mặt nạ", "Sheet mask line", "마스크팩 라인"),
      title: L("Nhiều dạng bào chế, nhiều loại vải", "Many formulations, many fabrics", "다양한 제형과 원단"),
      desc: L("Từ kinh nghiệm phát triển mặt nạ, chúng tôi đề xuất các dạng bào chế đã được kiểm chứng độ ổn định và dạng mới do nghiên cứu liên tục.", "Drawing on mask-development experience, we offer formulations of proven stability plus new ones from ongoing research.", "마스크팩 개발 경험을 바탕으로 안정성이 검증된 제형과 지속적인 연구로 개발한 신제형을 제안합니다."),
      points: [L("Công nghệ nano, tinh thể lỏng (liquid crystal), liposome", "Nano tech, liquid crystal, liposome", "나노테크, 액정, 리포좀"), L("Nhiều loại vải mặt nạ thông qua đối tác", "A wide choice of mask fabrics through partners", "파트너를 통한 다양한 원단")] },
    { img: images.nano, stat: L("Bằng sáng chế Cleansing Balm", "Cleansing Balm patent", "클렌징 밤 특허"),
      eyebrow: L("Nghiên cứu hạt nano", "Nanoparticle research", "나노입자 연구"),
      title: L("Đưa hoạt chất vào da hiệu quả, ít kích ứng", "Delivering actives efficiently, with low irritation", "저자극으로 유효성분을 효과적으로 전달"),
      desc: L("Cosbuilt đầu tư nghiên cứu hệ dẫn truyền hoạt chất và cách ứng dụng nhiều loại hạt nano lên mặt nạ.", "We invest in research on active-ingredient delivery systems and in applying various nanoparticles to mask sheets.", "유효성분 전달 시스템과 다양한 나노입자의 마스크시트 적용에 대해 지속적으로 투자·연구합니다."),
      points: [L("Hệ dẫn truyền hoạt chất (skin delivery system)", "Skin delivery system", "피부전달시스템"), L("Tối đa hóa hấp thụ qua da với mức kích ứng thấp", "Maximising absorption with low irritation", "저자극 피부흡수 극대화")] },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">{L("Chúng tôi làm gì", "What we make", "우리가 만드는 것")}</span>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 leading-[1.1]">
          {L("Mỹ phẩm do các nhà nghiên cứu tạo ra", "Cosmetics made by researchers", "연구원들이 만드는 화장품")}
        </h2>
      </div>
      <div className="space-y-20">
        {rows.map((r, i) => (
          <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}>
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                <img src={r.img} alt={r.title} loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute left-0 bottom-0 bg-stone-950/90 text-satin-gold text-[11px] font-semibold tracking-[0.18em] uppercase px-5 py-3">{r.stat}</span>
              </div>
            </div>
            <div className={`lg:col-span-6 space-y-5 ${i % 2 ? "lg:order-1" : ""}`}>
              <span className="eyebrow">{r.eyebrow}</span>
              <h3 className="font-serif font-semibold text-3xl md:text-4xl text-stone-900 leading-tight">{r.title}</h3>
              <p className="text-stone-600 leading-relaxed">{r.desc}</p>
              <ul className="space-y-2.5 pt-1">
                {r.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-stone-800"><Check className="w-4 h-4 mt-0.5 text-satin-gold-dark shrink-0" />{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={onContact} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:gap-3 transition-all cursor-pointer">
          {L("Trao đổi về sản phẩm của bạn", "Talk about your product", "제품에 대해 상담하기")} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ---------- Services: split layout, hairline list ---------- */
export function ServicesGrid({ services, onOpen }: { services: { title: string; description: string; icon: string }[]; onOpen: (tabId: string) => void }) {
  const L = useL();
  const ids = ["oem-odm", "formula-development", "packaging-print", "legal-service", "logistics"];
  const list = services.slice(0, 5);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-40 self-start">
          <span className="eyebrow">{L("Dịch vụ trọn gói", "End-to-end services", "원스톱 서비스")}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 leading-[1.1]">
            {L("Một đầu mối cho cả hành trình ra mắt sản phẩm", "One partner for the whole launch journey", "제품 론칭의 모든 과정을 한곳에서")}
          </h2>
          <p className="text-stone-600 leading-relaxed">{L("Bạn không cần tự đầu tư nhà xưởng hay làm việc với nhiều nhà cung cấp – chỉ cần tập trung xây dựng thương hiệu và bán hàng.", "No factory investment and no juggling suppliers – focus on building your brand and selling.", "공장 투자나 여러 공급사 관리 없이 브랜드 구축과 판매에 집중하세요.")}</p>
          <button onClick={() => onOpen("cooperation-benefits")} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:gap-3 transition-all cursor-pointer">
            {L("Lợi ích khi hợp tác cùng Cosbuilt", "Benefits of partnering with Cosbuilt", "코스빌트와의 협업 혜택")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <ul className="lg:col-span-7 border-t border-stone-200">
          {list.map((s, i) => (
            <li key={i} className="border-b border-stone-200">
              <button type="button" onClick={() => onOpen(ids[i])} className="group w-full text-left grid grid-cols-[auto_1fr_auto] gap-5 items-start py-7 cursor-pointer">
                <span className="font-serif text-xl text-satin-gold-dark pt-0.5 w-8">0{i + 1}</span>
                <span className="space-y-2">
                  <span className="block font-serif font-semibold text-xl text-stone-900 group-hover:text-emerald-green transition-colors">{s.title}</span>
                  <span className="block text-sm text-stone-600 leading-relaxed">{s.description}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Process timeline: numbered columns on a hairline ---------- */
export function ProcessTimeline({ steps, onContact }: { steps: string[]; onContact: () => void }) {
  const L = useL();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">{L("Quy trình hợp tác", "How we work", "협업 절차")}</span>
        <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 leading-[1.1]">
          {L("Sáu bước rõ ràng, từ tư vấn đến bàn giao", "Six clear steps, from consultation to delivery", "상담부터 납품까지 명확한 6단계")}
        </h2>
        <p className="text-stone-600 leading-relaxed">{L("Minh bạch từng giai đoạn để bạn luôn chủ động về tiến độ, chi phí và chất lượng.", "Every stage is transparent so you stay in control of timeline, cost and quality.", "모든 단계가 투명하여 일정, 비용, 품질을 직접 관리하실 수 있습니다.")}</p>
      </div>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-t border-stone-300">
        {steps.map((step, i) => {
          const [title, desc] = step.split(": ");
          return (
            <li key={i} className="relative pt-6 pb-8 pr-6 lg:border-r border-stone-200 last:border-r-0 lg:pl-5 first:lg:pl-0">
              <span className="absolute -top-px left-0 lg:left-5 first:lg:left-0 w-10 h-[3px] bg-satin-gold" />
              <span className="font-serif text-4xl text-stone-300 font-light">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-serif font-semibold text-base text-stone-900 leading-snug">{title}</h3>
              {desc && <p className="text-sm text-stone-600 leading-relaxed mt-2">{desc}</p>}
            </li>
          );
        })}
      </ol>
      <div>
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

/* ---------- Featured formulas (real catalogue items) ---------- */
export function FeaturedFormulas({ products, onOpen, onAll }: { products: { id: string; title: string; image: string; badge?: string; lab?: string }[]; onOpen: (id: string) => void; onAll: () => void }) {
  const L = useL();
  if (!products.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <span className="eyebrow">{L("Thư viện công thức", "Formula library", "처방 라이브러리")}</span>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-stone-900 leading-[1.1]">{L("Xem trước một số công thức có thể gia công ngay", "A preview of formulas ready to manufacture", "바로 생산 가능한 처방 미리보기")}</h2>
        </div>
        <button onClick={onAll} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-green hover:gap-3 transition-all cursor-pointer shrink-0">
          {L("Xem toàn bộ thư viện", "See the full library", "전체 라이브러리 보기")} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {products.slice(0, 4).map((p) => (
          <button key={p.id} type="button" onClick={() => onOpen(p.id)} className="group text-left cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 rounded-sm">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="pt-4 space-y-1.5">
              {p.badge && <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-satin-gold-dark">{p.badge}</span>}
              <h3 className="font-serif font-semibold text-base text-stone-900 leading-snug group-hover:text-emerald-green transition-colors line-clamp-2">{p.title.replace(/\s*\(Mẫu thử[^)]*\)/i, "")}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-green">{L("Yêu cầu mẫu thử", "Request a sample", "샘플 요청")} <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Shared inner-page hero (dark, editorial) ---------- */
export function PageHero({ eyebrow, title, desc, crumb, onHome }: { eyebrow: string; title: string; desc?: string; crumb: string; onHome: () => void }) {
  const L = useL();
  return (
    <section className="relative bg-stone-950 text-white overflow-hidden grain">
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_85%_0%,color-mix(in_srgb,var(--color-emerald-green)_32%,transparent),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-satin-gold/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-stone-400 mb-7">
          <button onClick={onHome} className="hover:text-satin-gold transition-colors cursor-pointer">{L("Trang chủ", "Home", "홈")}</button>
          <span className="text-stone-600">/</span>
          <span className="text-stone-200">{crumb}</span>
        </nav>
        <div className="max-w-4xl space-y-5">
          <span className="eyebrow !text-satin-gold">{eyebrow}</span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-semibold tracking-tight leading-[1.1]">{title}</h1>
          {desc && <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl">{desc}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------- Closing call-to-action shown at the foot of every inner page ---------- */
export function ClosingCta({ onQuote }: { onQuote: () => void }) {
  const L = useL();
  const points = [
    L("Tư vấn bước đầu miễn phí", "Free first consultation", "무료 초기 상담"),
    L("Mẫu thử sau khoảng 1–2 tuần", "Samples in about 1–2 weeks", "약 1–2주 내 샘플"),
    L("Bảo mật thông tin dự án & công thức", "Project & formula confidentiality", "프로젝트·처방 비밀 보장"),
  ];
  return (
    <section className="bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="eyebrow">{L("Bắt đầu cùng Cosbuilt", "Start with Cosbuilt", "코스빌트와 시작하기")}</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-stone-900 leading-tight">
            {L("Bạn đang chuẩn bị ra mắt dòng mỹ phẩm riêng?", "Preparing to launch your own cosmetics line?", "나만의 화장품 라인을 준비 중이신가요?")}
          </h2>
          <ul className="space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-stone-700"><Check className="w-4 h-4 text-satin-gold-dark shrink-0" />{p}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
          <button onClick={onQuote} className="btn-sheen flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-green-bright to-emerald-green-dark text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg cursor-pointer">
            {L("Nhận báo giá & test mẫu miễn phí", "Get a free quote & sample test", "무료 견적 및 샘플 테스트")} <ArrowRight className="w-4 h-4" />
          </button>
          <a href="tel:+84966373686" className="flex items-center justify-center gap-2 border border-stone-300 hover:border-emerald-green bg-white text-stone-900 font-semibold text-sm px-8 py-4 rounded-full transition-colors">
            <Phone className="w-4 h-4 text-emerald-green" />{HOTLINE}
          </a>
          <a href={ZALO} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-stone-300 hover:border-emerald-green bg-white text-stone-900 font-semibold text-sm px-8 py-4 rounded-full transition-colors">
            <MessageCircle className="w-4 h-4 text-emerald-green" />{L("Nhắn Zalo", "Message on Zalo", "Zalo 메시지")}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Note shown next to converted prices ---------- */
export function CurrencyNote({ className = "" }: { className?: string }) {
  const L = useL();
  const { currency, rates } = useCurrency();
  if (currency === "VND") return null;
  const date = rates.updated === "fallback" ? "" : ` (${rates.updated.replace(/ \+0000$/, "")})`;
  return (
    <p className={`text-xs leading-relaxed ${className}`}>
      {L("", `Prices are converted from VND (our base currency) at the international mid-market rate${date} and rounded; the official quote is issued in VND.`,
        `표시 금액은 기준 통화인 VND를 국제 시장 환율${date}로 환산해 반올림한 참고용 금액이며, 공식 견적은 VND로 발행됩니다.`)}
    </p>
  );
}
