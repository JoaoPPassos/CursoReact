export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}
export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
