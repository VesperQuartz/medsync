import { UserRepositoryImpl } from "@/infrastructure/repositories/users.js";
import { to } from "await-to-ts";

export class AllUsers {
  constructor(private userRepository: UserRepositoryImpl) {}
  async execute() {
    const [error, user] = await to(this.userRepository.findAll());
    if (error) {
      throw error;
    }
    return user;
  }
}
