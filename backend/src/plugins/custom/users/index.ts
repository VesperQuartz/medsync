import { AllUsers } from "@/application/use-case/user/all-users.js";
import { CreateUser } from "@/application/use-case/user/create-user.js";
import { LoginUser } from "@/application/use-case/user/user-login.js";
import { AuthService } from "@/core/services/auth.js";
import { UserRepositoryImpl } from "@/infrastructure/repositories/users.js";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const user = new UserRepositoryImpl(fastify);
    const auth = new AuthService(fastify);
    const reg = new CreateUser(user, auth);
    const login = new LoginUser(
      new UserRepositoryImpl(fastify),
      new AuthService(fastify),
    );
    const allUser = new AllUsers(user);

    fastify.decorate("LoginUser", login);
    fastify.decorate("RegisterUser", reg);
    fastify.decorate("AllUser", allUser);
  },
  {
    dependencies: ["database"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    RegisterUser: CreateUser;
    LoginUser: LoginUser;
    AllUser: AllUsers;
  }
}
