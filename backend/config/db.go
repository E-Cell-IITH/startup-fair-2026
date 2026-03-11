package config

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func ConnectPSQL() {
	connURL := os.Getenv("DB_URL")

	var err error
	DB, err = pgxpool.New(context.Background(), connURL)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Connected to the PostgreSQL database!")
}
