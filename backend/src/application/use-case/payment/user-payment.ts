import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment.js";
import { PaymentSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class UserPayment {
  constructor(private paymentRepo: PaymentRepositoryImpl) {}
  async execute(id: number): Promise<PaymentSelectType[]> {
    const [error, payment] = await to(this.paymentRepo.findAllUserPayment(id));
    if (error) {
      throw error;
    }
    return payment;
  }
}
