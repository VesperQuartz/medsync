import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { to } from "await-to-ts";

export class UpdateStatus {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(id: number, status: string): Promise<void> {
    const [error] = await to(
      this.appointmentRepo.updateAppointmentStatus(id, status),
    );
    if (error) {
      throw error;
    }
  }
}
