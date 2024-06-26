import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from "@/Infra/Test";
import axios from "axios";
import { mockPostRequest } from "@/Data/Test";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusCode and body", () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(request);

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
