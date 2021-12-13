import { WeekendDisplay } from '@enums/weekend-display.enum';

export type SettingsModel = [
  {
    id: 'weekendDisplay',
    weekendDisplay: WeekendDisplay,
  },
];

export interface SettingsInterface {
  weekendDisplay: WeekendDisplay;
}
