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

  return new Response(object.body, { headers });
};
