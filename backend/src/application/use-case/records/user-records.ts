import { RecordRepositoryImpl } from "@/infrastructure/repositories/records.js";
import { RecordSelectSchemaType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class GetUserRecord {
  constructor(private recordRepo: RecordRepositoryImpl) {}

  async execute(id: number): Promise<RecordSelectSchemaType[]> {
    const [error, data] = await to(this.recordRepo.findAllUserRecord(id));
    if (error) {
      throw error;
    }
    return data;
  }
}
