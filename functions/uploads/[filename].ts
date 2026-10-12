import type { Env } from "../_shared/types";

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const filename = params.filename as string;
  const object = await env.UPLOADS.get(filename);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  // Stored files are images: never let the browser sniff them into another type, and
  // give any document opened directly no scripting context.
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Content-Security-Policy", "default-src 'none'; sandbox");

  return new Response(object.body, { headers });
};
