import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "@/Data/Protocols/Http";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient();

  return sut;
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct URL and verb", async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });

  test("Should call axios with correct body", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);

    expect(mockedAxios).toHaveBeenCalledWith(request.url);
  });
});
