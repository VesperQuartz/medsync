import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { to } from "await-to-ts";

export class DeleteAppointment {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(id: number): Promise<void> {
    const [error] = await to(this.appointmentRepo.deleteAppointmentById(id));
    if (error) {
      throw error;
    }
  }
}
