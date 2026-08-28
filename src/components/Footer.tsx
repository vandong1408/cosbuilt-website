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
import { useLanguage } from "../contexts/LanguageContext";

interface FooterProps {
  onTabChange: (tabId: string, subId?: string) => void;
  onToggleAdminMode?: () => void;
  websiteLogo?: { name: string; slogan?: string; image?: string };
}

export default function Footer({ onTabChange, onToggleAdminMode, websiteLogo = { name: "COSBUILT" } }: FooterProps) {
  const { t } = useLanguage();
  const logoInitials = websiteLogo.name?.trim().slice(0, 2).toLowerCase() || "cb";

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-satin-gold via-emerald-green to-emerald-green-dark py-1.5 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Brief */}
          <div className="space-y-4 text-left">
            <div
              onDoubleClick={onToggleAdminMode}
              className="flex items-center gap-2 cursor-pointer select-none"
              title={t("footer_double_click_admin") || "Double click to toggle admin mode"}
            >
              {websiteLogo.image ? (
                <img
                  src={websiteLogo.image}
                  alt={websiteLogo.name}
                  className="h-14 w-auto max-w-[200px] object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <>
                  <div className="w-12 h-12 bg-emerald-green rounded-lg flex items-center justify-center border border-satin-gold/20 shadow-md">
                    <span className="text-satin-gold font-serif font-bold text-lg tracking-wider">{logoInitials}</span>
                  </div>
                  <span className="text-2xl font-serif font-black tracking-wider text-white">
                    {websiteLogo.name}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              {t("footer_intro_desc")}
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-satin-gold" />
                <span className="text-stone-300">{t("cgmp_factory")}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Award className="w-4 h-4 text-satin-gold" />
                <span className="text-stone-300">ISO 9001, ISO 22716 Certified</span>
              </div>
            </div>
          </div>

          {/* Core Services Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              {t("footer_service_title")}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onTabChange("services", "oem-odm")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> {t("service_oem_odm")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "formula-development")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> {t("service_rd")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "packaging-print")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> {t("service_packaging")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "legal-service")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> {t("service_legal")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("services", "logistics")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <ArrowUpRight className="w-3 h-3 text-stone-600" /> {t("service_logistics")}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              {t("footer_cat_title")}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onTabChange("categories", "facial-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_facial")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "body-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_body")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "hair-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_hair")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "makeup")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_makeup")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "personal-care")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_personal")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onTabChange("categories", "new-tech")}
                  className="hover:text-satin-gold transition-all flex items-center gap-1 cursor-pointer text-left"
                >
                  <CheckCircle className="w-3 h-3 text-stone-600" /> {t("cat_new_tech")}
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters & Factories info */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase border-b border-stone-800 pb-2">
              {t("footer_office_title")}
            </h4>
            <div className="space-y-3 text-xs text-stone-400 leading-relaxed font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-satin-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block mb-0.5">{t("footer_office_label")}:</strong>
                  <span>{t("footer_office_address")}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-satin-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block mb-0.5">{t("footer_factory_label")}:</strong>
                  <span>{t("footer_factory_address")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-satin-gold shrink-0" />
                <span>{t("hotline")}: (+84) 966 373 686</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-satin-gold shrink-0" />
                <span>{t("footer_working_hours")}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="border-t border-stone-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-[11px]">
          <div 
            onDoubleClick={onToggleAdminMode}
            className="cursor-default select-none"
            title={t("footer_double_click_admin") || "Double click to toggle admin mode"}
          >
            {t("footer_rights")}
          </div>
          <div className="flex gap-6">
            <button type="button" onClick={() => onTabChange("contact")} className="hover:text-stone-300 transition-all cursor-pointer">{t("footer_policy")}</button>
            <button type="button" onClick={() => onTabChange("contact")} className="hover:text-stone-300 transition-all cursor-pointer">{t("footer_terms")}</button>
            <button type="button" onClick={() => onTabChange("contact")} className="hover:text-stone-300 transition-all cursor-pointer">{t("footer_sitemap")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
