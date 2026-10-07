import { useEffect, useMemo, useRef, useState, KeyboardEvent } from "react";
import { Search, X, Package, Newspaper, Briefcase, Layers, Building2, Calculator, FileText, CornerDownLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SearchItem, SearchType, search, highlightParts } from "../lib/siteSearch";

interface SearchBoxProps {
  items: SearchItem[];
  onSelect: (item: SearchItem) => void;
  /** Enter on a product match / no match: fall back to the catalogue filter. */
  onSubmitQuery: (query: string) => void;
  onContact: () => void;
  variant?: "desktop" | "mobile";
  onDone?: () => void;
}

const ICONS: Record<SearchType, typeof Package> = {
  product: Package, article: Newspaper, service: Briefcase, category: Layers,
  about: Building2, pricing: Calculator, page: FileText,
};

const LABELS: Record<SearchType, [string, string, string]> = {
  product: ["Công thức", "Formula", "처방"],
  article: ["Bài viết", "Article", "기사"],
  service: ["Dịch vụ", "Service", "서비스"],
  category: ["Danh mục", "Category", "카테고리"],
  about: ["Giới thiệu", "About", "소개"],
  pricing: ["Bảng giá", "Pricing", "가격"],
  page: ["Trang", "Page", "페이지"],
};

function Marked({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((p, i) =>
        p.m ? <mark key={i} className="bg-satin-gold-light text-stone-900 rounded-sm px-0.5">{p.t}</mark> : <span key={i}>{p.t}</span>
      )}
    </>
  );
}

export default function SearchBox({ items, onSelect, onSubmitQuery, onContact, variant = "desktop", onDone }: SearchBoxProps) {
  const { language, t } = useLanguage();
  const L = (vi: string, en: string, ko: string) => (language === "en" ? en : language === "ko" ? ko : vi);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => search(items, query, 10), [items, query]);
  const hasQuery = query.trim().length > 0;

  useEffect(() => { setActive(-1); }, [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (hit: (typeof hits)[number]) => {
    setOpen(false);
    setQuery("");
    onSelect(hit.item);
    onDone?.();
  };

  const submit = () => {
    if (!hasQuery) return;
    if (active >= 0 && hits[active]) return choose(hits[active]);
    const top = hits[0];
    if (!top || top.item.type === "product") {
      setOpen(false);
      onSubmitQuery(query);
      onDone?.();
      return;
    }
    choose(top);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => (hits.length ? (a + 1) % hits.length : -1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (hits.length ? (a <= 0 ? hits.length - 1 : a - 1) : -1)); }
    else if (e.key === "Escape") { setOpen(false); (e.target as HTMLInputElement).blur(); }
    else if (e.key === "Enter") { e.preventDefault(); submit(); }
  };

  const productCount = useMemo(() => hits.filter((h) => h.item.type === "product").length, [hits]);
  const desktop = variant === "desktop";

  return (
    <div ref={rootRef} className={desktop ? "hidden md:block relative flex-1 max-w-2xl" : "relative"}>
      <div
        role="search"
        className={
          desktop
            ? "flex items-center bg-stone-50 border border-stone-250 focus-within:border-emerald-green focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(156,28,64,0.08)] rounded-full overflow-hidden transition-all"
            : "flex bg-stone-50 border border-stone-250 rounded-lg overflow-hidden"
        }
      >
        <input
          type="text"
          role="combobox"
          aria-expanded={open && hasQuery}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={t("search_placeholder")}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent pl-6 pr-2 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
        />
        {hasQuery && (
          <button type="button" aria-label={L("Xóa", "Clear", "지우기")} onClick={() => { setQuery(""); setOpen(false); }} className="text-stone-400 hover:text-stone-700 px-1.5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          aria-label={L("Tìm kiếm", "Search", "검색")}
          onClick={submit}
          className={desktop ? "bg-emerald-green hover:bg-emerald-green-dark text-white m-1 w-10 h-10 rounded-full transition-all flex items-center justify-center cursor-pointer shrink-0" : "bg-emerald-green text-white px-4 py-2"}
        >
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

      {open && hasQuery && (
        <div
          ref={listRef}
          role="listbox"
          className={`${desktop ? "absolute left-0 right-0 top-full mt-2" : "mt-2"} bg-white border border-stone-200 rounded-2xl shadow-lift z-[60] max-h-[70vh] overflow-y-auto text-left`}
        >
          {hits.length === 0 ? (
            <div className="p-5 text-xs text-stone-600 space-y-3">
              <p>
                {L("Không tìm thấy kết quả cho", "No results for", "검색 결과가 없습니다:")} <strong className="text-stone-900">“{query.trim()}”</strong>
              </p>
              <p className="text-stone-500">{L("Hãy thử từ khóa khác (tên sản phẩm, hoạt chất, dịch vụ…) hoặc để lại thông tin, chuyên viên sẽ tư vấn cho bạn.", "Try another keyword (product, ingredient, service…) or leave your details and our team will assist.", "다른 키워드로 검색하시거나 문의를 남겨 주세요.")}</p>
              <button type="button" onClick={() => { setOpen(false); onContact(); onDone?.(); }} className="bg-emerald-green hover:bg-emerald-green-dark text-white font-semibold px-4 py-2 rounded-full cursor-pointer">
                {L("Liên hệ tư vấn", "Contact us", "문의하기")}
              </button>
            </div>
          ) : (
            <>
              <div className="px-4 pt-3 pb-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400">
                {L("Kết quả", "Results", "결과")}
              </div>
              <ul className="py-1">
                {hits.map((h, i) => {
                  const Icon = ICONS[h.item.type];
                  const label = LABELS[h.item.type][language === "en" ? 1 : language === "ko" ? 2 : 0];
                  return (
                    <li key={h.item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        data-idx={i}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => choose(h)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors ${i === active ? "bg-emerald-green-light" : "hover:bg-stone-50"}`}
                      >
                        <span className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-stone-100 text-emerald-green flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-[13px] text-stone-900 sm:truncate"><Marked text={h.item.title} query={query} /></span>
                            <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 rounded px-1.5 py-0.5">{label}</span>
                          </span>
                          {h.snippet && (
                            <span className="block text-[11px] text-stone-500 leading-snug mt-0.5 line-clamp-2"><Marked text={h.snippet} query={query} /></span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {productCount > 0 && (
                <button
                  type="button"
                  onClick={() => { setOpen(false); onSubmitQuery(query); onDone?.(); }}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 border-t border-stone-150 text-[11px] font-semibold text-emerald-green hover:bg-stone-50 cursor-pointer"
                >
                  <span>{L("Xem tất cả công thức phù hợp trong danh mục", "See all matching formulas in the catalogue", "카탈로그에서 모든 처방 보기")}</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
