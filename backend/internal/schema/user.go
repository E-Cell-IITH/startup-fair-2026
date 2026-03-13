package schema

type InvestRequest struct {
	StartupID int `json:"startup_id" binding:"required"`
	Amount    int `json:"amount" binding:"required"`
}
