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
  Star
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tabId: string, subId?: string) => void;
  onSearch: (query: string) => void;
  sampleCartCount: number;
  onToggleSampleCart: () => void;
  websiteLogo?: { name: string; slogan: string };
}

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onSearch,
  sampleCartCount,
  onToggleSampleCart,
  websiteLogo = { name: "COSBUILT", slogan: "ESTD 1999" }
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            <span>Hotline: <strong>0966 373 686</strong></span>
            <span className="text-stone-300">|</span>
            <span>TIẾNG VIỆT</span>
            <span className="text-stone-300">|</span>
            <span>VNĐ</span>
          </div>
          <div className="hidden lg:block text-stone-700 font-medium text-[11px] sm:text-xs">
            🎁 Nhận gia công đơn hàng nhỏ & vừa · Thiết kế & Test mẫu miễn phí
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="hidden md:inline">Miễn phí chuyển phát mẫu thử toàn quốc</span>
            <span className="hidden md:inline text-stone-300">|</span>
            <button 
              onClick={() => onTabChange("crm")}
              className="border border-emerald-green bg-emerald-green/5 text-emerald-green hover:bg-emerald-green hover:text-white transition-all px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
            >
              QUẢN TRỊ CRM
            </button>
          </div>
        </div>
      </div>

      {/* Main Logo & Search Bar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div 
            onClick={() => onTabChange("home")}
            className="flex flex-col items-start cursor-pointer select-none shrink-0"
          >
            <span className="text-2xl sm:text-3xl font-serif font-black tracking-widest text-stone-950 leading-none">
              {websiteLogo.name}
            </span>
            <span className="text-[9px] font-bold text-stone-400 tracking-[0.25em] uppercase mt-1 self-center">
              {websiteLogo.slogan}
            </span>
          </div>

          {/* Luxury Search Bar (Matching image theme with satin gold highlight button) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center flex-1 max-w-2xl bg-white border-2 border-emerald-green rounded-lg overflow-hidden transition-all shadow-xs"
          >
            <input 
              type="text" 
              placeholder="Tìm kiếm công thức..."
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
                  <span>DANH MỤC SẢN PHẨM</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white opacity-80" />
                </button>
                
                {/* Categories Dropdown */}
                <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-xl py-2 w-64 hidden group-hover:block z-50">
                  <button onClick={() => onTabChange("categories", "facial-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc da mặt</button>
                  <button onClick={() => onTabChange("categories", "body-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc body</button>
                  <button onClick={() => onTabChange("categories", "hair-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc tóc</button>
                  <button onClick={() => onTabChange("categories", "makeup")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Trang điểm</button>
                  <button onClick={() => onTabChange("categories", "personal-care")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc cá nhân</button>
                  <button onClick={() => onTabChange("categories", "new-tech")} className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold text-emerald-green">Sản phẩm công nghệ mới ✨</button>
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
                    <span>Trang Chủ</span>
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
                    <span>Giới Thiệu</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-56 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("about", "about-us")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Về Cosbuilt</button>
                    <button onClick={() => onTabChange("about", "factory-capacity")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Nhà máy & Năng lực sản xuất</button>
                    <button onClick={() => onTabChange("about", "certifications")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Chứng nhận</button>
                    <button onClick={() => onTabChange("about", "rd-team")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Đội ngũ R&D</button>
                    <button onClick={() => onTabChange("about", "partners")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Đối tác & khách hàng</button>
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
                    <span>Dịch Vụ</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-64 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("services", "oem-odm")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Gia công OEM/ODM</button>
                    <button onClick={() => onTabChange("services", "formula-development")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Phát triển công thức (R&D)</button>
                    <button onClick={() => onTabChange("services", "packaging-print")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Bao bì & in ấn</button>
                    <button onClick={() => onTabChange("services", "legal-service")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Pháp lý & công bố mỹ phẩm</button>
                    <button onClick={() => onTabChange("services", "logistics")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Vận chuyển – thông quan quốc tế</button>
                    <button onClick={() => onTabChange("services", "cooperation-process")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Quy trình hợp tác</button>
                    <button onClick={() => onTabChange("services", "cooperation-benefits")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-medium">Lợi ích hợp tác</button>
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
                    <span>Danh Mục Gia Công</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 bg-white border border-stone-200 shadow-lg py-2 w-56 hidden group-hover:block z-50">
                    <button onClick={() => onTabChange("categories", "facial-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc da mặt</button>
                    <button onClick={() => onTabChange("categories", "body-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc body</button>
                    <button onClick={() => onTabChange("categories", "hair-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc tóc</button>
                    <button onClick={() => onTabChange("categories", "makeup")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Trang điểm</button>
                    <button onClick={() => onTabChange("categories", "personal-care")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold">Chăm sóc cá nhân</button>
                    <button onClick={() => onTabChange("categories", "new-tech")} className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:text-emerald-green hover:bg-stone-50 transition-all font-semibold text-emerald-green">Công nghệ mới ✨</button>
                  </div>
                </div>

                {/* Bảng Giá Gia Công */}
                <div className="relative py-4">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-90 select-none z-10 animate-bounce">
                    MỚI
                  </div>
                  <button 
                    onClick={() => onTabChange("pricing")}
                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer select-none ${
                      activeTab === "pricing" ? "text-emerald-green font-extrabold" : "text-stone-800 hover:text-emerald-green"
                    }`}
                  >
                    <span>Bảng Giá Gia Công</span>
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
                    <span>Tin Tức</span>
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
                    <span>Liên Hệ</span>
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
              placeholder="Tìm công thức..."
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
              Trang Chủ
            </button>
            <button
              onClick={() => { onTabChange("about"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "about" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Giới Thiệu
            </button>
            <button
              onClick={() => { onTabChange("services"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "services" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Dịch Vụ
            </button>
            <button
              onClick={() => { onTabChange("categories"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "categories" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Danh Mục Gia Công
            </button>
            <button
              onClick={() => { onTabChange("pricing"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "pricing" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Bảng Giá Gia Công
            </button>
            <button
              onClick={() => { onTabChange("news"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "news" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Tin Tức
            </button>
            <button
              onClick={() => { onTabChange("contact"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "contact" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Liên Hệ
            </button>
            <button
              onClick={() => { onTabChange("crm"); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "crm" ? "bg-emerald-green text-white" : "text-stone-800 hover:bg-stone-50"
              }`}
            >
              Quản Trị CRM
            </button>
          </div>

          {/* No promotional button */}
        </div>
      )}
    </header>
  );
}
