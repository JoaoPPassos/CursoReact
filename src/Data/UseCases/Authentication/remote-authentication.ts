import { AuthenticationParams } from "@/Domain/UseCases";
import { HttpPostClient, HttpStatusCode } from "@/Data/Protocols/Http";
import { InvalidCredentialError, UnexpectedError } from "@/Domain/Errors";
import { AccountModel } from "@/Domain/Models";
import { IAuthentication } from "@/Domain/UseCases";

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
