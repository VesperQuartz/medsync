import { Staff } from "../domain/entities/staff/index.js";
import { User } from "../domain/entities/user/index.js";

export interface StaffRepository {
  save(staff: Staff): Promise<Staff>;
  findAllStaff(): Promise<
    Array<{
      users: User | null;
      staff: Staff | null;
    }>
  >;
  findStaffByID(id: number): Promise<{
    users: User | null;
    staff: Staff | null;
  }>;
}
