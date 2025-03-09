import { AllPayment } from "@/application/use-case/payment/all-payment.js";
import { MakePayment } from "@/application/use-case/payment/make-payment.js";
import { UserPayment } from "@/application/use-case/payment/user-payment.js";
import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment.js";
import fp from "fastify-plugin";

export default fp(
  async (fastify) => {
    const payment = new PaymentRepositoryImpl(fastify);
    const makePayment = new MakePayment(payment);
    const userPayment = new UserPayment(payment);
    const allPayment = new AllPayment(payment);
    fastify.decorate("MakePayment", makePayment);
    fastify.decorate("UserPayment", userPayment);
    fastify.decorate("AllPayment", allPayment);
  },
  {
    dependencies: ["database"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    MakePayment: MakePayment;
    UserPayment: UserPayment;
    AllPayment: AllPayment;
  }
}
