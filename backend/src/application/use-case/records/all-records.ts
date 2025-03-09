import { RecordRepositoryImpl } from "@/infrastructure/repositories/records.js";
import { RecordSelectSchemaType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class GetAllRecord {
  constructor(private recordRepo: RecordRepositoryImpl) {}

  async execute(): Promise<RecordSelectSchemaType[]> {
    const [error, data] = await to(this.recordRepo.findAllRecords());
    if (error) {
      throw error;
    }
    return data;
  }
}
