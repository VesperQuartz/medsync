export class Payment {
  constructor(
    public readonly patientId: number,
    public readonly appointmentId: number,
    public readonly amount: number,
  ) {}
  static create({ patientId, appointmentId, amount }: Payment): Payment {
    return new Payment(patientId, appointmentId, amount);
  }
}
