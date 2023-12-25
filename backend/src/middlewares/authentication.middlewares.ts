import { Request, Response } from 'express';
import { getCurrentUserFromAuthorizationHeader } from '../helpers/authentication.helpers';

export async function getCurrentUser(req: Request, res: Response, next) {
  req['currentUser'] = await getCurrentUserFromAuthorizationHeader(req.headers);
  next();
}
