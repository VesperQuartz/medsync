import { Appointments } from "../domain/entities/appointments/index.js";
import { Staff } from "../domain/entities/staff/index.js";
import { User } from "../domain/entities/user/index.js";

export interface AppointmentRepository {
  save(appointments: Appointments): Promise<Appointments>;
  findAllAppointment(): Promise<Appointments[]>;
  findPatientAppointmentById(id: number): Promise<
    {
      users: User | null;
      appointments: Appointments | null;
    }[]
  >;
  findDoctorAppointmentById(id: number): Promise<{
    staff: Staff | null;
    appointments: Appointments | null;
  }>;
  findDoctorAppointmentsInRange(
    doctorId: number,
    startTime: string,
    duration: number,
  ): Promise<Appointments[]>;
}
