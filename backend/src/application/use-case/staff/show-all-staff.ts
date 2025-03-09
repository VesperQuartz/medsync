import { StaffRepositoryImpl } from "@/infrastructure/repositories/staffs.js";

export class ShowAllStaff {
  constructor(private staffRepository: StaffRepositoryImpl) {}
  async execute() {
    const data = await this.staffRepository.findAllStaff();
    return data;
  }
}
