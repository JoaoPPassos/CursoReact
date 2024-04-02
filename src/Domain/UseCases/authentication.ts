import { AccountModel } from "../Models/account-model";

type AuthenticationParams = {
  username: string;
  password: string;
};

export interface IAuthentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
}
