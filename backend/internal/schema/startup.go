package schema

type AddStartupRequest struct {
	StartupName        string `json:"startup_name" binding:"required"`
	StartupDescription string `json:"startup_description"`
}

type Startup struct {
	StartupID          int    `json:"startup_id"`
	StartupName        string `json:"startup_name"`
	StartupDescription string `json:"startup_description"`
	
}

type UpdateStartupRequest struct {
	StartupName        string `json:"startup_name" binding:"required"`
	StartupDescription string `json:"startup_description" binding:"required"`
}

type Leaderboard struct {
	StartupName string `json:"startup_name"`
}
