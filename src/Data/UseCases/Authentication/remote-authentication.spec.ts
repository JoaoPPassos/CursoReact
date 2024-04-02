import { HttpPostClient } from "../../Protocols/Http/http-post-client";
import { HttpPostClientSpy } from "../../Test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpClient With Correct URL", async () => {
    const url = "google.com";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
