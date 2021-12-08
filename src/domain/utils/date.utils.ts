import moment, { Moment } from 'moment';

import { DATE_FORMAT } from '@consts/date.consts';
import { Week } from '@interfaces/week.interface';

export const getWeekStart = (date: Moment): Moment => moment(date).startOf('isoWeek');
export const getWeekEnd = (date: Moment): Moment => moment(date).endOf('isoWeek');
export const getWeek = (date: Moment): Week => ({
  start: getWeekStart(date),
  end: getWeekEnd(date)
});

export const formatWeekStartAndEnd = (value: Moment): string =>
  `${ getWeekStart(value).format(DATE_FORMAT) } — ${ getWeekEnd(value).format(DATE_FORMAT) }`;
