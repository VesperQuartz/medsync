import { UserRepositoryImpl } from "@/infrastructure/repositories/users.js";
import { to } from "await-to-ts";

export class OneUser {
  constructor(private userRepository: UserRepositoryImpl) {}
  async execute(id: number) {
    const [error, user] = await to(this.userRepository.findUserById(id));
    if (error) {
      throw error;
    }
    return user;
  }
}
