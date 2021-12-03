import moment, { Moment } from 'moment';
import { DATE_FORMAT } from '@consts/date.consts';

export const getWeekStart = (date: Moment) => moment(date).startOf('isoWeek');
export const getWeekEnd = (date: Moment) => moment(date).endOf('isoWeek');
export const getWeek = (date: Moment) => ({
  start: getWeekStart(date),
  end: getWeekEnd(date)
});

export const formatWeekStartAndEnd = (value: Moment) =>
  `${ getWeekStart(value).format(DATE_FORMAT) } — ${ getWeekEnd(value).format(DATE_FORMAT) }`;