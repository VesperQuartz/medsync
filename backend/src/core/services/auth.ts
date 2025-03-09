import { FastifyInstance } from "fastify";

export class AuthService {
  constructor(private app: FastifyInstance) {}
  generateToken(payload: { email: string; role: string; id: number }) {
    return this.app.jwt.sign(payload);
  }
  verifyToken(token: string) {
    return this.app.jwt.verify(token);
  }
  async hashPassword(password: string) {
    const [error, hash] = await this.app.to(this.app.bcrypt.hash(password));
    if (error) throw error;
    return hash;
  }
  async verifyPassword(password: string, hash: string) {
    const [error, isVerified] = await this.app.to(
      this.app.bcrypt.compare(password, hash),
    );
    if (error) throw error;
    return isVerified;
  }
}
