import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';
import { SettingsInterface, SettingsModel } from '@interfaces/settings.interface';

export const DEFAULT_WEEKEND_DISPLAY = WeekendDisplay.Full;
export const DEFAULT_WEEK_START = DayNumber.Monday;
export const DEFAULT_DAY_TARGET = 8;
export const DEFAULT_DAY_LIMIT = 12;

export const DEFAULT_SETTINGS_INTERFACE: SettingsInterface = {
  weekendDisplay: DEFAULT_WEEKEND_DISPLAY,
  weekStart: DEFAULT_WEEK_START,
  dayTarget: DEFAULT_DAY_TARGET,
  dayLimit: DEFAULT_DAY_LIMIT,
};

export const DEFAULT_SETTINGS_MODEL: SettingsModel = [
  {
    id: 'weekendDisplay',
    weekendDisplay: DEFAULT_WEEKEND_DISPLAY,
  },
  {
    id: 'weekStart',
    weekStart: DEFAULT_WEEK_START,
  },
  {
    id: 'dayTarget',
    dayTarget: DEFAULT_DAY_TARGET,
  },
  {
    id: 'dayLimit',
    dayLimit: DEFAULT_DAY_LIMIT,
  },
];
