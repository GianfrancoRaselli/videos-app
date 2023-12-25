import crypto from 'crypto';

export function getRandomString(length = 100) {
  const buffer = crypto.randomBytes(length);
  const randomString = buffer.toString('hex');
  return randomString;
}
