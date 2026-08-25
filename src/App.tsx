import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Sparkles, 
  Boxes, 
  FlaskConical, 
  Palette, 
  FileText, 
  Truck, 
  GitMerge, 
  Gem, 
  ChevronDown, 
  Calendar, 
  User, 
  TrendingUp, 
  Send, 
  CheckCircle, 
  Calculator, 
  Info, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  Building2,
  Users,
  Briefcase,
  X,
  Trash2,
  Eye,
  Filter,
  RotateCcw,
  ShoppingBag,
  Star,
  Image,
  Settings,
  FileSpreadsheet,
  RefreshCw,
  ChevronUp,
  MessageCircle
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIFormulaAdvisor from "./components/AIFormulaAdvisor";
import CRMDashboard from "./components/CRMDashboard";
import { useLanguage } from "./contexts/LanguageContext";

import { 
  ABOUT_SECTIONS, 
  SERVICES, 
  MANUFACTURING_CATEGORIES, 
  PRICING_LIST, 
  BLOG_POSTS,
  FORMULA_PRODUCTS,
  DEFAULT_GALLERY_IMAGES
} from "./data";
import { BlogPost, ManufacturingCategory, FormulaProduct, ProductPackaging } from "./types";
import { slugify } from "./lib/slug";

export const getPackagingsForProduct = (prod: any): ProductPackaging[] => {
  if (prod.packagings && prod.packagings.length > 0) {
    return prod.packagings;
  }

  // Deterministic seed so each product keeps the same suggestions.
  const combined = (prod.id || "") + (prod.title || "");
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = combined.charCodeAt(i) + ((seed << 5) - seed);
  }
  seed = Math.abs(seed);

  // Verified cosmetic-packaging photos grouped by physical form, so each
  // suggested "vỏ chai / lọ / tuýp" actually looks like that form.
  const DROPPER = ["photo-1611930022073-b7a4ba5fcccd", "photo-1617897903246-719242758050", "photo-1515377905703-c4788e51af15", "photo-1608571423902-eed4a5ad8108"];
  const TUBE = ["photo-1620916566398-39f1143ab7be", "photo-1608248597279-f99d160bfcbc", "photo-1556228720-195a672e8a03"];
  const JAR = ["photo-1601049541289-9b1b7bbbfe19", "photo-1598440947619-2c35fc9aa908"];
  const PUMP = ["photo-1540555700478-4be289fbecef", "photo-1526947425960-945c6e72858f"];
  const BOTTLE = ["photo-1612817288484-6f916006741a", "photo-1535585209827-a15fcdbc4c2d", "photo-1526947425960-945c6e72858f"];
  const MAKEUP = ["photo-1586495777744-4413f21062fa", "photo-1596462502278-27bfdc403348", "photo-1512496015851-a90fb38ba796", "photo-1522335789203-aabd1fc54bc9"];

  const img = (pool: string[], off: number) => `https://images.unsplash.com/${pool[(seed + off) % pool.length]}?q=80&w=600`;
  const P = (type: string, name: string, pool: string[], off: number, description: string): ProductPackaging =>
    ({ type: type as any, name, image: img(pool, off), description });

  const t = (prod.title || "").toLowerCase();
  const cat = prod.category;
  const has = (...keys: string[]) => keys.some((k) => t.includes(k));

  // Makeup
  if (cat === "makeup" || has("son", "phấn", "kem nền", "cushion", "eyeliner", "kẻ mắt", "má hồng")) {
    return [
      P("bottle", "Vỏ Son / Thỏi Acrylic Cao Cấp", MAKEUP, 0, "Vỏ thỏi/hộp acrylic dày dặn, khắc logo tinh xảo, khẳng định đẳng cấp thương hiệu trên kệ trưng bày."),
      P("jar", "Hộp Compact Tích Hợp Gương", MAKEUP, 1, "Hộp phấn compact gương soi sắc nét kèm bông mút rubycell kháng khuẩn, tiện mang theo."),
      P("dropper", "Chai Kem Nền Vòi Nhấn", MAKEUP, 2, "Chai thủy tinh mờ vòi nhấn định lượng chuẩn, giữ chất nền ổn định, sang trọng."),
      P("tube", "Tuýp / Bút Bấm Thông Minh", MAKEUP, 3, "Dạng bút bấm/tuýp tiện thao tác, đầu cọ mềm mại, tối ưu cho trang điểm hằng ngày."),
    ];
  }
  // Toothpaste -> tube
  if (has("kem đánh răng")) {
    return [
      P("tube", "Tuýp Nhựa Nắp Vặn Tiêu Chuẩn", TUBE, 0, "Tuýp nhựa cấp thực phẩm, nắp vặn kín khít, in ấn sắc nét cho kem đánh răng."),
      P("tube", "Tuýp Nhôm Ép Kim Cao Cấp", TUBE, 2, "Tuýp nhôm phủ mờ ép kim sang trọng, dễ bóp hết sản phẩm, thân thiện tái chế."),
      P("tube", "Tuýp Bụng Lớn Dạng Đứng", TUBE, 1, "Thiết kế tuýp đứng nắp lật tiện dụng, đặt vững trên kệ, lấy sản phẩm nhanh."),
      P("bottle", "Chai Bơm Nước Súc Miệng Kèm Bộ", PUMP, 0, "Đồng bộ bộ chăm sóc răng miệng với chai bơm/định lượng tiện lợi."),
    ];
  }
  // Serum / ampoule / essence / oil -> dropper
  if (has("serum", "tinh chất", "ampoule", "essence", "tinh dầu", "dầu dưỡng", "dầu massage")) {
    return [
      P("dropper", "Chai Dropper Thủy Tinh Hổ Phách", DROPPER, 0, "Lọ nhỏ giọt thủy tinh nâu hổ phách chống tia UV, bảo vệ tối đa hoạt chất đặc trị nhạy cảm."),
      P("dropper", "Chai Nhỏ Giọt Thủy Tinh Trong", DROPPER, 1, "Thủy tinh borosilicate siêu trong khoe trọn màu sắc và kết cấu tinh chất cao cấp."),
      P("bottle", "Chai Airless Chân Không", DROPPER, 3, "Công nghệ airless hút chân không ngăn oxy hóa, giữ hoạt chất tươi mới đến giọt cuối."),
      P("bottle", "Chai Bơm Định Lượng", PUMP, 0, "Vòi bơm định lượng chính xác, vệ sinh, phù hợp tinh chất/dầu dưỡng dùng hằng ngày."),
    ];
  }
  // Mask -> sachet / jar
  if (has("mặt nạ") || cat === "mask") {
    return [
      P("sachet", "Túi Sachet Màng Nhôm 3 Lớp", JAR, 0, "Túi nhôm phức hợp chống thấm khí tuyệt đối, lưu giữ trọn vẹn tinh chất cho từng lần dùng."),
      P("jar", "Hũ Thủy Tinh Cao Cấp", JAR, 1, "Hũ thủy tinh mờ sang trọng, nắp kín khít, lý tưởng cho mặt nạ đất sét/kem dẻo."),
      P("tube", "Tuýp Mặt Nạ Dạng Gel", TUBE, 0, "Tuýp mềm phủ lì, nắp bật kín, lấy lượng gel/kem sạch sẽ, tiện lợi."),
      P("bottle", "Chai Bơm Chân Không", PUMP, 0, "Vòi nhấn chân không kiểm soát liều lượng, ngăn oxy hóa cho mặt nạ dạng lỏng."),
    ];
  }
  // Wash / shampoo / cleanser / scrub -> pump & bottle
  if (has("sữa rửa", "sữa tắm", "dầu gội", "rửa tay", "dung dịch vệ sinh", "nước súc miệng", "kem xả", "dầu xả", "gel tẩy", "tẩy tế bào", "kem ủ tóc")) {
    return [
      P("bottle", "Chai Bơm Định Lượng", PUMP, 0, "Vòi bơm tiện lợi, kiểm soát lượng dùng, lý tưởng cho sữa rửa/sữa tắm/dầu gội."),
      P("bottle", "Chai Nắp Bật Tiện Lợi", BOTTLE, 2, "Nắp bật (flip-top) thao tác nhanh một tay, kín khít, phù hợp phòng tắm."),
      P("bottle", "Chai PET Dung Tích Lớn", BOTTLE, 1, "Chai PET bền nhẹ dung tích lớn, tối ưu chi phí cho dòng dùng thường xuyên."),
      P("tube", "Tuýp Mềm Nắp Bật", TUBE, 0, "Tuýp mềm dễ bóp cho tẩy tế bào chết/kem ủ, hợp vệ sinh, gọn gàng."),
    ];
  }
  // Lotion / body / mist / spray / toner / deodorant -> bottle & pump
  if (has("sữa dưỡng", "lotion", "kem ủ", "body", "xịt", "toner", "nước tẩy trang", "lăn", "dưỡng da tay", "nước hoa")) {
    return [
      P("bottle", "Chai Xịt Sương / Bơm", PUMP, 0, "Đầu xịt sương mịn hoặc vòi bơm định lượng, phủ đều, sang trọng cho lotion/xịt dưỡng."),
      P("bottle", "Chai Thủy Tinh Nắp Vặn", BOTTLE, 2, "Chai thủy tinh cao cấp nắp vặn kín, tôn chất lượng dòng dưỡng thể/toner."),
      P("jar", "Hũ Kem Dưỡng Thể", JAR, 0, "Hũ đầm tay nắp vặn ren kín, phù hợp kem ủ/kem dưỡng thể kết cấu đặc."),
      P("bottle", "Chai Nhỏ Gọn Bỏ Túi", BOTTLE, 0, "Dung tích travel-size tiện mang theo, phù hợp xịt khoáng/lăn khử mùi."),
    ];
  }
  // Default: face cream / others -> jar & tube
  return [
    P("jar", "Hũ Thủy Tinh Ép Kim Sang Trọng", JAR, 0, "Hũ thủy tinh đúc đầm tay, nắp mạ vàng/bạc ép kim đẳng cấp, nâng tầm thương hiệu."),
    P("tube", "Tuýp Nhôm Matte Tối Giản", TUBE, 0, "Tuýp nhôm dẻo phủ mờ phong cách Bắc Âu, dễ tái chế, thân thiện môi trường."),
    P("bottle", "Chai Bơm Vòi Nhấn Cao Cấp", PUMP, 0, "Vòi pump kiểm soát dung lượng, lý tưởng cho kem dưỡng/lotion dạng lỏng."),
    P("jar", "Hộp Kim Loại Nhôm Minimalist", JAR, 1, "Hộp nhôm sơn tĩnh điện lì, nắp vặn kín khí, hoàn hảo cho sáp/scrub tự nhiên."),
  ];
};

export const getProductPriceRange = (prod: any, quantity = 1) => {
  const isMask = prod.title?.toLowerCase().includes("mặt nạ") || prod.id?.toLowerCase().includes("mask") || prod.category === "mask";
  if (isMask) {
    const min = 6000 * quantity;
    const max = 16000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  } else {
    const min = 60000 * quantity;
    const max = 160000 * quantity;
    return `${min.toLocaleString("vi-VN")}đ - ${max.toLocaleString("vi-VN")}đ`;
  }
};

// Map between the main content tabs and real URL paths so every section is
// directly linkable (e.g. /gioi-thieu), shareable, and works with the browser
// back/forward buttons and page refresh. "crm" keeps its existing /admin path.
const TAB_TO_PATH: Record<string, string> = {
  home: "/",
  about: "/gioi-thieu",
  services: "/dich-vu",
  categories: "/danh-muc-gia-cong",
  pricing: "/bang-gia-gia-cong",
  news: "/tin-tuc",
  contact: "/lien-he",
  crm: "/admin",
};

const PATH_TO_TAB: Record<string, string> = Object.entries(TAB_TO_PATH).reduce(
  (acc, [tab, path]) => {
    acc[path] = tab;
    return acc;
  },
  {} as Record<string, string>
);

// Individual products get their own URL under this prefix (e.g. /san-pham/serum-b5).
const PRODUCT_PATH = "/san-pham";


interface ParsedLocation {
  tab: string;
  category?: string; // categories tab: which manufacturing category is filtered
  productSlug?: string; // categories tab: a specific product detail is open
  blogSlug?: string; // news tab: a specific article is open
  subTab?: string; // about / services tab: which sub-section is selected
}

// Resolve a URL pathname to the view it represents. Tolerates a trailing slash;
// unknown paths fall back to the home tab. Product paths (/san-pham/:id) render
// inside the categories tab as a product detail view.
const parseLocation = (pathname: string): ParsedLocation => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (clean === "/admin") return { tab: "crm" };
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return { tab: "home" };
  const root = "/" + parts[0];
  if (root === PRODUCT_PATH) {
    return { tab: "categories", productSlug: parts[1] };
  }
  const tab = PATH_TO_TAB[root] || "home";
  // Convert the Vietnamese URL slug back to the internal id (old English slugs
  // still resolve via the fallback, so previously shared links keep working).
  if (tab === "categories" && parts[1]) {
    return { tab, category: CATEGORY_IDS[parts[1]] || parts[1] };
  }
  if (tab === "news" && parts[1]) return { tab, blogSlug: parts[1] };
  // About / Services sub-sections are their own addressable tabs
  // (e.g. /dich-vu/gia-cong-tron-goi, /gioi-thieu/nha-may-nang-luc).
  if (tab === "about" && parts[1]) return { tab, subTab: ABOUT_IDS[parts[1]] || parts[1] };
  if (tab === "services" && parts[1]) return { tab, subTab: SERVICE_IDS[parts[1]] || parts[1] };
  return { tab };
};

// Vietnamese URL slugs for the internal ids used in code/data, so every URL
// segment reads in Vietnamese (no English). Internal ids stay unchanged.
const CATEGORY_SLUGS: Record<string, string> = {
  "facial-care": "cham-soc-da-mat",
  "body-care": "cham-soc-co-the",
  "hair-care": "cham-soc-toc",
  "makeup": "trang-diem",
  "personal-care": "cham-soc-ca-nhan",
  "new-tech": "cong-nghe-moi",
};
const ABOUT_SLUGS: Record<string, string> = {
  "about-us": "ve-chung-toi",
  "factory-capacity": "nha-may-nang-luc",
  "certifications": "chung-nhan-tieu-chuan",
  "rd-team": "doi-ngu-nghien-cuu",
  "partners": "doi-tac",
};
const SERVICE_SLUGS: Record<string, string> = {
  "oem-odm": "gia-cong-tron-goi",
  "formula-development": "phat-trien-cong-thuc",
  "packaging-print": "bao-bi-in-an",
  "legal-service": "phap-ly-cong-bo",
  "logistics": "van-chuyen-thong-quan",
  "cooperation-process": "quy-trinh-hop-tac",
  "cooperation-benefits": "loi-ich-hop-tac",
};
const invertSlugs = (m: Record<string, string>): Record<string, string> =>
  Object.entries(m).reduce((acc, [id, slug]) => {
    acc[slug] = id;
    return acc;
  }, {} as Record<string, string>);
// Secondary filters live in the query string (?loai-da=..., ?chuyen-muc=...)
// so they stack cleanly on top of the category / news path without ambiguity.
const SKIN_SLUGS: Record<string, string> = {
  "Dành cho da khô": "da-kho",
  "Dành cho da dầu mụn": "da-dau-mun",
  "Dành cho da nhạy cảm": "da-nhay-cam",
  "Mọi loại da": "moi-loai-da",
};
const NEWS_SLUGS: Record<string, string> = {
  "cẩm nang": "cam-nang",
  "xu hướng": "xu-huong",
};
const CATEGORY_IDS = invertSlugs(CATEGORY_SLUGS);
const ABOUT_IDS = invertSlugs(ABOUT_SLUGS);
const SERVICE_IDS = invertSlugs(SERVICE_SLUGS);
const SKIN_BY_SLUG = invertSlugs(SKIN_SLUGS);
const NEWS_BY_SLUG = invertSlugs(NEWS_SLUGS);
const SKIN_ALL = "Tất cả loại da";

// URL slug for a product = its Vietnamese title slugified (falls back to id).
// Parenthetical notes like "(Mẫu thử gia công)" are dropped to keep URLs short.
const productSlugOf = (prod: { id: string; title?: string }): string =>
  (prod.title ? slugify(prod.title.replace(/\([^)]*\)/g, " ")) : "") || prod.id;

// Build the canonical URL for a blog post (stable across UI languages).
const blogPath = (post: { slug?: string; title: string }): string =>
  `/tin-tuc/${post.slug || slugify(post.title)}`;

export default function App() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Google Sheets Dynamic States (Moved to top to prevent block-scoped variable hoisting errors)
  const [customBlogPosts, setCustomBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [customImages, setCustomImages] = useState<any[]>(DEFAULT_GALLERY_IMAGES);
  const [customLogos, setCustomLogos] = useState<any[]>(ABOUT_SECTIONS.partners.logos);
  const [websiteLogo, setWebsiteLogo] = useState<any>({ name: "COSBUILT" });
  const [footerLogo, setFooterLogo] = useState<any>({ name: "COSBUILT" });
  const [customProducts, setCustomProducts] = useState<FormulaProduct[]>(FORMULA_PRODUCTS);

  const localizedAboutSections = {
    intro: {
      title: t("about_cosbuilt"),
      subtitle: language === "en" ? "International standard cosmetics contract manufacturer" : language === "ko" ? "국제 표준 화장품 계약 제조업체" : ABOUT_SECTIONS.intro.subtitle,
      content: language === "en" ? "Cosbuilt is proud to be one of the region's leading cosmetic OEM/ODM manufacturers. Our mission is to partner with brand owners to build exclusive, high-quality, safe, and trend-setting beauty products. Armed with cleanroom-certified facilities, premium imported materials, and expert R&D biochemists, Cosbuilt turns your beauty ideas into highly successful brands." : language === "ko" ? "코스빌트는 아시아 최고 수준의 화장품 OEM/ODM 종합 제조사입니다. 우리는 독점적이고 안전하며 시장 트렌드를 선도하는 프리미엄 뷰티 제품을 창출하도록 돕습니다. 최첨단 클린룸 설비, 엄선된 수입 원료 및 글로벌 R&D 석박사 연구진과 함께 코스빌트가 귀하의 뷰티 아이디어를 성공적인 메가 브랜드로 실현해 드립니다." : ABOUT_SECTIONS.intro.content,
      stats: [
        { label: t("stat_experience"), value: "12+" },
        { label: language === "en" ? "Exclusive Formulas" : language === "ko" ? "독점 포뮬러" : "Công thức độc quyền", value: "3,500+" },
        { label: t("stat_factory"), value: "2" },
        { label: language === "en" ? "Brand Partners" : language === "ko" ? "파트너 브랜드" : "Đối tác thương hiệu", value: "250+" }
      ]
    },
    factory: {
      title: t("about_capacity"),
      subtitle: language === "en" ? "Closed automated production lines with ASEAN CGMP certification" : language === "ko" ? "아세안 CGMP 인증을 획득한 완전 폐쇄형 자동 생산 라인" : ABOUT_SECTIONS.factory.subtitle,
      description: language === "en" ? "The Cosbuilt factory spans over 10,000m² with state-of-the-art cleanrooms of Class 100,000 standard. The entire production line, from raw material charging, homogenization, emulsification, to filling and packaging, utilizes advanced technologies imported from Germany, USA, and South Korea, with an annual capacity of 50 million products." : language === "ko" ? "코스빌트 공장은 10,000m² 이상의 규모에 10만 클래스(Class 100,000) 크린룸 설비를 갖추고 있습니다. 원료 투입, 균질화, 유화부터 충진, 포장까지 전 생산 라인은 독일, 미국, 한국에서 수입한 선진 기술을 도입하여 연간 5천만 개의 생산 능력을 보유하고 있습니다." : ABOUT_SECTIONS.factory.description,
      strengths: language === "en" ? [
        "Sterile R&D laboratory system adhering to GLP standards.",
        "New generation vacuum emulsification homogenizer for ultra-fine microparticles.",
        "Versatile automatic filling line (suitable for bottles, jars, and tubes).",
        "EDI standard purified water filtration system for pharmaceutical-grade cosmetics."
      ] : language === "ko" ? [
        "GLP 국제 기준을 준수하는 무균 R&D 연구실 시스템.",
        "초미세 입자 조제를 위한 차세대 진공 유화 균질기 설비.",
        "다양한 용기(병, 단상자, 튜브)에 호환되는 고속 자동 충진 포장 라인.",
        "의약품 및 약용 화장품 제조용 EDI 표준 초순수 정제수 시스템."
      ] : ABOUT_SECTIONS.factory.strengths,
      image: ABOUT_SECTIONS.factory.image
    },
    certifications: {
      title: t("about_certifications"),
      subtitle: language === "en" ? "Absolute commitment to premium quality" : language === "ko" ? "최고의 품질과 글로벌 규격에 대한 타협 없는 약속" : ABOUT_SECTIONS.certifications.subtitle,
      list: [
        {
          name: "CGMP ASEAN",
          issuer: language === "en" ? "Drug Administration of Vietnam - Ministry of Health" : language === "ko" ? "베트남 보건부 의약품 관리국" : ABOUT_SECTIONS.certifications.list[0].issuer,
          description: language === "en" ? "Good Manufacturing Practices for Cosmetics according to the standards of the Association of Southeast Asian Nations." : language === "ko" ? "동남아시아국가연합(ASEAN) 규격에 따른 우수 화장품 제조 및 품질 관리 기준 인증." : ABOUT_SECTIONS.certifications.list[0].description
        },
        {
          name: "ISO 9001:2015",
          issuer: "SGS Switzerland",
          description: language === "en" ? "International quality management system standards applied to cosmetics research and production." : language === "ko" ? "화장품 연구 개발 및 생산 과정에 적용되는 국제 표준 품질 경영 시스템 인증." : ABOUT_SECTIONS.certifications.list[1].description
        },
        {
          name: "ISO 22716",
          issuer: "Intertek",
          description: language === "en" ? "International standard guidelines for cosmetics good manufacturing practices, required for European markets." : language === "ko" ? "유럽 및 글로벌 시장 진출에 필수적인 화장품 우수 제조 관리 기준 국제 표준 가이드라인." : ABOUT_SECTIONS.certifications.list[2].description
        },
        {
          name: "FDA Registered",
          issuer: language === "en" ? "US Food and Drug Administration" : language === "ko" ? "미국 식품의약국" : ABOUT_SECTIONS.certifications.list[3].issuer,
          description: language === "en" ? "Facility registration certifying qualification for exporting products to the United States market." : language === "ko" ? "미국 시장으로의 화장품 수출 자격 요건을 증명하는 미 FDA 제조 시설 등록 인증." : ABOUT_SECTIONS.certifications.list[3].description
        }
      ]
    },
    rdTeam: {
      title: t("about_rd"),
      subtitle: language === "en" ? "Where million-dollar formulas are born" : language === "ko" ? "수백만 달러 가치의 독점 처방이 시작되는 곳" : ABOUT_SECTIONS.rdTeam.subtitle,
      description: language === "en" ? "The R&D Department at Cosbuilt brings together PhDs, Masters, and biochemists who graduated from France, South Korea, and Japan. We constantly update the latest scientific research and lead the industry in applying breakthrough biotechnology to cosmetic formulations." : language === "ko" ? "코스빌트의 R&D 본부는 프랑스, 한국, 일본 등 뷰티 선진국 유학파 출신의 석박사 및 생화학 연구원들로 구성되어 있습니다. 우리는 끊임없이 최신 과학 논문과 기술 트렌드를 분석하여 스킨케어에 혁신적인 바이오 테크놀로지를 선제적으로 접목합니다." : ABOUT_SECTIONS.rdTeam.description,
      focusAreas: language === "en" ? [
        "Active ingredient liposome encapsulation to increase skin penetration.",
        "Certified Vegan cosmetic formulations and clinical Cosmeceuticals.",
        "Optimizing the stability of delicate actives such as Vitamin C and Retinol."
      ] : language === "ko" ? [
        "피부 흡수율 극대화를 위한 고도화된 활성 성분 리포좀 캡슐화 공정.",
        "공식 비건(Vegan) 인증 처방 설계 및 고기능성 코스메슈티컬 라인 개발.",
        "빛과 열에 취약한 비타민 C, 레티놀 등 민감성 활성 성분의 안정화 기술."
      ] : ABOUT_SECTIONS.rdTeam.focusAreas,
      image: ABOUT_SECTIONS.rdTeam.image
    },
    partners: {
      title: t("about_partners"),
      subtitle: language === "en" ? "Cooperation for Sustainable Growth" : language === "ko" ? "동반 성장을 향한 신뢰의 파트너십" : ABOUT_SECTIONS.partners.subtitle,
      description: language === "en" ? "More than 250+ prestigious spa brands, skin clinics, and cosmetics brands nationwide have placed their absolute trust in Cosbuilt." : language === "ko" ? "전국 250개 이상의 유명 에스테틱 스파, 피부과 클리닉 및 코스메틱 브랜드가 코스빌트의 기술력을 전적으로 신뢰하고 있습니다." : "Hơn 250+ thương hiệu spa, clinic thẩm mỹ viện và mỹ phẩm nổi tiếng toàn quốc đã gửi trọn niềm tin cho Cosbuilt."
    }
  };

  const localizedServices = SERVICES.map((srv, idx) => {
    if (language === "en") {
      const enTitles = [
        "Full-Service OEM/ODM Manufacturing",
        "Exclusive R&D Formula Development",
        "Packaging Sourcing, Design & Printing",
        "Regulatory & MOH Cosmetics Registration",
        "International Logistics & Global Customs",
        "Professional 6-Step Collaboration Process",
        "Key Benefits of Choosing Cosbuilt"
      ];
      const enDescs = [
        "An end-to-end solution from concept to finished product for brands that want to bypass manufacturing setup.",
        "Our team of biochemists designs innovative formulations to ensure high efficacy, stability, and absolute safety.",
        "Elegant, premium, and distinctive packaging designs that stand out on retail shelves and attract consumers.",
        "We handle complex administrative and regulatory filings to ensure your brand is legally compliant for sale.",
        "Reliable global and domestic logistics ensuring safe, fast shipping for import materials and export goods.",
        "Transparent, step-by-step collaboration ensuring complete peace of mind and progress tracking.",
        "We treat your brand's commercial success as our ultimate manufacturing mission."
      ];
      const enDetails = [
        [
          "Brand positioning support and product concept ideation.",
          "Custom formulations tailored to your target audience or chosen from our 3,500+ proven library.",
          "State-of-the-art automated mass production with full CGMP quality compliance.",
          "Rigorous quality control (QC) and testing for every single production batch."
        ],
        [
          "Physical and chemical stability testing of samples under extreme environmental conditions.",
          "Dermatological irritation clinical testing on volunteer groups.",
          "Integrating world-trending active ingredients like Peptides, Exosomes, and Bakuchiol."
        ],
        [
          "Import sourcing of minimalist, vintage, or luxurious jars and bottles.",
          "Complimentary graphic design for stickers, boxes, and brand identity elements.",
          "Direct container printing: High-definition silk screening, gold/silver foil stamping, and spot UV coating."
        ],
        [
          "Microbiological and heavy metal testing in certified independent testing centers.",
          "Preparation and submission of standard product notification files to the Ministry of Health.",
          "Support with barcode registration, anti-counterfeit labels, and trademark intellectual property."
        ],
        [
          "Support for Certificate of Free Sale (CFS) to facilitate seamless export.",
          "Official importation of premium raw materials from global certified partners.",
          "Fast, insured nationwide delivery to your designated warehouse."
        ],
        [
          "Step 1: Requirement collection & product direction consultation.",
          "Step 2: R&D develops test samples for customer approval of texture, scent, and color.",
          "Step 3: Formula confirmation, packaging selection & detailed quotation submission.",
          "Step 4: Contract signing and regulatory Ministry of Health filing preparation.",
          "Step 5: Automated CGMP mass production, filling, and final assembly.",
          "Step 6: Final strict QC check, product delivery, and ongoing after-sales support."
        ],
        [
          "Direct manufacturer-to-brand setup without middlemen, ensuring optimal production costs.",
          "Highly flexible Minimum Order Quantity (MOQ) policies supporting cosmetic start-ups.",
          "Absolute confidentiality of client information and exclusive custom-developed formulas.",
          "Marketing asset support, providing professional photos and video footage of factory production."
        ]
      ];
      return {
        title: enTitles[idx],
        description: enDescs[idx],
        icon: srv.icon,
        details: enDetails[idx]
      };
    } else if (language === "ko") {
      const koTitles = [
        "OEM/ODM 토탈 원스톱 제조 서비스",
        "독점 R&D 화장품 처방 및 포뮬러 개발",
        "용기 부자재 소싱, 디자인 및 고해상도 인쇄",
        "식약처 보건부 인허가 및 화장품 품목 보고 대행",
        "글로벌 물류 및 원자재 통관 서비스",
        "투명하고 전문적인 6단계 협업 프로세스",
        "코스빌트만의 파트너십 핵심 경쟁력"
      ];
      const koDescs = [
        "생산 설비 투자 없이 나만의 화장품 브랜드를 런칭할 수 있는 컨셉부터 완제품 인도까지의 A-Z 솔루션.",
        "생화학 석박사 전문 연구진이 고효능, 뛰어난 제형 안정성 및 피부 무자극을 보장하는 독점 포뮬러 설계.",
        "화장품 매대와 온라인에서 소비자의 시선을 사로잡는 차별화되고 고급스러운 용기 패키지 비주얼 디자인.",
        "복잡한 행정 및 품질 검사 절차를 전격 대행하여 브랜드가 즉시 합법적으로 판매될 수 있도록 지원.",
        "수입 정밀 원료 공급과 완제품 수출을 안전하고 빠르게 돕는 신뢰성 높은 글로벌 물류 서비스.",
        "기획부터 인도까지 명확하게 제어되는 단계별 관리 시스템으로 납기 지연 없는 완벽한 진행 보장.",
        "우리는 고객 브랜드의 시장 성공을 화장품 제조사로서의 가장 중요한 목표이자 사명으로 여깁니다."
      ];
      const koDetails = [
        [
          "타겟 시장 분석을 통한 브랜드 포지셔닝 및 메인 제품 컨셉 제안.",
          "3,500가지 이상의 검증된 R&D 데이터베이스 적용 또는 커스텀 맞춤 제형 개발.",
          "국제 규격 아세안 CGMP 인증 자동화Mass-Production 라인을 통한 고품질 대량 생산.",
          "원료 입고부터 완제품 출하까지 엄격한 화학적/미생물학적 품질 관리(QC) 실행."
        ],
        [
          "가혹 환경 노출 테스트를 통한 제형의 물리적/화학적 안정도 검증.",
          "지원자 그룹 대상 피부 자극 및 인체 적용 임상 시험 연계 지원.",
          "엑소좀(Exosome), 바쿠치올(Bakuchiol), 펩타이드 등 글로벌 트렌드 활성 성분 선제적 도입."
        ],
        [
          "글로벌 트렌드에 부합하는 미니멀, 빈티지, 럭셔리 스타일 수입 유리/플라스틱 용기 소싱.",
          "라벨 스티커, 단상자, 브랜드 로고 등 전문 디자이너의 무상 그래픽 디자인 지원.",
          "용기 직접 인쇄: 고해상도 실크 스크린, 금/은박 스탬핑, 부분 입체 엠보싱 에칭 공정."
        ],
        [
          "공인 국가 지정 임상/화학 시험 연구소 연계를 통한 성분 유해 물질 및 중금속 정밀 분석 검사.",
          "보건부(MOH) 화장품 품목 제조/판매 승인 신고 서류 작성 및 접수 일괄 진행.",
          "국가 표준 바코드 발급, 정품 인증 홀로그램 라벨 지원, 브랜드 상표권 출원 자문."
        ],
        [
          "해외 수출용 자유판매증명서(CFS) 및 수출 검역 서류 발급 완벽 지원.",
          "전 세계 검증된 파트너사로부터의 프리미엄 화장품 원자재 정식 통관 수입.",
          "보장 물류 서비스를 통해 국내외 지정 창고로의 안전하고 신속한 직배송."
        ],
        [
          "1단계: 고객 맞춤형 요구 사양 수렴 및 제품군 마케팅 방향 컨설팅.",
          "2단계: R&D 제형 개발 및 성상, 향료, 발림성 피드백 조율용 1차 샘플 제공.",
          "3단계: 최종 처방 확정, 포장 용기 결정 및 상세 단가 견적서 제안.",
          "4단계: 정식 계약 체결 및 식약처/보건부 제품 신고 행정 절차 착수.",
          "5단계: CGMP 표준 생산 설비를 이용한 제형 조제, 충진, 완포장 및 검사.",
          "6단계: 출하 전 엄격한 미생물 검사, 완제품 출하 인도 및 지속적인 사후 관리 지원."
        ],
        [
          "중간 유통 단계를 배제한 본사 직접 생산 체계로 불필요한 마진 없는 최적의 생산 단가 실현.",
          "뷰티 스타트업 및 테스트 런칭 브랜드를 위한 탄력적이고 유연한 소량 생산(MOQ) 혜택 제공.",
          "고객사 정보, 브랜드 전략 및 독자 개발한 화장품 처방의 철저한 대외 비밀 유지 의무 준수.",
          "온라인 홍보에 바로 사용 가능한 실시간 공장 제조 공정 고화질 사진 및 영상 소스 무료 지원."
        ]
      ];
      return {
        title: koTitles[idx],
        description: koDescs[idx],
        icon: srv.icon,
        details: koDetails[idx]
      };
    }
    return srv;
  });

  const localizedCategories = MANUFACTURING_CATEGORIES.map((cat, idx) => {
    if (language === "en") {
      const enTitles = [
        "Facial Care Formulation & Contract Manufacturing",
        "Body Care Formulation & Contract Manufacturing",
        "Hair Care Formulation & Contract Manufacturing",
        "Makeup Artistry Formulation & Contract Manufacturing",
        "Personal Hygiene & Care Contract Manufacturing",
        "Advanced & New Biotech Formulation Technology"
      ];
      const enDescs = [
        "Core high-margin products that generate the highest recurring revenue for skincare brands.",
        "Nourishing and pampering solutions to keep body skin smooth, radiant, and deeply moisturized.",
        "Organic, botanical, and clinical formulations targeting scalp health and gorgeous hair strands.",
        "Trendy and vibrant make-up solutions utilizing FDA-compliant pigments and anti-aging benefits.",
        "Essential daily personal care products formulated to be safe and effective for the whole family.",
        "Applying cutting-edge delivery systems (Liposomes, Exosomes, Spicules) to multiply active skin absorption."
      ];
      const enSubCats = [
        [
          "Anti-aging & skin barrier repair serums (B5, Hyaluronic Acid, Peptide, Exosomes)",
          "Brightening, dark spot & melasma fading creams (Niacinamide, Alpha-Arbutin)",
          "Broad-spectrum physical & chemical hybrid sunscreens with modern filters",
          "Gentle gel-to-foam cleansers and self-foaming mild face washes",
          "Deep purifying Micellar waters and skin balancing hydrating toners"
        ],
        [
          "Long-lasting perfume shower gels and body washes with deep hydration",
          "Instant tone-up body lotions and safe skin-brightening moisturizers",
          "Natural body scrubs (Himalayan Pink Salt, Organic Arabica Coffee grounds)",
          "Intensive repairing hand creams and hydrating foot creams",
          "Lightweight, refreshing daily body mists with fine atomization"
        ],
        [
          "Herbal anti-hair loss shampoos (Grapefruit peel, Gleditsia, Fallopia multiflora)",
          "Damage repair hair conditioners and masks with Keratin & Argan oil",
          "Grapefruit essential oil hair serums for rapid hair growth stimulation",
          "Anti-split-end hair serums and organic leave-in styling oils",
          "Refreshing, cooling scalp scrubs for deep sebum and dandruff removal"
        ],
        [
          "Velvety matte liquid lipsticks and tinted moisturizing lip balms",
          "High-coverage cushion foundations with integrated broad SPF protection",
          "Weightless loose setting powders and pearlized powder blushes",
          "Smudge-proof lengthening mascaras and precise liquid eyeliners",
          "Long-lasting makeup setting sprays with 16-hour lock-in technology"
        ],
        [
          "Antibacterial hand soaps and organic herbal mouthwashes",
          "Gentle intimate washes with betel leaf extracts for men and women",
          "Antiperspirant roll-ons and underarm deodorants with sweat control",
          "Fluoride-free organic whitening toothpastes",
          "Moisturizing hand sanitizers and refreshing antibacterial breath sprays"
        ],
        [
          "Plant-derived Exosome serums for deep, rapid cellular skin repair",
          "Slow-release Liposome-encapsulated Retinol youth-activating creams",
          "Marine-origin natural bio-spicule peeling treatments for glass skin",
          "Peptide-infused micro-bead formulas that trigger instant collagen",
          "Next-generation molecular physical sun protection filters"
        ]
      ];
      const enFeatures = [
        ["Liposome encapsulation safeguarding active viability", "Free from drying alcohols, parabens, or harsh surfactants", "Tested for maximum physicochemical stability in tropical climates"],
        ["Premium fragrance materials imported directly from France", "Rapidly absorbing, non-greasy textures", "Natural exfoliating particles that never scratch or damage skin"],
        ["Sulfate-free formulation preventing dryness", "Perfect skin-friendly pH 5.5 ideal for sensitive scalps", "Deep nourishment starting from hair follicles"],
        ["FDA-approved cosmetic mineral pigments from US & Europe", "Infused with skin-caring anti-aging active ingredients", "Exceptional wear-time yet extremely easy to remove with cleanser"],
        ["Safe, biocompatible, and natural ingredients", "Deodorizes and sterilizes using natural biological actives", "100% safe for pregnant mothers and toddlers"],
        ["Bypasses oxidative degradation of sensitive actives", "10x deeper penetration compared to standard skincare", "Manufactured in sterile Class 100 research labs"]
      ];
      return {
        id: cat.id,
        title: enTitles[idx],
        description: enDescs[idx],
        image: cat.image,
        subCategories: enSubCats[idx],
        features: enFeatures[idx]
      };
    } else if (language === "ko") {
      const koTitles = [
        "스킨/페이스 케어 제품군 위탁 제조 및 개발",
        "바디 케어 제품군 위탁 제조 및 개발",
        "헤어 & 두피 케어 제품군 위탁 제조 및 개발",
        "메이크업 및 색조 화장품 위탁 제조 및 개발",
        "생활 위생 및 퍼스널 케어 위탁 제조 및 개발",
        "바이오 신기술 적용 기능성 화장품 제조 기술"
      ];
      const koDescs = [
        "스킨케어 브랜드에 꾸준하고 안정적인 매출과 높은 마진율을 안겨주는 핵심 핵심 라인.",
        "건조하고 지친 전신 피부에 풍부한 보습과 영양을 채워 매끄럽고 윤기 있게 가꿔주는 바디 케어 제품군.",
        "천연 유기농 원료를 바탕으로 모근부터 건강하게 가꿔주는 프리미엄 헤어 및 탈모 기능성 라인.",
        "미국 및 유럽 안전 기준을 통과한 안심 무독성 색조 원료로 트렌디한 감각과 생기를 선사하는 메이크업 라인.",
        "온 가족이 안심하고 사용할 수 있도록 보습 성분을 강화하고 자극을 낮춘 일상 필수품 위생 케어 라인.",
        "리포좀, 엑소좀, 마이크로스피큘 등 혁신적인 유효 성분 전송 시스템을 적용해 피부 흡수율을 획득한 차세대 바이오 테크 라인."
      ];
      const koSubCats = [
        [
          "장벽 강화 및 수분 충전용 고농축 세럼 (판테놀 B5, HA, 펩타이드, 식물성 엑소좀)",
          "기미, 잡티, 기미 예방 고농축 미백 크림 (나이아신아마이드, 알파-알부틴)",
          "백탁 없고 끈적임 없는 무기/유기 혼합 자외선 차단제 (SPF 50+ PA++++)",
          "자극 없이 피부 노폐물만 세정하는 약산성 폼 클렌저 및 마일드 클렌징 젤",
          "수분 장벽을 세우는 진정 토너 및 저자극 마일드 미셀라 클렌징 워터"
        ],
        [
          "프랑스 명품 조향 기술을 적용해 하루 종일 은은하게 지속되는 퍼퓸 바디워시",
          "끈적임 없이 즉각적으로 피부톤을 맑게 가꿔주는 안심 화이트닝 바디 로션",
          "천연 스크럽 입자를 함유한 프리미엄 바디 스크럽 (히말라야 핑크솔트, 아라비카 원두 가루)",
          "거칠어진 손발 피부를 집중 케어하는 보습 크림",
          "미세하고 균일하게 phân sạ 되어 은은한 잔향을 남기는 올데이 바디 미스트"
        ],
        [
          "모근을 강화하고 탈모 증상을 완화하는 허발 한방 샴푸 (자몽껍질, 하수오, 어성초)",
          "케라틴과 아르간 오일이 손상된 모발 큐티클을 채우는 헤어 트리트먼트 및 헤어팩",
          "두피 혈행을 촉진하고 모발 성장을 자극하는 고농축 두피 에센스 스프레이",
          "모발 윤기를 되찾아주고 갈라짐을 방지하는 아르간 헤어 오일",
          "두피 모공의 묵은 각질과 피지를 말끔히 씻어내는 쿨링 스칼프 스크럽"
        ],
        [
          "첫 발색 그대로 가볍게 밀착되는 벨벳 매트 립틴트 및 고보습 칼라 립밤",
          "높은 밀착력과 매끄러운 피부 표현을 선사하는 무결점 결광 쿠션 (자외선 차단 겸용)",
          "피지를 잡고 무너짐 없는 보송한 피부를 지키는 파우더 및 펄 블러셔",
          "땀과 눈물에 강한 워터프루프 볼륨 마스카라 및 초정밀 붓펜 아이라이너",
          "메이크업을 16시간 동안 완벽하게 고정해 주는 밀착 메이크업 픽서"
        ],
        [
          "천연 허브 에센셜 오일을 함유한 저자극 항균 핸드워시 및 가글액",
          "민감 부위의 pH 균형을 지켜주는 유기농 약산성 청결제 (남성용 / 여성용)",
          "땀 분비를 조절하고 불쾌한 냄새를 억제하는 고밀착 데오드란트 롤온",
          "화학 불소 성분을 배제하고 구강 건강을 지키는 친환경 유기농 미백 치약",
          "휴대하며 구강 세균을 억제하고 구취를 즉각 예방하는 산뜻한 구강 스프레이"
        ],
        [
          "진정과 탄력을 심부 깊숙이 전달하는 식물성 병풀 엑소좀 앰플",
          "피부 자극을 최소화하고 세포 턴오버를 돕는 슬로우 릴리즈 리포좀 레티놀 크림",
          "피부 재생 속도를 비약적으로 단축시켜 유리알 피부를 가꿔주는 해양 천연 스피큘 필링",
          "피부 접촉 즉시 생체 콜라겐 생성을 촉진하는 액티브 펩타이드 캡슐 젤",
          "나노 공학 기술을 적용해 자외선을 안전하게 반사하는 차세대 무기 자외선 차단막"
        ]
      ];
      const koFeatures = [
        ["유효 성분 안정성을 지키는 특화 리포좀 공법 도입", "인공 알코올, 파라벤, 설페이트 등 자극 성분 배제", "고온다습한 아시아 기후 환경에서의 제형 안정도 극대화"],
        ["프랑스 그라스산 최고 등급 안심 수입 향료 처방", "피부에 가볍고 빠르게 흡수되어 미끌거림 없는 발림성", "피부 상처를 예방하는 친환경 천연 연마 입자 적용"],
        ["두피 건조와 자극을 방지하는 설페이트 계면활성제 제로", "건강한 두피 장벽을 유지하는 최적의 약산성 pH 5.5 유지", "두피 표면이 아닌 모근과 모낭 자체에 전달되는 풍부한 영양 공급"],
        ["미국 FDA 및 유럽 화장품 규격에 부합하는 안심 천연 광물 색소 처방", "색조 제품임에도 보습 및 항산화 스킨케어 성분 다량 함유", "우수한 지속력을 지님과 동시에 세안 시 리무버로 깨끗하게 잘 지워지는 이지-워시 제형"],
        ["인체 유해 성분을 완전히 제거한 생체 친화적 안전 원료", "화학 항균제가 아닌 천연 식물 추출물 중심의 살균 및 구취 제거", "임산부 및 영유아도 매일 안심하고 사용 가능한 자극 안전 지수 획득"],
        ["열, 산소에 의한 영양 손실과 산화를 완전히 차단하는 캡슐화 포뮬레이션", "일반 화장품 대비 유효 성분의 진피층 침투 깊이 10배 이상 증가", "무균 클래스 100(Class 100) 연구실 제조 공정 도입"]
      ];
      return {
        id: cat.id,
        title: koTitles[idx],
        description: koDescs[idx],
        image: cat.image,
        subCategories: koSubCats[idx],
        features: koFeatures[idx]
      };
    }
    return cat;
  });

  const localizedPricingList = PRICING_LIST.map((item, idx) => {
    if (language === "en") {
      const enProductTypes = [
        "Serum / Ampoule (Intensive Skincare)",
        "Facial Cream (Whitening / Anti-aging Cream)",
        "Sunscreen (Sunscreen SPF 50+ PA++++)",
        "Facial Cleanser / Gel Cleanser",
        "Micellar Cleansing Water / Toner / Face Mist",
        "Shower Gel / Shampoo / Conditioner",
        "Body Scrub (Salt or Coffee)",
        "Velvet Matte Lipstick / Tint / Lip Balm",
        "Intimate Wash (Gentle Foaming)"
      ];
      const enUnits = [
        "Bottle (dropper 10-30ml)",
        "Jar (acrylic/glass 30-50g)",
        "Flexible squeeze tube (50ml)",
        "Pump bottle / Squeeze tube (100-150ml)",
        "Flip-top bottle / Atomizer (150-250ml)",
        "Large pump bottle (250-500ml)",
        "Wide-mouth PET jar (200-250g)",
        "Custom designed bullet/wand (3.5g-5g)",
        "Foaming pump bottle (100-150ml)"
      ];
      return {
        productType: enProductTypes[idx],
        minOrder: item.minOrder.replace("chai", "pcs").replace("hũ", "jars").replace("tuýp", "tubes").replace("thỏi", "lipsticks"),
        priceRange: item.priceRange,
        unit: enUnits[idx],
        timeframe: item.timeframe.replace("ngày", "days")
      };
    } else if (language === "ko") {
      const koProductTypes = [
        "세럼 / 에센스 / 앰플 (고기능 집중 스킨케어)",
        "영양/수분 크림 (미백 및 주름 개선 이중기능성)",
        "데일리 자외선 차단제 (선크림 SPF 50+ PA++++)",
        "마일드 폼 클렌저 / 젤 클렌저 (안심 세정)",
        "클렌징 워터 / 진정 토너 / 보습 미스트",
        "약산성 바디워시 / 허벌 탈모 샴푸 / 트리트먼트",
        "바디 스크럽 (천연 솔트 & 원두 가루)",
        "벨벳 립틴트 / 모이스처 칼라 립스틱",
        "약산성 여성/남성 청결제 (마일드 폼 제형)"
      ];
      const koUnits = [
        "스포이드 병 (10-30ml)",
        "크림 단지 용기 (아크릴/유리 30-50g)",
        "튜브 형태 용기 (50ml)",
        "펌프 형태 용기 / 튜브 용기 (100-150ml)",
        "원터치 캡 / 안개 분사 용기 (150-250ml)",
        "대용량 디스펜서 펌프 용기 (250-500ml)",
        "넓은 목 PET 단지 용기 (200-250g)",
        "독점 디자인 립스틱/틴트 부자재 (3.5g-5g)",
        "거품 자동 토출형 펌프 용기 (100-150ml)"
      ];
      return {
        productType: koProductTypes[idx],
        minOrder: item.minOrder.replace("chai", "개").replace("hũ", "개").replace("tuýp", "개").replace("thỏi", "개"),
        priceRange: item.priceRange,
        unit: koUnits[idx],
        timeframe: item.timeframe.replace("ngày", "일")
      };
    }
    return item;
  });

  // Mapping function to get Vietnamese equivalent of skin type for filtering
  const getVNSkinType = (skin: string) => {
    if (skin === "All Skin Types" || skin === "모든 피부용" || skin === "Tất cả loại da") return "Tất cả loại da";
    if (skin === "Dry Skin" || skin === "건성 피부용" || skin === "Dành cho da khô") return "Dành cho da khô";
    if (skin === "Oily & Acne Skin" || skin === "지성/여드름 피부용" || skin === "Dành cho da dầu mụn") return "Dành cho da dầu mụn";
    if (skin === "Sensitive Skin" || skin === "민감성 피부용" || skin === "Dành cho da nhạy cảm") return "Dành cho da nhạy cảm";
    if (skin === "Any Skin Type" || skin === "공통 피부용" || skin === "Mọi loại da") return "Mọi loại da";
    return skin;
  };

  const localizedSkinTypes = language === "en"
    ? ["All Skin Types", "Dry Skin", "Oily & Acne Skin", "Sensitive Skin", "Any Skin Type"]
    : language === "ko"
      ? ["모든 피부용", "건성 피부용", "지성/여드름 피부용", "민감성 피부용", "공통 피부용"]
      : ["Tất cả loại da", "Dành cho da khô", "Dành cho da dầu mụn", "Dành cho da nhạy cảm", "Mọi loại da"];

  const localizedSortOptions = language === "en"
    ? ["Default Sorting", "Price: Low to High", "Price: High to Low", "Highest Stability Rating"]
    : language === "ko"
      ? ["기본 정렬", "가격: 낮은순", "가격: 높은순", "최고 평가순"]
      : ["Mặc định công thức", "Giá mẫu từ thấp đến cao", "Giá mẫu từ cao đến thấp", "Đánh giá ổn định cao nhất"];

  const localizedBlogFilters = [
    { id: "all", label: language === "en" ? "All articles" : language === "ko" ? "전체 글" : "Tất cả bài viết" },
    { id: "cẩm nang", label: language === "en" ? "Manufacturing Guides" : language === "ko" ? "제조 가이드" : "Cẩm nang gia công" },
    { id: "xu hướng", label: language === "en" ? "Ingredient Trends" : language === "ko" ? "원료 트렌드" : "Xu hướng nguyên liệu" }
  ];

  const localizedProducts = customProducts.map((prod) => {
    if (language === "en") {
      const enProductDetails: Record<string, Partial<FormulaProduct>> = {
        "lip-tint": {
          title: "Velvet Lip Tint Ultra-Smooth Lipstick (OEM Sample)",
          badge: "TRUE COLOR",
          description: "Unique water-in-mud formula giving a soft velvet texture. Applies rich color in one swipe, weightless, preventing lip line appearance with nourishing avocado oil and Vitamin E.",
          ingredients: "Organic cold-pressed Avocado oil, Natural Vitamin E, FDA-grade Mineral Pigments, Pure white beeswax.",
          guidelines: "Apply a thin layer onto lips, press together gently and wait 30 seconds to set. Feel the velvety texture and long-lasting shade."
        },
        "cushion": {
          title: "Perfect Coverage Oil-Control Cushion SPF50 (OEM Sample)",
          badge: "100% COVERAGE",
          description: "Next-gen cushion integrating broad-spectrum physical sunscreen and nano-fine setting particles. Offers lightweight, natural coverage for blemishes and acne marks with 12h oil control.",
          ingredients: "Tea tree extract, Niacinamide 2%, Zinc Oxide, Titanium Dioxide, Restorative Vitamin B5.",
          guidelines: "Use the puff to tap cushion gently onto skin from center outwards. Experience high oil control, coverage, and feather-light feel."
        },
        "serum-b5": {
          title: "Intensive Recovery B5 & Exosome Serum (OEM Sample)",
          badge: "RAPID RECOVERY",
          description: "Advanced cell-restoring formula combining high-concentration Panthenol (Vitamin B5) and microscopic Centella-derived Exosomes. Instantly calms redness, boosts natural collagen, and reinforces skin barrier.",
          ingredients: "Panthenol 10%, Centella Asiatica Exosome, Centella Asiatica Extract, Multi-weight Hyaluronic Acid, Ceramide NP.",
          guidelines: "Apply 3-4 drops to cleansed face after toner. Gently pat until absorbed. Highly recommended after lasers, peels, or active treatments."
        },
        "cream-niacinamide": {
          title: "Brightening Niacinamide Face Cream (OEM Sample)",
          badge: "DEEP WHITENING",
          description: "Moisturizing brightening cream with smart moisture-lock barrier. Contains pure Niacinamide to intensively brighten skin tone, inhibit melanin migration, and reveal radiant pink skin in 21 days.",
          ingredients: "Niacinamide 5%, Alpha-Arbutin 1%, Natural Squalane, Licorice root extract, Hyaluronic Acid.",
          guidelines: "Apply a small amount evenly on face and neck morning and night. Gently massage upward in circular motions for skin firming."
        },
        "shower-gel": {
          title: "Perfumed Skin Brightening Body Wash (OEM Sample)",
          badge: "PREMIUM SCENT",
          description: "Luxurious perfumed body wash with deep whitening actives. Effectively removes daily grime and gently exfoliates dead skin while wrapping your body in premium French fragrance notes.",
          ingredients: "Glutathione, Alpha-Arbutin, French fragrance oil, Organic coconut-derived surfectants.",
          guidelines: "Lather a small amount with water or body sponge. Massage onto body skin and rinse. Savor the lingering luxurious scent."
        }
      };
      
      const customProps = enProductDetails[prod.id] || {};
      return {
        ...prod,
        ...customProps,
        skinTypes: prod.skinTypes.map(st => 
          st === "Mọi loại da" ? "All Skin Types" : 
          st === "Dành cho da khô" ? "Dry Skin" : 
          st === "Dành cho da nhạy cảm" ? "Sensitive Skin" : 
          st === "Dành cho da dầu mụn" ? "Oily & Acne Skin" : st
        )
      };
    } else if (language === "ko") {
      const koProductDetails: Record<string, Partial<FormulaProduct>> = {
        "lip-tint": {
          title: "벨벳 립 틴트 초밀착 매트 립스틱 (제조 샘플)",
          badge: "선명한 발색",
          description: "머드처럼 보송하게 밀착되는 워터-인-머드 특이 제형. 아보카도 오일과 비타민 E 성분이 입술 주름 부각 없이 편안하게 영양을 공급하며, 단 한 번의 터치로 풍부하고 선명한 컬러가 8시간 유지됩니다.",
          ingredients: "유기농 냉압착 아보카도 오일, 천연 비타민 E, 미국 FDA 규격 안심 미네랄 색소, 정제 화이트 비스왁스.",
          guidelines: "입술 안쪽부터 부드럽게 펴 바른 후 30초 동안 그대로 밀착시킵니다. 벨벳처럼 부드러운 성상과 롱래스팅 효과를 느껴보세요."
        },
        "cushion": {
          title: "퍼펙트 커버 롱래스팅 오일 컨트롤 쿠션 SPF50 (제조 샘플)",
          badge: "결점 완벽 커버",
          description: "광범위 무기 자외선 차단 필터와 나노 파우더 입자를 결합한 차세대 쿠션. 들뜸이나 모공 끼임 없이 홍조와 잡티를 깨끗하게 커버하며, 하루 종일 무너짐 없는 실키한 보송함을 선사합니다.",
          ingredients: "티트리 추출물, 나이아신아마이드 2%, 징크옥사이드, 티타늄디옥사이드, 진정 판테놀 B5.",
          guidelines: "내장된 루비셀 퍼프에 적당량을 취해 얼굴 전체에 톡톡 두드리듯 밀착시켜 바릅니다. 가볍고 강력한 오일 컨트롤 성능을 직접 확인해 보세요."
        },
        "serum-b5": {
          title: "센텔라 엑소좀 & 고농축 B5 시카 회복 세럼 (제조 샘플)",
          badge: "붉은기 급속 완화",
          description: "10% 고함량 판테놀(B5)과 시카 유래 나노 크기 엑소좀을 융합한 세포 장벽 복원 앰플. 자극받은 피부 붉은기를 즉각 진정시키고, 콜라겐 활성화를 유도해 무너진 피부 자벽을 건강하게 복구합니다.",
          ingredients: "판테놀 10%, 병풀 세포 유래 엑소좀 분획, 병풀 정량 추출물, 다중 히알루론산, 고농축 세라마이드 NP.",
          guidelines: "토너 사용 후 3~4방울을 떨어뜨려 두드리며 흡수시킵니다. 레이저 시술, 박피 또는 강한 산성 필링 후 극도로 민감해진 피부에 최적화된 처방입니다."
        },
        "cream-niacinamide": {
          title: "브라이트닝 나이아신아마이드 화이트닝 크림 (제조 샘플)",
          badge: "멜라닌 이중 차단",
          description: "수분 보습막과 미백 기능성을 듀얼 케어하는 스마트 모이스처 락 화이트닝 크림. 고순도 나이아신아마이드가 멜라닌의 표피 이동을 차단해 단 21일 만에 투명하고 맑은 피부톤을 만들어 줍니다.",
          ingredients: "나이아신아마이드 5%, 알파-알부틴 1%, 천연 식물성 스쿠알란, 감초 뿌리 추출물, 3중 히알루론산.",
          guidelines: "아침, 저녁 기초 마지막 단계에서 얼굴과 목 주변에 부드럽게 롤링하며 펴 바릅니다. 얼굴 라인을 아래에서 위로 쓸어 올리듯 가볍게 마사지해 줍니다."
        },
        "shower-gel": {
          title: "명품 프랑스 향수 브라이트닝 바디워시 (제조 샘플)",
          badge: "명품 잔향 지속",
          description: "유명 프랑스 조향 오일의 은은한 잔향이 지속되는 화이트닝 바디워시. 글루타치온 og 알부틴 성분이 샤워 단계에서 브라이트닝을 도우며, 풍부한 미세 거품이 모공 속 각질까지 저자극 세정합니다.",
          ingredients: "글루타치온, 알파-알부틴, 수입 명품 프래그런스 오일, 자연 유래 코코넛 계면활성제.",
          guidelines: "샤워 볼이나 퍼프를 이용해 풍부한 거품을 내어 전신을 부드럽게 마사지하듯 세정한 후 미온수로 깨끗이 씻어냅니다."
        }
      };
      const customProps = koProductDetails[prod.id] || {};
      return {
        ...prod,
        ...customProps,
        skinTypes: prod.skinTypes.map(st => 
          st === "Mọi loại da" ? "모든 피부용" : 
          st === "Dành cho da khô" ? "건성 피부용" : 
          st === "Dành cho da nhạy cảm" ? "민감성 피부용" : 
          st === "Dành cho da dầu mụn" ? "지성/여드름 피부용" : st
        )
      };
    }
    return prod;
  });

  const _localizedBlogPostsBase = customBlogPosts.map((post, idx) => {
    if (idx < 4) {
      if (language === "en") {
        const enTitles = [
          "Guide to Regulatory Compliance and MOH Cosmetics Registration in 2026",
          "Rising Cosmetics Ingredients in Late 2026: Exosomes & Bakuchiol",
          "Startup Economics: How to Optimize Initial OEM/ODM Manufacturing Costs",
          "The Rise of Vietnamese Botanicals: Giant Potential in Organic Vegan Cosmetics"
        ];
        const enCategories = [
          "compliance",
          "trends",
          "compliance",
          "trends"
        ];
        const enSummaries = [
          "A comprehensive A-to-Z walkthrough of legal dossiers, clinical safety tests, and the necessary steps to secure successful cosmetic notification approvals with the Ministry of Health.",
          "Discover the powerful surge of plant-derived Exosome cellular technology and Bakuchiol, the gentle retinol alternative, in high-end restorative skincare formulations.",
          "How can cosmetic startup founders launch with minimal capital while ensuring breathtaking packaging aesthetics and CGMP-grade formulations?",
          "Consumers are turning smart and choosing brands with indigenous botanical narratives like grapefruit flower, organic perilla, green tea, and centella."
        ];
        const enContents = [
          "To legally distribute cosmetics in Vietnam, a business must perform complete micro-testing and file notification dossiers with the Drug Administration or provincial Health Departments. Essential paperwork includes laboratory assay certificates, percent raw ingredient lists (INCI names), proper business licensing, and a Product Information File (PIF). At Cosbuilt, we handle these procedures directly to give our clients complete peace of mind.",
          "2026 marks a decisive shift from traditional chemical actives to biotechnology. Plant-derived Exosomes - tiny cellular vesicles - are proving to trigger self-collagen production up to 300% faster than conventional stem cells. Meanwhile, Bakuchiol remains the superstar for sensitive skin, offering anti-aging efficacy comparable to Retinol with zero risk of peeling or redness. Early adoption enables brands to establish powerful USP.",
          "Many new brand founders make the mistake of ordering excessively large initial batches (high MOQ) or selecting overly expensive custom jars, draining their startup cash. The expert advice from Cosbuilt: 1. Launch with a simplified lineup of 1-2 core SKUs. 2. Choose high-quality standard bottles and customize them using exquisite foil stamping. 3. Utilize low MOQ direct-factory support from Cosbuilt to test market feedback first.",
          "Organic natural cosmetics are not new, but elevating them to Certified Vegan standards and utilizing native Vietnamese botanical extracts is creating a massive trend. Modern consumers resonate deeply with sustainability and agricultural support. Centella for soothing, perilla for pigmentation, and grapefruit peel for hair growth are incredibly hot R&D projects in the Cosbuilt Lab, strictly extracting high-concentration active fractions."
        ];
        const enAuthors = [
          "Atty. Nguyen Khanh Ly (M.L.)",
          "Dr. Le Hoai Nam (R&D Director)",
          "Mrs. Tran Minh Tam (Project Director)",
          "Eng. Nguyen Thi Mai (R&D Deputy Head)"
        ];
        const enDates = [
          "June 12, 2026",
          "July 5, 2026",
          "May 28, 2026",
          "June 19, 2026"
        ];
        return {
          title: enTitles[idx],
          category: enCategories[idx],
          summary: enSummaries[idx],
          content: enContents[idx],
          date: enDates[idx],
          author: enAuthors[idx],
          image: post.image
        };
      } else if (language === "ko") {
        const koTitles = [
          "2026년 최신 화장품 보건부 품목 허가 및 법률 인허가 가이드",
          "2026년 하반기 주목할 화장품 트렌드 성분: 엑소좀(Exosome) & 바쿠치올(Bakuchiol)",
          "화장품 스타트업 창업자를 위한 초기 생산 제조 원가 최소화 꿀팁",
          "청정 베트남 보태니컬 원료의 반란: 비건 유기농 화장품의 거대한 시장 잠재력"
        ];
        const koCategories = [
          "가이드",
          "트렌드",
          "가이드",
          "트렌드"
        ];
        const koSummaries = [
          "보건부 품목 허가 신청에 필요한 화학/미생물 정밀 분석, 법률 서류 준비 및 품목 승인을 성공적으로 받아내기 위한 A to Z 총정리 가이드.",
          "프리미엄 노화 방지 및 피부 장벽 복원 화장품 시장에서 급부상 중인 식물 세포 유래 엑소좀 전송 기술과 차세대 저자극 천연 레티놀 대안인 바쿠치올 집중 분석.",
          "한정된 초기 자본금으로 합법적이고 안전한 아세안 CGMP 표준 화장품을 시장에 출시하고 용기 부자재 단가를 획득하는 실무 노하우.",
          "안심 성분을 추구하는 똑똑한 그린 컨슈머들의 선택! 자몽 껍질, 자소엽, 유기농 병풀, 녹차 등 현지 청정 보태니컬 추출물이 이끄는 로컬 비건 화장품의 매력."
        ];
        const koContents = [
          "베트남 국내에서 화장품을 합법적으로 판매 및 유통하기 위해서는 보건부(MOH) 산하 의약품관리국 또는 각 성의 위생국에 품목 보고 및 신고 수리를 반드시 완료해야 합니다. 필수 서류로는 공인 기관의 품질 성적서, 상세 전성분 배합비 표(INCI), 유효한 사업자등록증, 그리고 제품안전성 정보파일(PIF)이 요구됩니다. 코스빌트는 본 법률 행정 업무 전 과정을 무상 지원하여 비즈니스의 조기 런칭을 완벽히 돕습니다.",
          "2026년 스킨케어 씬의 핵심 패러다임은 전통적인 화학 합성 성분에서 첨단 바이오 셀 영역으로 급속도로 이동하고 있습니다. 세포 메신저 역할을 하는 엑소좀(Exosome)은 기존 줄기세포 대비 최대 3배 이상 빠르고 피부 진피까지 침투해 자체 콜라겐 재생을 촉진합니다. 자극 없는 안티에이징 혁신 성분인 바쿠치올 또한 임산부 및 민감성 피부용 포뮬러의 핵심 USP로 확고한 시장 인지도를 쌓고 있습니다.",
          "많은 화장품 창업자들이 범하는 가장 흔한 실수는 초기 마켓 테스트 단계에서 너무 큰 수량(과도한 MOQ)을 무리하게 계약해 현금을 소진하는 것입니다. 코스빌트의 전문가 그룹은 다음을 권장합니다: 1. 첫 런칭 시 핵심 시그니처 1~2개 품목에 집중할 것. 2. 범용성이 높은 우수한 기성 용기를 선택하되 고해상도 인쇄와 세련된 단상자 디자인으로 비주얼을 구축할 것. 3. 코스빌트의 탄력적인 스타트업 맞춤 소량 MOQ 지원 제도를 현명하게 활용할 것.",
          "소비자들은 더 이상 단순한 브랜드 명성에 안주하지 않고, 원료의 생산 환경과 지속 가능성 가치에 주목합니다. 코스빌트 R&D 연구소에서는 청정 농가와 직계약된 고체계 추출 설비를 통해 병풀의 병풀 아시아티코사이드 성분과 자소엽의 미백 폴리페놀 성분, 모발 성장을 촉진하는 자몽 오일의 기능성 분획을 최고 순도로 정밀 분리 추출하여 차별화된 스토리텔링 처방을 설계합니다."
        ];
        const koAuthors = [
          "응웬 카인 리 (법률 수석 자문)",
          "레 호아이 남 (R&D 본부장)",
          "쩐 민 탐 (프로젝트 관리 총괄 이사)",
          "응웬 티 마이 (R&D 수석 연구원)"
        ];
        const koDates = [
          "2026년 6월 12일",
          "2026년 7월 5일",
          "2026년 5월 28일",
          "2026년 6월 19일"
        ];
        return {
          ...post,
          title: koTitles[idx],
          category: koCategories[idx],
          summary: koSummaries[idx],
          content: koContents[idx],
          date: koDates[idx],
          author: koAuthors[idx]
        };
      }
    }
    return post;
  });
  // Attach a stable, language-independent slug (derived from the base Vietnamese
  // title) so each article keeps the same URL regardless of the UI language.
  const localizedBlogPosts = _localizedBlogPostsBase.map((post, idx) => ({
    ...post,
    slug: customBlogPosts[idx].slug || slugify(customBlogPosts[idx].title),
  }));
  const [activeTab, setActiveTab] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState<string | undefined>(undefined);
  // Set true by internal navigation right before it calls navigate(), so the
  // URL-reconcile effect knows the view state is already applied and skips its
  // (external-navigation) reset. lastPathRef tracks the last reconciled path so
  // the effect can tell a real navigation apart from a data-driven re-run.
  const skipReconcileRef = useRef(false);
  const lastPathRef = useRef(location.pathname);
  const [searchQuery, setSearchQuery] = useState("");
  
  // B2B Sample Cart states
  const [isSampleCartOpen, setIsSampleCartOpen] = useState(false);
  const [sampleCart, setSampleCart] = useState<string[]>([]);

  const handleToggleSampleCart = () => {
    setIsSampleCartOpen(prev => !prev);
  };

  const handleAddToSampleCart = (itemName: string) => {
    if (!sampleCart.includes(itemName)) {
      setSampleCart(prev => [...prev, itemName]);
      // Auto-open sample cart drawer on adding item
      setIsSampleCartOpen(true);
    }
  };

  const handleRemoveFromSampleCart = (itemName: string) => {
    setSampleCart(prev => prev.filter(item => item !== itemName));
  };
  
  // States for interactive features
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("Tất cả loại da");
  const [selectedLabs, setSelectedLabs] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("Mặc định công thức");
  const [selectedProductDetails, setSelectedProductDetails] = useState<FormulaProduct | null>(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState<"mô tả" | "thành phần" | "cảm quan">("mô tả");
  const [detailsQuantity, setDetailsQuantity] = useState<number>(1);
  const [selectedPackagingIndex, setSelectedPackagingIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentBlogPage, setCurrentBlogPage] = useState<number>(1);

  useEffect(() => {
    setSelectedPackagingIndex(0);
  }, [selectedProductDetails]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSkinType, selectedLabs, selectedSort]);

  const [priceSearch, setPriceSearch] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<"all" | "cẩm nang" | "xu hướng">("all");
  const [activeAboutTab, setActiveAboutTab] = useState("about-us");
  const [activeServiceTab, setActiveServiceTab] = useState("oem-odm");

  useEffect(() => {
    setCurrentBlogPage(1);
  }, [blogCategoryFilter, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSkinType("Tất cả loại da");
    setSelectedLabs([]);
    setSelectedSort("Mặc định công thức");
  };

  const handleLabToggle = (lab: string) => {
    if (selectedLabs.includes(lab)) {
      setSelectedLabs(selectedLabs.filter(l => l !== lab));
    } else {
      setSelectedLabs([...selectedLabs, lab]);
    }
  };

  // Google Sheets Dynamic States (re-located to top of component)
  const [sheetsConfig, setSheetsConfig] = useState<any>({
    spreadsheetId: "",
    lastSynced: "",
    hasArticles: false,
    hasImages: false,
    hasProducts: false
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetInput, setSheetInput] = useState("");
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });

  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem("cosbuilt_admin_logged_in") === "true" || localStorage.getItem("cosbuilt_admin_mode") === "true";
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true" || params.get("mode") === "admin") {
      setIsAdminMode(true);
      localStorage.setItem("cosbuilt_admin_mode", "true");
      // Clean up the URL query params so they are not visible in the address bar
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleToggleAdminMode = () => {
    const nextVal = !isAdminMode;
    setIsAdminMode(nextVal);
    if (nextVal) {
      localStorage.setItem("cosbuilt_admin_mode", "true");
    } else {
      localStorage.removeItem("cosbuilt_admin_mode");
      localStorage.removeItem("cosbuilt_admin_logged_in");
    }
  };

  // Load sheets configuration and public content on component mount.
  // CRM leads are NOT loaded here — they are sensitive customer data and are
  // fetched only inside the authenticated admin dashboard (CRMDashboard).
  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const configRes = await fetch("/api/sheets/config");
        if (configRes.ok) {
          const config = await configRes.json();
          setSheetsConfig(config);
          if (config.spreadsheetId) {
            setSheetInput(config.spreadsheetId);
          }
        }
        
        const dataRes = await fetch("/api/sheets/data");
        if (dataRes.ok) {
          const data = await dataRes.json();
          if (data.articles && data.articles.length > 0) {
            setCustomBlogPosts(data.articles);
          }
          if (data.images && data.images.length > 0) {
            setCustomImages(data.images);
          }
          if (data.logos && data.logos.length > 0) {
            setCustomLogos(data.logos);
          }
          if (data.websiteLogo) {
            setWebsiteLogo(data.websiteLogo);
          }
          if (data.footerLogo) {
            setFooterLogo(data.footerLogo);
          }
          if (data.products && data.products.length > 0) {
            setCustomProducts(data.products);
          }
        }
      } catch (error) {
        console.error("Failed to load Google Sheets data:", error);
      }
    };
    
    fetchSheetsData();
  }, []);
  
  // Interactive Estimator States
  const [estProduct, setEstProduct] = useState("Serum / Ampoule");
  const [estVolume, setEstVolume] = useState(2000);
  const [estFormulaGrade, setEstFormulaGrade] = useState("standard");
  const [estPackaging, setEstPackaging] = useState("standard");
  const [estLegal, setEstLegal] = useState("standard");

  // New High-Fidelity Estimator States
  const [estGroup, setEstGroup] = useState("Da Mặt");
  const [estProductLine, setEstProductLine] = useState("Serum B5 HA Phục Hồi Đa Tầng");
  const [estPackagingType, setEstPackagingType] = useState("standard");
  const [estQty, setEstQty] = useState(1000);
  const [estLegalService, setEstLegalService] = useState("standard");
  
  // Contact Form state
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    brandName: "",
    category: "Chăm sóc da mặt",
    moq: "1000",
    message: ""
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Apply Estimate configuration to Contact tab
  const handleApplyEstimateToContact = (
    productName: string, 
    qty: number, 
    formula: string, 
    pack: string, 
    legal: string, 
    totalPrice: number
  ) => {
    const formulaText = formula === "clinical" ? "Lâm sàng cao cấp (+4.000 đ/sp)" : formula === "organic" ? "Thuần chay hữu cơ (+7.000 đ/sp)" : "Tiêu chuẩn CGMP";
    const packText = pack === "dropper" ? "Thủy tinh mờ dropper (+4.500 đ/sp)" : pack === "luxury" ? "Hũ Acrylic 2 lớp vương giả (+6.000 đ/sp)" : "PE/PET tiêu chuẩn";
    const legalText = legal === "standard" ? "Hồ sơ công bố Bộ Y Tế (+8.000.000 đ)" : legal === "full" ? "Trọn gói thương hiệu & mã vạch (+15.000.000 đ)" : "Không đăng ký";
    
    setContactForm({
      ...contactForm,
      category: productName.includes("Serum") ? "Chăm sóc da mặt" : productName.includes("Tóc") ? "Chăm sóc tóc" : productName.includes("Son") ? "Trang điểm" : "Chăm sóc da mặt",
      moq: qty >= 5000 ? "5000" : qty >= 2000 ? "2000" : "1000",
      message: `Tôi muốn nhận báo giá & mẫu thử vật lý cho cấu hình ước tính:
- Dòng sản phẩm: ${productName}
- Số lượng gia công: ${qty.toLocaleString("vi-VN")} chai/hũ
- Phân khúc công thức: ${formulaText}
- Bao bì chai lọ: ${packText}
- Gói hồ sơ pháp lý: ${legalText}
- Dự toán ngân sách đầu tư ước tính: ${totalPrice.toLocaleString("vi-VN")} VND.
Vui lòng liên hệ để gửi mẫu thử vật lý miễn phí.`
    });
    
    setActiveTab("contact");
    if (location.pathname !== "/lien-he") {
      skipReconcileRef.current = true;
      navigate("/lien-he");
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // Product groups and specific product lines for the estimator
  const PRODUCT_LINES_DATA: Record<string, { name: string; basePrice: number }[]> = {
    "Da Mặt": [
      { name: "Serum B5 HA Phục Hồi Đa Tầng", basePrice: 6500 },
      { name: "Kem Dưỡng Trắng Da Mờ Thâm Niacinamide", basePrice: 8500 },
      { name: "Sữa Rửa Mặt Tạo Bọt Dịu Nhẹ", basePrice: 5000 },
      { name: "Kem Chống Nắng Vật Lý Phổ Rộng", basePrice: 9500 },
      { name: "Nước Tẩy Trang Sạch Sâu", basePrice: 4000 }
    ],
    "Body": [
      { name: "Sữa Tắm Truyền Trắng Body Hương Nước Hoa", basePrice: 7000 },
      { name: "Tẩy Tế Bào Chết Hạt Cà Phê Đăk Lăk Mịn Da", basePrice: 5500 },
      { name: "Kem Body Mềm Trắng Da Toàn Thân", basePrice: 8000 }
    ],
    "Chăm Tóc": [
      { name: "Dầu Gội Bưởi Đậm Đặc Ngăn Rụng & Kích Mọc Tóc", basePrice: 6000 },
      { name: "Kem Xả Tóc Tinh Dầu Bưởi Phục Hồi Tóc Hư Tổn", basePrice: 5500 }
    ],
    "Trang Điểm": [
      { name: "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi", basePrice: 5000 },
      { name: "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu", basePrice: 12000 }
    ],
    "Cá Nhân": [
      { name: "Dung Dịch Vệ Sinh Trầu Không Dịu Nhẹ Kháng Khuẩn", basePrice: 4500 },
      { name: "Lăn Khử Mùi Thảo Mộc Khô Thoáng", basePrice: 4000 }
    ]
  };

  // Auto-switch product line when group changes
  useEffect(() => {
    const list = PRODUCT_LINES_DATA[estGroup];
    if (list && list.length > 0) {
      setEstProductLine(list[0].name);
    }
  }, [estGroup]);

  // Reconcile the whole view (tab, category filter, open product, open article)
  // from the URL. This is the single source of truth for EXTERNAL navigation:
  // deep links, page refresh, and the browser back/forward buttons. Internal
  // navigation sets skipReconcileRef before it calls navigate() (it already
  // applied the state itself), so this effect skips the reset for those.
  // It also re-runs when products/articles load from the server, so a deep link
  // opened before the data arrived still resolves to the right item.
  useEffect(() => {
    const fullPath = location.pathname + location.search;
    if (skipReconcileRef.current) {
      skipReconcileRef.current = false;
      lastPathRef.current = fullPath;
      return;
    }
    const parsed = parseLocation(location.pathname);
    const params = new URLSearchParams(location.search);
    const pathChanged = fullPath !== lastPathRef.current;
    lastPathRef.current = fullPath;

    setActiveTab(parsed.tab);

    if (parsed.tab === "categories") {
      setSelectedCategory(parsed.category || "all");
      setSelectedProductDetails(
        parsed.productSlug
          ? customProducts.find(
              (p) => productSlugOf(p) === parsed.productSlug || p.id === parsed.productSlug
            ) || null
          : null
      );
      // Secondary skin-type filter comes from ?loai-da=...
      const skinSlug = params.get("loai-da");
      setSelectedSkinType(skinSlug ? SKIN_BY_SLUG[skinSlug] || SKIN_ALL : SKIN_ALL);
    } else {
      setSelectedProductDetails(null);
    }

    if (parsed.tab === "news") {
      setSelectedBlog(
        parsed.blogSlug
          ? customBlogPosts.find((p) => (p.slug || slugify(p.title)) === parsed.blogSlug) || null
          : null
      );
      // News sub-category filter comes from ?chuyen-muc=...
      const newsSlug = params.get("chuyen-muc");
      setBlogCategoryFilter(
        newsSlug && NEWS_BY_SLUG[newsSlug]
          ? (NEWS_BY_SLUG[newsSlug] as "cẩm nang" | "xu hướng")
          : "all"
      );
    } else {
      setSelectedBlog(null);
    }

    // About / Services sub-section comes from the URL too, so it survives a
    // refresh or a shared deep link (e.g. /dich-vu/gia-cong-tron-goi).
    if (parsed.tab === "about") setActiveAboutTab(parsed.subTab || "about-us");
    if (parsed.tab === "services") setActiveServiceTab(parsed.subTab || "oem-odm");

    // Only reset transient in-page state and scroll on a genuine navigation,
    // never on a background data refresh that leaves the path unchanged.
    if (pathChanged) {
      setActiveSubTab(undefined);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search, customProducts, customBlogPosts]);

  const prevActiveTabRef = useRef(activeTab);
  useEffect(() => {
    if (prevActiveTabRef.current !== activeTab) {
      window.scrollTo({ top: 0, behavior: "auto" });
      prevActiveTabRef.current = activeTab;
    }
  }, [activeTab]);

  // Scroll to sub-section only if activeSubTab is set AND the element actually exists
  useEffect(() => {
    if (activeSubTab) {
      const timer = setTimeout(() => {
        const element = document.getElementById(activeSubTab);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSubTab]);

  const handleSelectBlog = (post: BlogPost) => {
    setSelectedBlog(post);
    setActiveTab("news");
    const targetPath = blogPath(post);
    if (location.pathname !== targetPath) {
      skipReconcileRef.current = true;
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleSelectProduct = (prod: FormulaProduct) => {
    setSelectedProductDetails(prod);
    setActiveDetailsTab("mô tả");
    setDetailsQuantity(1);
    setActiveTab("categories");
    const targetPath = `${PRODUCT_PATH}/${productSlugOf(prod)}`;
    if (location.pathname !== targetPath) {
      skipReconcileRef.current = true;
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Close a product detail and return to its category list (keeps the filter).
  const handleBackToProducts = () => {
    setSelectedProductDetails(null);
    const targetPath =
      selectedCategory && selectedCategory !== "all"
        ? `${TAB_TO_PATH.categories}/${CATEGORY_SLUGS[selectedCategory] || selectedCategory}`
        : TAB_TO_PATH.categories;
    if (location.pathname !== targetPath) {
      skipReconcileRef.current = true;
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Close an article and return to the news list.
  const handleBackToNews = () => {
    setSelectedBlog(null);
    if (location.pathname !== TAB_TO_PATH.news) {
      skipReconcileRef.current = true;
      navigate(TAB_TO_PATH.news);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Skin-type filter -> reflected in the URL as ?loai-da=... (kept on the
  // current category path). "Tất cả loại da" clears the param.
  const handleSelectSkinType = (skin: string) => {
    setSelectedSkinType(skin);
    const vn = getVNSkinType(skin);
    const slug = SKIN_SLUGS[vn];
    const params = new URLSearchParams(location.search);
    if (slug) params.set("loai-da", slug);
    else params.delete("loai-da");
    const qs = params.toString();
    const targetPath = location.pathname + (qs ? `?${qs}` : "");
    if (location.pathname + location.search !== targetPath) {
      skipReconcileRef.current = true;
      navigate(targetPath);
    }
  };

  // News sub-category filter -> reflected in the URL as ?chuyen-muc=...
  const handleBlogCategory = (cat: "all" | "cẩm nang" | "xu hướng") => {
    setBlogCategoryFilter(cat);
    const params = new URLSearchParams(location.search);
    const slug = cat !== "all" ? NEWS_SLUGS[cat] : "";
    if (slug) params.set("chuyen-muc", slug);
    else params.delete("chuyen-muc");
    const qs = params.toString();
    const targetPath = TAB_TO_PATH.news + (qs ? `?${qs}` : "");
    if (location.pathname + location.search !== targetPath) {
      skipReconcileRef.current = true;
      navigate(targetPath);
    }
  };

  const handleTabChange = (tabId: string, subId?: string) => {
    // Sub-menu items get their own Vietnamese URL: a category
    // (/danh-muc-gia-cong/cham-soc-toc) and About/Services sub-sections
    // (/gioi-thieu/nha-may-nang-luc, /dich-vu/gia-cong-tron-goi).
    let targetPath = TAB_TO_PATH[tabId] || "/";
    // News dropdown items are sub-category filters -> ?chuyen-muc=...
    const newsCat =
      tabId === "news" && subId === "manufacturing-guide"
        ? "cẩm nang"
        : tabId === "news" && subId === "ingredient-trends"
        ? "xu hướng"
        : null;
    if (tabId === "categories" && subId && subId !== "all") {
      targetPath = `${TAB_TO_PATH.categories}/${CATEGORY_SLUGS[subId] || subId}`;
    } else if (tabId === "about" && subId) {
      targetPath = `${TAB_TO_PATH.about}/${ABOUT_SLUGS[subId] || subId}`;
    } else if (tabId === "services" && subId) {
      targetPath = `${TAB_TO_PATH.services}/${SERVICE_SLUGS[subId] || subId}`;
    } else if (newsCat) {
      targetPath = `${TAB_TO_PATH.news}?chuyen-muc=${NEWS_SLUGS[newsCat]}`;
    }
    if (tabId !== "crm" && location.pathname === "/admin") {
      // Full reload when leaving /admin - a client-side transition away from
      // /admin left the CRM dashboard mounted alongside the main site in this
      // app's router setup, so force a clean reload to the target page instead.
      window.location.href = targetPath;
      return;
    }
    setActiveTab(tabId);
    setActiveSubTab(subId);
    setSearchQuery(""); // Clear search on tab switch
    setSelectedBlog(null); // Reset selected blog to list view on any tab change
    setSelectedProductDetails(null); // Reset selected product to list view on any tab change
    if (tabId === "about") {
      setActiveAboutTab(subId || "about-us");
    }
    if (tabId === "services") {
      setActiveServiceTab(subId || "oem-odm");
    }
    if (tabId === "categories") {
      setSelectedCategory(subId || "all");
    }
    if (tabId === "news") {
      setBlogCategoryFilter(newsCat || "all");
    }
    // Reflect the section in the URL so it is linkable / shareable.
    if (location.pathname + location.search !== targetPath) {
      skipReconcileRef.current = true; // state already applied above; effect skips reset
      navigate(targetPath);
    }
    // Instantly scroll to the top of the window on any navigation-triggered tab change
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Determine where to route based on query context
    const lowerQuery = query.toLowerCase();
    let target = "services";
    if (lowerQuery.includes("giá") || lowerQuery.includes("bảng giá") || lowerQuery.includes("bao nhiêu") || lowerQuery.includes("chi phí")) {
      target = "pricing";
    } else if (lowerQuery.includes("tin tức") || lowerQuery.includes("xu hướng") || lowerQuery.includes("cẩm nang") || lowerQuery.includes("bài viết")) {
      target = "news";
    } else if (lowerQuery.includes("da mặt") || lowerQuery.includes("body") || lowerQuery.includes("tóc") || lowerQuery.includes("son") || lowerQuery.includes("trang điểm") || lowerQuery.includes("cá nhân")) {
      target = "categories";
      if (lowerQuery.includes("da mặt")) setSelectedCategory("facial-care");
      else if (lowerQuery.includes("body") || lowerQuery.includes("cơ thể")) setSelectedCategory("body-care");
      else if (lowerQuery.includes("tóc")) setSelectedCategory("hair-care");
      else if (lowerQuery.includes("son") || lowerQuery.includes("trang điểm") || lowerQuery.includes("makeup")) setSelectedCategory("makeup");
      else if (lowerQuery.includes("cá nhân") || lowerQuery.includes("vệ sinh")) setSelectedCategory("personal-care");
    } else if (lowerQuery.includes("liên hệ") || lowerQuery.includes("tư vấn") || lowerQuery.includes("đăng ký") || lowerQuery.includes("sđt") || lowerQuery.includes("email")) {
      target = "contact";
    }
    // Switch section (keeping the search query) and reflect it in the URL.
    setActiveTab(target);
    setSelectedBlog(null);
    setSelectedProductDetails(null);
    const targetPath = TAB_TO_PATH[target] || "/";
    if (location.pathname !== targetPath) {
      skipReconcileRef.current = true; // keep the search query the effect would clear
      navigate(targetPath);
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmittedEmail(contactForm.email);
    setIsFormSubmitted(true);

    try {
      // Public lead submission — no auth required. The admin CRM refreshes its
      // own list (authenticated) when the owner opens it.
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
    } catch (err) {
      console.error("Error submitting lead to server API:", err);
    }

    setTimeout(() => {
      setIsFormSubmitted(false);
      setContactForm({
        name: "",
        phone: "",
        email: "",
        brandName: "",
        category: "Chăm sóc da mặt",
        moq: "1000",
        message: ""
      });
    }, 5000);
  };

  const filteredPricingList = localizedPricingList.filter(item => 
    item.productType.toLowerCase().includes(priceSearch.toLowerCase()) ||
    item.priceRange.toLowerCase().includes(priceSearch.toLowerCase())
  );

  // Draft articles are hidden from the public site (admin still sees them).
  const isPublished = (post: any) => (post?.status || "published") !== "draft";
  const filteredBlogPosts = localizedBlogPosts.filter(post => {
    const matchesCategory = blogCategoryFilter === "all" || post.category === blogCategoryFilter;
    const matchesSearch = searchQuery ? (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;
    return isPublished(post) && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-900 selection:bg-emerald-green-light selection:text-emerald-green-dark">
      {location.pathname !== "/admin" && (
        <Navbar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          onSearch={handleSearch} 
          sampleCartCount={sampleCart.length}
          onToggleSampleCart={handleToggleSampleCart}
          websiteLogo={websiteLogo}
          isAdminMode={isAdminMode}
        />
      )}

      <main className="flex-1 w-full">
        {/* Dynamic content rendering with Framer Motion Page Transitions */}
        <AnimatePresence mode="wait">
          
          {/* SEARCH RESULTS BANNER */}
          {searchQuery && (
            <motion.div 
              key="search-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-green-light border-b border-emerald-green-light py-3 px-4 text-center text-xs text-emerald-green-dark"
            >
              Đang hiển thị kết quả tìm kiếm cho từ khóa: <strong className="font-bold">"{searchQuery}"</strong>. 
              <button onClick={() => setSearchQuery("")} className="ml-2 font-bold underline hover:text-emerald-green-dark">Xóa tìm kiếm</button>
            </motion.div>
          )}

          {/* TRANG CHỦ / HOME PAGE */}
          {activeTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 pb-16"
            >
              {/* Luxury Hero Banner (Styled beautifully like Image 2 "Avésa") */}
              <section id="hero-section" className="relative bg-stone-900 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1600" 
                    alt="Cosmetics Hero Banner" 
                    className="w-full h-full object-cover opacity-35 object-center scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="inline-flex items-center gap-2 bg-emerald-green/30 text-emerald-green-light border border-emerald-green/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" /> {t("cgmp_factory")}
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.1]">
                        {language === "vi" ? (
                          <>
                            Kiến Tạo <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-green via-amber-200 to-satin-gold">
                              Thương Hiệu Triệu Đô
                            </span>
                          </>
                        ) : (
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-green via-amber-200 to-satin-gold">
                            {t("creating_brands")}
                          </span>
                        )}
                      </h1>
                      
                      <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-xl font-light">
                        {t("hero_desc")}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <a 
                          href="#ai-formula-advisor-container"
                          className="bg-emerald-green hover:bg-emerald-green-dark text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-emerald-green/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                          {t("ai_design")}
                        </a>
                        <button 
                          onClick={() => handleTabChange("pricing")}
                          className="bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Calculator className="w-4 h-4" />
                          {t("view_pricing")}
                        </button>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">100%</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">{t("exclusive_formula")}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">CGMP</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">{t("cgmp_factory")}</div>
                        </div>
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">1,000+</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">{t("free_physical_samples")}</div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary interactive promotional card on Hero */}
                    <div className="lg:col-span-5 hidden lg:block">
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden space-y-4">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/10 rounded-full blur-2xl"></div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-widest text-emerald-green-light">{t("trend_2026")}</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            <span className="bg-emerald-green text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase mr-2">Hot R&D</span>
                            <span className="text-xs font-semibold text-white">{t("hot_rd")}</span>
                            <p className="text-[11px] text-stone-400 mt-1">{t("hot_rd_desc")}</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            <span className="bg-amber-500 text-stone-950 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase mr-2">Eco-friendly</span>
                            <span className="text-xs font-semibold text-white">{t("vegan_eco")}</span>
                            <p className="text-[11px] text-stone-400 mt-1">{t("vegan_eco_desc")}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleTabChange("news")}
                          className="w-full bg-white text-stone-900 font-bold text-xs py-3 rounded-xl hover:bg-emerald-green-light transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {t("learn_trends")} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATS COUNTDOWN COUNTERS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border border-stone-150 p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {localizedAboutSections.intro.stats.map((stat, idx) => (
                    <div key={idx} className="text-center space-y-1">
                      <div className="text-3xl md:text-4xl font-serif font-black text-emerald-green">{stat.value}</div>
                      <div className="text-xs text-stone-500 font-medium tracking-wider uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CORE EXCELLENCE CARDS (About introduction) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-left">
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-green">
                      {language === "en" ? "About our brand" : language === "ko" ? "우리 브랜드 소개" : "Về thương hiệu chúng tôi"}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
                      {language === "en" ? "Premium, Most Professional Cosmetics Contract Manufacturer" : language === "ko" ? "최고의 전문성을 가진 하이엔드 화장품 ODM/OEM 파트너" : "Đối tác gia công mỹ phẩm đẳng cấp, chuyên nghiệp nhất"}
                    </h2>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {localizedAboutSections.intro.content}
                    </p>
                    <div className="space-y-3 text-xs font-medium text-stone-800">
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>{language === "en" ? "Own 2 large-scale international factories, 100% imported machinery" : language === "ko" ? "2개의 글로벌 대형 공장 보유, 100% 수입 기계 설비" : "Sở hữu 2 nhà máy quy mô lớn chuẩn quốc tế, máy móc nhập khẩu 100%"}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>{language === "en" ? "Absolute confidentiality of all exclusive formulas and brand data" : language === "ko" ? "모든 독점 처방 및 브랜드 정보의 철저한 비밀 유지 보장" : "Bảo mật tuyệt đối mọi công thức độc quyền và dữ liệu thương hiệu"}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>{language === "en" ? "Full legal support from intellectual property to MOH product notification" : language === "ko" ? "지식재산권 등록부터 보건부 화장품 품목 보고까지 완벽 대행" : "Hỗ trợ hồ sơ pháp lý từ sở hữu trí tuệ đến phiếu công bố lưu hành Bộ Y Tế"}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleTabChange("about")}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-emerald-green border-b border-stone-900 hover:border-emerald-green pb-1.5 transition-all cursor-pointer"
                    >
                      <span>{language === "en" ? "Explore our factory & capacity" : language === "ko" ? "공장 견학 및 생산 역량 알아보기" : "Khám phá nhà máy & năng lực sản xuất"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800" 
                      alt="Cosmetics Laboratory" 
                      className="w-full h-[400px] object-cover rounded-3xl shadow-lg border border-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-stone-950 p-6 rounded-2xl border border-stone-800 text-white space-y-1 shadow-xl hidden sm:block">
                      <div className="text-xs text-stone-400 font-bold uppercase">Chứng nhận tiêu chuẩn</div>
                      <div className="text-base font-serif font-bold text-emerald-green">CGMP ASEAN / ISO 22716</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CORE AI INTERACTIVE R&D ADVISOR PANEL */}
              <section id="ai-advisor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AIFormulaAdvisor />
              </section>

              {/* INTERACTIVE MANUFACTURING CATEGORIES PREVIEW */}
              <section className="bg-stone-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                  <div className="text-center space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Thế mạnh vượt trội</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">Danh Mục Gia Công Mũi Nhọn</h2>
                    <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto">
                      Cosbuilt nghiên cứu và sản xuất trọn gói mọi phân khúc mỹ phẩm chăm sóc toàn thân chất lượng hàng đầu thế giới.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {localizedCategories.slice(0, 3).map((cat) => (
                      <div key={cat.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                          <div className="h-48 relative overflow-hidden">
                            <img 
                              src={cat.image} 
                              alt={cat.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                              {language === "en" ? "Exclusive R&D" : language === "ko" ? "독점 R&D" : "Độc quyền R&D"}
                            </div>
                          </div>
                          <div className="p-5 text-left space-y-3">
                            <h4 className="font-serif font-bold text-base text-stone-900">{cat.title}</h4>
                            <p className="text-stone-500 text-xs leading-relaxed font-light">{cat.description}</p>
                            
                            <div className="space-y-1.5 pt-2">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                {language === "en" ? "Featured Products" : language === "ko" ? "대표 생산 품목" : "Sản phẩm nổi bật"}
                              </span>
                              {cat.subCategories.slice(0, 3).map((sub, idx) => (
                                <div key={idx} className="flex gap-1.5 items-start text-xs text-stone-700 font-medium">
                                  <span className="text-emerald-green font-bold">•</span>
                                  <span>{sub}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 text-left">
                          <button 
                            onClick={() => {
                              handleTabChange("categories", cat.id);
                            }}
                            className="w-full text-center bg-stone-50 hover:bg-stone-900 hover:text-white border border-stone-200 hover:border-stone-900 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            {language === "en" ? "Manufacturing Capacity Details" : language === "ko" ? "자세한 생산 능력 보기" : "Chi tiết năng lực sản xuất"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button 
                      onClick={() => handleTabChange("categories", "all")}
                      className="bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      {language === "en" ? "View All Manufacturing Categories" : language === "ko" ? "모든 생산 카테고리 보기" : "Xem tất cả danh mục gia công"}
                    </button>
                  </div>
                </div>
              </section>

              {/* COOPERATION PROCESS 6-STEP ANIMATION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">{t("process_title")}</span>
                  <h2 className="text-3xl font-serif font-bold text-stone-900">{t("process_headline")}</h2>
                  <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto">
                    {t("process_desc")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localizedServices[5].details.map((step, idx) => {
                    const [stepTitle, stepDesc] = step.split(": ");
                    return (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-150 relative overflow-hidden text-left space-y-2">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-green/5 rounded-bl-3xl flex items-center justify-center font-serif text-emerald-green font-black text-sm">
                          0{idx + 1}
                        </div>
                        <span className="bg-emerald-green-light text-emerald-green-dark text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Bước {idx + 1}</span>
                        <p className="text-stone-500 text-xs leading-relaxed font-light pt-2">{stepDesc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* LATEST INGREDIENT TRENDS BLOG POSTS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-stone-200 pb-5">
                  <div className="text-left space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Tin tức thị trường</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">Cẩm Nang & Xu Hướng Hoạt Chất</h2>
                  </div>
                  <button 
                    onClick={() => handleTabChange("news")}
                    className="text-xs font-bold uppercase tracking-wider text-emerald-green hover:text-emerald-green-dark flex items-center gap-1 cursor-pointer transition-all shrink-0"
                  >
                    Xem tất cả bài viết <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {customBlogPosts.filter(isPublished).slice(0, 2).map((post, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectBlog(post)}
                      className="bg-white rounded-2xl border border-stone-150 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row"
                    >
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full sm:w-48 h-48 object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-5 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="bg-emerald-green-light text-emerald-green-dark text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {post.category}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 hover:text-emerald-green transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-stone-500 text-xs line-clamp-2 font-light">
                            {post.summary}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* INQUIRY QUICK CONTACT SECTION */}
              <section className="bg-stone-950 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950 to-emerald-green/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-green/10 rounded-full blur-3xl"></div>
                
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl mb-2">
                    <Briefcase className="w-6 h-6 text-emerald-green" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-100">
                    Sẵn Sàng Xây Dựng Thương Hiệu Của Riêng Bạn?
                  </h2>
                  <p className="text-stone-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
                    Đừng ngần ngại liên hệ với chuyên viên phát triển dự án của Cosbuilt. Chúng tôi luôn sẵn sàng hỗ trợ tư vấn và gửi tặng mẫu test thử nghiệm vật lý miễn phí.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button 
                      onClick={() => handleTabChange("contact")}
                      className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-full transition-all cursor-pointer"
                    >
                      Liên hệ Gửi thông tin Yêu cầu
                    </button>
                    <a 
                      href="tel:+84966373686"
                      className="bg-white/15 hover:bg-white/20 text-white font-bold text-xs md:text-sm px-8 py-3.5 rounded-full transition-all flex items-center gap-2 border border-white/10"
                    >
                      <Phone className="w-4 h-4 text-emerald-green" />
                      Gọi điện: (+84) 966 373 686
                    </a>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* GIỚI THIỆU / ABOUT US */}
          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              {/* Header */}
              <div className="text-center space-y-4 max-w-4xl mx-auto pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-green">
                  GIỚI THIỆU NĂNG LỰC
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                  Nền Tảng Vững Chắc Kiến Tạo Thương Hiệu Mỹ Phẩm Triệu Đô
                </h1>
                <div className="w-16 h-1 bg-emerald-green mx-auto mt-4 mb-2"></div>
              </div>

              {/* Sub navigation for about section tabs */}
              <div className="flex flex-wrap items-center justify-center border-b border-stone-200 overflow-x-auto scrollbar-none gap-2 sm:gap-6 md:gap-8 pb-0">
                {[
                  { id: "about-us", label: "VỀ COSBUILT", icon: FileText },
                  { id: "factory-capacity", label: "NHÀ MÁY & NĂNG LỰC", icon: Building2 },
                  { id: "certifications", label: "CHỨNG NHẬN CGMP", icon: ShieldCheck },
                  { id: "rd-team", label: "ĐỘI NGŨ R&D", icon: Users },
                  { id: "partners", label: "ĐỐI TÁC", icon: Award }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeAboutTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAboutTab(tab.id)}
                      className={`flex items-center gap-2 py-3 px-1 border-b-2 font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "border-emerald-green text-emerald-green"
                          : "border-transparent text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-emerald-green" : "text-stone-400"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="mt-8">
                {activeAboutTab === "about-us" && (
                  <motion.div
                    key="about-us"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Section 1: Về Cosbuilt */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-5 text-left">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {localizedAboutSections.intro.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{localizedAboutSections.intro.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {localizedAboutSections.intro.content}
                        </p>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {language === "en" ? "Each product is the result of deep scientific research on compatibility with Asian skin. We combine the botanical essence of Vietnamese herbs with high-concentration extraction technologies imported from leading Swiss and German institutes." : language === "ko" ? "탄생하는 모든 제품은 아시아인의 피부 적합성에 대한 깊이 있는 연구와 고민의 산물입니다. 우리는 정밀 청정 추출한 베트남 보태니컬 핵심 에센스와 스위스 및 독일의 권위 있는 화장품 연구기관에서 수입한 선진 기술을 융합합니다." : "Mỗi sản phẩm ra đời đều mang tâm huyết nghiên cứu sâu sắc về sự tương thích với làn da người Á Đông. Chúng tôi kết hợp tinh túy dược thảo Việt Nam cùng công nghệ tách chiết nồng độ cao nhập khẩu từ các viện nghiên cứu dược mỹ phẩm uy tín của Thụy Sĩ và Đức."}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {localizedAboutSections.intro.stats.map((stat, idx) => (
                          <div key={idx} className="bg-white border border-stone-150 p-6 rounded-2xl shadow-2xs space-y-1">
                            <div className="text-2xl font-serif font-bold text-emerald-green">{stat.value}</div>
                            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeAboutTab === "factory-capacity" && (
                  <motion.div
                    key="factory-capacity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Section 2: Nhà máy & năng lực */}
                    <section className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-7 space-y-5 text-left">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {localizedAboutSections.factory.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{localizedAboutSections.factory.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {localizedAboutSections.factory.description}
                        </p>
                        <div className="space-y-3">
                          {localizedAboutSections.factory.strengths.map((str, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-stone-700">
                              <CheckCircle className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                              <span className="font-medium">{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-5 relative">
                        <img 
                          src={localizedAboutSections.factory.image} 
                          alt="CGMP Production" 
                          className="w-full h-80 object-cover rounded-2xl shadow-md border border-stone-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeAboutTab === "certifications" && (
                  <motion.div
                    key="certifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Section 3: Chứng nhận tiêu chuẩn */}
                    <section className="space-y-8">
                      <div className="text-center space-y-3">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {localizedAboutSections.certifications.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{localizedAboutSections.certifications.subtitle}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {localizedAboutSections.certifications.list.map((cert, idx) => (
                          <div key={idx} className="bg-white border border-stone-200 p-6 rounded-2xl shadow-2xs space-y-3 text-left animate-in fade-in duration-300">
                            <div className="w-10 h-10 rounded-full bg-emerald-green/10 flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5 text-emerald-green" />
                            </div>
                            <div>
                              <h3 className="font-serif font-bold text-sm text-stone-900">{cert.name}</h3>
                              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{cert.issuer}</p>
                            </div>
                            <p className="text-stone-500 text-xs font-light leading-relaxed">{cert.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeAboutTab === "rd-team" && (
                  <motion.div
                    key="rd-team"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Section 4: Đội ngũ R&D */}
                    <section className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-7 space-y-5 text-left">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {localizedAboutSections.rdTeam.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{localizedAboutSections.rdTeam.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {localizedAboutSections.rdTeam.description}
                        </p>
                        <div className="space-y-3">
                          {localizedAboutSections.rdTeam.focusAreas.map((area, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-stone-700">
                              <CheckCircle className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                              <span className="font-medium">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-5 relative">
                        <img 
                          src={localizedAboutSections.rdTeam.image} 
                          alt="R&D Team" 
                          className="w-full h-80 object-cover rounded-2xl shadow-md border border-stone-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeAboutTab === "partners" && (
                  <motion.div
                    key="partners"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Section 5: Đối tác & khách hàng */}
                    <section className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 text-left space-y-6">
                      <div className="space-y-3">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {localizedAboutSections.partners.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{localizedAboutSections.partners.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light max-w-4xl">
                          {localizedAboutSections.partners.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-4">
                        {ABOUT_SECTIONS.partners.logos.map((logo, idx) => (
                          <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center flex flex-col justify-center items-center h-28 hover:shadow-xs transition-all">
                            <span className="font-serif font-black text-stone-750 text-sm">{logo.name}</span>
                            <span className="text-[10px] text-stone-400 font-bold uppercase mt-1 tracking-wider">{logo.type}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* DỊCH VỤ / SERVICES */}
          {activeTab === "services" && (() => {
            const serviceTabs = [
              { id: "oem-odm", index: 0, labelEn: "OEM/ODM Manufacturing", labelKo: "OEM/ODM 제조", labelVi: "Gia công OEM/ODM" },
              { id: "formula-development", index: 1, labelEn: "R&D Formula", labelKo: "포뮬러 개발", labelVi: "Phát triển công thức (R&D)" },
              { id: "packaging-print", index: 2, labelEn: "Packaging & Print", labelKo: "용기 부자재 & 인쇄", labelVi: "Bao bì & in ấn" },
              { id: "legal-service", index: 3, labelEn: "Regulatory & Law", labelKo: "법률 및 인허가", labelVi: "Pháp lý & công bố" },
              { id: "logistics", index: 4, labelEn: "Logistics", labelKo: "물류 및 통관", labelVi: "Vận chuyển - thông quan" },
              { id: "cooperation-process", index: 5, labelEn: "Cooperation Process", labelKo: "협업 프로세스", labelVi: "Quy trình hợp tác" },
              { id: "cooperation-benefits", index: 6, labelEn: "Cooperation Benefits", labelKo: "파트너십 혜택", labelVi: "Lợi ích hợp tác" }
            ];

            const activeTabInfo = serviceTabs.find(tab => tab.id === activeServiceTab) || serviceTabs[0];
            const activeService = localizedServices[activeTabInfo.index];
            
            const getServiceIcon = (iconName: string) => {
              switch (iconName) {
                case "Boxes": return Boxes;
                case "FlaskConical": return FlaskConical;
                case "Palette": return Palette;
                case "FileText": return FileText;
                case "Truck": return Truck;
                case "GitMerge": return GitMerge;
                case "Gem": return Gem;
                default: return Briefcase;
              }
            };
            
            const ActiveIcon = getServiceIcon(activeService.icon);

            return (
              <motion.div
                key="services-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
              >
                {/* Header */}
                <div className="text-center space-y-4 max-w-4xl mx-auto pb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-green">
                    {language === "en" ? "OUR PROFESSIONAL SERVICES" : language === "ko" ? "코스빌트 전문 서비스" : "DỊCH VỤ CHUYÊN NGHIỆP"}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                    {language === "en" ? "End-to-End Cosmetic Manufacturing Solutions" : language === "ko" ? "화장품 기획부터 완제품 출하까지 원스톱 솔루션" : "Giải Pháp Toàn Diện Cho Thương Hiệu Mỹ Phẩm Của Bạn"}
                  </h1>
                  <div className="w-16 h-1 bg-emerald-green mx-auto mt-4 mb-2"></div>
                </div>

                {/* Horizontal Navigation Slider */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5">
                  <div className="flex overflow-x-auto gap-2 p-1 scroll-smooth snap-x no-scrollbar" style={{ scrollbarWidth: "none" }}>
                    {serviceTabs.map((tab) => {
                      const tabService = localizedServices[tab.index];
                      const TabIcon = getServiceIcon(tabService.icon);
                      const isSelected = activeServiceTab === tab.id;
                      const label = language === "en" ? tab.labelEn : language === "ko" ? tab.labelKo : tab.labelVi;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveServiceTab(tab.id);
                            setActiveSubTab(tab.id);
                          }}
                          className={`flex items-center gap-2.5 px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap snap-align-start border ${
                            isSelected
                              ? "bg-emerald-green border-emerald-green text-white shadow-md scale-[1.02]"
                              : "bg-white border-stone-200 text-stone-700 hover:border-emerald-green/30 hover:bg-stone-50/50"
                          }`}
                        >
                          <TabIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-emerald-green"}`} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Full-width Detailed Content Area */}
                <div className="w-full space-y-8">
                    <motion.div
                      key={activeServiceTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 space-y-8 text-left"
                    >
                      {/* Active Service Top Info */}
                      <div className="flex flex-col sm:flex-row gap-5 items-start border-b border-stone-100 pb-6">
                        <div className="p-4 bg-emerald-green-light text-emerald-green rounded-2xl flex-shrink-0">
                          <ActiveIcon className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                            {activeService.title}
                          </h2>
                          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-light">
                            {activeService.description}
                          </p>
                        </div>
                      </div>

                      {/* Specialized Interactive Detail Layouts */}
                      {activeTabInfo.index === 5 ? (
                        /* STEP BY STEP COLLABORATION TIMELINE */
                        <div className="space-y-6 relative before:absolute before:left-6 sm:before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-stone-200">
                          {activeService.details.map((step, idx) => {
                            // Extract step title and description if separated by ":"
                            const parts = step.split(":");
                            // Remove "Bước X" prefix if it exists in the title part
                            const stepTitle = parts[0].replace(/^Bước \d+\s*/i, "").trim();
                            const stepDesc = parts.slice(1).join(":");

                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex gap-4 sm:gap-6 relative group"
                              >
                                <div className="w-12 h-12 rounded-full bg-emerald-green text-white flex items-center justify-center font-serif font-bold text-sm sm:text-base shadow-sm border-4 border-white z-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                                  {idx + 1}
                                </div>
                                <div className="bg-stone-50/50 hover:bg-stone-50 border border-stone-100 rounded-2xl p-4 sm:p-5 flex-1 transition-colors">
                                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                                    {stepTitle}
                                  </h4>
                                  {stepDesc && (
                                    <p className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
                                      {stepDesc.trim()}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        /* CHIP/CARD SYSTEM FOR OTHER SERVICES */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeService.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.98 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-stone-50/60 hover:bg-stone-50 border border-stone-100 hover:border-stone-200 rounded-2xl p-5 text-left space-y-3 transition-all flex flex-col justify-between"
                            >
                              <div className="space-y-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-green-light flex items-center justify-center text-emerald-green flex-shrink-0">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <p className="text-stone-800 text-xs sm:text-sm font-medium leading-relaxed">
                                  {detail}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Service CTA Box */}
                      <div className="bg-emerald-green/5 border border-emerald-green/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                        <div className="text-left space-y-1">
                          <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                            {language === "en" ? "Need further consultation?" : language === "ko" ? "추가 컨설팅이 필요하신가요?" : "Bạn cần tư vấn chi tiết hơn?"}
                          </h4>
                          <p className="text-stone-500 text-xs font-light">
                            {language === "en" ? "Our experts are ready to assist you right away." : language === "ko" ? "코스빌트 전문가들이 신속하고 친절하게 답변해 드립니다." : "Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn ngay."}
                          </p>
                        </div>
                        <button
                          onClick={() => handleTabChange("contact")}
                          className="bg-emerald-green hover:bg-emerald-green-hover text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group shadow-xs"
                        >
                          <span>{language === "en" ? "Contact Us" : language === "ko" ? "지금 문의하기" : "Yêu cầu tư vấn"}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </motion.div>
                  </div>

              </motion.div>
            );
          })()}

          {/* DANH MỤC GIA CÔNG / CATEGORIES CATALOG */}
          {activeTab === "categories" && (() => {
            // Filter products
            const filtered = localizedProducts.filter(prod => {
              const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
              
              // Filter by skin orientation
              let matchesSkin = true;
              if (selectedSkinType !== (language === "en" ? "All Skin Types" : language === "ko" ? "전체" : "Tất cả loại da")) {
                const vnSelectedSkin = getVNSkinType(selectedSkinType);
                matchesSkin = prod.skinTypes.some(s => getVNSkinType(s) === vnSelectedSkin || s === "Mọi loại da" || s === "All Skin Types");
              }

              // Filter by labs
              const matchesLab = selectedLabs.length === 0 || selectedLabs.includes(prod.lab);

              return matchesCategory && matchesSkin && matchesLab;
            });

            // Sort products
            const sortedProducts = [...filtered].sort((a, b) => {
              if (selectedSort === "Price: Low to High" || selectedSort === "가격: 낮은순" || selectedSort === "Giá mẫu từ thấp đến cao") {
                return a.price - b.price;
              }
              if (selectedSort === "Price: High to Low" || selectedSort === "가격: 높은순" || selectedSort === "Giá mẫu từ cao đến thấp") {
                return b.price - a.price;
              }
              if (selectedSort === "Highest Stability Rating" || selectedSort === "최고 평가순" || selectedSort === "Đánh giá ổn định cao nhất") {
                return b.hotPercent - a.hotPercent;
              }
              return 0; // Default
            });

            const selectedCatDetails = MANUFACTURING_CATEGORIES.find(cat => cat.id === selectedCategory);

            return (
              <motion.div
                key="categories-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
              >
                {selectedProductDetails ? (
                  /* Premium Inline Product Detail Page View */
                  <div className="max-w-6xl mx-auto space-y-10 text-left animate-in fade-in duration-300">
                    {/* Back button */}
                    <button 
                      onClick={handleBackToProducts}
                      className="flex items-center gap-2 text-stone-500 hover:text-emerald-green font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {language === "en" ? "Back to Catalog" : language === "ko" ? "목록으로 돌아가기" : "Quay lại danh sách công thức"}
                    </button>

                    {/* Main content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                      {/* Left side: Image and specs info */}
                      {(() => {
                        // The product's own image is always first, so the main image on
                        // the detail page matches the card the user clicked. Packaging
                        // suggestions follow as additional, switchable thumbnails.
                        const packagings = getPackagingsForProduct(selectedProductDetails);
                        const displayImages = [
                          { type: "product", name: "Ảnh sản phẩm", image: selectedProductDetails.image, description: "" },
                          ...packagings,
                        ];
                        const activePackaging = displayImages[selectedPackagingIndex] || displayImages[0];
                        const currentImage = activePackaging ? activePackaging.image : selectedProductDetails.image;

                        return (
                          <div className="lg:col-span-5 space-y-6">
                            <div className="aspect-square w-full rounded-2xl overflow-hidden relative border border-stone-150 shadow-2xs">
                              <img 
                                src={currentImage} 
                                alt={selectedProductDetails.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-4 left-4 bg-stone-900 text-white text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-widest z-10 shadow-3xs">
                                {selectedProductDetails.badge}
                              </div>
                            </div>

                            {/* Packaging Selection */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                                  {language === "en" ? "PROPOSED PACKAGING VISUAL" : language === "ko" ? "제안용 용기/포장재 스타일 chọn" : "BAO BÌ ĐỀ XUẤT CHO MẪU THỬ"}
                                </span>
                                <span className="text-[9px] bg-emerald-green/10 text-emerald-green font-bold px-2 py-0.5 rounded-full uppercase">
                                  {language === "en" ? "Interactive" : language === "ko" ? "대화형" : "Đa dạng vỏ chai"}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                {displayImages.map((pkg, idx) => {
                                  const isActive = selectedPackagingIndex === idx;
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => setSelectedPackagingIndex(idx)}
                                      className={`border rounded-xl p-1 transition-all cursor-pointer ${
                                        isActive
                                          ? "border-emerald-green bg-emerald-green/5 shadow-2xs"
                                          : "border-stone-200 bg-white hover:border-stone-350 hover:bg-stone-50"
                                      }`}
                                    >
                                      <div className="aspect-square w-full rounded-lg overflow-hidden border border-stone-100 bg-stone-100">
                                        <img 
                                          src={pkg.image} 
                                          alt={pkg.name || "packaging"} 
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-150 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-emerald-green uppercase tracking-widest">{selectedProductDetails.lab}</span>
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider">ID: {selectedProductDetails.id.toUpperCase()}</span>
                              </div>
                              
                              <div className="border-t border-stone-200 pt-3 space-y-2">
                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                                  {language === "en" ? "TARGET SKIN TYPE ORIENTATION" : language === "ko" ? "피부 권장 타입" : "ĐỊNH HƯỚNG SỬ DỤNG"}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {selectedProductDetails.skinTypes.map((skin, idx) => (
                                    <span key={idx} className="bg-white text-stone-750 border border-stone-200 rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-3xs">
                                      {skin}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Right side: title, prices, tabs and actions */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-1.5 text-amber-400">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[11px] text-stone-400 font-bold">
                                ({selectedProductDetails.reviewsCount} {language === "en" ? "clinical reviews" : language === "ko" ? "임상 평가" : "đánh giá lâm sàng"})
                              </span>
                            </div>
                            
                            <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 leading-tight">
                              {selectedProductDetails.title}
                            </h1>

                            <div className="flex items-center gap-4 bg-stone-50 border border-stone-150 rounded-xl px-4 py-3 max-w-sm">
                              <div className="space-y-1 w-full">
                                <div className="flex justify-between text-[10px] text-stone-500 font-bold">
                                  <span>{language === "en" ? "Stability Tested:" : language === "ko" ? "안정성 테스트 완료:" : "Đã test lâm sàng:"} <strong className="font-black text-stone-850">{selectedProductDetails.testedCount} {language === "en" ? "vials" : language === "ko" ? "회" : "mẫu"}</strong></span>
                                  <span className="text-emerald-green font-black">Hot {selectedProductDetails.hotPercent}%</span>
                                </div>
                                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-emerald-green h-full rounded-full" style={{ width: `${selectedProductDetails.hotPercent}%` }}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 border-y border-stone-150 py-4">
                            <div className="flex items-baseline gap-3">
                              <span className="text-xl sm:text-2xl font-serif font-black text-red-500">
                                {getProductPriceRange(selectedProductDetails, detailsQuantity)}
                              </span>
                              <span className="text-xs text-stone-500 font-bold">
                                / {detailsQuantity} {language === "en" ? "sample vials" : language === "ko" ? "개 샘플" : "mẫu thử tiêu chuẩn"}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-400 font-medium">
                              {language === "en" ? "* Standard sample vials are prepared in the R&D lab with high-potency concentrates." : language === "ko" ? "* 모든 샘플은 부자재를 매칭하여 고농축 원액 상태로 연구소에서 직접 포장해 드립니다." : "* Mẫu thử nghiệm được điều chế chất lượng cao chuẩn nồng độ hoạt chất lâm sàng thực tế."}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex border-b border-stone-200 text-xs">
                              {(["mô tả", "thành phần", "cảm quan"] as const).map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() => setActiveDetailsTab(tab)}
                                  className={`pb-3 px-4 font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                                    activeDetailsTab === tab
                                      ? "border-emerald-green text-emerald-green"
                                      : "border-transparent text-stone-400 hover:text-stone-700"
                                  }`}
                                >
                                  {tab === "mô tả" 
                                    ? (language === "en" ? "Formula Specs" : language === "ko" ? "샘플 처방 설명" : "Mô tả công thức") 
                                    : tab === "thành phần" 
                                      ? (language === "en" ? "Active Ingredients" : language === "ko" ? "핵심성분" : "Hoạt chất chính") 
                                      : (language === "en" ? "Sensory & Testing" : language === "ko" ? "성상 및 사용감" : "Cảm quan & Test")}
                                </button>
                              ))}
                            </div>

                            <div className="text-xs text-stone-600 leading-relaxed font-light bg-stone-50 p-5 rounded-2xl border border-stone-150 space-y-2 min-h-[120px]">
                              {activeDetailsTab === "mô tả" && (
                                <div className="space-y-2">
                                  <strong className="font-bold text-stone-850 block text-[11px] uppercase tracking-wider">
                                    {language === "en" ? "Formulation Specifications" : language === "ko" ? "포뮬러 규격 상세" : "Thông số công thức:"}
                                  </strong>
                                  <p className="leading-relaxed font-medium text-stone-600 whitespace-pre-line">{selectedProductDetails.description}</p>
                                </div>
                              )}
                              {activeDetailsTab === "thành phần" && (
                                <div className="space-y-2">
                                  <strong className="font-bold text-stone-850 block text-[11px] uppercase tracking-wider">
                                    {language === "en" ? "Key Cosmeceutical Actives" : language === "ko" ? "코스메슈티컬 핵심 활성 성분" : "Hoạt chất dược mỹ phẩm chính:"}
                                  </strong>
                                  <p className="leading-relaxed font-medium text-stone-600 whitespace-pre-line">{selectedProductDetails.ingredients}</p>
                                </div>
                              )}
                              {activeDetailsTab === "cảm quan" && (
                                <div className="space-y-2">
                                  <strong className="font-bold text-stone-850 block text-[11px] uppercase tracking-wider">
                                    {language === "en" ? "Lab Evaluation Guidelines" : language === "ko" ? "연구실 자체 사용감 감정 가이드" : "Hướng dẫn thẩm định tại phòng Lab:"}
                                  </strong>
                                  <p className="leading-relaxed font-medium text-stone-600 whitespace-pre-line">{selectedProductDetails.guidelines}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-stone-150">
                          <div className="flex items-center justify-between border border-stone-200 rounded-xl px-4 py-2.5 w-full sm:w-36 shrink-0 bg-stone-50">
                            <button 
                              onClick={() => setDetailsQuantity(prev => Math.max(1, prev - 1))}
                              className="text-stone-500 hover:text-stone-900 font-bold px-2 text-sm cursor-pointer select-none"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-stone-850">{detailsQuantity}</span>
                            <button 
                              onClick={() => setDetailsQuantity(prev => prev + 1)}
                              className="text-stone-500 hover:text-stone-900 font-bold px-2 text-sm cursor-pointer select-none"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              const isAdded = sampleCart.includes(selectedProductDetails.title);
                              isAdded ? handleRemoveFromSampleCart(selectedProductDetails.title) : handleAddToSampleCart(selectedProductDetails.title);
                            }}
                            className={`flex-1 font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                              sampleCart.includes(selectedProductDetails.title)
                                ? "bg-emerald-green hover:bg-emerald-green-dark text-white" 
                                : "bg-stone-900 hover:bg-stone-950 text-white"
                            }`}
                          >
                            <ShoppingBag className="w-4 h-4 text-white" />
                            {sampleCart.includes(selectedProductDetails.title)
                              ? (language === "en" ? "✓ Selected in Cart" : language === "ko" ? "✓ 카트에 선택됨" : "✓ Đã chọn mẫu thử")
                              : (language === "en" ? "Request Physics Samples" : language === "ko" ? "연구실 실물 샘플 신청" : "Yêu Cầu Mẫu Thử Nghiệm")
                            }
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Related Products block */}
                    {localizedProducts.filter(p => p.category === selectedProductDetails.category && p.id !== selectedProductDetails.id).length > 0 && (
                      <div className="space-y-6 pt-6">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 text-left border-b border-stone-200 pb-3">
                          {language === "en" ? "Suggested Formulas in This Category" : language === "ko" ? "동일 카테고리 추천 포뮬러" : "Các công thức cùng chuyên mục đề xuất"}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {localizedProducts
                            .filter(p => p.category === selectedProductDetails.category && p.id !== selectedProductDetails.id)
                            .slice(0, 3)
                            .map((prod) => (
                              <div 
                                key={prod.id}
                                onClick={() => handleSelectProduct(prod)}
                                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer text-left flex flex-col justify-between h-full group"
                              >
                                <div>
                                  <div className="h-40 overflow-hidden relative bg-stone-50 border-b border-stone-100">
                                    <img 
                                      src={prod.image} 
                                      alt={prod.title} 
                                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="p-4 space-y-1.5">
                                    <span className="text-[9px] font-black text-emerald-green uppercase tracking-wider block">{prod.lab}</span>
                                    <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-green transition-colors line-clamp-2 leading-snug">
                                      {prod.title}
                                    </h4>
                                  </div>
                                </div>

                                <div className="p-4 pt-0 flex justify-between items-center border-t border-stone-50 mt-2">
                                  <span className="text-xs font-bold text-red-500">{getProductPriceRange(prod)}</span>
                                  <span className="text-[10px] font-bold text-emerald-green hover:underline flex items-center gap-1">
                                    {language === "en" ? "View Specs" : language === "ko" ? "상세 보기" : "Xem chi tiết"}
                                    <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div id="manufacturing-directory-top" className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-stone-200 pb-6 gap-4">
                      <div className="text-left space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">
                          {language === "en" ? "MANUFACTURING DIRECTORY" : language === "ko" ? "생산 제품 디렉토리" : "DANH MỤC GIA CÔNG"}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 leading-none">
                          {language === "en" ? "Representative Cosmetic Formula Collection" : language === "ko" ? "대표 화장품 처방 포뮬러 컬렉션" : "Bộ Sưu Tập Công Thức Mỹ Phẩm Tiêu Biểu"}
                        </h1>
                      </div>
                      <div className="text-stone-500 text-xs font-medium bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                        {language === "en" ? "Showing:" : language === "ko" ? "표시 중:" : "Đang hiển thị:"} <strong className="font-bold text-stone-900">{sortedProducts.length} {language === "en" ? "sample formulas" : language === "ko" ? "개 샘플 포뮬러" : "công thức mẫu thử"}</strong>
                      </div>
                    </div>

                    {/* Skin Type Orientation Selection (Top bar as seen in screenshot) */}
                    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-2xs text-left space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-green/10 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-green" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-stone-800 tracking-wider uppercase">
                            {language === "en" ? "Target Skin Type Orientation" : language === "ko" ? "피부 타입별 개발 제안" : "Định hướng phát triển theo loại da"}
                          </h3>
                          <p className="text-[11px] text-stone-400 font-light mt-0.5">
                            {language === "en" ? "Click to filter formulas by target skin type to find the most suitable active solutions from our LAB." : language === "ko" ? "귀하의 타겟 피부 타입을 선택하시면 연구실에서 권장하는 가장 적합한 성분 처방을 매칭해 드립니다." : "Hãy click chọn nhanh định hướng tính chất da mục tiêu của bạn để tìm kiếm các hoạt chất điều chế đặc trị phù hợp nhất từ phòng LAB."}
                          </p>
                        </div>
                      </div>

                      {/* Horizontal Scroll / wrap tags */}
                      <div className="flex flex-wrap gap-2.5">
                        {localizedSkinTypes.map((skin) => (
                          <button
                            key={skin}
                            onClick={() => handleSelectSkinType(skin)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              selectedSkinType === skin
                                ? "bg-emerald-green text-white shadow-xs"
                                : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                            }`}
                          >
                            {skin}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Two-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Column: Filter Sidebar */}
                      <div className="lg:col-span-3 space-y-6">
                        
                        {/* BỘ LỌC TÌM KIẾM CONTAINER */}
                        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-2xs text-left space-y-6">
                          
                          {/* Filter Header with reset button */}
                          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                            <span className="text-xs font-bold text-stone-900 tracking-wider uppercase flex items-center gap-1.5">
                              <Filter className="w-3.5 h-3.5 text-emerald-green" />
                              {language === "en" ? "Search Filters" : language === "ko" ? "상세 조건 검색" : "Bộ lọc tìm kiếm"}
                            </span>
                            <button 
                              onClick={resetFilters}
                              className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              {language === "en" ? "Reset" : language === "ko" ? "필터 초기화" : "Đặt lại"}
                            </button>
                          </div>

                          {/* DANH MỤC SẢN PHẨM */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                              {language === "en" ? "Categories" : language === "ko" ? "제조 카테고리" : "Danh mục gia công"}
                            </span>
                            <div className="space-y-1.5">
                              <button
                                onClick={() => setSelectedCategory("all")}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  selectedCategory === "all" 
                                    ? "bg-emerald-green text-white shadow-xs" 
                                    : "text-stone-750 hover:bg-stone-50 border border-stone-100 bg-white"
                                }`}
                              >
                                <span>{language === "en" ? "All Formulas" : language === "ko" ? "전체 포뮬러 보기" : "Tất cả công thức"}</span>
                                <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                              </button>
                              {localizedCategories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => setSelectedCategory(cat.id)}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                    selectedCategory === cat.id 
                                      ? "bg-emerald-green text-white shadow-xs" 
                                      : "text-stone-750 hover:bg-stone-50 border border-stone-100 bg-white"
                                  }`}
                                >
                                  <span>{language === "vi" ? cat.title.replace("Gia công ", "") : cat.title}</span>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* PHÒNG LAB PHÁT TRIỂN */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                              {language === "en" ? "Development Lab" : language === "ko" ? "R&D 개발 연구실" : "Phòng Lab Phát Triển"}
                            </span>
                            <div className="space-y-2 text-xs text-stone-750 font-medium">
                              {["Cosbuilt LAB", "Organic Formula", "Premium Eco", "Advanced Clinical"].map((lab) => {
                                const isChecked = selectedLabs.includes(lab);
                                return (
                                  <label key={lab} className="flex items-center gap-2.5 cursor-pointer select-none py-0.5 hover:text-emerald-green transition-all">
                                    <input 
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleLabToggle(lab)}
                                      className="accent-emerald-green rounded border-stone-300 w-4 h-4 cursor-pointer"
                                      id={`lab-checkbox-${lab.toLowerCase().replace(/\s+/g, '-')}`}
                                    />
                                    <span>{lab}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* SẮP XẾP THEO GIÁ TRỊ */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                              {language === "en" ? "Sort By" : language === "ko" ? "정렬 기준" : "Sắp xếp theo giá trị"}
                            </span>
                            <div className="space-y-1.5">
                              {localizedSortOptions.map((sortOption) => (
                                <button
                                  key={sortOption}
                                  onClick={() => setSelectedSort(sortOption)}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    selectedSort === sortOption
                                      ? "bg-emerald-green/5 text-emerald-green border border-emerald-green/20 font-bold"
                                      : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200 font-medium"
                                  }`}
                                >
                                  {sortOption}
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* QUICK CONTACT OEMs BANNER (as seen in screenshot) */}
                        <div className="bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 text-left space-y-4 relative overflow-hidden">
                          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-green/10 rounded-full blur-2xl"></div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-emerald-green-light uppercase tracking-widest block">Hotline 24/7</span>
                            <h4 className="font-serif font-bold text-base text-white">
                              {language === "en" ? "Quick OEM consultation?" : language === "ko" ? "빠른 OEM 상담원하시나요?" : "Tư vấn OEM nhanh?"}
                            </h4>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                            {language === "en" ? "Contact our 24/7 Hotline for expert guidance from our R&D biochemists." : language === "ko" ? "코스빌트 바이오케미스트 석사 전문 연구원의 24/7 상담 핫라인으로 직접 연결됩니다." : "Hãy liên hệ Hotline 24/7 để nhận tư vấn từ thạc sĩ công nghệ hóa sinh Cosbuilt."}
                          </p>
                          <a 
                            href="tel:0966373686"
                            className="block w-full text-center bg-emerald-green hover:bg-emerald-green-dark text-white font-mono font-bold text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer"
                          >
                            Call: 0966 373 686
                          </a>
                        </div>

                      </div>

                      {/* Right Column: Interactive Product Grid */}
                      <div className="lg:col-span-9 space-y-8">
                        
                        {/* Category Intro banner description if selected */}
                    {selectedCategory === "all" ? (
                      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 text-left space-y-2">
                        <span className="text-[10px] font-bold text-emerald-green uppercase tracking-wider block">
                          {language === "en" ? "Specialized R&D Lab" : language === "ko" ? "전문 R&D 연구실" : "Phòng Lab R&D Chuyên Biệt"}
                        </span>
                        <h2 className="text-xl font-serif font-bold text-stone-900">
                          {language === "en" ? "All Featured Formulas" : language === "ko" ? "전체 대표 포뮬러" : "Tất Cả Công Thức Nổi Bật"}
                        </h2>
                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                          {language === "en" ? "Compilation of all typical cosmetic formulas exclusively researched and developed by Cosbuilt's modern Lab system." : language === "ko" ? "코스빌트의 첨단 연구실 시스템을 통해 독자적으로 연구 개발된 핵심 화장품 처방 기술의 요약본입니다." : "Tổng hợp toàn bộ các công thức mỹ phẩm tiêu biểu được nghiên cứu độc quyền và phát triển bởi hệ thống phòng Lab hiện đại của Cosbuild."}
                        </p>
                      </div>
                    ) : selectedCatDetails ? (
                      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 text-left space-y-2">
                        <span className="text-[10px] font-bold text-emerald-green uppercase tracking-wider block">
                          {language === "en" ? "Specialized R&D Lab" : language === "ko" ? "전문 R&D 연구실" : "Phòng Lab R&D Chuyên Biệt"}
                        </span>
                        <h2 className="text-xl font-serif font-bold text-stone-900">{selectedCatDetails.title}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">{selectedCatDetails.description}</p>
                      </div>
                    ) : null}

                    {(() => {
                      const itemsPerPage = 6;
                      const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
                      const activePage = Math.min(currentPage, Math.max(1, totalPages));
                      const paginatedProducts = sortedProducts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                      return sortedProducts.length > 0 ? (
                        <div className="space-y-8 animate-in fade-in duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedProducts.map((prod) => {
                              const isAdded = sampleCart.includes(prod.title);
                              return (
                                <div 
                                  key={prod.id}
                                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between h-full"
                                >
                                  {/* Top Part: Image, Badges, Hover trigger */}
                                  <div>
                                    <div className="h-52 relative overflow-hidden bg-stone-50 border-b border-stone-100">
                                      {/* Highlight tag/badge */}
                                      <div className="absolute top-3 left-0 bg-stone-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-r-md z-10 uppercase tracking-widest">
                                        {prod.badge}
                                      </div>

                                      <img 
                                        src={prod.image} 
                                        alt={prod.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                        referrerPolicy="no-referrer"
                                      />

                                      {/* Hover Actions (circular overlay buttons matching screenshot) */}
                                      <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                        <button 
                                          onClick={() => handleSelectProduct(prod)}
                                          className="w-11 h-11 rounded-full bg-emerald-green hover:bg-emerald-green-dark text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                          title={language === "en" ? "Quick view" : language === "ko" ? "상세 보기" : "Xem nhanh chi tiết"}
                                        >
                                          <Eye className="w-5 h-5 text-white" />
                                        </button>
                                        <button 
                                          onClick={() => handleAddToSampleCart(prod.title)}
                                          className="w-11 h-11 rounded-full bg-stone-900 hover:bg-stone-950 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                          title={language === "en" ? "Request sample" : language === "ko" ? "샘플 요청" : "Yêu cầu mẫu thử"}
                                        >
                                          <ShoppingBag className="w-5 h-5 text-white" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Content Part */}
                                    <div className="p-5 text-left space-y-2.5">
                                      {/* Stars rating */}
                                      <div className="flex items-center gap-1 text-amber-400">
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                          ))}
                                        </div>
                                        <span className="text-[10px] text-stone-400 font-bold">({prod.reviewsCount})</span>
                                      </div>

                                      {/* Lab tag */}
                                      <span className="text-[9px] font-black text-emerald-green tracking-widest uppercase block">
                                        {prod.lab}
                                      </span>

                                      {/* Title */}
                                      <h3 
                                        onClick={() => handleSelectProduct(prod)}
                                        className="font-serif font-bold text-xs sm:text-sm text-stone-900 hover:text-emerald-green transition-colors line-clamp-2 h-10 leading-tight cursor-pointer"
                                      >
                                        {prod.title}
                                      </h3>

                                      {/* Pricing */}
                                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                                        <span className="text-sm font-bold text-red-500">{getProductPriceRange(prod)}</span>
                                      </div>

                                      {/* Progress bar matching screenshots exactly */}
                                      <div className="space-y-1 pt-1.5 border-t border-stone-50">
                                        <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                                          <span>{language === "en" ? "Tested:" : language === "ko" ? "테스트 완료:" : "Đã test:"} <strong className="font-bold text-stone-800">{prod.testedCount} {language === "en" ? "samples" : language === "ko" ? "샘플" : "mẫu"}</strong></span>
                                          <span className="text-emerald-green font-bold">Hot {prod.hotPercent}%</span>
                                        </div>
                                        <div className="w-full bg-stone-150 h-1.5 rounded-full overflow-hidden">
                                          <div 
                                            className="bg-emerald-green h-full rounded-full"
                                            style={{ width: `${prod.hotPercent}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Bottom Action Button */}
                                  <div className="p-5 pt-0">
                                    <button
                                      onClick={() => isAdded ? handleRemoveFromSampleCart(prod.title) : handleAddToSampleCart(prod.title)}
                                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                                        isAdded 
                                          ? "bg-emerald-green text-white hover:bg-emerald-green-dark" 
                                          : "bg-stone-900 text-white hover:bg-stone-950"
                                      }`}
                                    >
                                      <ShoppingBag className="w-3.5 h-3.5 text-white" />
                                      {isAdded ? (language === "en" ? "✓ Sample selected" : language === "ko" ? "✓ 샘플 선택됨" : "✓ Đã chọn mẫu thử") : (language === "en" ? "Request sample" : language === "ko" ? "샘플 요청" : "Yêu cầu mẫu thử")}
                                    </button>
                                  </div>

                                </div>
                              );
                            })}
                          </div>

                          {/* Beautiful Pagination Controls */}
                          {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 pt-6 pb-2 border-t border-stone-100 mt-10">
                              <button
                                onClick={() => {
                                  setCurrentPage(prev => Math.max(1, prev - 1));
                                  const catalogTop = document.getElementById("manufacturing-directory-top");
                                  if (catalogTop) {
                                    catalogTop.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                disabled={activePage === 1}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                                  activePage === 1
                                    ? "text-stone-300 border-stone-200 cursor-not-allowed bg-stone-50"
                                    : "text-stone-700 border-stone-250 hover:border-stone-400 hover:bg-stone-50"
                                }`}
                              >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                  {language === "en" ? "Previous" : language === "ko" ? "이전" : "Trang trước"}
                                </span>
                              </button>

                              <div className="flex items-center gap-1.5">
                                {[...Array(totalPages)].map((_, idx) => {
                                  const pageNum = idx + 1;
                                  const isActive = activePage === pageNum;
                                  return (
                                    <button
                                      key={pageNum}
                                      onClick={() => {
                                        setCurrentPage(pageNum);
                                        const catalogTop = document.getElementById("manufacturing-directory-top");
                                        if (catalogTop) {
                                          catalogTop.scrollIntoView({ behavior: "smooth" });
                                        }
                                      }}
                                      className={`w-10 h-10 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center border ${
                                        isActive
                                          ? "bg-emerald-green text-white border-emerald-green shadow-sm font-black"
                                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                      }`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                })}
                              </div>

                              <button
                                onClick={() => {
                                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                  const catalogTop = document.getElementById("manufacturing-directory-top");
                                  if (catalogTop) {
                                    catalogTop.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                disabled={activePage === totalPages}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                                  activePage === totalPages
                                    ? "text-stone-300 border-stone-200 cursor-not-allowed bg-stone-50"
                                    : "text-stone-700 border-stone-250 hover:border-stone-400 hover:bg-stone-50"
                                }`}
                              >
                                <span className="hidden sm:inline">
                                  {language === "en" ? "Next" : language === "ko" ? "다음" : "Trang sau"}
                                </span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl border border-stone-200 p-16 text-center text-stone-400 font-light space-y-3">
                          <Info className="w-10 h-10 text-stone-300 mx-auto" />
                          <h3 className="font-bold text-stone-800 text-sm">
                            {language === "en" ? "No matching samples found" : language === "ko" ? "일치하는 샘플이 없습니다" : "Không tìm thấy mẫu thử phù hợp"}
                          </h3>
                          <p className="text-xs max-w-xs mx-auto leading-relaxed">
                            {language === "en" ? "Try resetting the Lab filter or selecting a different skin orientation to view more formulations." : language === "ko" ? "연구실 필터를 해제하거나 다른 피부 타입을 선택하여 코스빌트의 다양한 포뮬러를 만나보세요." : "Hãy thử xóa bộ lọc phòng Lab hoặc click chọn định hướng da khác để thấy thêm nhiều công thức mỹ phẩm tuyệt vời."}
                          </p>
                        </div>
                      );
                    })()}

                  </div>

                </div>



                  </>
                )}
              </motion.div>
            );
          })()}

          {/* BẢNG GIÁ GIA CÔNG / PRICING LIST */}
          {activeTab === "pricing" && (() => {
            // New High-Fidelity Estimator Pricing Calculations
            const activeProduct = PRODUCT_LINES_DATA[estGroup]?.find(p => p.name === estProductLine) || { name: estProductLine, basePrice: 6500 };
            
            // Calculate quantity discount multiplier
            let liquidDiscount = 0;
            if (estQty >= 10000) liquidDiscount = 0.25;
            else if (estQty >= 5000) liquidDiscount = 0.15;
            else if (estQty > 1000) {
              // Linearly interpolate between 0% and 15%
              liquidDiscount = 0 + ((estQty - 1000) / 4000) * 0.15;
            }
            const liquidDiscountMultiplier = 1 - liquidDiscount;
            const liquidPricePerUnit = Math.round(activeProduct.basePrice * liquidDiscountMultiplier);

            // Packaging prices
            const rawPackPrice = estPackagingType === "standard" ? 3500 : estPackagingType === "glass" ? 6500 : 10000;
            const packagingDiscountMultiplier = 1 - ((estQty - 1000) / 9000) * 0.2;
            const packPricePerUnit = Math.round(rawPackPrice * packagingDiscountMultiplier);

            // Legal services
            const legalCost = estLegalService === "none" ? 0 : estLegalService === "standard" ? 4500000 : 8500000;

            // Itemized costs
            const liquidTotalCost = liquidPricePerUnit * estQty;
            const packagingTotalCost = packPricePerUnit * estQty;
            const totalInvestment = liquidTotalCost + packagingTotalCost + legalCost;
            const unitPriceCompleted = Math.round(totalInvestment / estQty);

            const localizedEstGroup = (group: string) => {
              if (language === "en") {
                if (group === "Da Mặt") return "Facial Care";
                if (group === "Body") return "Body Care";
                if (group === "Chăm Tóc") return "Hair Care";
                if (group === "Trang Điểm") return "Makeup";
                if (group === "Cá Nhân") return "Personal Care";
              } else if (language === "ko") {
                if (group === "Da Mặt") return "페이스 케어";
                if (group === "Body") return "바디 케어";
                if (group === "Chăm Tóc") return "헤어 케어";
                if (group === "Trang Điểm") return "색조 메이크업";
                if (group === "Cá Nhân") return "퍼스널 케어";
              }
              return group;
            };

            const localizedProductLineName = (name: string) => {
              if (language === "en") {
                if (name === "Serum B5 HA Phục Hồi Đa Tầng") return "B5 HA Multi-Layer Recovery Serum";
                if (name === "Kem Dưỡng Trắng Da Mờ Thâm Niacinamide") return "Niacinamide Whitening & Spot Cream";
                if (name === "Sữa Rửa Mặt Tạo Bọt Dịu Nhẹ") return "Gentle Foaming Facial Cleanser";
                if (name === "Kem Chống Nắng Vật Lý Phổ Rộng") return "Broad-Spectrum Physical Sunscreen";
                if (name === "Nước Tẩy Trang Sạch Sâu") return "Deep-Cleansing Micellar Water";
                if (name === "Sữa Tắm Truyền Trắng Body Hương Nước Hoa") return "Perfumed Whitening Body Wash";
                if (name === "Tẩy Tế Bào Chết Hạt Cà Phê Đăk Lăk Mịn Da") return "Dak Lak Coffee Body Scrub";
                if (name === "Kem Body Mềm Trắng Da Toàn Thân") return "Soft Whitening Body Lotion";
                if (name === "Dầu Gội Bưởi Đậm Đặc Ngăn Rụng & Kích Mọc Tóc") return "Thick Grapefruit Anti-Hair Loss Shampoo";
                if (name === "Kem Xả Tóc Tinh Dầu Bưởi Phục Hồi Tóc Hư Tổn") return "Grapefruit Essential Oil Hair Conditioner";
                if (name === "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi") return "Velvet Lip Tint Ultra-Smooth Lipstick";
                if (name === "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu") return "Perfect Coverage Oil-Control Cushion";
                if (name === "Dung Dịch Vệ Sinh Trầu Không Dịu Nhẹ Kháng Khuẩn") return "Gentle Antibacterial Intimate Wash";
                if (name === "Lăn Khử Mùi Thảo Mộc Khô Thoáng") return "Herbal Deodorant Roll-on";
              } else if (language === "ko") {
                if (name === "Serum B5 HA Phục Hồi Đa Tầng") return "B5 HA 다중 회복 세럼";
                if (name === "Kem Dưỡng Trắng Da Mờ Thâm Niacinamide") return "나이아신아마이드 미백 크림";
                if (name === "Sữa Rửa Mặt Tạo Bọt Dịu Nhẹ") return "마일드 버블 폼 클렌저";
                if (name === "Kem Chống Nắng Vật Lý Phổ Rộng") return "광범위 무기 자외선 차단제";
                if (name === "Nước Tẩy Trang Sạch Sâu") return "딥 클렌징 미셀러 워터";
                if (name === "Sữa Tắm Truyền Trắng Body Hương Nước Hoa") return "퍼퓸 미백 바디워시";
                if (name === "Tẩy Tế Bào Chết Hạt Cà Phê Đăk Lăk Mịn Da") return "커피 바디 스크럽";
                if (name === "Kem Body Mềm Trắng Da Toàn Thân") return "소프트 바디 미백 로션";
                if (name === "Dầu Gội Bưởi Đậm Đặc Ngăn Rụng & Kích Mọc Tóc") return "고농축 자몽 샴푸 탈모 완화";
                if (name === "Kem Xả Tóc Tinh Dầu Bưởi Phục Hồi Tóc Hư Tổn") return "자몽 에센셜 헤어 컨디셔너";
                if (name === "Son Kem Lì Velvet Lip Tint Siêu Mịn Môi") return "벨벳 매트 립 틴트";
                if (name === "Phấn Nước Cushion Che Phủ Hoàn Hảo & Kiềm Dầu") return "퍼펙트 오일 컨트롤 쿠션";
                if (name === "Dung Dịch Vệ Sinh Trầu Không Dịu Nhẹ Kháng Khuẩn") return "허브 여성 청결제 항균 완화";
                if (name === "Lăn Khử Mùi Thảo Mộc Khô Thoáng") return "데오드란트 데일리 롤온";
              }
              return name;
            };

            return (
              <motion.div
                key="pricing-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
              >
                {/* Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-green">
                    {language === "en" ? "MANUFACTURING INVESTMENT PRICING" : language === "ko" ? "화장품 제조 위탁 투자 단가표" : "BẢNG GIÁ ĐẦU TƯ GIA CÔNG"}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                    {language === "en" ? "Estimate your cGMP Cosmetics Manufacturing Budget" : language === "ko" ? "cGMP 화장품 우수 제조 생산 예산 견적" : "Ước Tính Ngân Sách Gia Công Mỹ Phẩm cGMP"}
                  </h1>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
                    {language === "en" ? "Tools supporting brands to quickly calculate complete start-up budgets. Adjust quantity and choose packaging specs to optimize your investment." : language === "ko" ? "신규 브랜드가 완제품 인도 기준 초기 예산을 직접 시뮬레이션할 수 있는 스마트 견적기입니다. 수량 및 용기 사양을 자유롭게 조절해 보세요." : "Công cụ hỗ trợ các nhãn hàng tính toán nhanh ngân sách khởi nghiệp hũ/chai mỹ phẩm trọn gói. Điều chỉnh số lượng và lựa chọn quy cách bao bì để tối ưu hóa đầu tư."}
                  </p>
                </div>

                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Controls */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-xs text-left">
                    <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
                      <Calculator className="w-5 h-5 text-emerald-green shrink-0" />
                      <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                        {language === "en" ? "PRODUCT SPECIFICATION CONFIGURATOR" : language === "ko" ? "제조 의뢰 품목 및 상세 조건 구성" : "CẤU HÌNH THÔNG SỐ SẢN PHẨM"}
                      </h2>
                    </div>

                    {/* Section 1: NHÓM MỸ PHẨM GIA CÔNG */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        {language === "en" ? "1. COSMETIC PRODUCT GROUP" : language === "ko" ? "1. 위탁 제조 화장품 대분류" : "1. NHÓM MỸ PHẨM GIA CÔNG"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {["Da Mặt", "Body", "Chăm Tóc", "Trang Điểm", "Cá Nhân"].map((group) => {
                          const isActive = estGroup === group;
                          return (
                            <button
                              key={group}
                              onClick={() => setEstGroup(group)}
                              className={`py-3.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                                isActive 
                                  ? "bg-emerald-green border-emerald-green text-white shadow-md shadow-emerald-green/10" 
                                  : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700 font-semibold"
                              }`}
                            >
                              {localizedEstGroup(group)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2: DÒNG SẢN PHẨM ĐẶC THÙ */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        {language === "en" ? "2. SPECIFIC PRODUCT FORMULA LINE" : language === "ko" ? "2. 대표 시그니처 세부 제형 선택" : "2. DÒNG SẢN PHẨM ĐẶC THÙ"}
                      </label>
                      <div className="relative">
                        <select
                          value={estProductLine}
                          onChange={(e) => setEstProductLine(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-green focus:border-emerald-green transition-all cursor-pointer font-bold text-stone-800 appearance-none pr-10"
                        >
                          {(PRODUCT_LINES_DATA[estGroup] || []).map((prod) => (
                            <option key={prod.name} value={prod.name}>
                              {localizedProductLineName(prod.name)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-stone-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: QUY CÁCH VỎ CHAI LỌ & HŨ MỸ PHẨM */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        {language === "en" ? "3. BOTTLE & JAR PACKAGING SPECIFICATIONS" : language === "ko" ? "3. 용기 부자재 및 포장재 사양 선택" : "3. QUY CÁCH VỎ CHAI LỌ & HŨ MỸ PHẨM"}
                      </label>
                      <div className="space-y-3">
                        {[
                          { 
                            id: "standard", 
                            name: language === "en" ? "Standard PET Squeeze Tube / Bottle" : language === "ko" ? "기본 친환경 PET 용기 및 튜브" : "Hũ/Chai Nhựa PET Tiêu Chuẩn", 
                            desc: language === "en" ? "~3,500đ / unit" : language === "ko" ? "~3,500원 / 개" : "~3.500đ / vỏ" 
                          },
                          { 
                            id: "glass", 
                            name: language === "en" ? "Premium Frosted Glass Bottle with Gold/Silver Lid" : language === "ko" ? "고급 반투명 글라스 스포이드 용기 (골드/실버 캡)" : "Chai Thủy Tinh Mờ Nắp Mạ Vàng Cao Cấp", 
                            desc: language === "en" ? "~6,500đ / unit" : language === "ko" ? "~6,500원 / 개" : "~6.500đ / vỏ" 
                          },
                          { 
                            id: "acrylic", 
                            name: language === "en" ? "Unique Imported Double-Layer Acrylic Jar" : language === "ko" ? "수입 명품 이중 아크릴 크림 단지" : "Vỏ Acrylic Nhập Khẩu Độc Đáo", 
                            desc: language === "en" ? "~10,000đ / unit" : language === "ko" ? "~10,000원 / 개" : "~10.000đ / vỏ" 
                          }
                        ].map((pack) => {
                          const isActive = estPackagingType === pack.id;
                          return (
                            <div
                              key={pack.id}
                              onClick={() => setEstPackagingType(pack.id)}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isActive 
                                  ? "border-emerald-green bg-emerald-green-light text-emerald-green" 
                                  : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                                  isActive ? "border-emerald-green bg-emerald-green text-white" : "border-stone-300 bg-white"
                                }`}>
                                  {isActive && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-xs font-bold ${isActive ? "text-emerald-green" : "text-stone-800"}`}>
                                  {pack.name}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-stone-500">
                                {pack.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 4: SỐ LƯỢNG GIA CÔNG (MOQ) */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-stone-500 tracking-wider uppercase">
                          {language === "en" ? "4. MINIMUM ORDER QUANTITY (MOQ)" : language === "ko" ? "4. 위탁 생산 희망 수량 (MOQ)" : "4. SỐ LƯỢNG GIA CÔNG (MOQ)"}
                        </label>
                        <span className="text-xs font-mono font-black text-emerald-green">
                          {estQty.toLocaleString("vi-VN")} {language === "en" ? "pcs" : language === "ko" ? "개" : "chai/hũ"}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="1000"
                          max="10000"
                          step="1000"
                          value={estQty}
                          onChange={(e) => setEstQty(Number(e.target.value))}
                          className="w-full accent-emerald-green h-2 bg-stone-150 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-stone-400 font-bold font-mono">
                          <span>{language === "en" ? "1,000 (TEST LEVEL)" : language === "ko" ? "1,000 (시장테스트)" : "1.000 (MỨC THỬ NGHIỆM)"}</span>
                          <span>{language === "en" ? "5,000 (15% OFF)" : language === "ko" ? "5,000 (15% 특별할인)" : "5.000 (CHIẾT KHẤU 15%)"}</span>
                          <span>{language === "en" ? "10,000 (WHOLESALE -25%)" : language === "ko" ? "10,000 (도매최대 -25%)" : "10.000 (SỈ KỊCH SÀN -25%)"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: DỊCH VỤ PHÁP LÝ CÔNG BỐ SỞ Y TẾ */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        {language === "en" ? "5. MOH REGULATORY & COSMETIC NOTIFICATION" : language === "ko" ? "5. 보건부(MOH) 행정 인허가 및 서류 패키지" : "5. DỊCH VỤ PHÁP LÝ CÔNG BỐ SỞ Y TẾ"}
                      </label>
                      <div className="space-y-3">
                        {[
                          { 
                            id: "none", 
                            name: language === "en" ? "Not required (Buyer self-handles legal compliance)" : language === "ko" ? "직접 진행 (바이어가 수입/유통 서류 직접 조율)" : "Không cần (Khách hàng tự lo pháp lý)", 
                            desc: language === "en" ? "Free" : language === "ko" ? "무료" : "Miễn phí" 
                          },
                          { 
                            id: "standard", 
                            name: language === "en" ? "Full MOH Notification Dossier (Recommended)" : language === "ko" ? "보건부(MOH) 화장 phẩm 신고 수리 및 대행 (적극 권장)" : "Công bố Sở Y Tế trọn gói (Khuyên dùng)", 
                            desc: "+4.500.000đ" 
                          },
                          { 
                            id: "full", 
                            name: language === "en" ? "Full-Bundle: Pasteur Test + MOH Approval + Barcode + Anti-Counterfeit" : language === "ko" ? "토탈 패키지: 임상 안전 시험 + 보건부 승인 + 국가 바코드 + 정품 스티커" : "Trọn gói: Pasteur Test + Công Bố + Mã vạch + Tem chống giả", 
                            desc: "+8.500.000đ" 
                          }
                        ].map((service) => {
                          const isActive = estLegalService === service.id;
                          return (
                            <div
                              key={service.id}
                              onClick={() => setEstLegalService(service.id)}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isActive 
                                  ? "border-emerald-green bg-emerald-green-light text-emerald-green" 
                                  : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                                  isActive ? "border-emerald-green bg-emerald-green text-white" : "border-stone-300 bg-white"
                                }`}>
                                  {isActive && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-xs font-bold ${isActive ? "text-emerald-green" : "text-stone-800"}`}>
                                  {service.name}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-stone-500">
                                {service.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Dynamic Estimate Display (No Form) */}
                  <div className="lg:col-span-5 h-full">
                    <div id="investment-report" className="bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 text-left flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-green font-black uppercase tracking-widest block">
                            {language === "en" ? "BUDGET ESTIMATE" : language === "ko" ? "제조 원가 가도면" : "DỰ THẢO NGÂN SÁCH"}
                          </span>
                          <h3 className="text-xl font-serif font-black text-white leading-tight">
                            {language === "en" ? "COMPLETE ESTIMATED INVESTMENT" : language === "ko" ? "총 위탁 생산 예산안" : "ƯỚC TÍNH CHI PHÍ TRỌN GÓI"}
                          </h3>
                        </div>

                        {/* Unit Price Nested Card */}
                        <div className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-5 text-center space-y-2">
                          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">
                            {language === "en" ? "ESTIMATED UNIT PRICE (PER COMPLETED PRODUCT)" : language === "ko" ? "예상 개당 완제품 단가 (벌크 및 용기 포함)" : "ĐƠN GIÁ DỰ KIẾN (MỖI SẢN PHẨM HOÀN THIỆN)"}
                          </span>
                          <div className="text-3xl font-black text-emerald-green">
                            {unitPriceCompleted.toLocaleString("vi-VN")} <span className="text-sm font-bold text-stone-300">
                              {language === "en" ? "VND / pcs" : language === "ko" ? "VND / 개" : "VNĐ / chai"}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-500 font-medium leading-normal italic">
                            {language === "en" 
                              ? "(Includes: Liquid bulk + Premium bottle + Graphic design + Finished label printing)" 
                              : language === "ko" 
                                ? "(포함 범위: 충진 내용물 벌크액 + 고급 용기 부자재 + 무료 디자인 시안 + 완포장 임가공 공정)" 
                                : "(Đã bao gồm: Dung dịch bên trong + Chai lọ cao cấp + Thiết kế tem nhãn + In ấn hoàn thiện)"}
                          </p>
                        </div>

                        {/* Line Item details */}
                        <div className="space-y-3.5 pt-4 border-t border-dashed border-stone-800 text-xs">
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">
                              {language === "en" ? "1. Formula Bulk & Liquid Cost:" : language === "ko" ? "1. 제형 처방 액티브 내용물 비용:" : "1. Chi phí nguyên liệu dung dịch:"}
                            </span>
                            <span className="font-mono font-bold text-white">
                              {liquidTotalCost.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">
                              {language === "en" ? "2. Bottle / Jar Packaging Cost:" : language === "ko" ? "2. 용기 부자재 수량별 단가:" : "2. Chi phí hũ hột vỏ chai lọ:"}
                            </span>
                            <span className="font-mono font-bold text-white">
                              {packagingTotalCost.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">
                              {language === "en" ? "3. Brand Identity & Pack Design:" : language === "ko" ? "3. 브랜드 로고 및 단상자 디자인:" : "3. Thiết kế hũ hộp, mã vạch, logo:"}
                            </span>
                            <span className="font-bold text-emerald-green uppercase text-[10px] tracking-wider">
                              {language === "en" ? "100% FREE" : language === "ko" ? "100% 전액무료" : "MIỄN PHÍ 100%"}
                            </span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">
                              {language === "en" ? "4. Assay Testing & Legal MOH Approval:" : language === "ko" ? "4. 안전성 시험 및 식약처 보건부 인허가:" : "4. Phí kiểm nghiệm, pháp lý công bố:"}
                            </span>
                            <span className="font-mono font-bold text-white">
                              {legalCost > 0 
                                ? `${legalCost.toLocaleString("vi-VN")}đ` 
                                : (language === "en" ? "Free" : language === "ko" ? "무료" : "Miễn phí")}
                            </span>
                          </div>
                        </div>

                        {/* Grand Total */}
                        <div className="pt-5 border-t border-stone-800 space-y-1">
                          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                            {language === "en" ? "ESTIMATED TOTAL INVESTMENT:" : language === "ko" ? "총 투자 예상 금액:" : "TỔNG ĐẦU TƯ DỰ KIẾN:"}
                          </span>
                          <p className="text-[10px] text-stone-500 font-light block mb-2">
                            {language === "en" ? "(Complete startup under cGMP standards)" : language === "ko" ? "(cGMP 아세안 기준 스타트업 토탈 패키지)" : "(Khởi nghiệp trọn gói đạt cGMP)"}
                          </p>
                          <div className="text-3xl font-black text-emerald-green">
                            {totalInvestment.toLocaleString("vi-VN")} <span className="text-sm font-bold">đ</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3 pt-6 border-t border-stone-800">
                        <button
                          onClick={() => {
                            const packText = estPackagingType === "standard" 
                              ? (language === "en" ? "Standard PE/PET" : language === "ko" ? "표준 PE/PET" : "PE/PET") 
                              : estPackagingType === "glass" 
                                ? (language === "en" ? "Frosted Glass" : language === "ko" ? "무광 유리" : "Thủy tinh mờ") 
                                : (language === "en" ? "Acrylic" : language === "ko" ? "아크릴 단지" : "Acrylic");
                            const sampleName = language === "en"
                              ? `${localizedProductLineName(estProductLine)} (Custom formulation - Batch: ${estQty.toLocaleString("vi-VN")} pcs, Pkg: ${packText})`
                              : language === "ko"
                                ? `${localizedProductLineName(estProductLine)} (맞춤형 포뮬라 - 수량: ${estQty.toLocaleString("vi-VN")}개, 용기: ${packText})`
                                : `${estProductLine} (Dự toán riêng - Lô: ${estQty.toLocaleString("vi-VN")} sp, Vỏ: ${packText})`;
                            handleAddToSampleCart(sampleName);
                          }}
                          className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-4 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <ShoppingBag className="w-4 h-4 text-white" />
                          {language === "en" ? "Request Physical Sample Now" : language === "ko" ? "실물 규격 샘플 의뢰하기" : "Đặt Mẫu Thử Nghiệm Ngay"}
                        </button>
                        <button
                          onClick={() => {
                            window.print();
                          }}
                          className="w-full bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          {language === "en" ? "Print Investment Report" : language === "ko" ? "투자 견적서 인쇄" : "In Bảng Dự Toán"}
                        </button>
                      </div>

                      <p className="text-[10px] text-stone-500 text-center leading-relaxed">
                        {language === "en" 
                          ? "⚠ This is a budget calculation tool for general investment planning. Official quotations will be finalized after you test and approve the formulation samples and specify outer box packaging design." 
                          : language === "ko" 
                            ? "⚠ 본 가견적은 화장품 창업 가이드라인 제공용이며, 정식 견적은 실물 샘플 품평 및 패키징 세부 사양 확정 후 당사 영업팀에서 정식 발송해 드립니다." 
                            : "⚠ Báo giá mang tính chất tham khảo dự thảo đầu tư. Đơn giá chính thức sẽ được Cosbuilt phê duyệt sau khi khách hàng test chất kem mẫu thử ưng ý và xác định quy cách đóng hộp tem chống giả."}
                      </p>
                    </div>
                  </div>

                </div>

                {/* FILTERABLE STANDARD PRICE SHEET TABLE */}
                <div className="space-y-6 pt-8 border-t border-stone-200">
                  <div className="text-left space-y-2">
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      {language === "en" ? "Reference Pricing Sheet for All Product Categories" : language === "ko" ? "모든 카테고리 상세 대표 단가표" : "Bảng giá tham khảo chi tiết mọi danh mục sản phẩm"}
                    </h3>
                    <p className="text-stone-500 text-xs font-light">
                      {language === "en" ? "Search or filter by keyword to find standard Minimum Order Quantities (MOQ)." : language === "ko" ? "검색어를 통해 품목별 필요한 기본 MOQ 요건을 확인해 보세요." : "Lọc nhanh theo từ khóa để tìm kiếm mức MOQ thô tiêu chuẩn."}
                    </p>
                  </div>

                  {/* Filtering Search Bar */}
                  <div className="flex bg-white border border-stone-200 rounded-2xl p-3 shadow-2xs items-center gap-3 max-w-lg text-left">
                    <Search className="w-5 h-5 text-stone-400 shrink-0 ml-1" />
                    <input 
                      type="text" 
                      placeholder={language === "en" ? "Quick filter cosmetic lines (e.g. serum, cream...)" : language === "ko" ? "품목명 검색 (예: 세럼, 크림...)" : "Lọc nhanh dòng mỹ phẩm (ví dụ: serum, kem...)"}
                      value={priceSearch}
                      onChange={(e) => setPriceSearch(e.target.value)}
                      className="w-full bg-transparent text-xs text-stone-800 focus:outline-none placeholder-stone-400"
                    />
                  </div>

                  {/* Desktop pricing Table */}
                  <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-stone-950 text-white font-bold uppercase tracking-wider border-b border-stone-800">
                            <th className="py-4.5 px-6 font-bold text-satin-gold">
                              {language === "en" ? "Cosmetic Formulation Category" : language === "ko" ? "화장품 제조 위탁 품목" : "Danh mục mỹ phẩm gia công"}
                            </th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">
                              {language === "en" ? "Minimum Order Quantity (MOQ)" : language === "ko" ? "최소 생산 수량 (MOQ)" : "Sản lượng tối thiểu (MOQ)"}
                            </th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">
                              {language === "en" ? "Est. Reference Price / pcs" : language === "ko" ? "참고용 개당 단가" : "Giá thành tham khảo / sản phẩm"}
                            </th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">
                              {language === "en" ? "Packaging Standard Specification" : language === "ko" ? "기본 충진/용기 규격" : "Quy chuẩn đóng gói"}
                            </th>
                            <th className="py-4.5 px-6 font-bold text-center text-satin-gold">
                              {language === "en" ? "Production Timeframe" : language === "ko" ? "최종 생산 리드타임" : "Thời gian hoàn thành"}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-medium text-left">
                          {filteredPricingList.length > 0 ? (
                            filteredPricingList.map((item, idx) => (
                              <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                                <td className="py-4 px-6 font-bold text-stone-900">{item.productType}</td>
                                <td className="py-4 px-6 text-stone-600">{item.minOrder}</td>
                                <td className="py-4 px-6 text-emerald-green font-bold font-mono text-[13px]">{item.priceRange}</td>
                                <td className="py-4 px-6 text-stone-500 font-light">{item.unit}</td>
                                <td className="py-4 px-6 text-stone-700 text-center">{item.timeframe}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-8 px-6 text-center text-stone-400 font-light">
                                {language === "en" 
                                  ? "No matching records found. Please try another keyword or contact us directly." 
                                  : language === "ko" 
                                    ? "일치하는 데이터가 없습니다. 다른 단어로 검색하거나 직접 당사 팀에 문의해 주세요." 
                                    : "Không tìm thấy dữ liệu trùng khớp. Vui lòng nhập từ khóa khác hoặc liên hệ trực tiếp."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Bottom explanatory block */}
                <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200 text-xs text-left grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Info className="w-4 h-4 text-satin-gold" /> 
                      {language === "en" ? "What does the unit price include?" : language === "ko" ? "개당 제조 단가 포함 내역은?" : "Đơn giá đã bao gồm những gì?"}
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">
                      {language === "en" 
                        ? "The raw unit price includes the bulk cosmetic formulation compound, professional emulsifying process, standard pump bottle, finished sticker labels and protective shrink-wrap film." 
                        : language === "ko" 
                          ? "안내된 제조 단가는 화장품 제형 원료 벌크 충진액, 전문 가마 유화 임가공비, 표준 용기 및 부자재 비용, 무광/유광 제품 라벨 부착 및 수축 보호 필름 완포장 마무리가 모두 완비된 세트 단가입니다." 
                          : "Đơn giá thô đã bao gồm chi phí bán thành phẩm, pha chế đồng nhũ hóa, chai lọ tiêu chuẩn chuẩn nắp vòi bơm, in nhãn decal và màng co nilon bảo vệ."}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Boxes className="w-4 h-4 text-satin-gold" /> 
                      {language === "en" ? "Flexible Low-Budget Startups" : language === "ko" ? "소자본 스타트업 유연 지원" : "Hỗ trợ startup vốn mỏng"}
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">
                      {language === "en" 
                        ? "We have a flexible low-MOQ trial batch policy from 500 to 1,000 units for your very first launch to minimize inventory cost pressures and reduce risk." 
                        : language === "ko" 
                          ? "신생 스타트업 및 소자본 창업주님의 유통 재고 및 자본 부담을 최소화해 드리고자, 최초 첫 파동 생산 배치에 한해 500~1,000개의 소량 시범 위탁 생산(MOQ) 제도를 적극적으로 지원하고 있습니다." 
                          : "Chúng tôi có chính sách chia nhỏ lô hàng thử nghiệm với MOQ tối thiểu chỉ từ 500-1000 đơn vị cho lô hàng đầu tiên để giảm áp lực tồn kho của quý khách."}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-satin-gold" /> 
                      {language === "en" ? "In-depth Expert Consultation" : language === "ko" ? "정밀 레시피 및 단독 용기 문의" : "Tư vấn báo giá chuyên sâu"}
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">
                      {language === "en" 
                        ? "Need rare active ingredients, custom proprietary formulations, or exclusive packaging? Try our R&D AI Companion on the Home tab or contact us." 
                        : language === "ko" 
                          ? "특수 고기능성 미백 주름 원료, 글로벌 특허 성분 단독 처방 및 커스텀 명품 전용 몰드 용기 수입을 원하시나요? 메인 홈 탭의 R&D AI 연구원에게 말을 걸어보거나 당사 대표 채널로 문의 바랍니다." 
                          : "Bạn cần một thiết kế công thức hoạt chất hiếm hoặc lọ đựng đặt riêng? Hãy thử ngay Trợ lý R&D AI ở trang chủ hoặc gửi liên hệ cho chúng tôi."}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* TIN TỨC / BLOGS */}
          {activeTab === "news" && (
            <motion.div
              key="news-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              {selectedBlog ? (
                /* Specific Article Detailed View */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Back button */}
                    <button 
                      onClick={handleBackToNews}
                      className="flex items-center gap-2 text-stone-500 hover:text-emerald-green font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {language === "en" ? "Back to Articles" : language === "ko" ? "글 목록으로 가기" : "Quay lại danh sách bài viết"}
                    </button>

                    {/* Header metadata */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-green/10 text-emerald-green text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {selectedBlog.category}
                        </span>
                        <span className="text-[11px] text-stone-400 font-bold tracking-wide">
                          {language === "en" ? "Published:" : language === "ko" ? "등록일:" : "Đăng ngày:"} {selectedBlog.date}
                        </span>
                      </div>
                      <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
                        {selectedBlog.title}
                      </h1>
                      <div className="flex items-center gap-2.5 text-xs text-stone-500 font-bold border-b border-stone-200 pb-5">
                        <User className="w-4 h-4 text-emerald-green" />
                        <span>{language === "en" ? "Author:" : language === "ko" ? "작성자:" : "Tác giả:"} {selectedBlog.author}</span>
                      </div>
                    </div>

                    {/* Feature Image */}
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-stone-150 shadow-md">
                      <img 
                        src={selectedBlog.image} 
                        alt={selectedBlog.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* TOC Box */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-stone-900">Nội Dung Trong Bài Viết</h3>
                        <ChevronUp className="w-5 h-5 text-stone-600" />
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-stone-700">
                        <li>Nám da là gì và tại sao nó khó trị?</li>
                        <li>Tranexamic acid và cơ chế liên quan đến nám</li>
                        <li>Bằng chứng lâm sàng: TXA hiệu quả đến đâu?</li>
                        <li>Dùng tranexamic acid thế nào để giảm rủi ro kích ứng?</li>
                        <li>Kỳ vọng thực tế khi dùng tranexamic acid trị nám</li>
                        <li>Tranexamic acid trị nám, nên hay không?</li>
                      </ol>
                    </div>

                    {/* Article content */}
                    <div className="prose prose-stone max-w-none">
                      <p className="text-stone-800 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                        {selectedBlog.content}
                      </p>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
                      <h3 className="font-bold text-lg text-stone-900">Tìm kiếm bài viết</h3>
                      <div className="flex gap-2">
                        <input type="text" placeholder="Gõ để bắt đầu tìm..." className="flex-1 border border-stone-300 rounded-lg p-2 text-xs" />
                        <button className="bg-blue-600 text-white rounded-lg p-2"><Search className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    {/* Related Posts */}
                    <div className="space-y-4">
                      {customBlogPosts.filter(isPublished).slice(0, 3).map((post, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-stone-900 line-clamp-2">{post.title}</h4>
                            <p className="text-[10px] text-stone-400">{post.date}</p>
                            <span className="text-emerald-green text-[10px] font-bold">Đọc thêm »</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div id="blog-directory-top" className="text-left space-y-3 max-w-3xl border-b border-stone-200 pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">
                      {language === "en" ? "MARKET INTELLIGENCE & INSIGHTS" : language === "ko" ? "글로벌 마켓 인텔리전스 및 지식인" : "Thông tin thị trường & kiến thức"}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                      {language === "en" ? "Cosmetics Manufacturing Handbooks & Formulation Trends" : language === "ko" ? "OEM/ODM 화장품 가이드 및 원료 개발 트렌드" : "Cẩm nang gia công & Xu hướng mỹ phẩm"}
                    </h1>
                    <p className="text-stone-500 text-sm">
                      {language === "en" 
                        ? "Stay ahead of regulatory compliance updates and biotechnology active ingredient trends across the globe." 
                        : language === "ko" 
                          ? "보건부의 최신 위생 인허가 행정 규칙 및 글로벌 뷰티 박람회에서 주목받은 최첨단 유효 성분 트렌드 보고서입니다." 
                          : "Cập nhật các phân tích pháp lý công bố mỹ phẩm mới nhất và các báo cáo xu hướng nguyên liệu đang bùng nổ trên thế giới."}
                    </p>
                  </div>

                  {/* Filters & Search sub-bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleBlogCategory("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          blogCategoryFilter === "all" 
                            ? "bg-stone-900 text-white" 
                            : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                        }`}
                      >
                        {language === "en" ? "All Articles" : language === "ko" ? "전체 칼럼" : "Tất cả bài viết"}
                      </button>
                      <button 
                        onClick={() => handleBlogCategory("cẩm nang")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          blogCategoryFilter === "cẩm nang" 
                            ? "bg-stone-900 text-white" 
                            : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                        }`}
                      >
                        {language === "en" ? "Compliance Manual" : language === "ko" ? "인허가 실무 가이드" : "Cẩm nang gia công"}
                      </button>
                      <button 
                        onClick={() => handleBlogCategory("xu hướng")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          blogCategoryFilter === "xu hướng" 
                            ? "bg-stone-900 text-white" 
                            : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                        }`}
                      >
                        {language === "en" ? "Ingredient Trends" : language === "ko" ? "신소재 트렌드" : "Xu hướng nguyên liệu"}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 border border-stone-200 rounded-xl bg-stone-50 px-3 py-1.5 w-full sm:w-64">
                      <Search className="w-4 h-4 text-stone-400 shrink-0" />
                      <input 
                        type="text" 
                        placeholder={language === "en" ? "Search articles..." : language === "ko" ? "칼럼 검색..." : "Tìm bài viết..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-xs focus:outline-none text-stone-800 placeholder-stone-400"
                      />
                    </div>
                  </div>

                  {/* Blog Grid with Pagination */}
                  {(() => {
                    const itemsPerPage = 4;
                    const totalPages = Math.ceil(filteredBlogPosts.length / itemsPerPage);
                    const activePage = Math.min(currentBlogPage, Math.max(1, totalPages));
                    const paginatedBlogPosts = filteredBlogPosts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                    return (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                          {paginatedBlogPosts.length > 0 ? (
                            paginatedBlogPosts.map((post, idx) => (
                              <div 
                                key={idx}
                                onClick={() => handleSelectBlog(post)}
                                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row group"
                              >
                                <div className="w-full sm:w-48 h-56 sm:h-auto overflow-hidden shrink-0 relative">
                                  <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="p-6 space-y-4 flex flex-col justify-between flex-1">
                                  <div className="space-y-2.5">
                                    <span className="bg-emerald-green/10 text-emerald-green text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider inline-block">
                                      {post.category}
                                    </span>
                                    <h3 className="font-serif font-bold text-base text-stone-900 line-clamp-2 hover:text-emerald-green transition-colors">
                                      {post.title}
                                    </h3>
                                    <p className="text-stone-500 text-xs line-clamp-3 font-light leading-relaxed">
                                      {post.summary}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-stone-400 border-t border-stone-50 pt-3">
                                    <span className="font-semibold">{post.author}</span>
                                    <span>{post.date}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 py-16 text-center text-stone-400 font-light">
                              {language === "en" 
                                ? "No articles matched the selected filter." 
                                : language === "ko" 
                                  ? "검색 조건에 맞는 칼럼이 존재하지 않습니다." 
                                  : "Không tìm thấy bài viết nào khớp với bộ lọc hiện tại."}
                            </div>
                          )}
                        </div>

                        {/* Beautiful Pagination Controls */}
                        {totalPages > 1 && (
                          <div className="flex justify-center items-center gap-2 pt-6 pb-2 border-t border-stone-100 mt-10">
                            <button
                              onClick={() => {
                                setCurrentBlogPage(prev => Math.max(1, prev - 1));
                                const blogTop = document.getElementById("blog-directory-top");
                                if (blogTop) {
                                  blogTop.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              disabled={activePage === 1}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                                activePage === 1
                                  ? "text-stone-300 border-stone-200 cursor-not-allowed bg-stone-50"
                                  : "text-stone-700 border-stone-250 hover:border-stone-400 hover:bg-stone-50"
                              }`}
                            >
                              <ChevronLeft className="w-4 h-4" />
                              <span className="hidden sm:inline">
                                {language === "en" ? "Previous" : language === "ko" ? "이전" : "Trang trước"}
                              </span>
                            </button>

                            <div className="flex items-center gap-1.5">
                              {[...Array(totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                const isActive = activePage === pageNum;
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      setCurrentBlogPage(pageNum);
                                      const blogTop = document.getElementById("blog-directory-top");
                                      if (blogTop) {
                                        blogTop.scrollIntoView({ behavior: "smooth" });
                                      }
                                    }}
                                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center border ${
                                      isActive
                                        ? "bg-emerald-green text-white border-emerald-green shadow-sm font-black"
                                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-350 hover:bg-stone-50"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            <button
                              onClick={() => {
                                setCurrentBlogPage(prev => Math.min(totalPages, prev + 1));
                                const blogTop = document.getElementById("blog-directory-top");
                                if (blogTop) {
                                  blogTop.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              disabled={activePage === totalPages}
                              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                                activePage === totalPages
                                  ? "text-stone-300 border-stone-200 cursor-not-allowed bg-stone-50"
                                  : "text-stone-700 border-stone-250 hover:border-stone-400 hover:bg-stone-50"
                              }`}
                            >
                              <span className="hidden sm:inline">
                                {language === "en" ? "Next" : language === "ko" ? "다음" : "Trang sau"}
                              </span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </motion.div>
          )}

          {/* LIÊN HỆ / CONTACT */}
          {activeTab === "contact" && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              {/* Header */}
              <div className="text-left space-y-3 max-w-3xl border-b border-stone-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Liên hệ Cosbuilt</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  Đăng ký nhận báo giá & Mẫu thử vật lý
                </h1>
                <p className="text-stone-500 text-sm">
                  Hãy gửi thông tin dự án của bạn cho bộ phận tư vấn sản phẩm. Chuyên viên của Cosbuilt sẽ gọi lại tư vấn và gửi mẫu test trong vòng 2 giờ làm việc.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Contact information details */}
                <div className="lg:col-span-4 space-y-6 text-left">
                  <div className="bg-stone-900 text-stone-200 p-6 rounded-2xl border border-stone-800 space-y-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/10 rounded-full blur-2xl"></div>
                    <div className="text-xs text-stone-400 font-bold uppercase tracking-widest">Hotline phát triển dự án</div>
                    <div className="text-xl font-bold text-white flex items-center gap-1.5 font-mono">
                      <Phone className="w-5 h-5 text-satin-gold" />
                      (+84) 966 373 686
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Gọi trực tiếp hoặc nhắn tin Zalo để được giải đáp thắc mắc về kỹ thuật hóa mỹ phẩm ngay lập tức.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-2xs text-xs">
                    <h4 className="font-bold text-stone-800 uppercase tracking-wider pb-2 border-b border-stone-100">Thông tin liên lạc</h4>
                    
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="w-5 h-5 text-emerald-green shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <strong className="text-stone-900 block">Địa chỉ văn phòng:</strong>
                        <span className="text-stone-500 leading-relaxed font-light">Văn phòng số 2.40 khu văn phòng, tòa nhà The Prince Residence, số 19-21 Nguyễn Văn Trỗi, Phường Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam.</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <Mail className="w-5 h-5 text-emerald-green shrink-0" />
                      <div>
                        <strong className="text-stone-900 mr-1">Email:</strong>
                        <span className="text-stone-500 font-light">info@cosbuilt.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Aesthetic Map placeholder with real design */}
                  <div className="bg-stone-100 border border-stone-250 rounded-2xl p-4 text-center text-xs text-stone-500 font-light space-y-2 relative overflow-hidden h-48 flex flex-col justify-center items-center">
                    <MapPin className="w-8 h-8 text-emerald-green mb-1" />
                    <span className="font-bold text-stone-800 block text-xs">Bản đồ vị trí văn phòng Cosbuilt</span>
                    <span className="text-[11px]">The Prince Residence, 19-21 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM</span>
                    <span className="text-[10px] bg-white border border-stone-200 text-stone-700 px-2.5 py-1 rounded-full shadow-2xs font-semibold uppercase tracking-wider">Trụ sở công ty</span>
                  </div>
                </div>

                {/* Form enquiry */}
                <div className="lg:col-span-8">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs relative">
                    <AnimatePresence mode="wait">
                      {isFormSubmitted ? (
                        <motion.div
                          key="form-success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-12 text-center space-y-4 flex flex-col items-center justify-center"
                        >
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-xs">
                            <CheckCircle className="w-10 h-10 text-emerald-green" />
                          </div>
                          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">Gửi Yêu Cầu Thành Công!</h3>
                          
                          {/* Automatic Email Confirmation Box */}
                          <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-2xl p-4 max-w-lg w-full text-left space-y-2">
                            <div className="flex items-center gap-2 text-emerald-green-dark font-bold text-xs uppercase tracking-wider">
                              <Mail className="w-4 h-4 shrink-0" />
                              <span>Đã gửi Email xác nhận tự động</span>
                            </div>
                            <p className="text-stone-600 text-xs leading-relaxed">
                              Thư xác nhận tiếp nhận hồ sơ đã được gửi trực tiếp tới hòm thư: <strong className="text-stone-900 font-mono font-bold underline">{submittedEmail || "email của bạn"}</strong>
                            </p>
                            <div className="text-[11px] text-stone-500 font-light pt-1 border-t border-emerald-green/10 flex justify-between items-center">
                              <span>Trạng thái Email: <span className="text-emerald-green font-bold">Đã phát thành công</span></span>
                              <span>Mã hồ sơ: <strong className="font-mono text-stone-800">CB-2026-{(Math.floor(Math.random() * 90000) + 10000)}</strong></span>
                            </div>
                          </div>

                          <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed">
                            Cảm ơn quý khách đã tin tưởng thương hiệu <strong className="text-stone-800 font-bold">Cosbuilt</strong>. Chuyên viên của Cosbuilt sẽ liên hệ tư vấn trực tiếp và gửi mẫu vật lý trong vòng 2 giờ làm việc.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form 
                          key="form-fields"
                          onSubmit={handleContactSubmit}
                          className="space-y-6 text-left"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Họ và tên của bạn *</label>
                              <input 
                                type="text"
                                required
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                placeholder="Ví dụ: Nguyễn Văn Đông"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Số điện thoại / Zalo *</label>
                              <input 
                                type="tel"
                                required
                                value={contactForm.phone}
                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                placeholder="Ví dụ: 0966373686"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Địa chỉ Email *</label>
                              <input 
                                type="email"
                                required
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                placeholder="Ví dụ: dong@gmail.com"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Tên thương hiệu dự kiến (nếu có)</label>
                              <input 
                                type="text"
                                value={contactForm.brandName}
                                onChange={(e) => setContactForm({ ...contactForm, brandName: e.target.value })}
                                placeholder="Ví dụ: GlowSkin, HerbalHair..."
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Danh mục cần gia công</label>
                              <select 
                                value={contactForm.category}
                                onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all cursor-pointer"
                              >
                                <option value="Chăm sóc da mặt">Chăm sóc da mặt (Serum, kem...)</option>
                                <option value="Chăm sóc body">Chăm sóc body (Sữa tắm, lotion...)</option>
                                <option value="Chăm sóc tóc">Chăm sóc tóc (Dầu gội bưởi...)</option>
                                <option value="Trang điểm">Trang điểm (Son môi, phấn...)</option>
                                <option value="Chăm sóc cá nhân">Chăm sóc cá nhân, dung dịch...</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Sản lượng mong muốn</label>
                              <select 
                                value={contactForm.moq}
                                onChange={(e) => setContactForm({ ...contactForm, moq: e.target.value })}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all cursor-pointer"
                              >
                                <option value="1000">Từ 1,000 sản phẩm (Thử nghiệm)</option>
                                <option value="2000">Từ 2,000 sản phẩm (Chuẩn hóa)</option>
                                <option value="5000">Từ 5,000 sản phẩm trở lên (Ưu đãi lớn)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 tracking-wider uppercase mb-2">Lời nhắn / Yêu cầu đặc tính công thức</label>
                            <textarea 
                              value={contactForm.message}
                              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                              placeholder="Mô tả cụ thể chất kem, công dụng chính bạn mong muốn hoặc các vướng mắc cần giải đáp pháp lý..."
                              rows={4}
                              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-green transition-all resize-none"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            <Send className="w-4 h-4" />
                            Gửi Yêu Cầu Thiết Kế & Nhận Mẫu Thử
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* CRM / ADMIN WORKSPACE PANEL */}
          {location.pathname === "/admin" && (
            <motion.div
              key="crm-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CRMDashboard
                customBlogPosts={customBlogPosts}
                customImages={customImages}
                customLogos={customLogos}
                websiteLogo={websiteLogo}
                footerLogo={footerLogo}
                customProducts={customProducts}
                sheetsConfig={sheetsConfig}
                setCustomBlogPosts={setCustomBlogPosts}
                setCustomImages={setCustomImages}
                setCustomLogos={setCustomLogos}
                setWebsiteLogo={setWebsiteLogo}
                setFooterLogo={setFooterLogo}
                setCustomProducts={setCustomProducts}
                setSheetsConfig={setSheetsConfig}
                onTabChange={handleTabChange}
                onLogin={() => setIsAdminMode(true)}
                onLogout={() => {
                  setIsAdminMode(false);
                  localStorage.removeItem("cosbuilt_admin_mode");
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* B2B SAMPLE CART DRAWER/SIDEBAR */}
      <AnimatePresence>
        {isSampleCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggleSampleCart}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-200"
              >
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-stone-150 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black tracking-widest text-stone-950 text-sm">COSBUILT</span>
                    <span className="text-stone-300">|</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      MẪU THỬ B2B ({sampleCart.length})
                    </span>
                  </div>
                  <button 
                    onClick={handleToggleSampleCart}
                    className="p-1.5 rounded-full border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all text-stone-500 hover:text-stone-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto">
                  {sampleCart.length === 0 ? (
                    /* EMPTY STATE (matches user screenshot exactly) */
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
                          <X className="w-10 h-10 stroke-[1.5]" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-w-sm">
                        <h3 className="font-serif font-black text-lg tracking-wider text-stone-900 uppercase">
                          GIỎ MẪU THỬ TRỐNG
                        </h3>
                        <p className="text-xs text-stone-500 leading-relaxed font-light">
                          Bạn chưa chọn mẫu công thức nào để yêu cầu test mẫu thử cGMP. Vui lòng bấm vào nút "Yêu cầu mẫu thử" ở trang sản phẩm.
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          setIsSampleCartOpen(false);
                          handleTabChange("categories");
                        }}
                        className="bg-stone-900 hover:bg-stone-950 text-white text-xs px-8 py-3.5 font-bold rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all uppercase tracking-wider"
                      >
                        Khám phá công thức
                      </button>
                    </div>
                  ) : (
                    /* SAMPLE LIST STATE */
                    <div className="p-6 space-y-4">
                      <div className="space-y-1 text-left">
                        <h3 className="font-bold text-xs text-stone-400 uppercase tracking-wider">Mẫu thử đã chọn</h3>
                        <p className="text-[11px] text-stone-500">Các công thức dược mỹ phẩm bạn muốn nhận mẫu test vật lý miễn phí.</p>
                      </div>

                      <div className="divide-y divide-stone-100">
                        {sampleCart.map((item, idx) => (
                          <div key={idx} className="py-4 flex items-center justify-between gap-4 text-left">
                            <div className="flex gap-3 items-center min-w-0">
                              <span className="w-8 h-8 rounded-lg bg-emerald-green-light text-emerald-green flex items-center justify-center font-bold text-xs shrink-0">
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <span className="font-semibold text-xs text-stone-800 block truncate" title={item}>
                                  {item}
                                </span>
                                <span className="text-[10px] text-emerald-green font-medium block">
                                  Chuẩn cGMP · R&D Lab Free
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleRemoveFromSampleCart(item)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              title="Xóa khỏi giỏ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Drawer Footer (only shown if there are items) */}
                {sampleCart.length > 0 && (
                  <div className="p-6 border-t border-stone-150 bg-stone-50 space-y-4 text-left">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-stone-800">
                        <span>Tổng số mẫu thử:</span>
                        <span className="text-emerald-green font-mono">{sampleCart.length} mẫu</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-stone-500">
                        <span>Chi phí R&D & Gửi mẫu:</span>
                        <span className="text-rose-500 font-bold uppercase">Miễn phí 100%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        // Pre-fill contact form
                        const sampleTextList = sampleCart.map((item, idx) => `${idx + 1}. Dòng sản phẩm: ${item}`).join("\n");
                        setContactForm({
                          ...contactForm,
                          message: `Tôi muốn đăng ký nhận mẫu thử vật lý miễn phí (đạt chuẩn cGMP ASEAN) cho các dòng sản phẩm sau:\n${sampleTextList}\n\nVui lòng gửi mẫu test và hồ sơ R&D về địa chỉ của tôi.`
                        });
                        setIsSampleCartOpen(false);
                        handleTabChange("contact");
                        setTimeout(() => {
                          const contactSection = document.getElementById("contact");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.scrollTo({ top: 1000, behavior: 'smooth' });
                          }
                        }, 150);
                      }}
                      className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      Nhận bộ mẫu thử miễn phí
                    </button>
                    <p className="text-[10px] text-stone-400 text-center italic font-light">
                      * Chuyên viên Cosbuilt sẽ liên hệ Zalo/SĐT để xác nhận thông tin nhận mẫu.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {location.pathname !== "/admin" && <Footer onTabChange={handleTabChange} onToggleAdminMode={handleToggleAdminMode} websiteLogo={footerLogo} />}
      
      {/* Contact Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a 
          href="https://zalo.me/0966373686" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#0068FF] rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
          title="Zalo 0966 373 686"
        >
          <svg className="w-8 h-8" viewBox="0 0 100 100">
            <path
              d="M 50 12 C 29 12 12 27.8 12 47.3 C 12 54.8 14.5 61.8 18.8 67.5 L 14 85 L 32.2 80 C 37.6 83 43.6 84.6 50 84.6 C 71 84.6 88 68.8 88 49.3 C 88 29.8 71 12 50 12 Z"
              fill="#ffffff"
            />
            <text
              x="50"
              y="57"
              fill="#0068FF"
              fontSize="26"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="-0.5px"
            >
              Zalo
            </text>
          </svg>
        </a>
        <a 
          href="tel:0966373686" 
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#FF0000] rounded-full shadow-lg text-white hover:bg-red-600 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          title="Gọi 0966 373 686"
        >
          <Phone className="w-7 h-7 fill-white text-white" />
        </a>
      </div>
    </div>
  );
}
