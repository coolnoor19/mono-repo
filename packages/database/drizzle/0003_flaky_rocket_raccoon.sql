ALTER TABLE "forms" ADD COLUMN "title" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "title, {length:50}";