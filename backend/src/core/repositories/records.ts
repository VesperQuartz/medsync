import { RecordSelectSchemaType } from "@/shared/schema.js";
import { Records } from "../domain/entities/records/index.js";

export interface RecordRepository {
  save(record: Records): Promise<RecordSelectSchemaType>;
  findAllRecords(): Promise<RecordSelectSchemaType[]>;
  findAllUserRecord(id: number): Promise<RecordSelectSchemaType[]>;
}
