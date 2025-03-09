import { LibSQLDatabase } from "drizzle-orm/libsql";
import { User } from "../domain/entities/user/index.js";
import * as schema from "../../infrastructure/database/schema.js";
import { Client } from "@libsql/client";
import { UserSelectType } from "@/shared/schema.js";

export type DBInstance = LibSQLDatabase<typeof schema> & {
  $client: Client;
};

export interface UserRepository {
  save(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findAll(): Promise<UserSelectType[]>;
}
