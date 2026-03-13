-- +migrate Up
ALTER TABLE investments
ADD COLUMN investment_price INT NOT NULL DEFAULT 0;