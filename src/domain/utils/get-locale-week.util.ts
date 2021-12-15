import { TFunction } from 'react-i18next';
import { LocaleSpecification } from 'moment';

import { DAYS_OPTIONS, SHORT_DAYS } from '@consts/date.consts';

export const getLocaleWeek = (t: TFunction): LocaleSpecification => ({
  week: {
    dow: 1
  },
  weekdays: DAYS_OPTIONS.map(day => t(day.label)),
  weekdaysShort: SHORT_DAYS.map(day => t(day)),
});