import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment.js";
import { PaymentSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class AllPayment {
  constructor(private paymentRepo: PaymentRepositoryImpl) {}
  async execute(): Promise<PaymentSelectType[]> {
    const [error, payment] = await to(this.paymentRepo.findAllPayment());
    if (error) {
      throw error;
    }
    return payment;
  }
}
