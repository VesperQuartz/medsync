import { User } from "@/core/domain/entities/user/index.js";
import { AuthService } from "@/core/services/auth.js";
import { UserRepositoryImpl } from "@/infrastructure/repositories/users.js";

export class CreateUser {
  constructor(
    private userRepository: UserRepositoryImpl,
    private authService: AuthService,
  ) {}
  async execute(payload: User) {
    const hash = await this.authService.hashPassword(payload.password);
    const data = await this.userRepository.save({
      ...payload,
      password: hash,
    });
    const token = this.authService.generateToken({
      email: data.email,
      role: data.role,
      id: data.id,
    });
    return { ...data, token };
  }
}
