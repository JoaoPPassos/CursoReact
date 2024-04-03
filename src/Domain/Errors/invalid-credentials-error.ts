export class InvalidCredentialError extends Error {
  constructor() {
    super();
    this.name = "InvalidCredentialError";
  }
}
