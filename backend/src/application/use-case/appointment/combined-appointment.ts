import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import {
  AppointmentSelectType,
  StaffSelectType,
  UserSelectType,
} from "@/shared/schema.js";
import { to } from "await-to-ts";

export class ShowAllAppointment {
  constructor(private appointmentRepo: AppointmentRepositoryImpl) {}

  async execute(): Promise<
    {
      users: UserSelectType | null;
      staff: StaffSelectType | null;
      appointments: AppointmentSelectType | null;
    }[]
  > {
    const [error, appointment] = await to(
      this.appointmentRepo.findAllOverallAppointment(),
    );
    if (error) {
      throw error;
    }
    return appointment;
  }
}
