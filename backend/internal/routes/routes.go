package routes

import (
	"net/http"

	"github.com/E-Cell-IITH/startup-fair-2026/internal/controllers"
	middleware "github.com/E-Cell-IITH/startup-fair-2026/internal/middlwares"
	"github.com/gin-gonic/gin"
)

func SetUpRoutes(r *gin.Engine) {
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "working",
		})
	})

	// auth routes
	auth := r.Group("/api/auth")
	{
		auth.POST("/login",controllers.Login)
		auth.GET("/me", middleware.AuthMiddleware(), controllers.GetUser)
	}

	// admin routes
	// add startup
	

	// user routes
	// buy

	// public route
	// check leaderboard

}
