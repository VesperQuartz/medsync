import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { AppointmentSelectType, UserSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class ShowUserAppointment {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(id: number): Promise<
    {
      users: UserSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.findPatientAppointmentById(id),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
}
