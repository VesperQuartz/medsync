import fp from "fastify-plugin";

import Stripe from "stripe";
export default fp(async (fastify) => {
  const stripe = new Stripe(fastify.config.STRIPE_SECRET);
  fastify.decorate("stripe", stripe);
});

declare module "fastify" {
  export interface FastifyInstance {
    stripe: Stripe;
  }
}
