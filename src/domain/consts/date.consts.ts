import { DayNumber } from '@enums/day-number.enum';
import { SelectOption } from '@interfaces/select-option.interface';

export const DATE_FORMAT = 'DD-MM-YYYY';
export const COLUMN_DATE_FORMAT = 'DD-MM';
export const DAY_NAME_FORMAT = 'ddd';

export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const DAYS_IN_WEEK = 7;
export const DAYS_IN_WEEKEND = 2;

export const DAYS_OPTIONS: SelectOption[] = [
  { label: 'MONDAY', value: DayNumber.Monday },
  { label: 'TUESDAY', value: DayNumber.Tuesday },
  { label: 'WEDNESDAY', value: DayNumber.Wednesday },
  { label: 'THURSDAY', value: DayNumber.Thursday },
  { label: 'FRIDAY', value: DayNumber.Friday },
  { label: 'SATURDAY', value: DayNumber.Saturday },
  { label: 'SUNDAY', value: DayNumber.Sunday },
];