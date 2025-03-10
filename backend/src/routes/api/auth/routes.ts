import {
  UserInsertSchema,
  UserLoginSchema,
  UserSelectSchemaWithToken,
} from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const auth: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/register",
    schema: {
      body: UserInsertSchema,
      response: {
        200: UserSelectSchemaWithToken,
      },
    },
    handler: async (req, _res) => {
      const { name, email, password, role, dateOfBirth } = req.body;
      const user = await fastify.RegisterUser.execute({
        email,
        password,
        name,
        role,
        dateOfBirth,
      });
      return user;
    },
  });
  fastify.route({
    method: "POST",
    url: "/login",
    schema: {
      body: UserLoginSchema,
      response: {
        200: UserSelectSchemaWithToken,
      },
    },
    handler: async (req, _res) => {
      const { email, password } = req.body;
      const user = await fastify.LoginUser.execute({
        email,
        password,
      });
      return user;
    },
  });
};

export default auth;
