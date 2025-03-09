import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { AppointmentSelectType, StaffSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class ShowStaffAppointment {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(id: number): Promise<
    {
      staff: StaffSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.findAllDoctorAppointmentById(id),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
}
