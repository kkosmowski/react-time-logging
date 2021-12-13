import { WeekendDisplay } from '@enums/weekend-display.enum';
import { SettingsModel } from '@interfaces/settings.interface';
import { DayNumber } from '@enums/day-number.enum';

export const INITIAL_SETTINGS_MODEL: SettingsModel = [
  {
    id: 'weekendDisplay',
    weekendDisplay: WeekendDisplay.Full,
  },
  {
    id: 'weekStart',
    weekStart: DayNumber.Monday,
  },
]