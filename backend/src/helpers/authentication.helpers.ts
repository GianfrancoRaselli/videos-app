import refs from '../refs';
import { verifyAccessToken } from './access-token.helpers';
import { httpStatusCodes, httpErrorCodes, throwHttpError } from './errors.helpers';
import { User } from '../models/models';
// types
import type { UserModel } from '../models/user.model';

// verify access
export async function verifyAccess(user: UserModel, accessFn?: () => Promise<boolean>) {
  if (!user && !(accessFn && (await accessFn()))) throwHttpError(httpStatusCodes.UNAUTHORIZED, httpErrorCodes.UNAUTHORIZED);
}

// helpers

export async function getCurrentUserFromAuthorizationHeader(headers) {
  let user = null;
  try {
    if (headers && headers.authorization) {
      const token = headers.authorization.split(' ')[1];
      if (token) {
        const payload = verifyAccessToken(token);
        if (payload['userId']) {
          user = await User.findByPk(payload['userId']);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return user;
}
