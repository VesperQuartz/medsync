import { to } from "await-to-ts";
import { doctorStaffDetails, users } from "../database/schema.js";
import { StaffSelectType, UserSelectType } from "@/shared/schema.js";
import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import { Staff } from "@/core/domain/entities/staff/index.js";
import { StaffRepository } from "@/core/repositories/staffs.js";

export class StaffRepositoryImpl implements StaffRepository {
  constructor(private staffRepo: FastifyInstance) {}
  async save(payload: Staff): Promise<StaffSelectType> {
    const [error, staff] = await to(
      this.staffRepo.db.insert(doctorStaffDetails).values(payload).returning(),
    );
    if (error) {
      throw error;
    }
    return staff[0];
  }
  async findAllStaff(): Promise<
    Array<{
      users: UserSelectType | null;
      staff: StaffSelectType | null;
    }>
  > {
    const [error, staff] = await to(
      this.staffRepo.db
        .select({ users, staff: doctorStaffDetails })
        .from(users)
        .leftJoin(doctorStaffDetails, eq(users.id, doctorStaffDetails.userId)),
    );
    if (error) {
      throw error;
    }
    return staff;
  }
  async findStaffByID(id: number): Promise<{
    users: UserSelectType | null;
    staff: StaffSelectType | null;
  }> {
    const [error, staff] = await to(
      this.staffRepo.db
        .select({
          users,
          staff: doctorStaffDetails,
        })
        .from(doctorStaffDetails)
        .leftJoin(users, eq(users.id, doctorStaffDetails.userId))
        .where(eq(doctorStaffDetails.userId, id)),
    );
    if (error) {
      throw error;
    }
    return staff[0];
  }
}
