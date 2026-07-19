-- Replaces sheets_config.json (single JSON blob keyed by "sheets_config")
CREATE TABLE IF NOT EXISTS kv_store (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Replaces leads_data.json
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  brandName TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Chăm sóc da mặt',
  moq TEXT NOT NULL DEFAULT '1000',
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Chờ xử lý',
  notes TEXT NOT NULL DEFAULT '',
  createdAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_createdAt ON leads(createdAt);
