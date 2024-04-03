export class InvalidCredentialError extends Error {
  constructor() {
    super("Suas Credenciais estão inválidas");
    this.name = "InvalidCredentialError";
  }
}
