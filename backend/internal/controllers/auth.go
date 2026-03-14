package controllers

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/E-Cell-IITH/startup-fair-2026/internal/db"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/helpers"
	"github.com/E-Cell-IITH/startup-fair-2026/internal/schema"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"google.golang.org/api/idtoken"
)

func Login(c *gin.Context) {
	// get the idToken from frontend
	var req schema.LoginRequestSchema
	var response schema.LoginUserResponse
	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		log.Println("Error in auth", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid ID Token",
			"user":    response,
		})
		return
	}
	// validate idToken
	ctx := c.Request.Context()
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	idToken := req.IdToken
	payload, err := idtoken.Validate(ctx, idToken, clientID)
	if err != nil {
		log.Println("Error in auth", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to validate idToken",
			"user":    response,
		})
		return
	}
	// get user details
	email := payload.Claims["email"].(string)
	username := payload.Claims["name"].(string)
	// if user exists get username, email, role
	_, err = db.GetUserDetailsByEmail(ctx, email)
	if err != nil {
		if err == pgx.ErrNoRows {
			err := db.InsertNewUser(username, email, ctx)
			if err != nil {
				log.Println("Error in auth", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"message": "Failed to insert user",
					"user":    response,
				})
				return
			}
		} else {
			log.Println("Error in auth", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get user details",
				"user":    response,
			})
			return
		}
	}
	dbUser, err := db.GetUserDetailsByEmail(ctx, email)
	if err != nil {
		log.Println("Error in auth", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get user details from db",
			"user":    response,
		})
		return
	}
	response.UserID = dbUser.UserId
	// generate a jwt with user_id and role
	token, err := helpers.GenerateJWT(dbUser.UserId, dbUser.IsAdmin, 24*time.Hour)
	if err != nil {
		log.Println("Error in auth", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to generate jwt",
			"user":    response,
		})
		return
	}
	// send response to user
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie(
		"token",     // name
		token,       // value
		86400,       // seconds (24h)
		"/",         // path
		"startup-fair-2026.onrender.com", // domain
		true,       // secure (true in HTTPS)
		true,        // httpOnly
	)
	c.JSON(http.StatusOK, gin.H{
		"user_details": response,
	})
}

func Logout(c *gin.Context) {
	c.SetCookie(
		"token", // cookie name
		"",      // empty value
		-1,      // MaxAge (-1 deletes cookie)
		"/",     // path
		"startup-fair-2026.onrender.com",      // domain
		true,   // secure (true if using HTTPS)
		true,    // httpOnly
	)

	c.JSON(200, gin.H{
		"message": "Logged out successfully",
	})
}

func GetUser(c *gin.Context) {
	// get user details
	userId := c.GetString("user_id")
	ctx := c.Request.Context()
	// get user details from db
	user, err := db.GetUserDetails(ctx, userId)

	if err != nil {
		log.Println("Error in getting user", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get user details",
			"user":    user,
		})
		return
	}
	user.UserID = userId

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
