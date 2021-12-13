import { Moment } from 'moment';

import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';

export const calculateDatesToDisable = (
  date: Moment | DayNumber,
  weekendDisplay: WeekendDisplay
): boolean => {
  switch (weekendDisplay) {
    case WeekendDisplay.Full:
      return false;

    case WeekendDisplay.Saturday: {
      const dayNumber = typeof date === 'number' ? date : date.day();
      return dayNumber === DayNumber.Sunday;
    }

    case WeekendDisplay.None: {
      const dayNumber = typeof date === 'number' ? date : date.day();
      return dayNumber === DayNumber.Saturday || dayNumber === DayNumber.Sunday;
    }
  }
}