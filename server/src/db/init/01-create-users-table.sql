
CREATE  TABLE   users (
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL UNIQUE,
    hash_password   TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);