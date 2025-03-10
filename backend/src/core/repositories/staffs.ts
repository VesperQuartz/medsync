import { StaffSelectType, UserSelectType } from "@/shared/schema.js";
import { Staff } from "../domain/entities/staff/index.js";

export interface StaffRepository {
  save(staff: Staff): Promise<Staff>;
  findAllStaff(): Promise<
    Array<{
      users: UserSelectType | null;
      staff: Staff | null;
    }>
  >;
  findStaffByID(id: number): Promise<{
    users: UserSelectType | null;
    staff: StaffSelectType | null;
  }>;
}
