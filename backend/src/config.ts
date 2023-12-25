function getValue(key: string, raiseException: boolean): string {
  const value = process.env[key];
  if (value === undefined && raiseException) throw new Error(`${key} key is required in the .env file`);
  if (value === undefined) return '';
  return value;
}

export function configStr(key: string, raiseException = true): string {
  return getValue(key, raiseException);
}

export function configInt(key: string, raiseException = true): number {
  return parseInt(getValue(key, raiseException));
}

export function configFloat(key: string, raiseException = true): number {
  return parseFloat(getValue(key, raiseException));
}

export function configBool(key: string, raiseException = false): boolean {
  const value = getValue(key, raiseException);
  if (value === 'TRUE' || value === 'True' || value === 'true') return true;
  return false;
}
