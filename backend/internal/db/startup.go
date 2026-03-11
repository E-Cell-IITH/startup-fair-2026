package db

import (
	"context"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
)

func InsertStartup(name string, description string, ctx context.Context) error {

	query := `
	INSERT INTO startups(startup_name,startup_description,current_valuation)
	VALUES ($1,$2,$3)
	`

	_, err := config.DB.Exec(ctx, query, name, description, 0)

	return err
}
