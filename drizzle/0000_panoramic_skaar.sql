DO $$ BEGIN
 CREATE TYPE "public"."question_type" AS ENUM('question', 'situation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "multiversal-mishaps_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_actual_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"image" varchar(255),
	CONSTRAINT "multiversal-mishaps_actual_users_username_unique" UNIQUE("username"),
	CONSTRAINT "multiversal-mishaps_actual_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_deck" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(2000) NOT NULL,
	"description" varchar(2000) NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"isPublic" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_question" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"text" varchar(2000),
	"question_type" "question_type" NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"deck" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	CONSTRAINT "multiversal-mishaps_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "multiversal-mishaps_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_account" ADD CONSTRAINT "multiversal-mishaps_account_user_id_multiversal-mishaps_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."multiversal-mishaps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_deck" ADD CONSTRAINT "multiversal-mishaps_deck_created_by_multiversal-mishaps_actual_users_email_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_actual_users"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_post" ADD CONSTRAINT "multiversal-mishaps_post_created_by_multiversal-mishaps_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_question" ADD CONSTRAINT "multiversal-mishaps_question_created_by_multiversal-mishaps_actual_users_email_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_actual_users"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_question" ADD CONSTRAINT "multiversal-mishaps_question_deck_multiversal-mishaps_deck_id_fk" FOREIGN KEY ("deck") REFERENCES "public"."multiversal-mishaps_deck"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_session" ADD CONSTRAINT "multiversal-mishaps_session_user_id_multiversal-mishaps_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."multiversal-mishaps_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "multiversal-mishaps_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "multiversal-mishaps_post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "multiversal-mishaps_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "multiversal-mishaps_session" USING btree ("user_id");