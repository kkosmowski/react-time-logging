import moment, { Moment } from 'moment';
import { DATE_FORMAT, MINUTES_IN_HOUR } from '@consts/date.consts';
import { ZERO } from '@consts/numbers.consts';
import { Week } from '@interfaces/week.interface';

export const getWeekStart = (date: Moment): Moment => moment(date).startOf('isoWeek');
export const getWeekEnd = (date: Moment): Moment => moment(date).endOf('isoWeek');
export const getWeek = (date: Moment): Week => ({
  start: getWeekStart(date),
  end: getWeekEnd(date)
});

export const formatWeekStartAndEnd = (value: Moment): string =>
  `${ getWeekStart(value).format(DATE_FORMAT) } — ${ getWeekEnd(value).format(DATE_FORMAT) }`;

export const minutesToHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const minutesLeft = minutes % MINUTES_IN_HOUR;

  return `${ hours }h ${ minutesLeft !== ZERO ? `${ minutesLeft }min` : '' }`;
};