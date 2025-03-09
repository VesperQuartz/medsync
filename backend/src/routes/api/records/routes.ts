import { RecordInsertSchema, RecordSelectSchema } from "@/shared/schema.js";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const records: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: RecordInsertSchema,
      response: {
        200: RecordSelectSchema,
      },
    },
    handler: async (req, _res) => {
      const {
        patientId,
        prescription,
        diagnosis,
        doctorId,
        appointmentId,
        testResults,
      } = req.body;
      const records = await fastify.SaveRecord.execute({
        patientId,
        prescription,
        diagnosis,
        doctorId,
        appointmentId,
        testResults: testResults!,
      });
      return records;
    },
  });
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.array(RecordSelectSchema),
      },
    },
    handler: async () => {
      const record = await fastify.GetAllRecord.execute();
      return record;
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
        200: z.array(RecordSelectSchema),
      },
    },
    handler: async (req) => {
      const { id } = req.params;
      const record = await fastify.GetAllUserRecord.execute(id);
      return record;
    },
  });
};

export default records;
