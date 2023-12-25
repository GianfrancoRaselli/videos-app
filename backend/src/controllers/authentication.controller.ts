import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { getSuccessResponse } from '../routes/routes';
import { httpStatusCodes, httpErrorCodes, throwHttpError } from '../helpers/errors.helpers';
import { comparePassword } from '../helpers/hashing.helpers';
import { createAccessToken } from '../helpers/access-token.helpers';
import { getCurrentUserFromAuthorizationHeader } from '../helpers/authentication.helpers';
import { User } from '../models/models';

export async function userLogin(req: Request, res: Response, next) {
  try {
    const { username, password } = req.body;
    const [user] = await sequelize.query('SELECT * FROM users WHERE BINARY username = :username', {
      replacements: { username },
      type: QueryTypes.SELECT,
      model: User,
    });
    if (!(user && (await comparePassword(password, user.password))))
      throwHttpError(httpStatusCodes.UNAUTHORIZED, httpErrorCodes.INVALID_CREDENTIALS);
    res.json(
      getSuccessResponse(
        {
          tokenType: 'Bearer',
          accessToken: createAccessToken('userId', user.id),
          authUser: user,
        },
        'LOGIN',
      ),
    );
  } catch (err) {
    next(err);
  }
}

export async function validateUserAccessToken(req: Request, res: Response, next) {
  try {
    const user = await getCurrentUserFromAuthorizationHeader(req.headers);
    if (!user) throwHttpError(httpStatusCodes.UNAUTHORIZED, httpErrorCodes.UNAUTHORIZED);
    res.json(
      getSuccessResponse(
        {
          tokenType: 'Bearer',
          accessToken: createAccessToken('userId', user.id),
          authUser: user,
        },
        'VALIDATE_ACCESS_TOKEN',
      ),
    );
  } catch (err) {
    next(err);
  }
}
