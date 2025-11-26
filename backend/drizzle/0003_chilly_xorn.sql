ALTER TABLE "blog_posts" RENAME COLUMN "url" TO "post_url";--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "read_time" SET DEFAULT -1;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "read_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "categories" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_title_unique" UNIQUE("title");