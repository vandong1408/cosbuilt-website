// Runtime translation of admin-managed content (products, articles, gallery…).
// tr(text) returns the cached translation for the current language, or the original
// text while it loads (and for Vietnamese). One request runs at a time (small batches,
// back-off on errors); results are cached in localStorage and on the server, so every
// text is translated once for everybody.
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

const VI = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;
const LS = "cosbuilt_tr_v1";
const BATCH_MAX = 10;
const BATCH_CHARS = 5000;

type Store = Record<string, string>;
// Hand-checked translations of the current site content (products, articles, gallery,
// certificates, partners, researcher). Loaded on demand per language; anything not in
// here (e.g. content an admin adds later) falls back to the cached machine translation.
const DICTS: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  en: () => import("../lib/i18n/content.en.json"),
  ko: () => import("../lib/i18n/content.ko.json"),
};

const Ctx = createContext<(text: string) => string>((t) => t);

const loadStore = (): Store => { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch { return {}; } };

export function TranslateProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const store = useRef<Store>(loadStore());
  const pending = useRef<Set<string>>(new Set());   // "lang|text"
  const failed = useRef<Map<string, number>>(new Map());
  const running = useRef(false);
  const timer = useRef<number | null>(null);
  const [version, bump] = useState(0);
  const dicts = useRef<Record<string, Record<string, string>>>({});

  useEffect(() => {
    if (language === "vi" || dicts.current[language] || !DICTS[language]) return;
    DICTS[language]().then((m) => { dicts.current[language] = m.default; bump((n) => n + 1); }).catch(() => {});
  }, [language]);

  const pump = useCallback(async () => {
    timer.current = null;
    if (running.current) return;
    running.current = true;
    try {
      while (pending.current.size) {
        const keys = [...pending.current];
        const lang = keys[0].split("|", 1)[0];
        const batch: string[] = [];
        let size = 0;
        for (const k of keys) {
          if (!k.startsWith(`${lang}|`)) continue;
          const text = k.slice(lang.length + 1);
          if (batch.length >= BATCH_MAX || (batch.length && size + text.length > BATCH_CHARS)) break;
          batch.push(k); size += text.length;
        }
        batch.forEach((k) => pending.current.delete(k));
        const texts = batch.map((k) => k.slice(lang.length + 1));
        let ok = false;
        try {
          const ctrl = new AbortController();
          const to = window.setTimeout(() => ctrl.abort(), 70000);
          const res = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target: lang, strings: texts }), signal: ctrl.signal });
          window.clearTimeout(to);
          if (!res.ok) throw new Error(String(res.status));
          const { translations } = await res.json();
          batch.forEach((k, i) => { if (typeof translations?.[i] === "string") store.current[k] = translations[i]; });
          try { localStorage.setItem(LS, JSON.stringify(store.current)); } catch { /* quota */ }
          ok = true;
        } catch {
          batch.forEach((k) => failed.current.set(k, Date.now()));
        }
        bump((n) => n + 1);
        if (!ok) await new Promise((r) => setTimeout(r, 5000));   // back off after an error
      }
    } finally {
      running.current = false;
    }
  }, []);

  const tr = useCallback((text: string): string => {
    if (!text || language === "vi" || !VI.test(text)) return text;
    const dict = dicts.current[language];
    if (dict) {
      const exact = dict[text] ?? dict[text.trim()];
      if (exact) return exact;
    }
    const key = `${language}|${text}`;
    const hit = store.current[key];
    if (hit) return hit;
    // Wait for the dictionary before asking the server, so known texts never cost a request.
    if (!dict && DICTS[language]) return text;
    const failedAt = failed.current.get(key);
    if ((!failedAt || Date.now() - failedAt > 60000) && !pending.current.has(key)) {
      pending.current.add(key);
      if (!running.current && timer.current === null) timer.current = window.setTimeout(pump, 150);
    }
    return text;
  }, [language, pump, version]);

  return <Ctx.Provider value={tr}>{children}</Ctx.Provider>;
}

export const useTr = () => useContext(Ctx);
