CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" text NOT NULL,
	"description" text NOT NULL,
	"read_time" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"technologies" text[] NOT NULL,
	"github" text NOT NULL,
	"featured" boolean NOT NULL,
	"demo" text NOT NULL
);
