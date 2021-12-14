import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';
import { Language } from '@enums/language.enum';

export type SettingsModel = [
  {
    id: 'weekendDisplay',
    weekendDisplay: WeekendDisplay,
  },
  {
    id: 'weekStart',
    weekStart: DayNumber,
  },
  {
    id: 'dayTarget',
    dayTarget: number,
  },
  {
    id: 'dayLimit',
    dayLimit: number,
  },
  {
    id: 'language',
    language: Language,
  },
];

export type SettingsInterface = {
  weekendDisplay: WeekendDisplay;
  weekStart: DayNumber;
  dayTarget: number;
  dayLimit: number;
  language: Language;
}
