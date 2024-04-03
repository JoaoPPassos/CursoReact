import { mockAuthentication } from "@/Domain/Test/mock-authentication";
import { HttpPostClientSpy } from "@/Data/Test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { InvalidCredentialError } from "@/Domain/Errors/invalid-credentials-error";
import { HttpStatusCode } from "@/Data/Protocols/Http/http-response";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};
describe("RemoteAuthentication", () => {
  test("Should call HttpClient With Correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });
  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authentication = mockAuthentication();
    await sut.auth(authentication);

    expect(httpPostClientSpy.body).toEqual(authentication);
  });

  test("Should throw InvalidCredentialError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };
    const authentication = mockAuthentication();
    const promise = sut.auth(authentication);

    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });
});
