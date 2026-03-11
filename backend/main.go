package main

import (
	"log"
	"os"

	"github.com/E-Cell-IITH/startup-fair-2026/config"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/routes"
)

func init() {
	config.Init()
}

func main() {
	// Get port from .env
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback
	}
	defer config.DB.Close()
	// Get router from router
	r := routes.SetUpRouter()
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err) // fallback
	}
}
