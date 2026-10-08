// Runtime translation of admin-managed content (products, articles, gallery…).
// tr(text) returns the cached translation for the current language, or the original
// text while it loads (and for Vietnamese). Requests are batched; results are cached
// in localStorage and on the server, so every text is translated once.
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;
const LS = "cosbuilt_tr_v1";

type Store = Record<string, string>;
const Ctx = createContext<(text: string) => string>((t) => t);

const loadStore = (): Store => { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch { return {}; } };

export function TranslateProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const store = useRef<Store>(loadStore());
  const pending = useRef<Set<string>>(new Set());
  const inflight = useRef<Set<string>>(new Set());
  const failed = useRef<Set<string>>(new Set());
  const timer = useRef<number | null>(null);
  const [, bump] = useState(0);

  const flush = useCallback(async (lang: string) => {
    timer.current = null;
    const all = [...pending.current].filter((s) => !inflight.current.has(s));
    pending.current.clear();
    // Batches of ≤ 30 strings / ~20k chars
    const batches: string[][] = [];
    let cur: string[] = []; let size = 0;
    for (const s of all) {
      if (cur.length >= 30 || size + s.length > 20000) { batches.push(cur); cur = []; size = 0; }
      cur.push(s); size += s.length;
    }
    if (cur.length) batches.push(cur);
    for (const batch of batches) {
      batch.forEach((s) => inflight.current.add(s));
      try {
        const res = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target: lang, strings: batch }) });
        if (!res.ok) throw new Error(String(res.status));
        const { translations } = await res.json();
        batch.forEach((s, i) => { if (typeof translations?.[i] === "string") store.current[`${lang}|${s}`] = translations[i]; });
        try { localStorage.setItem(LS, JSON.stringify(store.current)); } catch { /* quota */ }
      } catch {
        batch.forEach((s) => failed.current.add(`${lang}|${s}`));
      } finally {
        batch.forEach((s) => inflight.current.delete(s));
      }
      bump((n) => n + 1);
    }
  }, []);

  // Drop queued work when the language changes.
  useEffect(() => { pending.current.clear(); }, [language]);

  const tr = useCallback((text: string): string => {
    if (!text || language === "vi" || !VI.test(text)) return text;
    const key = `${language}|${text}`;
    const hit = store.current[key];
    if (hit) return hit;
    if (!failed.current.has(key) && !inflight.current.has(text) && !pending.current.has(text)) {
      pending.current.add(text);
      if (timer.current === null) timer.current = window.setTimeout(() => flush(language), 120);
    }
    return text;
  }, [language, flush]);

  return <Ctx.Provider value={tr}>{children}</Ctx.Provider>;
}

export const useTr = () => useContext(Ctx);
