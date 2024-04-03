import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { HttpPostClient } from "@/Data/Protocols/Http/http-post-client";
import { HttpStatusCode } from "@/Data/Protocols/Http/http-response";
import { InvalidCredentialError } from "@/Domain/Errors/invalid-credentials-error";
import { UnexpectedError } from "@/Domain/Errors/unexpected-error";
import { AccountModel } from "@/Domain/Models/account-model";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private httpClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
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
    return Promise.resolve();
  }
}
