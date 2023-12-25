import jwt from 'jsonwebtoken';
import { configStr, configInt } from '../config';

export function createAccessToken(key: string, value: any) {
  return jwt.sign({ [key]: value }, configStr('ACCESS_TOKEN_SECRET_PRIVATE_KEY'), {
    expiresIn: 60 * 60 * 24 * configInt('ACCESS_TOKEN_EXPIRES_IN_DAYS'),
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, configStr('ACCESS_TOKEN_SECRET_PRIVATE_KEY'));
}
