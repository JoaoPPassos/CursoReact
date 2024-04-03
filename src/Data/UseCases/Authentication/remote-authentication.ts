import { HttpPostClient } from "../../Protocols/Http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private httpClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    this.httpClient.post({ url: this.url });

    return Promise.resolve();
  }
}
