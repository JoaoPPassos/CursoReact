import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { AccountModel } from "../Models/account-model";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email.toString(),
  password: faker.internet.password.toString(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});
