export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly dateOfBirth: Date,
  ) {}
  static create({ name, email, password, role, dateOfBirth }: User): User {
    return new User(name, email, password, role, dateOfBirth);
  }
}
