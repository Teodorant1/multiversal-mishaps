DO $$ BEGIN
 CREATE TYPE "public"."question_type" AS ENUM('question', 'situation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_actual_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_match" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"password" varchar(255),
	"all_questions" varchar(2000)[] DEFAULT '{}'::text[] NOT NULL,
	"question" varchar(2000) NOT NULL,
	"deck" varchar(255) NOT NULL,
	CONSTRAINT "multiversal-mishaps_match_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_player" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"hashed_password" varchar(255) NOT NULL,
	"score" integer DEFAULT 0,
	"answer" varchar(255) DEFAULT '',
	"match" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiversal-mishaps_question" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"text" varchar(2000),
	"isSituation" boolean NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"deck" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_deck" ADD CONSTRAINT "multiversal-mishaps_deck_created_by_multiversal-mishaps_actual_users_username_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_actual_users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_deck" ADD CONSTRAINT "multiversal-mishaps_deck_created_by_multiversal-mishaps_actual_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_actual_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_match" ADD CONSTRAINT "multiversal-mishaps_match_deck_multiversal-mishaps_deck_id_fk" FOREIGN KEY ("deck") REFERENCES "public"."multiversal-mishaps_deck"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_player" ADD CONSTRAINT "multiversal-mishaps_player_match_multiversal-mishaps_match_id_fk" FOREIGN KEY ("match") REFERENCES "public"."multiversal-mishaps_match"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_question" ADD CONSTRAINT "multiversal-mishaps_question_created_by_multiversal-mishaps_actual_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."multiversal-mishaps_actual_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiversal-mishaps_question" ADD CONSTRAINT "multiversal-mishaps_question_deck_multiversal-mishaps_deck_id_fk" FOREIGN KEY ("deck") REFERENCES "public"."multiversal-mishaps_deck"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
