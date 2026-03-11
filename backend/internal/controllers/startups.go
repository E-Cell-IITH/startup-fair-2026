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
func GetAllStartups(c *gin.Context) {

	ctx := c.Request.Context()

	startups, err := db.GetAllStartups(ctx)
	if err != nil {

		log.Println("Error fetching startups:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message":  "Failed to fetch startups",
			"startups": nil,
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"startups": startups,
	})
}

func DeleteStartup(c *gin.Context) {

	userID := c.GetString("user_id")
	isAdmin := c.GetBool("is_admin")

	ctx := c.Request.Context()

	// verify role from DB
	dbRole, err := helpers.GetRoleOfUser(userID, ctx)
	if err != nil {
		log.Println("Error verifying role:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to verify role",
		})
		return
	}

	// prevent JWT tampering
	if isAdmin != dbRole || !dbRole {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Admin access required",
		})
		return
	}

	startupID := c.Param("id")

	err = db.DeleteStartup(startupID, ctx)
	if err != nil {

		log.Println("Error deleting startup:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to delete startup",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Startup deleted successfully",
	})
}

func UpdateStartup(c *gin.Context) {

	userID := c.GetString("user_id")
	isAdmin := c.GetBool("is_admin")

	ctx := c.Request.Context()

	// verify role from DB
	dbRole, err := helpers.GetRoleOfUser(userID, ctx)
	if err != nil {
		log.Println("Error verifying role:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to verify role",
		})
		return
	}

	// prevent JWT tampering
	if isAdmin != dbRole || !dbRole {

		c.JSON(http.StatusForbidden, gin.H{
			"message": "Admin access required",
		})

		return
	}

	startupID := c.Param("id")

	// bind request body
	var req schema.UpdateStartupRequest

	err = c.ShouldBindJSON(&req)
	if err != nil {

		log.Println("Error binding request:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})

		return
	}

	err = db.UpdateStartup(
		startupID,
		req.StartupName,
		req.StartupDescription,
		ctx,
	)

	if err != nil {

		log.Println("Error updating startup:", err)

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to update startup",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Startup updated successfully",
	})
}
