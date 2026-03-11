package db

import (
	"context"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
)

func CanUserInvest(userID string, amount int, ctx context.Context) (bool, error) {

	query := `
	SELECT amount_left
	FROM users
	WHERE user_id = $1
	`

	var balance int

	err := config.DB.QueryRow(ctx, query, userID).Scan(&balance)
	if err != nil {
		return false, err
	}

	if balance < amount {
		return false, nil
	}

	return true, nil
}

func InvestInStartup(userID string, startupID int, amount int, ctx context.Context) error {

	tx, err := config.DB.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	// 1️ Insert investment (no amount column in schema)
	_, err = tx.Exec(ctx, `
	INSERT INTO investments(user_id, startup_id)
	VALUES ($1, $2)
	`, userID, startupID)

	if err != nil {
		return err
	}

	// 2️ Decrease user balance
	_, err = tx.Exec(ctx, `
	UPDATE users
	SET amount_left = amount_left - $1
	WHERE user_id = $2
	`, amount, userID)

	if err != nil {
		return err
	}

	// 3️ Increase startup valuation
	_, err = tx.Exec(ctx, `
	UPDATE startups
	SET current_valuation = current_valuation + $1
	WHERE startup_id = $2
	`, amount, startupID)

	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}