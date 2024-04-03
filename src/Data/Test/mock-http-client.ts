import {
  HttpPostClient,
  HttpPostParams,
} from "@/Data/Protocols/Http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../Protocols/Http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.OK,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
