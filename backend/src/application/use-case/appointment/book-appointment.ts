import {
  format,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  addMinutes,
  addDays,
} from "date-fns";
import { match } from "ts-pattern";
import { Appointments } from "@/core/domain/entities/appointments/index.js";
import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { StaffRepositoryImpl } from "@/infrastructure/repositories/staffs.js";
import { AppointmentSelectType } from "@/shared/schema.js";

export class BookAppointment {
  constructor(
    private appointmentRepo: AppointmentRepositoryImpl,
    private staffRepo: StaffRepositoryImpl,
  ) {}

  async execute(payload: {
    patientId: number;
    doctorId: number;
    reason: string;
    duration: number;
  }): Promise<AppointmentSelectType> {
    const doctor = await this.staffRepo.findStaffByID(payload.doctorId);
    if (!doctor) throw new Error("Doctor not found.");
    if (!doctor.staff?.available)
      throw new Error("Doctor is currently unavailable.");

    const availableDays = doctor.staff.daysAvailable
      .toString()
      .split(",")
      .map((day) => day.trim().toLowerCase());

    let appointmentDate = new Date();
    let formattedDay = format(appointmentDate, "EEEE").toLowerCase();

    while (!availableDays.includes(formattedDay)) {
      appointmentDate = addDays(appointmentDate, 1);
      formattedDay = format(appointmentDate, "EEEE").toLowerCase();
    }

    let [shiftStartHour, shiftEndHour] = match(doctor.staff.shift)
      .with("morning", () => [9, 12])
      .with("afternoon", () => [14, 17])
      .with("night", () => [19, 22])
      .otherwise(() => {
        throw new Error("Invalid shift assigned to doctor.");
      });

    let appointmentTime = setHours(appointmentDate, shiftStartHour);
    appointmentTime = setMinutes(appointmentTime, 0);
    appointmentTime = setSeconds(appointmentTime, 0);

    if (isBefore(appointmentTime, new Date())) {
      appointmentTime = addDays(appointmentTime, 1);
    }

    while (true) {
      const formattedDate = format(appointmentTime, "yyyy-MM-dd HH:mm:ss");

      const conflicts =
        await this.appointmentRepo.findDoctorAppointmentsInRange(
          payload.doctorId,
          formattedDate,
          payload.duration,
        );

      if (conflicts.length === 0) {
        const appointment: Appointments = {
          patientId: payload.patientId,
          doctorId: payload.doctorId,
          date: formattedDate,
          reason: payload.reason,
          duration: payload.duration,
        };

        return await this.appointmentRepo.save(appointment);
      }

      appointmentTime = addMinutes(appointmentTime, payload.duration);

      if (appointmentTime.getHours() >= shiftEndHour) {
        appointmentDate = addDays(appointmentDate, 1);
        formattedDay = format(appointmentDate, "EEEE").toLowerCase();

        while (!availableDays.includes(formattedDay)) {
          appointmentDate = addDays(appointmentDate, 1);
          formattedDay = format(appointmentDate, "EEEE").toLowerCase();
        }

        appointmentTime = setHours(appointmentDate, shiftStartHour);
        appointmentTime = setMinutes(appointmentTime, 0);
        appointmentTime = setSeconds(appointmentTime, 0);
      }
    }
  }
}
