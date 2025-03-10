import { UserSelectSchema } from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const users: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.array(UserSelectSchema),
      },
    },
    handler: async () => {
      const users = await fastify.AllUser.execute();
      return users;
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
        200: UserSelectSchema,
      },
    },
    handler: async (req) => {
      const { id } = req.params;
      const users = await fastify.OneUser.execute(id);
      return users;
    },
  });
};

export default users;
