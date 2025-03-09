import { Payment } from "@/core/domain/entities/payment/index.js";
import { PaymentRepositoryImpl } from "@/infrastructure/repositories/payment.js";
import { PaymentSelectType } from "@/shared/schema.js";
import { to } from "await-to-ts";

export class MakePayment {
  constructor(private paymentRepo: PaymentRepositoryImpl) {}

  async execute(pay: Payment): Promise<PaymentSelectType> {
    const [error, payment] = await to(this.paymentRepo.save(pay));
    if (error) {
      throw error;
    }
    return payment;
  }
}
