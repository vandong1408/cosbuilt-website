// Nội dung trang landing ẩn /catalogue. Admin chỉnh trong CRM → Quản lý nội dung
// → "Landing page"; được lưu ở field `landingPage` của /api/sheets/data.
// DEFAULT_LANDING là nội dung gốc — phần nào admin chưa lưu sẽ dùng mặc định.
import { ABOUT_SECTIONS, MANUFACTURING_CATEGORIES, RESEARCHER_HUR, SERVICES } from "../data";

export interface LandingContent {
  contact: { hotline: string; zalo: string; office: string; factory: string; hours: string };
  hero: {
    badge: string; titleBefore: string; titleHighlight: string; titleAfter: string; subtitle: string; image: string;
    primaryCta: string; secondaryCta: string;
    stats: { value: string; label: string }[];
    stepsTitle: string; steps: { title: string; desc: string }[];
    trustTitle: string; trustDesc: string;
  };
  categories: { hidden?: boolean; eyebrow: string; title: string; desc: string; items: { title: string; description: string; image: string; points: string[]; tags: string[] }[] };
  factory: { hidden?: boolean; eyebrow: string; title: string; desc: string; capacity: { value: string; unit: string; label: string }[]; images: { title: string; description: string; image: string }[]; strengths: string[] };
  rnd: { hidden?: boolean; eyebrow: string; title: string; desc: string; image: string; badge: string; name: string; role: string; intro: string; bullets: string[]; awards: string[]; cta: string };
  services: { hidden?: boolean; eyebrow: string; title: string; desc: string; items: { title: string; description: string }[] };
  process: { hidden?: boolean; eyebrow: string; title: string; desc: string; steps: { title: string; detail: string }[] };
  certifications: { hidden?: boolean; eyebrow: string; title: string; desc: string };
  form: { eyebrow: string; title: string; desc: string; benefits: string[]; formTitle: string; formSubtitle: string; categoryOptions: string[]; successTitle: string; successDesc: string };
  faq: { hidden?: boolean; eyebrow: string; title: string; items: { q: string; a: string }[] };
  cta: { hidden?: boolean; titleBefore: string; titleHighlight: string; desc: string; button: string };
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=900`;
const shortTitle = (t: string) => t.replace(/^Gia công /, "").replace(/\s*\(.*\)$/, "");

export const DEFAULT_LANDING: LandingContent = {
  contact: {
    hotline: "0966 373 686",
    zalo: "https://zalo.me/0966373686",
    office: "VP: 2.40 The Prince Residence, 19-21 Nguyễn Văn Trỗi, P. Phú Nhuận, TP.HCM",
    factory: "Nhà máy: Incheon & Gimpo, Hàn Quốc",
    hours: "09:00–18:00, T2–T6",
  },
  hero: {
    badge: "Nhà máy gia công OEM / ODM Hàn Quốc",
    titleBefore: "Sản xuất mỹ phẩm theo",
    titleHighlight: "định hướng riêng",
    titleAfter: "của thương hiệu",
    subtitle: "Phát triển serum, kem dưỡng, mặt nạ, chăm sóc tóc, trang điểm và chăm sóc cá nhân — công thức độc quyền do đội ngũ nhà nghiên cứu Hàn Quốc tạo ra, sản xuất tại 2 nhà máy chuẩn ISO 22716 / GMP.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1800",
    primaryCta: "Nhận tư vấn sản phẩm",
    secondaryCta: "Tư vấn qua Zalo",
    stats: [
      { value: "3.500+", label: "Công thức độc quyền" },
      { value: "500", label: "MOQ lô đầu từ" },
      { value: "12+", label: "Năm R&D" },
    ],
    stepsTitle: "Quy trình 6 bước",
    steps: [
      { title: "Tiếp nhận & tư vấn", desc: "Brief concept, tệp khách, mức giá" },
      { title: "R&D lên mẫu thử", desc: "Phát triển mẫu theo định hướng thương hiệu" },
      { title: "Chốt công thức & báo giá", desc: "Duyệt mẫu, chọn bao bì, báo giá chi tiết" },
      { title: "Hợp đồng & công bố", desc: "Ký hợp đồng, kiểm nghiệm, hồ sơ công bố" },
      { title: "Sản xuất hàng loạt", desc: "Dây chuyền tự động chuẩn ISO 22716 / GMP" },
      { title: "QC & bàn giao", desc: "Kiểm tra từng lô, giao hàng, hậu mãi" },
    ],
    trustTitle: "ISO 22716:2007 GMP · R&D KOITA",
    trustDesc: "Chứng nhận UNI-CERT KU0025-GMP · Incheon, Hàn Quốc",
  },
  categories: {
    eyebrow: "Danh mục phát triển",
    title: "Từ ý tưởng thị trường đến sản phẩm mang dấu ấn riêng",
    desc: "Định hướng công thức, kết cấu và trải nghiệm sử dụng theo tệp khách hàng mục tiêu — chọn từ thư viện 3.500+ công thức hoặc phát triển độc quyền.",
    items: MANUFACTURING_CATEGORIES.map((c) => ({
      title: shortTitle(c.title), description: c.description, image: c.image, points: [...c.subCategories], tags: [...c.features],
    })),
  },
  factory: {
    eyebrow: "Năng lực nhà máy",
    title: "Không gian sản xuất chuyên nghiệp dành cho thương hiệu",
    desc: "Nhà máy 1 (Gimpo) và Nhà máy 2 (Incheon) vận hành bồn khuấy Agi Mixer, Agi Homo Mixer, hệ thống nước siêu tinh khiết Ultrapure cùng dây chuyền chiết rót tự động khép kín.",
    capacity: [
      { value: "400", unit: "tấn/tháng", label: "Bồn khuấy Agi Mixer" },
      { value: "24M", unit: "sp/năm", label: "Mặt nạ giấy" },
      { value: "7.2M", unit: "sp/năm", label: "Dòng Skin Care" },
      { value: "5M", unit: "sp/năm", label: "Sản phẩm dạng tuýp" },
    ],
    images: [
      { title: "Phòng thí nghiệm R&D", description: "Đội ngũ nghiên cứu phát triển và tối ưu công thức độc quyền cho từng thương hiệu.", image: u("1581093450021-4a7360e9a6b5") },
      { title: "Nghiên cứu & thử nghiệm mẫu", description: "Mẫu thử được pha chế, đo lường chính xác trước khi gửi khách hàng duyệt.", image: u("1532187863486-abf9dbad1b69") },
      { title: "Khu kiểm nghiệm chất lượng", description: "Kiểm tra độ ổn định lý hóa, vi sinh cho từng lô trước khi xuất xưởng.", image: u("1579154204601-01588f351e67") },
      { title: "Phân tích & đánh giá công thức", description: "Theo dõi độ ổn định trong nhiều điều kiện môi trường khắc nghiệt.", image: u("1582719471384-894fbb16e074") },
      { title: "Phát triển kết cấu & hoạt chất", description: "Ứng dụng Liposome, Nano, Exosome và chiết xuất thiên nhiên.", image: u("1617897903246-719242758050") },
      { title: "Hoàn thiện bao bì & đóng gói", description: "Chiết rót, dán nhãn, đóng gói hoàn thiện theo nhận diện thương hiệu.", image: u("1631729371254-42c2892f0e6e") },
    ],
    strengths: [...ABOUT_SECTIONS.factory.strengths],
  },
  rnd: {
    eyebrow: "R&D đồng hành",
    title: "Công thức bắt đầu từ bài toán kinh doanh",
    desc: "Tiếp nhận brief về khách hàng, mức giá, concept và thành phần mong muốn để đề xuất hướng phát triển phù hợp nhất.",
    image: "",
    badge: RESEARCHER_HUR.badge,
    name: RESEARCHER_HUR.name,
    role: RESEARCHER_HUR.role,
    intro: RESEARCHER_HUR.intro,
    bullets: ["Tư vấn concept & cấu trúc danh mục", "Phát triển, tinh chỉnh mẫu theo phản hồi", "Định hướng bao bì & hồ sơ công bố", "Kiểm soát chất lượng theo từng lô"],
    awards: [...RESEARCHER_HUR.awards],
    cta: "Nhận tư vấn R&D",
  },
  services: {
    eyebrow: "Vì sao chọn Cosbuilt",
    title: "Nền tảng để thương hiệu phát triển bền vững",
    desc: "Một đầu mối cho công thức, bao bì, pháp lý và vận chuyển — thương hiệu chỉ cần tập trung bán hàng.",
    items: SERVICES.filter((s) => !s.title.startsWith("Quy trình")).map((s) => ({ title: s.title, description: s.description })),
  },
  process: {
    eyebrow: "Quy trình sản xuất trọn gói",
    title: "6 bước rõ ràng từ tư vấn đến bàn giao",
    desc: "Quy trình minh bạch giúp thương hiệu chủ động theo dõi từng giai đoạn phát triển và sản xuất.",
    steps: [
      { title: "Tiếp nhận & tư vấn", detail: "Làm rõ tệp khách hàng, mức giá, concept và thành phần mong muốn." },
      { title: "R&D lên mẫu thử", detail: "Phát triển mẫu, duyệt hương, thể chất, màu sắc và tinh chỉnh theo phản hồi." },
      { title: "Chốt công thức & báo giá", detail: "Thống nhất công thức, chọn bao bì, báo giá chi tiết theo số lượng." },
      { title: "Hợp đồng & công bố", detail: "Ký hợp đồng, Cosbuilt thay mặt kiểm nghiệm và làm hồ sơ công bố." },
      { title: "Sản xuất hàng loạt", detail: "Chiết rót, đóng gói trên dây chuyền tự động chuẩn ISO 22716 / GMP." },
      { title: "QC & bàn giao", detail: "Kiểm tra chất lượng từng lô, bàn giao và đồng hành sau bán hàng." },
    ],
  },
  certifications: {
    eyebrow: "Tiêu chuẩn vận hành",
    title: "Minh bạch năng lực, nhất quán chất lượng",
    desc: ABOUT_SECTIONS.certifications.subtitle,
  },
  form: {
    eyebrow: "Trao đổi cùng Cosbuilt",
    title: "Bạn đang chuẩn bị ra mắt dòng mỹ phẩm riêng?",
    desc: "Để lại thông tin, chuyên viên sẽ liên hệ để làm rõ định hướng sản phẩm, mức ngân sách và kế hoạch triển khai.",
    benefits: ["Tư vấn bước đầu theo nhu cầu thực tế", "Bảo mật thông tin dự án & công thức", "Phản hồi trong giờ làm việc (09:00–18:00, T2–T6)"],
    formTitle: "Nhận tư vấn phát triển sản phẩm",
    formSubtitle: "Miễn phí · Phản hồi nhanh trong giờ làm việc",
    categoryOptions: ["Chăm sóc da mặt", "Chăm sóc cơ thể", "Chăm sóc tóc", "Trang điểm", "Chăm sóc cá nhân", "Khác"],
    successTitle: "Đã nhận thông tin!",
    successDesc: "Chuyên viên Cosbuilt sẽ liên hệ với bạn trong giờ làm việc sớm nhất.",
  },
  faq: {
    eyebrow: "Câu hỏi thường gặp",
    title: "Thông tin trước khi bắt đầu",
    items: [
      { q: "MOQ gia công tối thiểu là bao nhiêu?", a: "Với lô hàng đầu tiên, Cosbuilt hỗ trợ chia nhỏ lô thử nghiệm từ 500–1.000 đơn vị để giảm áp lực tồn kho cho thương hiệu mới. MOQ cụ thể tùy dòng sản phẩm và bao bì." },
      { q: "Thời gian phát triển sản phẩm mất bao lâu?", a: "Mẫu thử thường có sau khoảng 1–2 tuần kể từ khi chốt brief. Thời gian sản xuất hàng loạt phụ thuộc số lượng, bao bì và hồ sơ công bố — chuyên viên sẽ báo tiến độ chi tiết khi báo giá." },
      { q: "Cosbuilt có hỗ trợ thương hiệu mới không?", a: "Có. Chúng tôi hỗ trợ từ định vị thương hiệu, chọn công thức từ thư viện 3.500+ công thức sẵn có, thiết kế bao bì miễn phí đến tư liệu hình ảnh/video nhà máy phục vụ marketing." },
      { q: "Cosbuilt có hỗ trợ công bố sản phẩm không?", a: "Có. Cosbuilt thay mặt doanh nghiệp kiểm nghiệm vi sinh, kim loại nặng, soạn hồ sơ công bố gửi Bộ Y tế và hỗ trợ CFS cho sản phẩm xuất khẩu." },
      { q: "Công thức của tôi có được bảo mật không?", a: "Tuyệt đối. Thông tin dự án và công thức gia công độc quyền được bảo mật theo hợp đồng." },
    ],
  },
  cta: {
    titleBefore: "Sẵn sàng biến định hướng thành",
    titleHighlight: "sản phẩm?",
    desc: "Trao đổi với chuyên viên Cosbuilt để bắt đầu từ một brief rõ ràng.",
    button: "Nhận tư vấn ngay",
  },
};

// Gộp nội dung đã lưu với mặc định theo từng phần (mảng đã lưu thay thế nguyên
// mảng mặc định). Dữ liệu cũ/thiếu field vẫn hiển thị an toàn.
export function mergeLanding(saved: unknown): LandingContent {
  const out = structuredClone(DEFAULT_LANDING) as LandingContent;
  if (!saved || typeof saved !== "object") return out;
  const s = saved as Record<string, unknown>;
  for (const key of Object.keys(out) as (keyof LandingContent)[]) {
    const part = s[key];
    if (part && typeof part === "object" && !Array.isArray(part)) {
      const target = out[key] as unknown as Record<string, unknown>;
      for (const [k, v] of Object.entries(part as Record<string, unknown>)) {
        if (v === undefined || v === null) continue;
        if (Array.isArray(target[k]) !== Array.isArray(v) && k in target) continue;
        target[k] = v;
      }
    }
  }
  return out;
}

// Chỉ cho phép link http(s) cho Zalo; số điện thoại chỉ giữ chữ số và dấu +.
export const safeHttpUrl = (url: string, fallback: string) => (/^https?:\/\//i.test(url.trim()) ? url.trim() : fallback);
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
