-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    amount_left INT DEFAULT 10000
);

-- =========================
-- STARTUPS
-- =========================
CREATE TABLE startups (
    startup_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    startup_name TEXT NOT NULL,
    startup_description TEXT,
    current_valuation INT NOT NULL
);

-- =========================
-- INVESTMENTS
-- =========================
CREATE TABLE investments (
    investment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    startup_id INT NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_startup
        FOREIGN KEY(startup_id)
        REFERENCES startups(startup_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_startup
        UNIQUE(user_id, startup_id)
);