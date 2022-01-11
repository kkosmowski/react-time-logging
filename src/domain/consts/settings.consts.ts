import { WeekendDisplay } from '@enums/weekend-display.enum';
import { DayNumber } from '@enums/day-number.enum';
import { SettingsInterface, SettingsModel } from '@interfaces/settings.interface';
import { SelectOption } from '@interfaces/select-option.interface';
import { Language } from '@enums/language.enum';
import { Theme } from '@enums/theme.enum';

export const DEFAULT_WEEKEND_DISPLAY = WeekendDisplay.Full;
export const DEFAULT_WEEK_START = DayNumber.Monday;
export const DEFAULT_DISABLE_TIME_CHECK = false;
export const DEFAULT_DAY_TARGET = 8;
export const DEFAULT_DAY_LIMIT = 12;
export const DEFAULT_LANGUAGE = Language.EN;
export const DEFAULT_THEME = Theme.LightBlue;
export const DEFAULT_CONDENSED = false;

export const DEFAULT_SETTINGS_INTERFACE: SettingsInterface = {
  weekendDisplay: DEFAULT_WEEKEND_DISPLAY,
  weekStart: DEFAULT_WEEK_START,
  disableTimeCheck: DEFAULT_DISABLE_TIME_CHECK,
  dayTarget: DEFAULT_DAY_TARGET,
  dayLimit: DEFAULT_DAY_LIMIT,
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
  condensed: DEFAULT_CONDENSED,
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
    id: 'disableTimeCheck',
    disableTimeCheck: DEFAULT_DISABLE_TIME_CHECK,
  },
  {
    id: 'dayTarget',
    dayTarget: DEFAULT_DAY_TARGET,
  },
  {
    id: 'dayLimit',
    dayLimit: DEFAULT_DAY_LIMIT,
  },
  {
    id: 'language',
    language: DEFAULT_LANGUAGE,
  },
  {
    id: 'theme',
    theme: DEFAULT_THEME,
  },
  {
    id: 'condensed',
    condensed: DEFAULT_CONDENSED,
  },
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  {
    label: 'English',
    value: Language.EN,
  },
  {
    label: 'Polski',
    value: Language.PL,
  },
];

export const THEME_OPTIONS: SelectOption[] = [
  {
    label: 'THEME:LIGHT_BLUE',
    value: Theme.LightBlue,
  },
  {
    label: 'THEME:LIGHT_PURPLE',
    value: Theme.LightPurple,
  },
  {
    label: 'THEME:DARK_GREEN',
    value: Theme.DarkGreen,
  },
  {
    label: 'THEME:DARK_YELLOW',
    value: Theme.DarkYellow,
  },
  {
    label: 'THEME:DARK_TEAL',
    value: Theme.DarkTeal,
  },
]