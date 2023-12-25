export function presentDatetime(
  dateTime: string,
  config: {
    format?: 'numbers' | 'long' | 'short';
    withTime?: boolean;
  } = {
    format: 'short',
    withTime: true,
  },
): string {
  // null
  if (!dateTime) return '-';
  // options
  let options: Intl.DateTimeFormatOptions = {
    weekday: config.format === 'numbers' ? undefined : config.format,
    year: 'numeric',
    month: config.format === 'numbers' ? '2-digit' : config.format,
    day: '2-digit',
    hour: config.withTime ? '2-digit' : undefined,
    minute: config.withTime ? '2-digit' : undefined,
    hour12: false,
  };
  // return
  const stringDateTime = new Date(dateTime).toLocaleString('es-ES', options);
  return stringDateTime.charAt(0).toUpperCase() + stringDateTime.slice(1);
}
