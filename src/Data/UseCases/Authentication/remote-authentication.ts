import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { HttpPostClient } from "@/Data/Protocols/Http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private httpClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    this.httpClient.post({ url: this.url, body: params });

    return Promise.resolve();
  }
}
