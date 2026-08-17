import { useState, FormEvent } from "react";
import { 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  Sparkles,
  Heart,
  ShoppingBag,
  Star,
  Globe
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tabId: string, subId?: string) => void;
  onSearch: (query: string) => void;
  sampleCartCount: number;
  onToggleSampleCart: () => void;
  websiteLogo?: { name: string; slogan?: string; image?: string };
  isAdminMode?: boolean;
}

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onSearch,
  sampleCartCount,
  onToggleSampleCart,
  websiteLogo = { name: "COSBUILT" },
  isAdminMode = false
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-white border-b border-stone-200 text-stone-600 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span>{t("hotline")}: <strong>0966 373 686</strong></span>
            <span className="text-stone-300">|</span>
            {/* Custom Premium Dropdown Language Selector */}
            <div className="relative z-50 flex items-center">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 text-stone-700 hover:text-stone-900 font-bold text-[11px] transition-all cursor-pointer shadow-3xs"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-green shrink-0" />
                <span className="tracking-wide">
                  {language === "vi" ? "Tiếng Việt" : language === "en" ? "English" : "한국어"}
                </span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-250 ${langOpen ? "rotate-180 text-emerald-green" : ""}`} />
              </button>

              {langOpen && (
                <>
                  {/* Overlay to close on outside click */}
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setLangOpen(false)} />
                  
                  {/* Dropdown Items list */}
                  <div className="absolute left-0 mt-1 top-full w-36 bg-white border border-stone-200 rounded-lg shadow-lg py-1.5 z-50 divide-y divide-stone-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("vi");
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[11px] hover:bg-stone-50 transition-all font-semibold flex items-center justify-between cursor-pointer ${
                        language === "vi" 
                          ? "text-emerald-green bg-emerald-green/5 font-extrabold" 
                          : "text-stone-700 hover:text-stone-950"
                      }`}
                    >
                      <span>Tiếng Việt</span>
                      <span className="text-[9px] text-stone-400 bg-stone-100 px-1 py-0.5 rounded font-mono font-bold">VN</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("en");
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[11px] hover:bg-stone-50 transition-all font-semibold flex items-center justify-between cursor-pointer ${
                        language === "en" 
                          ? "text-emerald-green bg-emerald-green/5 font-extrabold" 
                          : "text-stone-700 hover:text-stone-950"
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[9px] text-stone-400 bg-stone-100 px-1 py-0.5 rounded font-mono font-bold">EN</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("ko");
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[11px] hover:bg-stone-50 transition-all font-semibold flex items-center justify-between cursor-pointer ${
                        language === "ko" 
                          ? "text-emerald-green bg-emerald-green/5 font-extrabold" 
                          : "text-stone-700 hover:text-stone-950"
                      }`}
                    >
                      <span>한국어</span>
                      <span className="text-[9px] text-stone-400 bg-stone-100 px-1 py-0.5 rounded font-mono font-bold">KO</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <span className="text-stone-300">|</span>
            <span>VNĐ</span>
          </div>
          <div className="hidden lg:block text-stone-700 font-medium text-[11px] sm:text-xs">
            {t("accept_small_orders")}
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="hidden md:inline">{t("free_delivery")}</span>
            {/* Removed CRM link */}
          </div>
        </div>
      </div>


      {/* Main Logo & Search Bar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div 
            onClick={() => onTabChange("home")}
            className="flex items-center cursor-pointer select-none shrink-0"
          >
            {websiteLogo.image ? (
              <img
                src={websiteLogo.image}
                alt={websiteLogo.name}
                className="h-14 sm:h-16 w-auto object-contain max-w-[220px]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-serif font-black tracking-widest text-stone-950 leading-none">
                  {websiteLogo.name}
                </span>
                {websiteLogo.slogan ? (
                  <span className="text-[10px] font-bold text-stone-400 tracking-[0.25em] uppercase mt-1 self-center">
                    {websiteLogo.slogan}
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Luxury Search Bar (Matching image theme with satin gold highlight button) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center flex-1 max-w-2xl bg-white border-2 border-emerald-green rounded-lg overflow-hidden transition-all shadow-xs"
          >
            <input 
              type="text" 
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-emerald-green hover:bg-emerald-green-dark text-white px-5 py-3.5 transition-all flex items-center justify-center cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Heart & Shopping Bag Actions */}
          <div className="flex items-center gap-3">
            {/* Favorites Icon */}
            <div className="relative p-2 text-stone-800 hover:bg-stone-100 rounded-full cursor-pointer transition-all">
              <Heart className="w-6 h-6 text-stone-700" />
              <span className="absolute -top-0.5 -right-0.5 bg-stone-900 border border-white text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                0
              </span>
            </div>
            
            {/* Cart Icon */}
            <div 
              onClick={onToggleSampleCart}
              className="relative p-2 text-stone-800 hover:bg-stone-100 rounded-full cursor-pointer transition-all"
            >
              <ShoppingBag className="w-6 h-6 text-stone-700" />
              <span className="absolute -top-0.5 -right-0.5 bg-emerald-green border border-white text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                {sampleCartCount}
              </span>
            </div>

            {/* Hamburger menu for mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-800 hover:bg-stone-100 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-green" /> : <Menu className="w-6 h-6 text-emerald-green" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="hidden md:block bg-white border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Left Nav items containing DANH MỤC and standard menus */}
            <div className="flex items-center gap-1">
              
              {/* DANH MỤC SẢN PHẨM button */}
              <div className="relative group">
                <button 
                  onClick={() => onTabChange("categories")}
                  className="bg-emerald-green hover:bg-emerald-green-dark text-white px-6 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer"
                >
                  <Menu className="w-4 h-4 text-white" />
                  <span>{t("menu_directory")}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white opacity-80" />
                </button>
                
                {/* Categories Dropdown */}
                <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-xl py-2 w-64 hidden group-hover:block z-50">
                  <button onClick={() => onTabChange("categories", "facial-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_facial")}</button>
                  <button onClick={() => onTabChange("categories", "body-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_body")}</button>
                  <button onClick={() => onTabChange("categories", "hair-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_hair")}</button>
                  <button onClick={() => onTabChange("categories", "makeup")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_makeup")}</button>
                  <button onClick={() => onTabChange("categories", "personal-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_personal")}</button>
                  <button onClick={() => onTabChange("categories", "new-tech")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold text-emerald-green">{t("cat_new_tech")}</button>
                </div>
              </div>

              {/* Menus */}
              <div className="flex items-center gap-1.5 ml-4">
                
                {/* Trang Chủ */}
                <div className="py-4">
                  <button 
                    onClick={() => onTabChange("home")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "home" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_home")}</span>
                  </button>
                </div>

                {/* Giới Thiệu */}
                <div className="relative group py-4">
                  <button 
                    onClick={() => onTabChange("about")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "about" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_about")}</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-56 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("about", "about-us")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("about_cosbuilt")}</button>
                    <button onClick={() => onTabChange("about", "factory-capacity")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("about_capacity")}</button>
                    <button onClick={() => onTabChange("about", "certifications")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("about_certifications")}</button>
                    <button onClick={() => onTabChange("about", "rd-team")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("about_rd")}</button>
                    <button onClick={() => onTabChange("about", "partners")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("about_partners")}</button>
                  </div>
                </div>

                {/* Dịch Vụ */}
                <div className="relative group py-4">
                  <button 
                    onClick={() => onTabChange("services")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "services" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_services")}</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-64 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("services", "oem-odm")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_oem_odm")}</button>
                    <button onClick={() => onTabChange("services", "formula-development")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_rd")}</button>
                    <button onClick={() => onTabChange("services", "packaging-print")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_packaging")}</button>
                    <button onClick={() => onTabChange("services", "legal-service")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_legal")}</button>
                    <button onClick={() => onTabChange("services", "logistics")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_logistics")}</button>
                    <button onClick={() => onTabChange("services", "cooperation-process")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_process")}</button>
                    <button onClick={() => onTabChange("services", "cooperation-benefits")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">{t("service_benefits")}</button>
                  </div>
                </div>

                {/* Danh Mục Gia Công */}
                <div className="relative group py-4">
                  <button 
                    onClick={() => onTabChange("categories")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "categories" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_categories")}</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-56 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("categories", "facial-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_facial")}</button>
                    <button onClick={() => onTabChange("categories", "body-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_body")}</button>
                    <button onClick={() => onTabChange("categories", "hair-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_hair")}</button>
                    <button onClick={() => onTabChange("categories", "makeup")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_makeup")}</button>
                    <button onClick={() => onTabChange("categories", "personal-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">{t("cat_personal")}</button>
                    <button onClick={() => onTabChange("categories", "new-tech")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold text-emerald-green">{t("cat_new_tech")}</button>
                  </div>
                </div>

                {/* Bảng Giá Gia Công */}
                <div className="relative py-4">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md tracking-wider scale-90 select-none z-10 animate-bounce">
                    {t("menu_new") || "Mới"}
                  </div>
                  <button 
                    onClick={() => onTabChange("pricing")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "pricing" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_pricing")}</span>
                  </button>
                </div>

                {/* Tin Tức */}
                <div className="relative group py-4">
                  <button 
                    onClick={() => onTabChange("news")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "news" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_news")}</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-56 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("news", "manufacturing-guide")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Cẩm nang gia công</button>
                    <button onClick={() => onTabChange("news", "ingredient-trends")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Xu hướng nguyên liệu</button>
                  </div>
                </div>

                {/* Liên Hệ */}
                <div className="py-4">
                  <button 
                    onClick={() => onTabChange("contact")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "contact" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>{t("menu_contact")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side item: Empty placeholder to keep layout balance or empty */}
            <div></div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 p-4 space-y-4 absolute w-full left-0 top-full shadow-lg z-50">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="flex bg-stone-50 border border-stone-250 rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
            />
            <button type="submit" className="bg-emerald-green text-white px-4 py-2">
              <Search className="w-3.5 h-3.5 text-white" />
            </button>
          </form>

          <div className="space-y-1 text-left">
            <button
              onClick={() => { onTabChange("home"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "home" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_home")}
            </button>
            <button
              onClick={() => { onTabChange("about"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "about" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_about")}
            </button>
            <button
              onClick={() => { onTabChange("services"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "services" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_services")}
            </button>
            <button
              onClick={() => { onTabChange("categories"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "categories" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_categories")}
            </button>
            <button
              onClick={() => { onTabChange("pricing"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "pricing" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_pricing")}
            </button>
            <button
              onClick={() => { onTabChange("news"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "news" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_news")}
            </button>
            <button
              onClick={() => { onTabChange("contact"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "contact" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t("menu_contact")}
            </button>
            {/* Removed CRM mobile link */}
          </div>

          {/* No promotional button */}
        </div>
      )}
    </header>
  );
}
