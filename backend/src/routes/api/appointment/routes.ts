import {
  AppointmentInsertSchema,
  AppointmentSelectSchema,
  StaffSelectSchema,
  UserSelectSchema,
} from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const appoint: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: AppointmentInsertSchema.pick({
        doctorId: true,
        patientId: true,
        reason: true,
        duration: true,
      }),
      response: {
        200: AppointmentSelectSchema,
      },
    },
    handler: async (req, _res) => {
      const { doctorId, patientId, reason, duration } = req.body;
      const appointment = await fastify.BookAppointment.execute({
        doctorId,
        patientId,
        reason,
        duration,
      });
      return appointment;
    },
  });
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: z.object({
        id: z.coerce.number(),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (req, _res) => {
      const { id } = req.params;
      await fastify.DeleteAppointment.execute(id);
      return { message: "Appointment deleted" };
    },
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.array(
          z.object({
            appointments: AppointmentSelectSchema.or(z.null()),
            staff: StaffSelectSchema.or(z.null()),
            users: UserSelectSchema.or(z.null()),
          }),
        ),
      },
    },
    handler: async (_req, _res) => {
      const appointment = await fastify.ShowAllAppointment.execute();
      return appointment;
    },
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      params: z.object({
        id: z.coerce.number(),
      }),
      response: {
        200: z.array(
          z.object({
            appointments: AppointmentSelectSchema.or(z.null()),
            staff: StaffSelectSchema.or(z.null()),
          }),
        ),
      },
    },
    handler: async (req, _res) => {
      const { id } = req.params;
      const appointment = await fastify.ShowAppointment.execute(id);
      return appointment;
    },
  });
  fastify.route({
    method: "GET",
    url: "/users/:id",
    schema: {
      params: z.object({
        id: z.coerce.number(),
      }),
      response: {
        200: z.array(
          z.object({
            appointments: AppointmentSelectSchema.or(z.null()),
            users: UserSelectSchema.or(z.null()),
          }),
        ),
      },
    },
    handler: async (req, _res) => {
      const { id } = req.params;
      const appointment = await fastify.UserAppointment.execute(id);
      return appointment;
    },
  });
};

export default appoint;
