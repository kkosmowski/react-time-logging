import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';
import { Language } from '@enums/language.enum';
import { Theme } from '@enums/theme.enum';

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
    id: 'disableTimeCheck',
    disableTimeCheck: boolean,
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
  {
    id: 'theme',
    theme: Theme,
  },
  {
    id: 'condensed',
    condensed: boolean,
  },
];

export type SettingsInterface = {
  weekendDisplay: WeekendDisplay;
  weekStart: DayNumber;
  disableTimeCheck: boolean;
  dayTarget: number;
  dayLimit: number;
  language: Language;
  theme: Theme;
  condensed: boolean;
}
