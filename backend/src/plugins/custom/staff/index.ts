import { SaveStaff } from "@/application/use-case/staff/save-staff.js";
import { ShowAllStaff } from "@/application/use-case/staff/show-all-staff.js";
import { StaffRepositoryImpl } from "@/infrastructure/repositories/staffs.js";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const staff = new StaffRepositoryImpl(fastify);
    const saveStaff = new SaveStaff(staff);
    const showAllStaff = new ShowAllStaff(staff);
    fastify.decorate("SaveStaff", saveStaff);
    fastify.decorate("ShowAllStaff", showAllStaff);
  },
  {
    dependencies: ["database"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    SaveStaff: SaveStaff;
    ShowAllStaff: ShowAllStaff;
  }
}
