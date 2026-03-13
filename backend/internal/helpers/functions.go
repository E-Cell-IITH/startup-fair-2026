package helpers

import (
	"context"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
)

func GetRoleOfUser(user_id string, ctx context.Context) (bool, error) {
	query := `select is_admin from users where user_id = $1`
	var is_admin bool
	err := config.DB.QueryRow(ctx, query, user_id).Scan(&is_admin)
	return is_admin, err
}
