import { WeekendDisplay } from '@enums/weekend-display.enum';
import { SettingsModel } from '@interfaces/settings.interface';

export const INITIAL_SETTINGS_MODEL: SettingsModel = [
  {
    id: 'weekendDisplay',
    weekendDisplay: WeekendDisplay.Full,
  }
]