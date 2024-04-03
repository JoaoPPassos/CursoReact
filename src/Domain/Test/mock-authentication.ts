import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/Domain/UseCases/authentication";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email.toString(),
  password: faker.internet.password.toString(),
});
