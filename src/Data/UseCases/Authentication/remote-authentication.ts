import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { HttpPostClient } from "@/Data/Protocols/Http/http-post-client";
import { HttpStatusCode } from "@/Data/Protocols/Http/http-response";
import { InvalidCredentialError } from "@/Domain/Errors/invalid-credentials-error";
import { UnexpectedError } from "@/Domain/Errors/unexpected-error";
import { AccountModel } from "@/Domain/Models/account-model";
import { IAuthentication } from "@/Domain/UseCases/authentication";

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private httpClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });

    if (httpResponse.statusCode === HttpStatusCode.UNAUTHORIZED)
      throw new InvalidCredentialError();
    if (
      [
        HttpStatusCode.NO_CONTENT,
        HttpStatusCode.NOT_FOUND,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      ].includes(httpResponse.statusCode)
    )
      throw new UnexpectedError();
    return httpResponse.body;
  }
}
