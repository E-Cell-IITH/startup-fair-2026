package db

import (
	"context"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/schema"
)

func GetUserDetailsByEmail(ctx context.Context, email string) (schema.DBCheckUserResponse, error) {
	query := "select user_id, username, is_admin from users where email = $1"
	var dbResponse schema.DBCheckUserResponse
	err := config.DB.QueryRow(ctx, query, email).Scan(&dbResponse.UserId, &dbResponse.Username, &dbResponse.IsAdmin)
	return dbResponse, err
}

func InsertNewUser(username string, email string, ctx context.Context) error {
	query := "insert into users (username, email, is_admin) values ($1,$2,$3)"
	_, err := config.DB.Exec(ctx, query, username, email, false)
	if err != nil {
		return err
	}
	return nil
}

func GetUserDetails(ctx context.Context, userId string) (schema.UserDetailsResponse, error) {

	var userResponse schema.UserDetailsResponse

	// Get user basic details
	userQuery := `
	SELECT user_id, username, email, is_admin, amount_left
	FROM users
	WHERE user_id = $1
	`

	err := config.DB.QueryRow(ctx, userQuery, userId).
		Scan(
			&userResponse.UserID,
			&userResponse.Username,
			&userResponse.Email,
			&userResponse.IsAdmin,
			&userResponse.AmountLeft,
		)

	if err != nil {
		return userResponse, err
	}

	// Get investments
	investmentQuery := `
	SELECT s.startup_name, i.investment_price
	FROM investments i
	JOIN startups s ON s.startup_id = i.startup_id
	WHERE i.user_id = $1
	`

	rows, err := config.DB.Query(ctx, investmentQuery, userId)
	if err != nil {
		return userResponse, err
	}
	defer rows.Close()

	for rows.Next() {
		var inv schema.UserInvestments

		err := rows.Scan(&inv.StartupName, &inv.InvestmentPrice)
		if err != nil {
			return userResponse, err
		}

		userResponse.Investments = append(userResponse.Investments, inv)
	}

	return userResponse, nil
}
