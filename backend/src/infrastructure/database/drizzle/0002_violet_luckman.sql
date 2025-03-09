DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `appointments` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `doctor_staff_details` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `medical_records` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text DEFAULT (CURRENT_TIMESTAMP);