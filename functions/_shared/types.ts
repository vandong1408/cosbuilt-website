export interface Env {
  DB: D1Database;
  UPLOADS: R2Bucket;
  GEMINI_API_KEY: string;
  ADMIN_TOKEN: string;
  // Optional staff password: content (articles/products/images) + view leads &
  // update their status. Cannot delete leads, change Google Sheets config, or
  // access admin settings. Unset = staff login disabled.
  STAFF_TOKEN?: string;
}
