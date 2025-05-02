-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role SMALLINT NOT NULL
);

-- Currencies
CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL
);

-- Exchange Rates
CREATE TABLE exchange_rates (
    id SERIAL PRIMARY KEY,
    currency_id INTEGER NOT NULL,
    rate DECIMAL(10, 4) NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (currency_id) REFERENCES currencies(id) ON DELETE CASCADE
);

-- Wallets
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    currency_id INTEGER NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currencies(id) ON DELETE RESTRICT
);

-- Transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INTEGER NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type SMALLINT NOT NULL, -- 1=deposit, 2=withdrawal, 3=transfer, etc.
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);


CREATE OR REPLACE FUNCTION validate_email(p_email VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    IF p_email ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' THEN
        RETURN TRUE;
    ELSE
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
