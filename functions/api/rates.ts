// Public FX rates for the price display (VND per USD, KRW per USD).
// Source: open.er-api.com (daily mid-market rates). Cached at the edge for an hour;
// if the feed fails we answer 503 and the site falls back to built-in rates.
interface Env {}

export const onRequestGet: PagesFunction<Env> = async ({ request, waitUntil }: any) => {
  const cache = (caches as any).default as Cache;
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", { cf: { cacheTtl: 3600 } } as any);
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const data: any = await res.json();
    const vndPerUsd = Number(data?.rates?.VND);
    const krwPerUsd = Number(data?.rates?.KRW);
    if (!(vndPerUsd > 1000) || !(krwPerUsd > 100)) throw new Error("bad rates");
    const out = Response.json(
      {
        vndPerUsd,
        krwPerUsd,
        updated: String(data?.time_last_update_utc || "").slice(0, 16) || new Date().toISOString().slice(0, 10),
        source: "open.er-api.com",
      },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    );
    waitUntil?.(cache.put(request, out.clone()));
    return out;
  } catch {
    return Response.json({ error: "rates unavailable" }, { status: 503 });
  }
};
