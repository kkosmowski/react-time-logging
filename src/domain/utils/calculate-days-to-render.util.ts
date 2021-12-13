import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DAYS_IN_WEEK, DAYS_IN_WEEKEND } from '@consts/date.consts';

export const calculateDaysToRender = (weekendDisplay: WeekendDisplay): number => {
  switch (weekendDisplay) {
    case WeekendDisplay.Full:
      return DAYS_IN_WEEK;

    case WeekendDisplay.Saturday:
      return DAYS_IN_WEEK - 1;

    case WeekendDisplay.None:
      return DAYS_IN_WEEK - DAYS_IN_WEEKEND;
  }
}