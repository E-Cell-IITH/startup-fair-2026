package schema

type LoginRequestSchema struct {
	IdToken string `json:"id_token"`
}

type LoginUserResponse struct {
	UserID string `json:"user_id"`
}

type DBCheckUserResponse struct {
	UserId   string `db:"user_id"`
	Username string `db:"username"`
	IsAdmin  bool   `db:"is_admin"`
}

type UserDetailsResponse struct {
	UserID     string `json:"user_id"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	IsAdmin    bool   `json:"is_admin"`
	AmountLeft int    `json:"amount_left"`
	Investments []UserInvestments `json:"user_investments"`
}

type UserInvestments struct{
	StartupName string `json:"startup_name"`
	InvestmentPrice int `json:"investment_price"`
}
