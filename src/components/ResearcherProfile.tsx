import { Award, Briefcase, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import { RESEARCHER_HUR } from "../data";

/**
 * Rich profile card for Cosbuilt's lead R&D researcher (Hur Beom-Chul).
 * Reused on both the homepage and the "Đội ngũ R&D" tab of the About page.
 * The portrait falls back to an elegant monogram placeholder until a photo
 * URL is set in `RESEARCHER_HUR.image`.
 */
export default function ResearcherProfile({
  profile = RESEARCHER_HUR,
  image
}: {
  profile?: typeof RESEARCHER_HUR;
  /** Overrides the portrait (e.g. the admin-managed URL); falls back to profile.image. */
  image?: string;
}) {
  const portrait = image || profile.image;
  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Header: portrait + intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 relative bg-gradient-to-br from-stone-900 to-stone-800 min-h-[260px] flex items-center justify-center overflow-hidden">
          {portrait ? (
            <img
              src={portrait}
              alt={profile.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center px-6 py-12">
              <div className="w-24 h-24 rounded-full border-2 border-emerald-green/40 bg-emerald-green/10 flex items-center justify-center">
                <span className="font-serif font-black text-3xl text-emerald-green tracking-wider">{profile.initials}</span>
              </div>
              <span className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Ảnh chân dung đang cập nhật</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 p-8 sm:p-10 text-left space-y-4">
          <span className="bg-emerald-green-light text-emerald-green text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
            {profile.badge}
          </span>
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{profile.name}</h3>
            <p className="text-emerald-green font-bold text-xs sm:text-sm mt-1.5">{profile.role}</p>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">{profile.intro}</p>
        </div>
      </div>

      {/* Body: three achievement blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-150 border-t border-stone-150">
        <div className="bg-white p-6 sm:p-8 text-left space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-green shrink-0" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800">Kinh nghiệm chuyên môn</h4>
          </div>
          <ul className="space-y-3">
            {profile.experience.map((exp, idx) => (
              <li key={idx} className="text-xs text-stone-600 leading-relaxed">
                <span className="font-bold text-stone-900 block">{exp.year}</span>
                <span className="font-light">{exp.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 text-left space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-green shrink-0" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800">Giải thưởng & Vinh danh</h4>
          </div>
          <ul className="space-y-3">
            {profile.awards.map((award, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-stone-600 leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-light">{award}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 text-left space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-green shrink-0" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800">Thành tựu sản phẩm & doanh số</h4>
          </div>
          <ul className="space-y-3">
            {profile.achievements.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-stone-600 leading-relaxed">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-green shrink-0 mt-0.5" />
                <span className="font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
