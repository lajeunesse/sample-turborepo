CREATE TABLE IF NOT EXISTS "notes.auth_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"hashed_password" text
);
