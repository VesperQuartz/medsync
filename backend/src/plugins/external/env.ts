import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
    JWT_SECRET: {
      type: "string",
    },
    COOKIE_SECRET: {
      type: "string",
    },
    BASE_URL: {
      type: "string",
    },
    DATABASE_URL: {
      type: "string",
    },
    DATABASE_TOKEN: {
      type: "string",
    },
    REDIS_PASSWORD: {
      type: "string",
    },
    STRIPE_SECRET: {
      type: "string",
    },
  },
};

const options = {
  dotenv: true,
  confKey: "config",
  schema: schema,
};

export default fp(
  async (fastify) => {
    try {
      await fastify.register(fastifyEnv, options);
    } catch (error) {
      console.error(error);
    }
  },
  {
    name: "env",
  },
);

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: string;
      JWT_SECRET: string;
      BASE_URL: string;
      COOKIE_SECRET: string;
      DATABASE_URL: string;
      DATABASE_TOKEN: string;
      REDIS_PASSWORD: string;
      STRIPE_SECRET: string;
    };
  }
}
