import { Payment } from "../domain/entities/payment/index.js";

export interface PaymentRepository {
  save(payment: Payment): Promise<Payment>;
  findAllPayment(): Promise<Payment[]>;
  findAllUserPayment(id: number): Promise<Payment[]>;
}
