export class Appointments {
  constructor(
    public readonly patientId: number,
    public readonly doctorId: number,
    public readonly date: string,
    public readonly reason: string,
    public readonly duration: number,
  ) {}
  static create({
    patientId,
    doctorId,
    date,
    reason,
    duration,
  }: Appointments): Appointments {
    return new Appointments(patientId, doctorId, date, reason, duration);
  }
}
