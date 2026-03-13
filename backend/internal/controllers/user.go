package controllers

import (
	"log"
	"net/http"

	"github.com/E-Cell-IITH/startup-fair-2026/internal/db"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/schema"
	"github.com/gin-gonic/gin"
)

func Invest(c *gin.Context) {

	userID := c.GetString("user_id")
	ctx := c.Request.Context()

	var req schema.InvestRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	// check if user has enough money
	ok, err := db.CanUserInvest(userID, req.Amount, ctx)
	if err != nil {

		log.Println("Error checking balance:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to verify balance",
		})
		return
	}

	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Insufficient balance",
		})
		return
	}

	err = db.InvestInStartup(userID, req.StartupID, req.Amount, ctx)
	if err != nil {

		log.Println("Error investing:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Investment failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Investment successful",
	})
}
