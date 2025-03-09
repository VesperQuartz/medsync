import { Records } from "@/core/domain/entities/records/index.js";
import { RecordRepository } from "@/core/repositories/records.js";
import { RecordSelectSchemaType } from "@/shared/schema.js";
import { to } from "await-to-ts";
import { FastifyInstance } from "fastify";
import { medicalRecords } from "../database/schema.js";
import { eq } from "drizzle-orm";

export class RecordRepositoryImpl implements RecordRepository {
  constructor(private recordRepo: FastifyInstance) {}
  async save(record: Records): Promise<RecordSelectSchemaType> {
    const [error, records] = await to(
      this.recordRepo.db.insert(medicalRecords).values(record).returning(),
    );
    if (error) throw error;
    return records[0];
  }
  async findAllRecords(): Promise<RecordSelectSchemaType[]> {
    const [error, records] = await to(
      this.recordRepo.db.select().from(medicalRecords),
    );
    if (error) throw error;
    return records;
  }
  async findAllUserRecord(id: number): Promise<RecordSelectSchemaType[]> {
    const [error, records] = await to(
      this.recordRepo.db
        .select()
        .from(medicalRecords)
        .where(eq(medicalRecords.patientId, id)),
    );
    if (error) throw error;
    return records;
  }
}
