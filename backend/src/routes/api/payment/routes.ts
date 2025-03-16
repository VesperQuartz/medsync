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
  fastify.route({
    method: "POST",
    url: "/stripe",
    schema: {
      body: z.object({
        amount: z.number(),
      }),
      response: {
        200: z.object({
          paymentIntent: z.string().nullish(),
          ephemeralKey: z.string().nullish(),
          customer: z.string(),
          publicKey: z.string(),
        }),
      },
    },
    handler: async (req, _res) => {
      const { amount } = req.body;
      const customer = await fastify.stripe.customers.create();
      const ephemeralKey = await fastify.stripe.ephemeralKeys.create(
        {
          customer: customer.id,
        },
        {
          apiVersion: "2022-11-15",
        },
      );

      const paymentIntent = await fastify.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        customer: customer.id,
      });
      const responsePayload = {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publicKey:
          "pk_test_51MC7WtCe9nNOUvz0iWXgPaz1rvBwyecFJ73jlY3PwH7EqoqT5WR3BoEUiyXY8z4ksDxYhnOS09FfGTLcRUHxSeCN00xsbaOX9G",
      };
      return responsePayload;
    },
  });
};

export default payment;
