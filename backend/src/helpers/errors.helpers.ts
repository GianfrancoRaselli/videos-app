import _httpStatusCodes from 'http-status-codes';

// http status codes
export const httpStatusCodes = _httpStatusCodes;

// http error codes
interface HttpErrorCodes {
  // general
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR';
  INVALID_INPUT_DATA: 'INVALID_INPUT_DATA';
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND';
  // authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS';
  UNAUTHORIZED: 'UNAUTHORIZED';
  // user
  USER_USERNAME_DUPLICATE_KEY: 'USER_USERNAME_DUPLICATE_KEY';
}
export type HttpErrorCode = HttpErrorCodes[keyof HttpErrorCodes];
export const httpErrorCodes: HttpErrorCodes = {
  // general
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  INVALID_INPUT_DATA: 'INVALID_INPUT_DATA',
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  // authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  // user
  USER_USERNAME_DUPLICATE_KEY: 'USER_USERNAME_DUPLICATE_KEY',
};

// custom HTTPError class
export class HTTPError extends Error {
  statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
  errorCode: HttpErrorCode = httpErrorCodes.INTERNAL_SERVER_ERROR;

  constructor(statusCode: number, errorCode: HttpErrorCode) {
    super(errorCode);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

// throw http error
export function throwHttpError(httpStatusCode: number, httpErrorCode: HttpErrorCode) {
  throw new HTTPError(httpStatusCode, httpErrorCode);
}
