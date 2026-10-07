import { useEffect, useState } from "react";

// Hidden preview tool: open any page with ?tone=emerald|navy|noirbronze|default to try a
// background tone. Visitors without the query string never see it.
const TONES = [
  { id: "default", label: "Hiện tại", sw: ["#F5EFE7", "#9C1C40", "#C9A24D"] },
  { id: "emerald", label: "1 · Ivory & Deep Emerald", sw: ["#FBFBF7", "#17493C", "#B8975A"] },
  { id: "navy", label: "2 · Pearl & Midnight Navy", sw: ["#FAFBFC", "#1B2F55", "#C0A56F"] },
  { id: "noirbronze", label: "3 · Warm White & Noir Bronze", sw: ["#FCFBF9", "#2B221B", "#B08D57"] },
];
const KEY = "cb-tone-preview";

const safeGet = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const safeSet = (v: string | null) => { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch { /* ignore */ } };

export default function ToneSwitcher() {
  const [tone, setTone] = useState<string | null>(() => {
    const q = new URLSearchParams(window.location.search).get("tone");
    if (q && TONES.some((t) => t.id === q)) { safeSet(q); return q; }
    return safeGet();
  });

  useEffect(() => {
    const root = document.documentElement;
    if (tone && tone !== "default") root.setAttribute("data-tone", tone);
    else root.removeAttribute("data-tone");
  }, [tone]);

  if (!tone) return null;

  return (
    <div className="fixed left-4 bottom-4 z-[80] bg-stone-950/95 text-white rounded-2xl border border-white/15 shadow-2xl p-3 w-[270px] backdrop-blur" style={{ colorScheme: "dark" }}>
      <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 px-1 pb-2">Xem thử tone nền</div>
      <div className="space-y-1">
        {TONES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => { setTone(t.id); safeSet(t.id); }}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${tone === t.id ? "bg-white/15 ring-1 ring-white/40" : "hover:bg-white/10"}`}
          >
            <span className="flex -space-x-1 shrink-0">
              {t.sw.map((c, i) => <span key={i} className="w-4 h-4 rounded-full border border-white/40" style={{ background: c }} />)}
            </span>
            <span className="truncate">{t.label}</span>
          </button>
        ))}
      </div>
      <button type="button" onClick={() => { setTone(null); safeSet(null); }} className="mt-2 w-full text-[10px] text-white/50 hover:text-white underline cursor-pointer">
        Đóng bảng xem thử
      </button>
    </div>
  );
}
