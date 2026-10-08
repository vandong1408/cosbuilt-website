import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";
import { CURRENCY_BY_LANG, Currency, FALLBACK_RATES, Rates, convertTextMoney, formatMoney } from "../lib/currency";

interface CurrencyCtx {
  currency: Currency;
  rates: Rates;
  /** Format a VND amount in the currency of the current language. */
  fmt: (vnd: number) => string;
  /** Format a VND range. */
  fmtRange: (minVnd: number, maxVnd: number) => string;
  /** Convert VND amounts embedded in a text. */
  money: (text: string) => string;
}

const Ctx = createContext<CurrencyCtx | undefined>(undefined);
const KEY = "cosbuilt_fx";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [rates, setRates] = useState<Rates>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const { at, r } = JSON.parse(raw);
        if (Date.now() - at < 6 * 3600 * 1000 && r?.vndPerUsd > 1000) return r as Rates;
      }
    } catch { /* ignore */ }
    return FALLBACK_RATES;
  });

  useEffect(() => {
    if (rates.updated !== "fallback") return;
    fetch("/api/rates")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || !(d.vndPerUsd > 1000) || !(d.krwPerUsd > 100)) return;
        const r: Rates = { vndPerUsd: d.vndPerUsd, krwPerUsd: d.krwPerUsd, updated: d.updated || "live" };
        setRates(r);
        try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), r })); } catch { /* ignore */ }
      })
      .catch(() => {});
  }, [rates.updated]);

  const currency = CURRENCY_BY_LANG[language];
  const value = useMemo<CurrencyCtx>(() => ({
    currency,
    rates,
    fmt: (vnd) => formatMoney(vnd, currency, rates),
    fmtRange: (a, b) => `${formatMoney(a, currency, rates)} – ${formatMoney(b, currency, rates)}`,
    money: (text) => convertTextMoney(text, currency, rates),
  }), [currency, rates]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency must be used within a CurrencyProvider");
  return c;
}
