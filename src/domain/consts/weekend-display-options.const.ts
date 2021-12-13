import { SelectOption } from '@interfaces/select-option.interface';
import { WeekendDisplay } from '@enums/weekend-display.enum';

export const WEEKEND_DISPLAY_OPTIONS: SelectOption[] = [
  {
    label: 'NO_WEEKEND',
    value: WeekendDisplay.None,
  },
  {
    label: 'SATURDAY_ONLY',
    value: WeekendDisplay.Saturday,
  },
  {
    label: 'FULL_WEEKEND',
    value: WeekendDisplay.Full,
  },
]