import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const root: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.string(),
      },
    },
    handler: (_req, res) => {
      res.send("Hello, world!");
    },
  });
};

export default root;
