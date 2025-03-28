import {
  AppointmentSelectType,
  StaffSelectType,
  UserSelectType,
} from "@/shared/schema.js";
import { Appointments } from "../domain/entities/appointments/index.js";

export interface AppointmentRepository {
  save(appointments: Appointments): Promise<AppointmentSelectType>;
  findAllAppointment(): Promise<AppointmentSelectType[]>;
  findPatientAppointmentById(id: number): Promise<
    {
      users: UserSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  >;
  findDoctorAppointmentById(id: number): Promise<{
    staff: StaffSelectType | null;
    appointments: AppointmentSelectType | null;
  }>;
  deleteAppointmentById(id: number): void;
  updateAppointmentStatus(id: number, status: string): void;
  findDoctorAppointmentsInRange(
    doctorId: number,
    startTime: string,
    duration: number,
  ): Promise<AppointmentSelectType[]>;
  findAllOverallAppointment(): Promise<
    {
      users: UserSelectType | null;
      staff: StaffSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  >;
}
