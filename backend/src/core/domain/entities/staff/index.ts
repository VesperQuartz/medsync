export class Staff {
  constructor(
    public readonly userId: number,
    public readonly speciality: string,
    public readonly shift: string,
    public readonly daysAvailable: string[],
  ) {}
  static create({ userId, speciality, shift, daysAvailable }: Staff): Staff {
    return new Staff(userId, speciality, shift, daysAvailable);
  }
}
