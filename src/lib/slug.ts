// Turn any string (incl. Vietnamese) into a URL-safe slug. Shared by the public
// router and the admin editors so an article's saved slug always matches the URL
// the site resolves it at (/tin-tuc/<slug>).
export const slugify = (input: string): string =>
  (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
