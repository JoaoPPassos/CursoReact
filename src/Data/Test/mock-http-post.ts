import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../Protocols/Http";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
});
