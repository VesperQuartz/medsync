import {
  StaffInsertSchema,
  StaffSelectSchema,
  UserSelectSchema,
} from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const staff: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: StaffInsertSchema.omit({ daysAvailable: true, shift: true }),
      response: {
        200: StaffSelectSchema,
      },
    },
    handler: async (req, _res) => {
      const { userId, speciality } = req.body;
      const staff = await fastify.SaveStaff.execute({
        daysAvailable: [],
        shift: "",
        userId,
        speciality,
      });
      return staff;
    },
  });
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.array(
          z.object({
            users: UserSelectSchema.or(z.null()),
            staff: StaffSelectSchema.or(z.null()),
          }),
        ),
      },
    },
    handler: async () => {
      const staff = await fastify.ShowAllStaff.execute();
      return staff;
    },
  });
};

export default staff;
