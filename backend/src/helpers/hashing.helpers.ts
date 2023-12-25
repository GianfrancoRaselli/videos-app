import bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(plainPassword: string, encryptedPassword: string) {
  return await bcrypt.compare(plainPassword, encryptedPassword);
}
