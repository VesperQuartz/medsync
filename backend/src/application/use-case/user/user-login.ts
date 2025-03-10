import { AuthService } from "@/core/services/auth.js";
import { UserRepositoryImpl } from "@/infrastructure/repositories/users.js";
import { to } from "await-to-ts";

export class LoginUser {
  constructor(
    private userRepository: UserRepositoryImpl,
    private authService: AuthService,
  ) {}
  async execute(payload: { email: string; password: string }) {
    const [error, user] = await to(
      this.userRepository.findUserByEmail(payload.email),
    );
    if (error) throw error;
    if (!user) throw new Error("Invalid password or username");
    const verify = await this.authService.verifyPassword(
      payload.password,
      user.password,
    );
    if (!verify) throw new Error("Invalid password or username");
    const token = this.authService.generateToken({
      email: user.email,
      role: user.role,
      id: user.id,
    });
    return { ...user, token };
  }
}
