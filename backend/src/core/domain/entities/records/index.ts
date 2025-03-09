export class Records {
  constructor(
    public readonly patientId: number,
    public readonly appointmentId: number,
    public readonly doctorId: number,
    public readonly diagnosis: string,
    public readonly prescription: string,
    public readonly testResults?: string,
  ) {}
  static create({
    patientId,
    appointmentId,
    doctorId,
    diagnosis,
    testResults,
    prescription,
  }: Records): Records {
    return new Records(
      patientId,
      appointmentId,
      doctorId,
      diagnosis,
      prescription,
      testResults,
    );
  }
}
