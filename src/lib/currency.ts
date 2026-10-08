// Currency display for the public site. All stored prices are in VND; the shown
// currency follows the language (vi → VND, en → USD, ko → KRW) and is converted
// with an international mid-market rate (fetched from /api/rates, which proxies
// a public FX feed), then rounded so numbers stay short and readable.
import type { LanguageType } from "./translations";

export type Currency = "VND" | "USD" | "KRW";

export const CURRENCY_BY_LANG: Record<LanguageType, Currency> = { vi: "VND", en: "USD", ko: "KRW" };

export interface Rates {
  /** How many VND one USD buys. */
  vndPerUsd: number;
  /** How many KRW one USD buys. */
  krwPerUsd: number;
  /** ISO date of the rate (or "fallback"). */
  updated: string;
}

// Used only until the live rate arrives (or if the feed is unreachable).
export const FALLBACK_RATES: Rates = { vndPerUsd: 25300, krwPerUsd: 1380, updated: "fallback" };

export function convertFromVnd(vnd: number, to: Currency, r: Rates): number {
  if (to === "VND") return vnd;
  const usd = vnd / r.vndPerUsd;
  return to === "USD" ? usd : usd * r.krwPerUsd;
}

// Round to 2 significant figures (3 below 1) so converted amounts stay short.
function roundNice(v: number): number {
  if (!isFinite(v) || v === 0) return 0;
  const sig = Math.abs(v) < 1 ? 3 : 2;
  const p = Math.pow(10, Math.floor(Math.log10(Math.abs(v))) - (sig - 1));
  return Math.round(v / p) * p;
}

export function formatMoney(vnd: number, cur: Currency, r: Rates): string {
  if (cur === "VND") return `${Math.round(vnd).toLocaleString("vi-VN")}đ`;
  const v = roundNice(convertFromVnd(vnd, cur, r));
  if (cur === "USD") {
    const decimals = v < 10 ? (v < 1 ? 2 : 1) : 0;
    return `$${v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: decimals })}`;
  }
  // KRW: Koreans read large amounts in 만 (10,000) units.
  if (v >= 100000 && v % 10000 === 0) return `${(v / 10000).toLocaleString("ko-KR")}만원`;
  return `${Math.round(v).toLocaleString("ko-KR")}원`;
}

const NUM = String.raw`\d{1,3}(?:[.,]\d{3})+|\d+`;
const UNIT = String.raw`(?:đ|₫|VNĐ|VND|vnđ|vnd)(?![\p{L}])`;
const RANGE_RE = new RegExp(String.raw`(${NUM})(\s*[-–]\s*)(${NUM})\s*(${UNIT})`, "gu");
const SINGLE_RE = new RegExp(String.raw`(${NUM})\s*(${UNIT})`, "gu");

const parseVnd = (s: string) => parseInt(s.replace(/[.,]/g, ""), 10);

/** Rewrite every VND amount found in a text ("60.000đ - 160.000đ", "~3,500đ", "138,000,000 VND"). */
export function convertTextMoney(text: string, cur: Currency, r: Rates): string {
  if (!text || cur === "VND") return text;
  const ranged = text.replace(RANGE_RE, (_m, a, sep, b) => `${formatMoney(parseVnd(a), cur, r)}${sep}${formatMoney(parseVnd(b), cur, r)}`);
  return ranged.replace(SINGLE_RE, (_m, a) => formatMoney(parseVnd(a), cur, r));
}
