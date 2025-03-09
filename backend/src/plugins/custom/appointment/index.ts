import { AllAppointemnt } from "@/application/use-case/appointment/all-appointment.js";
import { BookAppointment } from "@/application/use-case/appointment/book-appointment.js";
import { ShowStaffAppointment } from "@/application/use-case/appointment/show-appointment.js";
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
    fastify.decorate("BookAppointment", bookAppointment);
    fastify.decorate("ShowAppointment", showAppointment);
    fastify.decorate("UserAppointment", userAppointment);
    fastify.decorate("AllAppointment", allAppointment);
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
  }
}
