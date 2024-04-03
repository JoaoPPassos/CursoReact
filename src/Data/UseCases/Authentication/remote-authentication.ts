import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { HttpPostClient } from "@/Data/Protocols/Http/http-post-client";
import { HttpStatusCode } from "@/Data/Protocols/Http/http-response";
import { InvalidCredentialError } from "@/Domain/Errors/invalid-credentials-error";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private httpClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });

    if (httpResponse.statusCode === HttpStatusCode.UNAUTHORIZED)
      throw new InvalidCredentialError();

    return Promise.resolve();
  }
}
