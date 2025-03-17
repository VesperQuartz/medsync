import { AllAppointemnt } from "@/application/use-case/appointment/all-appointment.js";
import { BookAppointment } from "@/application/use-case/appointment/book-appointment.js";
import { ShowAllAppointment } from "@/application/use-case/appointment/combined-appointment.js";
import { DeleteAppointment } from "@/application/use-case/appointment/delete-appointment.js";
import { ShowStaffAppointment } from "@/application/use-case/appointment/show-appointment.js";
import { UpdateStatus } from "@/application/use-case/appointment/update-status.js";
import { ShowUserAppointment } from "@/application/use-case/appointment/user-appointment.js";
import { AppointmentRepositoryImpl } from "@/infrastructure/repositories/appointment.js";
import { StaffRepositoryImpl } from "@/infrastructure/repositories/staffs.js";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const appointment = new AppointmentRepositoryImpl(fastify);
    const staff = new StaffRepositoryImpl(fastify);
    const bookAppointment = new BookAppointment(appointment, staff);
    const showAppointment = new ShowStaffAppointment(appointment);
    const userAppointment = new ShowUserAppointment(appointment);
    const allAppointment = new AllAppointemnt(appointment);
    const allOverallAppointment = new ShowAllAppointment(appointment);
    const deleteAppointment = new DeleteAppointment(appointment);
    const updateStatus = new UpdateStatus(appointment);
    fastify.decorate("BookAppointment", bookAppointment);
    fastify.decorate("ShowAppointment", showAppointment);
    fastify.decorate("UserAppointment", userAppointment);
    fastify.decorate("AllAppointment", allAppointment);
    fastify.decorate("ShowAllAppointment", allOverallAppointment);
    fastify.decorate("DeleteAppointment", deleteAppointment);
    fastify.decorate("UpdateStatus", updateStatus);
  },
  {
    dependencies: ["database"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    BookAppointment: BookAppointment;
    ShowAppointment: ShowStaffAppointment;
    UserAppointment: ShowUserAppointment;
    AllAppointment: AllAppointemnt;
    ShowAllAppointment: ShowAllAppointment;
    DeleteAppointment: DeleteAppointment;
    UpdateStatus: UpdateStatus;
  }
}
