CREATE TABLE IF NOT EXISTS staff_accounts (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  token TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_staff_token ON staff_accounts(token);
CREATE INDEX IF NOT EXISTS idx_staff_username ON staff_accounts(username);
