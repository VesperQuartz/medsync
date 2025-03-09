import { SaveRecord } from "@/application/use-case/records/add-record.js";
import { GetAllRecord } from "@/application/use-case/records/all-records.js";
import { GetUserRecord } from "@/application/use-case/records/user-records.js";
import { RecordRepositoryImpl } from "@/infrastructure/repositories/records.js";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const records = new RecordRepositoryImpl(fastify);
    const saveRecord = new SaveRecord(records);
    const getAllRecord = new GetAllRecord(records);
    const getAllUserRecord = new GetUserRecord(records);
    fastify.decorate("SaveRecord", saveRecord);
    fastify.decorate("GetAllRecord", getAllRecord);
    fastify.decorate("GetAllUserRecord", getAllUserRecord);
  },
  {
    dependencies: ["database"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    SaveRecord: SaveRecord;
    GetAllRecord: GetAllRecord;
    GetAllUserRecord: GetUserRecord;
  }
}
