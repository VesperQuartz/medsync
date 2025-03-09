import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { AppointmentSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class AllAppointemnt {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(): Promise<AppointmentSelectType[]> {
    const [error, appointment] = await to(
      this.appointmentRepo.findAllAppointment(),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
}
