import {
  mockAccountModel,
  mockAuthentication,
} from "@/Domain/Test/mock-account";
import { HttpPostClientSpy } from "@/Data/Test";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { InvalidCredentialError, UnexpectedError } from "@/Domain/Errors";
import { HttpStatusCode } from "@/Data/Protocols/Http";
import { AuthenticationParams } from "@/Domain/UseCases/authentication";
import { AccountModel } from "@/Domain/Models";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
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

  test("Should return UnexpectedError message if HttpPostClient returns other than 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const authentication = mockAuthentication();
    const promise = sut.auth(authentication);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return AccountModel on success", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult,
    };
    const authentication = mockAuthentication();
    const account = await sut.auth(authentication);

    expect(account).toEqual(httpResult);
  });
});
