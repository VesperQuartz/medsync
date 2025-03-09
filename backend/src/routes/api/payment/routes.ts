import { PaymentInsertSchema, PaymentSelectSchema } from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const payment: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: PaymentInsertSchema,
      response: {
        200: PaymentSelectSchema,
      },
    },
    handler: async (req, _res) => {
      const { patientId, amount, appointmentId } = req.body;
      const appointment = await fastify.MakePayment.execute({
        patientId,
        amount,
        appointmentId,
      });
      return appointment;
    },
  });
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.array(PaymentSelectSchema),
      },
    },
    handler: async (_req, _res) => {
      const payment = await fastify.AllPayment.execute();
      return payment;
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
        200: z.array(PaymentSelectSchema),
      },
    },
    handler: async (req, _res) => {
      const { id } = req.params;
      const payment = await fastify.UserPayment.execute(id);
      return payment;
    },
  });
};

export default payment;
