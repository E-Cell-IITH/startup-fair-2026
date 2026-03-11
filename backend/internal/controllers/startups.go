package controllers

import (
	"log"
	"net/http"

	"github.com/E-Cell-IITH/startup-fair-2026/internal/db"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/helpers"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/schema"
	"github.com/gin-gonic/gin"
)

func AddStartup(c *gin.Context) {

	user_id := c.GetString("user_id")
	isAdmin := c.GetBool("is_admin")

	ctx := c.Request.Context()

	// verify role from DB
	dbRole, err := helpers.GetRoleOfUser(user_id, ctx)
	if err != nil {
		log.Println("Error in getting role", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to verify role",
		})
		return
	}

	// prevent tampered JWT
	if isAdmin != dbRole || !dbRole {

		c.JSON(http.StatusForbidden, gin.H{
			"message": "Admin access required",
		})

		return
	}

	// bind request
	var req schema.AddStartupRequest

	err = c.ShouldBindJSON(&req)
	if err != nil {

		log.Println("Error binding request", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})

		return
	}

	// insert startup
	err = db.InsertStartup(
		req.StartupName,
		req.StartupDescription,
		ctx,
	)

	if err != nil {

		log.Println("Error inserting startup", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create startup",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Startup added successfully",
	})
}