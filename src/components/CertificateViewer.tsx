// Khung xem giấy tờ / chứng nhận toàn màn hình (dùng ở trang Giới thiệu và landing
// /catalogue). Đóng bằng nút ✕, bấm nền tối hoặc phím Esc; chuyển giấy bằng ‹ ›,
// phím mũi tên hoặc vuốt ngang trên điện thoại. Portal ra <body> để không bị
// transform của các khối animation làm lệch vị trí (xem ghi chú admin editor).
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export interface ViewableDoc { name: string; issuer?: string; image?: string }

export default function CertificateViewer({
  docs, index, onClose, onIndexChange,
}: {
  docs: ViewableDoc[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const { language } = useLanguage();
  const L = (vi: string, en: string, ko: string) => (language === "en" ? en : language === "ko" ? ko : vi);
  const withImage = docs.filter((d) => d.image);
  const open = index !== null && index >= 0 && index < docs.length && !!docs[index]?.image;
  const touchX = useRef<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Chỉ chuyển giữa các giấy có ảnh.
  const step = (dir: 1 | -1) => {
    if (index === null) return;
    for (let k = 1; k <= docs.length; k++) {
      const j = (index + dir * k + docs.length) % docs.length;
      if (docs[j]?.image) return onIndexChange(j);
    }
  };

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  });

  if (!open) return null;
  const doc = docs[index!];
  const pos = withImage.indexOf(doc) + 1;
  const multi = withImage.length > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-stone-950/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={doc.name}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null || !multi) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      {/* Thanh trên: tên giấy + nút đóng */}
      <div className="flex items-start justify-between gap-3 px-4 sm:px-6 pt-[max(12px,env(safe-area-inset-top))] pb-3 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0 pt-1">
          <p className="font-serif font-bold text-base sm:text-lg leading-snug line-clamp-2">{doc.name}</p>
          <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 truncate">
            {multi && <span className="text-satin-gold font-bold mr-2">{pos} / {withImage.length}</span>}
            {doc.issuer}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={doc.image}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" /> {L("Mở ảnh gốc", "Open original", "원본 열기")}
          </a>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label={L("Đóng", "Close", "닫기")}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ảnh giấy tờ */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-16 pb-4">
        <img
          key={doc.image}
          src={doc.image}
          alt={doc.name}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full object-contain rounded-lg bg-white shadow-2xl"
        />
        {multi && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label={L("Giấy trước", "Previous", "이전")}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur transition cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label={L("Giấy sau", "Next", "다음")}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur transition cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Nút đóng lớn phía dưới cho điện thoại */}
      <div className="sm:hidden px-4 pb-[max(16px,env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-stone-900 cursor-pointer">
          {L("Đóng", "Close", "닫기")}
        </button>
      </div>
    </div>,
    document.body
  );
}
