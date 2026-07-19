import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
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
  RefreshCw
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIFormulaAdvisor from "./components/AIFormulaAdvisor";
import CRMDashboard from "./components/CRMDashboard";

import { 
  ABOUT_SECTIONS, 
  SERVICES, 
  MANUFACTURING_CATEGORIES, 
  PRICING_LIST, 
  BLOG_POSTS,
  FORMULA_PRODUCTS
} from "./data";
import { BlogPost, ManufacturingCategory, FormulaProduct } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState<string | undefined>(undefined);
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
  const [priceSearch, setPriceSearch] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<"all" | "cẩm nang" | "xu hướng">("all");
  const [activeAboutTab, setActiveAboutTab] = useState("about-us");

  // Google Sheets Dynamic States
  const [customBlogPosts, setCustomBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [customImages, setCustomImages] = useState<any[]>([]);
  const [customLogos, setCustomLogos] = useState<any[]>(ABOUT_SECTIONS.partners.logos);
  const [websiteLogo, setWebsiteLogo] = useState<any>({ name: "COSBUILT", slogan: "ESTD 1999" });
  const [customProducts, setCustomProducts] = useState<FormulaProduct[]>(FORMULA_PRODUCTS);
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

  // Load sheets configuration, data, and CRM leads on component mount
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
          if (data.products && data.products.length > 0) {
            setCustomProducts(data.products);
          }
        }
      } catch (error) {
        console.error("Failed to load Google Sheets data:", error);
      }
    };
    
    const loadLeadsData = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (error) {
        console.error("Failed to load leads:", error);
      }
    };
    
    fetchSheetsData();
    loadLeadsData();
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

  // Scroll to sub-section when activeSubTab changes
  useEffect(() => {
    if (activeSubTab) {
      const timer = setTimeout(() => {
        const element = document.getElementById(activeSubTab);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab, activeSubTab]);

  const handleTabChange = (tabId: string, subId?: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subId);
    setSearchQuery(""); // Clear search on tab switch
    if (tabId === "about") {
      if (subId) {
        setActiveAboutTab(subId);
      } else {
        setActiveAboutTab("about-us");
      }
    }
    if (tabId === "categories") {
      setSelectedCategory(subId || "all");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Determine where to route based on query context
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("giá") || lowerQuery.includes("bảng giá") || lowerQuery.includes("bao nhiêu") || lowerQuery.includes("chi phí")) {
      setActiveTab("pricing");
    } else if (lowerQuery.includes("tin tức") || lowerQuery.includes("xu hướng") || lowerQuery.includes("cẩm nang") || lowerQuery.includes("bài viết")) {
      setActiveTab("news");
    } else if (lowerQuery.includes("da mặt") || lowerQuery.includes("body") || lowerQuery.includes("tóc") || lowerQuery.includes("son") || lowerQuery.includes("trang điểm") || lowerQuery.includes("cá nhân")) {
      setActiveTab("categories");
      if (lowerQuery.includes("da mặt")) setSelectedCategory("facial-care");
      else if (lowerQuery.includes("body") || lowerQuery.includes("cơ thể")) setSelectedCategory("body-care");
      else if (lowerQuery.includes("tóc")) setSelectedCategory("hair-care");
      else if (lowerQuery.includes("son") || lowerQuery.includes("trang điểm") || lowerQuery.includes("makeup")) setSelectedCategory("makeup");
      else if (lowerQuery.includes("cá nhân") || lowerQuery.includes("vệ sinh")) setSelectedCategory("personal-care");
    } else if (lowerQuery.includes("liên hệ") || lowerQuery.includes("tư vấn") || lowerQuery.includes("đăng ký") || lowerQuery.includes("sđt") || lowerQuery.includes("email")) {
      setActiveTab("contact");
    } else {
      setActiveTab("services");
    }
  };

  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        fetchLeads(); // refresh CRM list if open or cache updated
      }
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

  const filteredPricingList = PRICING_LIST.filter(item => 
    item.productType.toLowerCase().includes(priceSearch.toLowerCase()) ||
    item.priceRange.toLowerCase().includes(priceSearch.toLowerCase())
  );

  const filteredBlogPosts = customBlogPosts.filter(post => {
    const matchesCategory = blogCategoryFilter === "all" || post.category === blogCategoryFilter;
    const matchesSearch = searchQuery ? (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-900 selection:bg-emerald-green-light selection:text-emerald-green-dark">
      {activeTab !== "crm" && (
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
                        <Sparkles className="w-3.5 h-3.5" /> GIA CÔNG MỸ PHẨM CHUẨN CGMP ASEAN
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.1]">
                        Kiến Tạo <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-green via-amber-200 to-satin-gold">
                          Thương Hiệu Triệu Đô
                        </span>
                      </h1>
                      
                      <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-xl font-light">
                        Nhà máy gia công mỹ phẩm trọn gói <strong className="text-white font-semibold">cosbuilt</strong> đạt chuẩn quốc tế. Từ ý tưởng khoa học trong phòng Lab đến dây chuyền sản xuất hàng loạt tự động. Chúng tôi biến giấc mơ mỹ phẩm của bạn thành hiện thực vượt trội.
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <a 
                          href="#ai-formula-advisor-container"
                          className="bg-emerald-green hover:bg-emerald-green-dark text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-emerald-green/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                          Thiết kế Công thức bằng AI
                        </a>
                        <button 
                          onClick={() => handleTabChange("pricing")}
                          className="bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Calculator className="w-4 h-4" />
                          Xem bảng giá gia công
                        </button>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">100%</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">Độc quyền công thức</div>
                        </div>
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">CGMP</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">Nhà máy Bộ Y Tế</div>
                        </div>
                        <div className="text-left">
                          <div className="text-white font-serif font-bold text-lg md:text-2xl">1,000+</div>
                          <div className="text-stone-400 text-[10px] uppercase tracking-wider">Mẫu thử vật lý miễn phí</div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary interactive promotional card on Hero */}
                    <div className="lg:col-span-5 hidden lg:block">
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden space-y-4">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-green/10 rounded-full blur-2xl"></div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-widest text-emerald-green-light">Xu hướng thành phần 2026</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            <span className="bg-emerald-green text-white text-[10px] px-2 py-0.5 rounded-md font-bold uppercase mr-2">Hot R&D</span>
                            <span className="text-xs font-semibold text-white">Exosomes tế bào gốc thực vật</span>
                            <p className="text-[11px] text-stone-400 mt-1">Trẻ hóa tầng sâu, tái cấu trúc sợi Collagen vượt trội.</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            <span className="bg-amber-500 text-stone-950 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase mr-2">Eco-friendly</span>
                            <span className="text-xs font-semibold text-white">Mỹ phẩm thuần chay (Vegan)</span>
                            <p className="text-[11px] text-stone-400 mt-1">Chiết xuất bưởi, tía tô, rau má hữu cơ đạt chứng nhận Ecocert.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleTabChange("news")}
                          className="w-full bg-white text-stone-900 font-bold text-xs py-3 rounded-xl hover:bg-emerald-green-light transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Tìm hiểu xu hướng làm đẹp <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATS COUNTDOWN COUNTERS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border border-stone-150 p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {ABOUT_SECTIONS.intro.stats.map((stat, idx) => (
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
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-green">Về thương hiệu chúng tôi</div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
                      Đối tác gia công mỹ phẩm đẳng cấp, chuyên nghiệp nhất
                    </h2>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {ABOUT_SECTIONS.intro.content}
                    </p>
                    <div className="space-y-3 text-xs font-medium text-stone-800">
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>Sở hữu 2 nhà máy quy mô lớn chuẩn quốc tế, máy móc nhập khẩu 100%</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>Bảo mật tuyệt đối mọi công thức độc quyền và dữ liệu thương hiệu</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-green shrink-0 bg-emerald-green-light rounded-full p-0.5" />
                        <span>Hỗ trợ hồ sơ pháp lý từ sở hữu trí tuệ đến phiếu công bố lưu hành Bộ Y Tế</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleTabChange("about")}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-emerald-green border-b border-stone-900 hover:border-emerald-green pb-1.5 transition-all cursor-pointer"
                    >
                      <span>Khám phá nhà máy & năng lực sản xuất</span>
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
                      Cosbuild nghiên cứu và sản xuất trọn gói mọi phân khúc mỹ phẩm chăm sóc toàn thân chất lượng hàng đầu thế giới.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MANUFACTURING_CATEGORIES.slice(0, 3).map((cat) => (
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
                              Độc quyền R&D
                            </div>
                          </div>
                          <div className="p-5 text-left space-y-3">
                            <h4 className="font-serif font-bold text-base text-stone-900">{cat.title}</h4>
                            <p className="text-stone-500 text-xs leading-relaxed font-light">{cat.description}</p>
                            
                            <div className="space-y-1.5 pt-2">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sản phẩm nổi bật</span>
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
                            Chi tiết năng lực sản xuất
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
                      Xem tất cả danh mục gia công
                    </button>
                  </div>
                </div>
              </section>

              {/* COOPERATION PROCESS 6-STEP ANIMATION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Minh bạch & chuẩn mực</span>
                  <h2 className="text-3xl font-serif font-bold text-stone-900">Quy Trình Hợp Tác 6 Bước Chuyên Nghiệp</h2>
                  <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto">
                    Từ lúc bắt đầu tiếp nhận ý tưởng đến khi lô thành phẩm CGMP được giao tận tay, mọi quy trình đều khép kín, minh bạch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES[5].details.map((step, idx) => {
                    const [stepTitle, stepDesc] = step.split(": ");
                    return (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-150 relative overflow-hidden text-left space-y-2">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-green/5 rounded-bl-3xl flex items-center justify-center font-serif text-emerald-green font-black text-sm">
                          0{idx + 1}
                        </div>
                        <span className="bg-emerald-green-light text-emerald-green-dark text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Bước {idx + 1}</span>
                        <h4 className="font-bold text-sm text-stone-900 pt-1">{stepTitle}</h4>
                        <p className="text-stone-500 text-xs leading-relaxed font-light">{stepDesc}</p>
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
                  {customBlogPosts.slice(0, 2).map((post, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedBlog(post)}
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
                    Đừng ngần ngại liên hệ với chuyên viên phát triển dự án của cosbuilt. Chúng tôi luôn sẵn sàng hỗ trợ tư vấn và gửi tặng mẫu test thử nghiệm vật lý miễn phí.
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
                    {/* Section 1: Về Cosbuild */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-5 text-left">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {ABOUT_SECTIONS.intro.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{ABOUT_SECTIONS.intro.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {ABOUT_SECTIONS.intro.content}
                        </p>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          Mỗi sản phẩm ra đời đều mang tâm huyết nghiên cứu sâu sắc về sự tương thích với làn da người Á Đông. Chúng tôi kết hợp tinh túy dược thảo Việt Nam cùng công nghệ tách chiết nồng độ cao nhập khẩu từ các viện nghiên cứu dược mỹ phẩm uy tín của Thụy Sĩ và Đức.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {ABOUT_SECTIONS.intro.stats.map((stat, idx) => (
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
                          {ABOUT_SECTIONS.factory.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{ABOUT_SECTIONS.factory.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {ABOUT_SECTIONS.factory.description}
                        </p>
                        <div className="space-y-3">
                          {ABOUT_SECTIONS.factory.strengths.map((str, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-stone-700">
                              <CheckCircle className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                              <span className="font-medium">{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-5 relative">
                        <img 
                          src={ABOUT_SECTIONS.factory.image} 
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
                          {ABOUT_SECTIONS.certifications.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{ABOUT_SECTIONS.certifications.subtitle}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ABOUT_SECTIONS.certifications.list.map((cert, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-150 text-left space-y-3 shadow-2xs hover:shadow-sm transition-all">
                            <div className="w-10 h-10 bg-emerald-green-light rounded-xl flex items-center justify-center text-emerald-green">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-stone-900">{cert.name}</h4>
                              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mt-0.5">{cert.issuer}</span>
                            </div>
                            <p className="text-stone-500 text-xs leading-relaxed font-light">{cert.description}</p>
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
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-5">
                        <img 
                          src={ABOUT_SECTIONS.rdTeam.image} 
                          alt="R&D Team" 
                          className="w-full h-80 object-cover rounded-2xl shadow-md border border-stone-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="lg:col-span-7 space-y-5 text-left">
                        <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {ABOUT_SECTIONS.rdTeam.title}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{ABOUT_SECTIONS.rdTeam.subtitle}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                          {ABOUT_SECTIONS.rdTeam.description}
                        </p>
                        <div className="space-y-3">
                          {ABOUT_SECTIONS.rdTeam.focusAreas.map((area, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-stone-700">
                              <Award className="w-4 h-4 text-emerald-green shrink-0 mt-0.5" />
                              <span className="font-medium">{area}</span>
                            </div>
                          ))}
                        </div>
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
                    <section className="space-y-6 text-center pt-4">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Tin cậy & Uy tín</span>
                        <h2 className="text-2xl font-serif font-bold text-stone-900">{ABOUT_SECTIONS.partners.subtitle}</h2>
                        <p className="text-stone-500 text-xs">Hơn 250+ thương hiệu spa, clinic thẩm mỹ viện và mỹ phẩm nổi tiếng toàn quốc đã gửi trọn niềm tin cho Cosbuild.</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
                        {customLogos.map((logo, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-xl border border-stone-150 flex flex-col items-center justify-center space-y-1 text-center shadow-2xs hover:border-emerald-green transition-all min-h-[90px]">
                            {logo.image ? (
                              <img 
                                src={logo.image} 
                                alt={logo.name} 
                                className="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <>
                                <span className="font-bold text-xs text-stone-800 block">{logo.name}</span>
                                <span className="text-[9px] text-stone-400 uppercase tracking-widest block">{logo.type}</span>
                              </>
                            )}
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
          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-left space-y-3 max-w-3xl border-b border-stone-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Giải pháp phát triển dòng sản phẩm</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  Dịch vụ gia công trọn gói tại cosbuilt
                </h1>
                <p className="text-stone-500 text-sm">
                  Chúng tôi cung cấp hệ thống dịch vụ từ khâu lên công thức hóa sinh hóa mỹ phẩm, nhập khẩu chai lọ vỏ hộp, in ấn nhãn mác, hỗ trợ thủ tục công bố Bộ Y Tế, đến sản xuất hàng loạt.
                </p>
              </div>

              {/* Services cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SERVICES.map((srv, idx) => {
                  const serviceIds = [
                    "oem-odm",
                    "formula-development",
                    "packaging-print",
                    "legal-service",
                    "logistics",
                    "cooperation-process",
                    "cooperation-benefits"
                  ];
                  const cardId = serviceIds[idx];
                  const isHighlighted = activeSubTab === cardId;
                  return (
                    <div 
                      key={idx} 
                      id={cardId}
                      className={`bg-white p-6 sm:p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between text-left scroll-mt-24 ${
                        isHighlighted 
                          ? "border-emerald-green ring-4 ring-emerald-green/15 shadow-md scale-[1.01]" 
                          : "border-stone-200 shadow-2xs hover:shadow-sm"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-green-light rounded-2xl flex items-center justify-center text-emerald-green">
                          {idx === 0 && <Boxes className="w-6 h-6" />}
                          {idx === 1 && <FlaskConical className="w-6 h-6" />}
                          {idx === 2 && <Palette className="w-6 h-6" />}
                          {idx === 3 && <FileText className="w-6 h-6" />}
                          {idx === 4 && <Truck className="w-6 h-6" />}
                          {idx === 5 && <GitMerge className="w-6 h-6" />}
                          {idx === 6 && <Gem className="w-6 h-6" />}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900">{srv.title}</h3>
                          <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">{srv.description}</p>
                        </div>
                        
                        <div className="space-y-2.5 pt-2">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nội dung chi tiết</span>
                          {srv.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex gap-2 items-start text-xs text-stone-700">
                              <span className="bg-emerald-green-light text-emerald-green-dark font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 text-[9px]">{dIdx + 1}</span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6">
                        <button 
                          onClick={() => handleTabChange("contact")}
                          className="w-full text-center bg-stone-900 hover:bg-stone-850 text-white font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Yêu cầu tư vấn dịch vụ này
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* DANH MỤC GIA CÔNG / CATEGORIES */}
          {activeTab === "categories" && (() => {
            // Interactive Filtering Logic
            const filteredProducts = customProducts.filter(prod => {
              // 1. Filter by Category
              if (selectedCategory !== "all" && prod.category !== selectedCategory) return false;

              // 2. Filter by Skin Type
              if (selectedSkinType !== "Tất cả loại da") {
                if (!prod.skinTypes.includes(selectedSkinType)) return false;
              }

              // 3. Filter by Lab Checkboxes
              if (selectedLabs.length > 0) {
                if (!selectedLabs.includes(prod.lab)) return false;
              }

              return true;
            });

            // Sorting Logic
            const sortedProducts = [...filteredProducts].sort((a, b) => {
              if (selectedSort === "Giá mẫu từ thấp đến cao") {
                return a.price - b.price;
              }
              if (selectedSort === "Giá mẫu từ cao đến thấp") {
                return b.price - a.price;
              }
              if (selectedSort === "Đánh giá ổn định cao nhất") {
                return b.ratingValue - a.ratingValue;
              }
              return 0; // Default
            });

            const handleLabToggle = (labName: string) => {
              setSelectedLabs(prev => 
                prev.includes(labName) 
                  ? prev.filter(l => l !== labName) 
                  : [...prev, labName]
              );
            };

            const resetFilters = () => {
              setSelectedSkinType("Tất cả loại da");
              setSelectedLabs([]);
              setSelectedSort("Mặc định công thức");
              setSelectedCategory("all");
            };

            const selectedCatDetails = MANUFACTURING_CATEGORIES.find(c => c.id === selectedCategory);

            return (
              <motion.div
                key="categories-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
              >
                {/* Header (Matching User's Screenshot style) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-stone-200 pb-6 gap-4">
                  <div className="text-left space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">DANH MỤC GIA CÔNG</span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 leading-none">
                      Bộ Sưu Tập Công Thức Mỹ Phẩm Tiêu Biểu
                    </h1>
                  </div>
                  <div className="text-stone-500 text-xs font-medium bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                    Đang hiển thị: <strong className="font-bold text-stone-900">{sortedProducts.length} công thức mẫu thử</strong>
                  </div>
                </div>

                {/* Skin Type Orientation Selection (Top bar as seen in screenshot) */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-2xs text-left space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-green/10 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-green" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-stone-800 tracking-wider uppercase">Định hướng phát triển theo loại da</h3>
                      <p className="text-[11px] text-stone-400 font-light mt-0.5">Hãy click chọn nhanh định hướng tính chất da mục tiêu của bạn để tìm kiếm các hoạt chất điều chế đặc trị phù hợp nhất từ phòng LAB.</p>
                    </div>
                  </div>

                  {/* Horizontal Scroll / wrap tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {["Tất cả loại da", "Dành cho da khô", "Dành cho da dầu mụn", "Dành cho da nhạy cảm", "Mọi loại da"].map((skin) => (
                      <button
                        key={skin}
                        onClick={() => setSelectedSkinType(skin)}
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
                          Bộ lọc tìm kiếm
                        </span>
                        <button 
                          onClick={resetFilters}
                          className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Đặt lại
                        </button>
                      </div>

                      {/* DANH MỤC SẢN PHẨM */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Danh mục gia công</span>
                        <div className="space-y-1.5">
                          <button
                            onClick={() => setSelectedCategory("all")}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              selectedCategory === "all" 
                                ? "bg-emerald-green text-white shadow-xs" 
                                : "text-stone-750 hover:bg-stone-50 border border-stone-100 bg-white"
                            }`}
                          >
                            <span>Tất cả công thức</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                          </button>
                          {MANUFACTURING_CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                selectedCategory === cat.id 
                                  ? "bg-emerald-green text-white shadow-xs" 
                                  : "text-stone-750 hover:bg-stone-50 border border-stone-100 bg-white"
                              }`}
                            >
                              <span>{cat.title.replace("Gia công ", "")}</span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* PHÒNG LAB PHÁT TRIỂN */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Phòng Lab Phát Triển</span>
                        <div className="space-y-2 text-xs text-stone-700 font-medium">
                          {["Cosbuilt LAB", "Organic Formula", "Premium Eco", "Advanced Clinical"].map((lab) => {
                            const isChecked = selectedLabs.includes(lab);
                            return (
                              <label key={lab} className="flex items-center gap-2.5 cursor-pointer select-none py-0.5 hover:text-emerald-green transition-all">
                                <input 
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleLabToggle(lab)}
                                  className="accent-emerald-green rounded border-stone-300 w-4 h-4 cursor-pointer"
                                />
                                <span>{lab}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* SẮP XẾP THEO GIÁ TRỊ */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Sắp xếp theo giá trị</span>
                        <div className="space-y-1.5">
                          {[
                            "Mặc định công thức",
                            "Giá mẫu từ thấp đến cao",
                            "Giá mẫu từ cao đến thấp",
                            "Đánh giá ổn định cao nhất"
                          ].map((sortOption) => (
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
                        <h4 className="font-serif font-bold text-base text-white">Tư vấn OEM nhanh?</h4>
                      </div>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                        Hãy liên hệ Hotline 24/7 để nhận tư vấn từ thạc sĩ công nghệ hóa sinh Cosbuilt.
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
                        <span className="text-[10px] font-bold text-emerald-green uppercase tracking-wider block">Phòng Lab R&D Chuyên Biệt</span>
                        <h2 className="text-xl font-serif font-bold text-stone-900">Tất Cả Công Thức Nổi Bật</h2>
                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">Tổng hợp toàn bộ các công thức mỹ phẩm tiêu biểu được nghiên cứu độc quyền và phát triển bởi hệ thống phòng Lab hiện đại của Cosbuild.</p>
                      </div>
                    ) : selectedCatDetails ? (
                      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 text-left space-y-2">
                        <span className="text-[10px] font-bold text-emerald-green uppercase tracking-wider block">Phòng Lab R&D Chuyên Biệt</span>
                        <h2 className="text-xl font-serif font-bold text-stone-900">{selectedCatDetails.title}</h2>
                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">{selectedCatDetails.description}</p>
                      </div>
                    ) : null}

                    {sortedProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedProducts.map((prod) => {
                          const isAdded = sampleCart.includes(prod.title);
                          return (
                            <div 
                              key={prod.id}
                              className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between h-full"
                            >
                              {/* Top Part: Image, Badges, Hover trigger */}
                              <div>
                                <div className="h-52 relative overflow-hidden bg-stone-50 border-b border-stone-100">
                                  {/* Discount badge */}
                                  <div className="absolute top-3 left-0 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-r-md z-10 uppercase tracking-wide">
                                    -{prod.discountPercent}% OFF
                                  </div>
                                  
                                  {/* Highlight tag/badge */}
                                  <div className="absolute top-10 left-0 bg-stone-900 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-r-md z-10 uppercase tracking-widest">
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
                                      onClick={() => {
                                        setSelectedProductDetails(prod);
                                        setActiveDetailsTab("mô tả");
                                        setDetailsQuantity(1);
                                      }}
                                      className="w-11 h-11 rounded-full bg-emerald-green hover:bg-emerald-green-dark text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                      title="Xem nhanh chi tiết"
                                    >
                                      <Eye className="w-5 h-5 text-white" />
                                    </button>
                                    <button 
                                      onClick={() => handleAddToSampleCart(prod.title)}
                                      className="w-11 h-11 rounded-full bg-stone-900 hover:bg-stone-950 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                      title="Yêu cầu mẫu thử"
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
                                    onClick={() => {
                                      setSelectedProductDetails(prod);
                                      setActiveDetailsTab("mô tả");
                                      setDetailsQuantity(1);
                                    }}
                                    className="font-serif font-bold text-xs sm:text-sm text-stone-900 hover:text-emerald-green transition-colors line-clamp-2 h-10 leading-tight cursor-pointer"
                                  >
                                    {prod.title}
                                  </h3>

                                  {/* Pricing */}
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-red-500">{prod.price.toLocaleString("vi-VN")} đ</span>
                                    <span className="text-[10px] text-stone-400 line-through">{prod.originalPrice.toLocaleString("vi-VN")} đ</span>
                                  </div>

                                  {/* Progress bar matching screenshots exactly */}
                                  <div className="space-y-1 pt-1.5 border-t border-stone-50">
                                    <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                                      <span>Đã test: <strong className="font-bold text-stone-800">{prod.testedCount} mẫu</strong></span>
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
                                  {isAdded ? "✓ Đã chọn mẫu thử" : "Yêu cầu mẫu thử"}
                                </button>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white rounded-3xl border border-stone-200 p-16 text-center text-stone-400 font-light space-y-3">
                        <Info className="w-10 h-10 text-stone-300 mx-auto" />
                        <h3 className="font-bold text-stone-800 text-sm">Không tìm thấy mẫu thử phù hợp</h3>
                        <p className="text-xs max-w-xs mx-auto leading-relaxed">Hãy thử xóa bộ lọc phòng Lab hoặc click chọn định hướng da khác để thấy thêm nhiều công thức mỹ phẩm tuyệt vời.</p>
                      </div>
                    )}

                  </div>

                </div>

                {/* Bottom interactive recommendation banner */}
                <div className="bg-emerald-green text-white p-8 sm:p-10 rounded-3xl border border-emerald-green/20 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="lg:col-span-8 space-y-2">
                    <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider block w-max">
                      Ý TƯỞNG SÁNG TẠO ĐỘC QUYỀN
                    </span>
                    <h3 className="text-2xl font-serif font-bold leading-tight">Bạn chưa tìm thấy dòng hoạt chất độc bản mong muốn?</h3>
                    <p className="text-emerald-50 font-light text-xs sm:text-sm leading-relaxed max-w-2xl">
                      Hãy trải nghiệm ngay Trợ lý R&D AI đĩnh đạc của chúng tôi ở Trang Chủ. Nhận bản phác thảo chi tiết tỷ lệ thành phần dược chất, bao bì vỏ chai đựng và dự toán đầu tư tự động chỉ trong 3 giây.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <button 
                      onClick={() => {
                        handleTabChange("home");
                        setTimeout(() => {
                          const advisorEl = document.getElementById("ai-advisor");
                          if (advisorEl) {
                            advisorEl.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs px-8 py-4 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-green fill-emerald-green" />
                      Lên công thức AI ngay
                    </button>
                  </div>
                </div>

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
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-green">BẢNG GIÁ ĐẦU TƯ GIA CÔNG</span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                    Ước Tính Ngân Sách Gia Công Mỹ Phẩm cGMP
                  </h1>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
                    Công cụ hỗ trợ các nhãn hàng tính toán nhanh ngân sách khởi nghiệp hũ/chai mỹ phẩm trọn gói. Điều chỉnh số lượng và lựa chọn quy cách bao bì để tối ưu hóa đầu tư.
                  </p>
                </div>

                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Controls */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-8 shadow-xs text-left">
                    <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
                      <Calculator className="w-5 h-5 text-emerald-green shrink-0" />
                      <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wider">CẤU HÌNH THÔNG SỐ SẢN PHẨM</h2>
                    </div>

                    {/* Section 1: NHÓM MỸ PHẨM GIA CÔNG */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        1. NHÓM MỸ PHẨM GIA CÔNG
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
                              {group}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2: DÒNG SẢN PHẨM ĐẶC THÙ */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        2. DÒNG SẢN PHẨM ĐẶC THÙ
                      </label>
                      <div className="relative">
                        <select
                          value={estProductLine}
                          onChange={(e) => setEstProductLine(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-green focus:border-emerald-green transition-all cursor-pointer font-bold text-stone-800 appearance-none pr-10"
                        >
                          {(PRODUCT_LINES_DATA[estGroup] || []).map((prod) => (
                            <option key={prod.name} value={prod.name}>
                              {prod.name}
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
                        3. QUY CÁCH VỎ CHAI LỌ & HŨ MỸ PHẨM
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: "standard", name: "Hũ/Chai Nhựa PET Tiêu Chuẩn", desc: "~3.500đ / vỏ" },
                          { id: "glass", name: "Chai Thủy Tinh Mờ Nắp Mạ Vàng Cao Cấp", desc: "~6.500đ / vỏ" },
                          { id: "acrylic", name: "Vỏ Acrylic Nhập Khẩu Độc Đáo", desc: "~10.000đ / vỏ" }
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
                          4. SỐ LƯỢNG GIA CÔNG (MOQ)
                        </label>
                        <span className="text-xs font-mono font-black text-emerald-green">
                          {estQty.toLocaleString("vi-VN")} chai/hũ
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
                          <span>1.000 (MỨC THỬ NGHIỆM)</span>
                          <span>5.000 (CHIẾT KHẤU 15%)</span>
                          <span>10.000 (SỈ KỊCH SÀN -25%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: DỊCH VỤ PHÁP LÝ CÔNG BỐ SỞ Y TẾ */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-500 tracking-wider uppercase">
                        5. DỊCH VỤ PHÁP LÝ CÔNG BỐ SỞ Y TẾ
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: "none", name: "Không cần (Khách hàng tự lo pháp lý)", desc: "Miễn phí" },
                          { id: "standard", name: "Công bố Sở Y Tế trọn gói (Khuyên dùng)", desc: "+4.500.000đ" },
                          { id: "full", name: "Trọn gói: Pasteur Test + Công Bố + Mã vạch + Tem chống giả", desc: "+8.500.000đ" }
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
                    <div className="bg-stone-900 text-stone-100 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6 text-left flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-green font-black uppercase tracking-widest block">DỰ THẢO NGÂN SÁCH</span>
                          <h3 className="text-xl font-serif font-black text-white leading-tight">ƯỚC TÍNH CHI PHÍ TRỌN GÓI</h3>
                        </div>

                        {/* Unit Price Nested Card */}
                        <div className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-5 text-center space-y-2">
                          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">ĐƠN GIÁ DỰ KIẾN (MỖI SẢN PHẨM HOÀN THIỆN)</span>
                          <div className="text-3xl font-black text-emerald-green">
                            {unitPriceCompleted.toLocaleString("vi-VN")} <span className="text-sm font-bold text-stone-300">VNĐ / chai</span>
                          </div>
                          <p className="text-[10px] text-stone-500 font-medium leading-normal italic">
                            (Đã bao gồm: Dung dịch bên trong + Chai lọ cao cấp + Thiết kế tem nhãn + In ấn hoàn thiện)
                          </p>
                        </div>

                        {/* Line Item details */}
                        <div className="space-y-3.5 pt-4 border-t border-dashed border-stone-800 text-xs">
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">1. Chi phí nguyên liệu dung dịch:</span>
                            <span className="font-mono font-bold text-white">{liquidTotalCost.toLocaleString("vi-VN")}đ</span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">2. Chi phí hũ hột vỏ chai lọ:</span>
                            <span className="font-mono font-bold text-white">{packagingTotalCost.toLocaleString("vi-VN")}đ</span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">3. Thiết kế hũ hộp, mã vạch, logo:</span>
                            <span className="font-bold text-emerald-green uppercase text-[10px] tracking-wider">MIỄN PHÍ 100%</span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span className="font-light">4. Phí kiểm nghiệm, pháp lý công bố:</span>
                            <span className="font-mono font-bold text-white">{legalCost > 0 ? `${legalCost.toLocaleString("vi-VN")}đ` : "Miễn phí"}</span>
                          </div>
                        </div>

                        {/* Grand Total */}
                        <div className="pt-5 border-t border-stone-800 space-y-1">
                          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">TỔNG ĐẦU TƯ DỰ KIẾN:</span>
                          <p className="text-[10px] text-stone-500 font-light block mb-2">(Khởi nghiệp trọn gói đạt cGMP)</p>
                          <div className="text-3xl font-black text-emerald-green">
                            {totalInvestment.toLocaleString("vi-VN")} <span className="text-sm font-bold">đ</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons - Adds custom formulation to standard cart or downloads report */}
                      <div className="space-y-3 pt-6 border-t border-stone-800">
                        <button
                          onClick={() => {
                            const packText = estPackagingType === "standard" ? "PE/PET" : estPackagingType === "glass" ? "Thủy tinh mờ" : "Acrylic";
                            const sampleName = `${estProductLine} (Dự toán riêng - Lô: ${estQty.toLocaleString("vi-VN")} sp, Vỏ: ${packText})`;
                            handleAddToSampleCart(sampleName);
                          }}
                          className="w-full bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-xs py-4 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <ShoppingBag className="w-4 h-4 text-white" />
                          Đặt Mẫu Thử Nghiệm Ngay
                        </button>
                        <button
                          onClick={() => {
                            window.print();
                          }}
                          className="w-full bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          In Bảng Dự Toán
                        </button>
                      </div>

                      <p className="text-[10px] text-stone-500 text-center leading-relaxed">
                        ⚠ Báo giá mang tính chất tham khảo dự thảo đầu tư. Đơn giá chính thức sẽ được AVÉSA phê duyệt sau khi khách hàng test chất kem mẫu thử ưng ý và xác định quy cách đóng hộp tem chống giả.
                      </p>
                    </div>
                  </div>

                </div>

                {/* FILTERABLE STANDARD PRICE SHEET TABLE */}
                <div className="space-y-6 pt-8 border-t border-stone-200">
                  <div className="text-left space-y-2">
                    <h3 className="text-xl font-serif font-bold text-stone-900">Bảng giá tham khảo chi tiết mọi danh mục sản phẩm</h3>
                    <p className="text-stone-500 text-xs font-light">Lọc nhanh theo từ khóa để tìm kiếm mức MOQ thô tiêu chuẩn.</p>
                  </div>

                  {/* Filtering Search Bar */}
                  <div className="flex bg-white border border-stone-200 rounded-2xl p-3 shadow-2xs items-center gap-3 max-w-lg text-left">
                    <Search className="w-5 h-5 text-stone-400 shrink-0 ml-1" />
                    <input 
                      type="text" 
                      placeholder="Lọc nhanh dòng mỹ phẩm (ví dụ: serum, kem...)"
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
                            <th className="py-4.5 px-6 font-bold text-satin-gold">Danh mục mỹ phẩm gia công</th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">Sản lượng tối thiểu (MOQ)</th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">Giá thành tham khảo / sản phẩm</th>
                            <th className="py-4.5 px-6 font-bold text-satin-gold">Quy chuẩn đóng gói</th>
                            <th className="py-4.5 px-6 font-bold text-center text-satin-gold">Thời gian hoàn thành</th>
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
                                Không tìm thấy dữ liệu trùng khớp. Vui lòng nhập từ khóa khác hoặc liên hệ trực tiếp.
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
                      <Info className="w-4 h-4 text-satin-gold" /> Đơn giá đã bao gồm những gì?
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">Đơn giá thô đã bao gồm chi phí bán thành phẩm, pha chế đồng nhũ hóa, chai lọ tiêu chuẩn chuẩn nắp vòi bơm, in nhãn decal và màng co nilon bảo vệ.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Boxes className="w-4 h-4 text-satin-gold" /> Hỗ trợ startup vốn mỏng
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">Chúng tôi có chính sách chia nhỏ lô hàng thử nghiệm với MOQ tối thiểu chỉ từ 500-1000 đơn vị cho lô hàng đầu tiên để giảm áp lực tồn kho của quý khách.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-satin-gold" /> Tư vấn báo giá chuyên sâu
                    </span>
                    <p className="text-stone-500 font-light leading-relaxed">Bạn cần một thiết kế công thức hoạt chất hiếm hoặc lọ đựng đặt riêng? Hãy thử ngay Trợ lý R&D AI ở trang chủ hoặc gửi liên hệ cho chúng tôi.</p>
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
              {/* Header */}
              <div className="text-left space-y-3 max-w-3xl border-b border-stone-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Thông tin thị trường & kiến thức</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                  Cẩm nang gia công & Xu hướng mỹ phẩm
                </h1>
                <p className="text-stone-500 text-sm">
                  Cập nhật các phân tích pháp lý công bố mỹ phẩm mới nhất và các báo cáo xu hướng nguyên liệu đang bùng nổ trên thế giới.
                </p>
              </div>

              {/* Filters & Search sub-bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setBlogCategoryFilter("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      blogCategoryFilter === "all" 
                        ? "bg-stone-900 text-white" 
                        : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    Tất cả bài viết
                  </button>
                  <button 
                    onClick={() => setBlogCategoryFilter("cẩm nang")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      blogCategoryFilter === "cẩm nang" 
                        ? "bg-stone-900 text-white" 
                        : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    Cẩm nang gia công
                  </button>
                  <button 
                    onClick={() => setBlogCategoryFilter("xu hướng")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      blogCategoryFilter === "xu hướng" 
                        ? "bg-stone-900 text-white" 
                        : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    Xu hướng nguyên liệu
                  </button>
                </div>

                <div className="flex items-center gap-2 border border-stone-200 rounded-xl bg-stone-50 px-3 py-1.5 w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Tìm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {filteredBlogPosts.length > 0 ? (
                  filteredBlogPosts.map((post, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedBlog(post)}
                      className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row"
                    >
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full sm:w-48 h-56 sm:h-auto object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-6 space-y-4 flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <span className="bg-emerald-green/10 text-emerald-green text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
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
                    Không tìm thấy bài viết nào khớp với bộ lọc hiện tại.
                  </div>
                )}
              </div>
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
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-green">Liên hệ cosbuilt</span>
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
                          className="py-16 text-center space-y-4 flex flex-col items-center justify-center"
                        >
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10" />
                          </div>
                          <h3 className="font-serif font-bold text-xl text-stone-900">Gửi Yêu Cầu Thành Công!</h3>
                          <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
                            Cảm ơn quý khách đã tin tưởng thương hiệu <strong className="text-stone-800 font-bold">cosbuilt</strong>. Bộ phận phát triển dự án đã ghi nhận yêu cầu của quý khách và sẽ liên hệ trực tiếp qua số điện thoại để gửi tặng mẫu vật lý trong vòng 2 giờ.
                          </p>
                          <span className="text-xs text-stone-400 italic">Mã số hồ sơ của bạn: CB-2026-{(Math.floor(Math.random() * 90000) + 10000)}</span>
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
          {activeTab === "crm" && (
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
                customProducts={customProducts}
                sheetsConfig={sheetsConfig}
                setCustomBlogPosts={setCustomBlogPosts}
                setCustomImages={setCustomImages}
                setCustomLogos={setCustomLogos}
                setWebsiteLogo={setWebsiteLogo}
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

      {/* BLOG READ MORE DIALOG/MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-stone-100 shadow-2xl"
            >
              <div className="h-56 relative border-b border-stone-100">
                <img 
                  src={selectedBlog.image} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 bg-stone-950/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-900 cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-green/10 text-emerald-green text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {selectedBlog.category}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">Đăng ngày: {selectedBlog.date}</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-snug">
                  {selectedBlog.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold border-b border-stone-100 pb-3">
                  <User className="w-4 h-4 text-emerald-green" />
                  <span>Tác giả: {selectedBlog.author}</span>
                </div>
                
                <p className="text-stone-800 text-sm leading-relaxed font-light whitespace-pre-line">
                  {selectedBlog.content}
                </p>

                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100/80 mt-6 space-y-3">
                  <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">Muốn phát triển dòng sản phẩm đón đầu xu hướng này?</h4>
                  <p className="text-xs text-stone-500">Hãy liên hệ với chúng tôi, phòng Lab của Cosbuilt sẵn sàng thử nghiệm mẫu thử miễn phí dựa trên đề tài nghiên cứu này.</p>
                  <button 
                    onClick={() => {
                      setSelectedBlog(null);
                      handleTabChange("contact");
                    }}
                    className="bg-emerald-green hover:bg-emerald-green-dark text-white font-bold text-[11px] px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Đăng ký nhận mẫu test vật lý
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

      {/* QUICK VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductDetails(null)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-stone-200 shadow-2xl relative z-10 text-left flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Image and quick info */}
              <div className="w-full md:w-[320px] shrink-0 bg-stone-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
                <div className="space-y-4">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden relative border border-stone-100">
                    <img 
                      src={selectedProductDetails.image} 
                      alt={selectedProductDetails.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      -{selectedProductDetails.discountPercent}% OFF
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-emerald-green uppercase tracking-wider block">{selectedProductDetails.lab}</span>
                    <span className="text-stone-400 text-[10px] font-semibold uppercase tracking-wider block">ID công thức: {selectedProductDetails.id.toUpperCase()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 space-y-2">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">ĐỊNH HƯỚNG SỬ DỤNG</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProductDetails.skinTypes.map((skin, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-700 border border-stone-200 rounded-md px-2 py-0.5 text-[9px] font-bold">
                        {skin}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Tabbed Content & CTA */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Rating & Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400 font-bold">({selectedProductDetails.reviewsCount} đánh giá lâm sàng)</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                      {selectedProductDetails.title}
                    </h3>
                  </div>

                  {/* Pricing row */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-red-500">{(selectedProductDetails.price * detailsQuantity).toLocaleString("vi-VN")} đ</span>
                    <span className="text-xs text-stone-400 line-through">{(selectedProductDetails.originalPrice * detailsQuantity).toLocaleString("vi-VN")} đ</span>
                    <span className="text-[10px] text-stone-500 font-medium">/ {detailsQuantity} mẫu thử</span>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-stone-200 text-xs">
                    {(["mô tả", "thành phần", "cảm quan"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveDetailsTab(tab)}
                        className={`pb-2.5 px-4 font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                          activeDetailsTab === tab
                            ? "border-emerald-green text-emerald-green"
                            : "border-transparent text-stone-400 hover:text-stone-700"
                        }`}
                      >
                        {tab === "mô tả" ? "Mô tả mẫu" : tab === "thành phần" ? "Thành phần" : "Cảm quan test"}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Display */}
                  <div className="text-xs text-stone-600 leading-relaxed font-light min-h-[100px] bg-stone-50 p-4 rounded-xl border border-stone-150">
                    {activeDetailsTab === "mô tả" && (
                      <div className="space-y-1.5">
                        <strong className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">Thông số công thức:</strong>
                        <p>{selectedProductDetails.description}</p>
                      </div>
                    )}
                    {activeDetailsTab === "thành phần" && (
                      <div className="space-y-1.5">
                        <strong className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">Hoạt chất dược mỹ phẩm chính:</strong>
                        <p>{selectedProductDetails.ingredients}</p>
                      </div>
                    )}
                    {activeDetailsTab === "cảm quan" && (
                      <div className="space-y-1.5">
                        <strong className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">Hướng dẫn thẩm định tại phòng Lab:</strong>
                        <p>{selectedProductDetails.guidelines}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Counter & Action CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-stone-100">
                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between border border-stone-200 rounded-xl px-3 py-2 w-full sm:w-32 shrink-0">
                    <button 
                      onClick={() => setDetailsQuantity(prev => Math.max(1, prev - 1))}
                      className="text-stone-500 hover:text-stone-800 font-bold px-2 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold text-stone-800">{detailsQuantity}</span>
                    <button 
                      onClick={() => setDetailsQuantity(prev => prev + 1)}
                      className="text-stone-500 hover:text-stone-800 font-bold px-2 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Sample cart Button */}
                  <button
                    onClick={() => {
                      handleAddToSampleCart(selectedProductDetails.title);
                      setSelectedProductDetails(null);
                    }}
                    className="flex-1 bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    Đặt Mẫu Thử Nghiệm
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {activeTab !== "crm" && <Footer onTabChange={handleTabChange} onToggleAdminMode={handleToggleAdminMode} />}
    </div>
  );
}
