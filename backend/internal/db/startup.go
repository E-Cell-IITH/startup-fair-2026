package db

import (
	"context"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/schema"
)

func InsertStartup(name string, description string, ctx context.Context) error {

	query := `
	INSERT INTO startups(startup_name,startup_description,current_valuation)
	VALUES ($1,$2,$3)
	`

	_, err := config.DB.Exec(ctx, query, name, description, 0)

	return err
}

func GetAllStartups(ctx context.Context) ([]schema.Startup, error) {

	query := `
	SELECT startup_id,startup_name,startup_description,current_valuation
	FROM startups
	ORDER BY startup_id
	`

	rows, err := config.DB.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var startups []schema.Startup

	for rows.Next() {

		var s schema.Startup

		err := rows.Scan(
			&s.StartupID,
			&s.StartupName,
			&s.StartupDescription,
			&s.CurrentValuation,
		)

		if err != nil {
			return nil, err
		}

		startups = append(startups, s)
	}

	return startups, nil
}

func DeleteStartup(startupID string, ctx context.Context) error {

	query := `
	DELETE FROM startups
	WHERE startup_id = $1
	`

	_, err := config.DB.Exec(ctx, query, startupID)

	return err
}

func UpdateStartup(
	startupID string,
	name string,
	description string,
	ctx context.Context,
) error {

	query := `
	UPDATE startups
	SET startup_name = $1,
	    startup_description = $2
	WHERE startup_id = $3
	`

	_, err := config.DB.Exec(ctx, query, name, description, startupID)
	if err != nil {
		return err
	}

	return nil
}
