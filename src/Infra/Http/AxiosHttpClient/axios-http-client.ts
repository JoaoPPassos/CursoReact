import { HttpPostParams, HttpResponse } from "@/Data/Protocols/Http";
import axios from "axios";

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}
