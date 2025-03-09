import { User } from "@/core/domain/entities/user/index.js";
import { to } from "await-to-ts";
import { users } from "../database/schema.js";
import { UserSelectType } from "@/shared/schema.js";
import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import { UserRepository } from "@/core/repositories/users.js";

export class UserRepositoryImpl implements UserRepository {
  constructor(private userRepo: FastifyInstance) {}
  async save(payload: User): Promise<UserSelectType> {
    const [error, user] = await to(
      this.userRepo.db.insert(users).values(payload).returning(),
    );
    if (error) {
      throw error;
    }
    return user[0];
  }
  async findUserByEmail(email: string): Promise<UserSelectType> {
    const [error, user] = await to(
      this.userRepo.db.select().from(users).where(eq(users.email, email)),
    );
    if (error) {
      throw error;
    }
    return user[0];
  }
  async findAll(): Promise<UserSelectType[]> {
    const [error, user] = await to(this.userRepo.db.select().from(users));

    if (error) {
      throw error;
    }
    return user;
  }
}
