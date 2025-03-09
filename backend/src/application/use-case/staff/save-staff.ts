import { Staff } from "@/core/domain/entities/staff/index.js";
import { StaffRepositoryImpl } from "@/infrastructure/repositories/staffs.js";

export class SaveStaff {
  constructor(private staffRepository: StaffRepositoryImpl) {}
  async execute(payload: Staff) {
    const seedAvail = [
      ["monday", "wednesday", "friday"],
      ["tuesday", "thursday", "saturday"],
    ];
    const shifts = ["morning", "afternoon", "evening"];
    const shift = Math.floor(Math.random() * shifts.length);
    const pick = Math.floor(Math.random() * seedAvail.length);
    const available = seedAvail[pick];
    const data = await this.staffRepository.save({
      ...payload,
      shift: shifts[shift],
      daysAvailable: available,
    });
    return data;
  }
}
