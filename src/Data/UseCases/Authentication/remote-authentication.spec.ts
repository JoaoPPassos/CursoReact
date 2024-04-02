import { HttpPostClient } from "../../Protocols/Http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpClient With Correct URL", async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string) {
        this.url = url;

        return Promise.resolve();
      }
    }
    const url = "google.com";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
