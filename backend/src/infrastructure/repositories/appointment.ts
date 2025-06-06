import { to } from "await-to-ts";
import { appointments, doctorStaffDetails, users } from "../database/schema.js";
import {
  AppointmentSelectType,
  StaffSelectType,
  UserSelectType,
} from "@/shared/schema.js";
import { FastifyInstance } from "fastify";
import { AppointmentRepository } from "@/core/repositories/appointments.js";
import { Appointments } from "@/core/domain/entities/appointments/index.js";
import { and, eq, sql } from "drizzle-orm";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  constructor(private appointmentRepo: FastifyInstance) {}
  async updateAppointmentStatus(id: number, status: string): Promise<void> {
    const [error] = await to(
      this.appointmentRepo.db
        .update(appointments)
        .set({
          status,
        })
        .where(eq(appointments.id, id)),
    );
    if (error) {
      throw error;
    }
  }
  async deleteAppointmentById(id: number): Promise<void> {
    const [error] = await to(
      this.appointmentRepo.db
        .delete(appointments)
        .where(eq(appointments.id, id)),
    );
    if (error) {
      throw error;
    }
  }
  async findAllAppointment(): Promise<AppointmentSelectType[]> {
    const [error, appointment] = await to(
      this.appointmentRepo.db.select().from(appointments),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
  async findPatientAppointmentById(id: number): Promise<
    {
      users: UserSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.db
        .select({ users, appointments })
        .from(appointments)
        .leftJoin(users, eq(users.id, appointments.patientId))
        .where(eq(users.id, id)),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
  async findAllOverallAppointment(): Promise<
    {
      users: UserSelectType | null;
      staff: StaffSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.db
        .select({ users, appointments, staff: doctorStaffDetails })
        .from(appointments)
        .leftJoin(users, eq(users.id, appointments.patientId))
        .leftJoin(
          doctorStaffDetails,
          eq(doctorStaffDetails.userId, appointments.doctorId),
        ),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }

  async findDoctorAppointmentsInRange(
    doctorId: number,
    startTime: string,
    duration: number,
  ): Promise<AppointmentSelectType[]> {
    const endTime = sql`DATETIME(${startTime}, '+' || ${duration} || ' minutes')`;

    return this.appointmentRepo.db
      .select()
      .from(appointments)
      .where(
        sql`
          doctor_id = ${doctorId} 
          AND (
            (date BETWEEN ${startTime} AND ${endTime}) 
            OR (${startTime} BETWEEN date AND DATETIME(date, '+' || ${duration} || ' minutes'))
          )
        `,
      );
  }
  async findDoctorAppointmentByTime(
    doctorId: number,
    date: string,
  ): Promise<Appointments | null> {
    const [error, result] = await to(
      this.appointmentRepo.db
        .select()
        .from(appointments)
        .where(
          and(eq(appointments.doctorId, doctorId), eq(appointments.date, date)),
        )
        .limit(1),
    );
    if (error) {
      throw error;
    }

    return result.length > 0 ? result[0] : null;
  }

  async findDoctorAppointmentById(id: number): Promise<{
    staff: StaffSelectType | null;
    appointments: AppointmentSelectType | null;
  }> {
    const [error, appointment] = await to(
      this.appointmentRepo.db
        .select({ staff: doctorStaffDetails, appointments })
        .from(appointments)
        .leftJoin(
          doctorStaffDetails,
          eq(doctorStaffDetails.userId, appointments.doctorId),
        )
        .where(eq(doctorStaffDetails.userId, id)),
    );
    if (error) {
      throw error;
    }
    return appointment[0];
  }
  async findAllDoctorAppointmentById(id: number): Promise<
    {
      staff: StaffSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.db
        .select({ staff: doctorStaffDetails, appointments })
        .from(appointments)
        .leftJoin(
          doctorStaffDetails,
          eq(doctorStaffDetails.userId, appointments.doctorId),
        )
        .where(eq(doctorStaffDetails.userId, id)),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }

  async save(payload: Appointments): Promise<AppointmentSelectType> {
    const [error, appointment] = await to(
      this.appointmentRepo.db.insert(appointments).values(payload).returning(),
    );
    if (error) {
      throw error;
    }
    return appointment[0];
  }
}
