DROP INDEX "doctor_staff_details_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'pending';--> statement-breakpoint
CREATE UNIQUE INDEX `doctor_staff_details_user_id_unique` ON `doctor_staff_details` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);