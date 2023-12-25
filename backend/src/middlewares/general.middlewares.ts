import { Request, Response } from 'express';
import { getErrorResponse } from '../routes/routes';
import { httpStatusCodes, httpErrorCodes, HTTPError } from '../helpers/errors.helpers';

export async function handleError(err: Error, req: Request, res: Response, next) {
  console.log(err);
  // http error
  if (err instanceof HTTPError) return res.status(err.statusCode).json(getErrorResponse(err.errorCode));
  // internal server error
  res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(getErrorResponse(httpErrorCodes.INTERNAL_SERVER_ERROR));
}
