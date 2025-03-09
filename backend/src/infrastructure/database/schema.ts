import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'patient', 'doctor', 'nurse', 'admin'
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const doctorStaffDetails = sqliteTable("doctor_staff_details", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  speciality: text("speciality").notNull(), // Example: Cardiologist, Dermatologist
  shift: text("shift").notNull(), // Example: 'morning', 'afternoon', 'night'
  daysAvailable: text("days_available").$type<string[]>().notNull(), // "Mon,Tue,Wed"
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  available: integer("available").notNull().default(1), // 1 = true, 0 = false
});

// Appointments Table
export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  patientId: integer("patient_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  doctorId: integer("doctor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'cancelled'
  duration: integer("duration").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  reason: text("reason").notNull(),
});

// Billing Table
export const payments = sqliteTable("payments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  patientId: integer("patient_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  appointmentId: integer("appointment_id")
    .notNull()
    .references(() => appointments.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  paymentMethod: text("payment_method").default("credit_card").notNull(), // 'credit_card'
  status: text("status").notNull().default("paid"), // 'paid', 'failed', 'pending'
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

// Medical Records Table
export const medicalRecords = sqliteTable("medical_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  patientId: integer("patient_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  doctorId: integer("doctor_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  appointmentId: integer("appointment_id")
    .notNull()
    .references(() => appointments.id, { onDelete: "cascade" }),
  diagnosis: text("diagnosis").notNull(),
  prescription: text("prescription").notNull(),
  testResults: text("test_results"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
