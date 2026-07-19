import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Award, 
  ShieldCheck, 
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

interface FooterProps {
  onTabChange: (tabId: string, subId?: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-satin-gold via-emerald-green to-emerald-green-dark py-1.5 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Brief */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <div className="w-9 h-9 bg-emerald-green rounded-lg flex items-center justify-center border border-satin-gold/20 shadow-md">
                <span className="text-satin-gold font-serif font-bold text-base tracking-wider">cb</span>
              </div>
              <span className="text-lg font-serif font-black tracking-wider text-white">
                cosbuilt
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Cosbuilt là đơn vị gia công hóa mỹ phẩm và chăm sóc cá nhân chuẩn CGMP ASEAN hàng đầu thế giới. Chúng tôi kiến tạo những sản phẩm an toàn, mang hiệu quả đột phá từ nguồn dược liệu thiên nhiên kết hợp nghiên cứu khoa học đỉnh cao.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-satin-gold" />
                <span className="text-stone-300">Dây chuyền chuẩn CGMP ASEAN</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Award className="w-4 h-4 text-satin-gold" />
                <span className="text-stone-300">Đạt chứng nhận ISO 9001, ISO 22716</span>
              </div>
            </div>
          </div>

          {/* Core Services Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              Dịch vụ gia công
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onTabChange("services", "oem-odm")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> Gia công OEM/ODM trọn gói
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "formula-development")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> R&D và Phát triển công thức độc quyền
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "packaging-print")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> Thiết kế & in ấn bao bì hũ chai lọ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "legal-service")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> Hồ sơ pháp lý, công bố Bộ Y Tế
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "logistics")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> Thông quan quốc tế & CFS xuất khẩu
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              Danh mục gia công
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onTabChange("categories", "facial-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> Chăm sóc da mặt (Serum, kem dưỡng...)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "body-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> Chăm sóc cơ thể (Sữa tắm, lotion...)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "hair-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> Chăm sóc tóc (Dầu gội bưởi, xịt mọc tóc)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "makeup")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> Son môi & Trang điểm (Son kem lì, cushion)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "personal-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> Vệ sinh cá nhân (Dung dịch vệ sinh...)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "new-tech")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left text-emerald-green"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-green" /> Gia công công nghệ mới (Exosome, Liposome...)
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters & Factories info */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              Văn phòng & Nhà máy
            </h4>
            <div className="space-y-3 text-xs text-stone-400 leading-relaxed font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-satin-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Trụ sở chính:</strong> 110/2/2F Đường số 30, Phường An Nhơn, TP. Hồ Chí Minh, Việt Nam.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-satin-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Nhà máy CGMP:</strong> Lô A7, Đường Số 4, KCN Hiệp Phước, Nhà Bè, TP. Hồ Chí Minh.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-satin-gold shrink-0" />
                <span>Hotline: (+84) 966 373 686</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-satin-gold shrink-0" />
                <span>Giờ làm việc: 08:00 - 17:30 (Thứ 2 - Thứ 7)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="border-t border-stone-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-[11px]">
          <div>
            © 2026 <strong>cosbuilt Co., Ltd.</strong> All rights reserved. Tiêu chuẩn quốc tế CGMP ASEAN.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-all">Chính sách bảo mật công thức</a>
            <a href="#" className="hover:text-stone-300 transition-all">Điều khoản hợp tác</a>
            <a href="#" className="hover:text-stone-300 transition-all">Sơ đồ nhà máy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
