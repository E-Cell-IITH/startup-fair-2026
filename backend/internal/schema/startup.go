package schema 

type AddStartupRequest struct {
	StartupName        string `json:"startup_name" binding:"required"`
	StartupDescription string `json:"startup_description"`
}