import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    credentials: true,
    exposedHeaders: ["Authorization", "Set-Cookie"],
  });
});
