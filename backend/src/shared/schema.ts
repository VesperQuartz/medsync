import {
  appointments,
  doctorStaffDetails,
  medicalRecords,
  payments,
  users,
} from "@/infrastructure/database/schema.js";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const UserInsertSchema = createInsertSchema(users, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(6),
  name: (schema) => schema.min(3),
  dateOfBirth: z.coerce.date(),
  role: z.enum(["nurse", "doctor", "admin", "patient"]),
});
export const UserSelectSchemaWithToken = createSelectSchema(users).merge(
  z.object({ token: z.string() }),
);
export const UserSelectSchema = createSelectSchema(users);
export const UserLoginSchema = UserInsertSchema.pick({
  email: true,
  password: true,
});

export const StaffInsertSchema = createInsertSchema(doctorStaffDetails);
export const StaffSelectSchema = createSelectSchema(doctorStaffDetails);

export const AppointmentInsertSchema = createInsertSchema(appointments, {
  date: z.coerce.date(),
});
export const AppointmentSelectSchema = createSelectSchema(appointments);

export const PaymentSelectSchema = createSelectSchema(payments);
export const PaymentInsertSchema = createInsertSchema(payments);

export const RecordSelectSchema = createSelectSchema(medicalRecords);
export const RecordInsertSchema = createInsertSchema(medicalRecords);

export type UserSelectType = InferSelectModel<typeof users>;
export type UserInsertSchemaType = InferInsertModel<typeof users>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;

export type StaffInsertSchemaType = InferInsertModel<typeof doctorStaffDetails>;
export type StaffSelectType = InferSelectModel<typeof doctorStaffDetails>;

export type PaymentInsertSchemaType = InferInsertModel<typeof payments>;
export type PaymentSelectType = InferSelectModel<typeof payments>;

export type AppointmentInsertSchemaType = InferInsertModel<typeof appointments>;
export type AppointmentSelectType = InferSelectModel<typeof appointments>;

export type RecordInsertSchemaType = InferInsertModel<typeof medicalRecords>;
export type RecordSelectSchemaType = InferSelectModel<typeof medicalRecords>;
