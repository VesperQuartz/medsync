DROP INDEX "doctor_staff_details_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `appointments` ALTER COLUMN "date" TO "date" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_staff_details_user_id_unique` ON `doctor_staff_details` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `appointments` ADD `duration` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `doctor_staff_details` ALTER COLUMN "available" TO "available" integer NOT NULL DEFAULT 1;