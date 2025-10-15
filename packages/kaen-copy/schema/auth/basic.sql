-- Core user accounts
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at    TIMESTAMP NOT NULL DEFAULT now(),
    updated_at    TIMESTAMP NOT NULL DEFAULT now(),
    -- your app-specific fields
    email         TEXT UNIQUE,
    username      TEXT UNIQUE,
    display_name  TEXT,
    -- optional: profile info
    avatar_url    TEXT
);

-- Keys = login methods (password, OAuth, etc.)
CREATE TABLE auth_keys (
    id           TEXT PRIMARY KEY,   -- e.g. "email:alice@example.com" or "github:12345"
    user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hashed_password TEXT,            -- null for OAuth logins
    provider_type  TEXT NOT NULL,    -- "password", "oauth"
    provider_id    TEXT,             -- e.g. "github"
    provider_user_id TEXT,           -- e.g. GitHub’s numeric user ID
    created_at     TIMESTAMP NOT NULL DEFAULT now()
);

-- Sessions = active logins
CREATE TABLE sessions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at    TIMESTAMP NOT NULL DEFAULT now(),
    expires_at    TIMESTAMP NOT NULL,   -- session expiration
    idle_expires  TIMESTAMP,            -- optional: sliding expiration
    -- optional metadata
    ip_address    TEXT,
    user_agent    TEXT
);

-- (Optional) OAuth tokens for refresh / API access
CREATE TABLE oauth_tokens (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_key_id     TEXT NOT NULL REFERENCES auth_keys(id) ON DELETE CASCADE,
    access_token    TEXT,
    refresh_token   TEXT,
    expires_at      TIMESTAMP,
    scopes          TEXT[]
);
