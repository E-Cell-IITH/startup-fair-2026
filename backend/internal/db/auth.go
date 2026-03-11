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


func InsertNewUser(username string, email string,  ctx context.Context) error {
	query := "insert into users (username, email, is_admin) values ($1,$2,$3)"
	_, err := config.DB.Exec(ctx, query, username, email, false)
	if err != nil {
		return err
	}
	return nil
}


func GetUserDetails(ctx context.Context, userId string) (schema.UserDetailsResponse, error) {
	query := `select username, is_admin, email, amount_left from users where user_id = $1`
	var userResponse schema.UserDetailsResponse
	err := config.DB.QueryRow(ctx, query, userId).Scan(&userResponse.Username, &userResponse.IsAdmin, &userResponse.Email, &userResponse.AmountLeft)
	return userResponse, err
}
