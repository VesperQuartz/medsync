import { Records } from "@/core/domain/entities/records/index.js";
import { RecordRepositoryImpl } from "@/infrastructure/repositories/records.js";
import { RecordSelectSchemaType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class SaveRecord {
  constructor(private recordRepo: RecordRepositoryImpl) {}

  async execute(record: Records): Promise<RecordSelectSchemaType> {
    const [error, data] = await to(this.recordRepo.save(record));
    if (error) {
      throw error;
    }
    return data;
  }
}
