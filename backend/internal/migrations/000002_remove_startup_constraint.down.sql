ALTER TABLE investments
ADD CONSTRAINT unique_user_startup
UNIQUE(user_id, startup_id);