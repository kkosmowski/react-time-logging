import { Moment } from 'moment';

import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';

export const calculateDatesToDisable = (date: Moment, weekendDisplay: WeekendDisplay): boolean => {
  switch (weekendDisplay) {
    case WeekendDisplay.Full:
      return false;

    case WeekendDisplay.Saturday:
      return date.day() === DayNumber.Sunday;

    case WeekendDisplay.None:
      return date.day() === DayNumber.Saturday || date.day() === DayNumber.Sunday;
  }
}