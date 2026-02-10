-- Create a new table 'migration' with a primary key and columns
CREATE TABLE IF NOT EXISTS migration (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    applied_at TIMESTAMP NOT NULL DEFAULT NOW()
);