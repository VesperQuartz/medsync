import { FastifyInstance } from "fastify";
import { PaymentRepository } from "@/core/repositories/payment.js";
import { Payment } from "@/core/domain/entities/payment/index.js";
import { to } from "await-to-ts";
import { payments } from "../database/schema.js";
import { PaymentSelectType } from "@/shared/schema.js";
import { eq } from "drizzle-orm";

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private paymentRepo: FastifyInstance) {}
  async findAllUserPayment(id: number): Promise<PaymentSelectType[]> {
    const [error, payment] = await this.paymentRepo.to(
      this.paymentRepo.db
        .select()
        .from(payments)
        .where(eq(payments.patientId, id)),
    );
    if (error) {
      throw error;
    }
    return payment;
  }
  async save(payment: Payment): Promise<PaymentSelectType> {
    const [error, data] = await to(
      this.paymentRepo.db.insert(payments).values(payment).returning(),
    );
    if (error) {
      throw error;
    }
    return data[0];
  }
  async findAllPayment(): Promise<PaymentSelectType[]> {
    const [error, data] = await to(this.paymentRepo.db.select().from(payments));
    if (error) {
      throw error;
    }
    return data;
  }
}
