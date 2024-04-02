import { HttpPostClient } from "../../Protocols/Http/http-post-client";
import { HttpPostClientSpy } from "../../Test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = "google.com"): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};
describe("RemoteAuthentication", () => {
  test("Should call HttpClient With Correct URL", async () => {
    const url = "another.com";
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
