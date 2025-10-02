const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });


export function FormatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}