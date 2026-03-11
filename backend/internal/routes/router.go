package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes(r *gin.Engine) {
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "working",
		})
	})
	
	// auth routes 
	// login , logout 

	// admin routes 
	// add startup 

	// user routes 
	// buy

	// public route 
	// check leaderboard 

}
