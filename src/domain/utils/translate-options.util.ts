import { TFunction } from 'react-i18next';

import { SelectOption } from '@interfaces/select-option.interface';

export const translateOptions = (options: SelectOption[], t: TFunction): SelectOption[] =>
  options.map(option => ({
    ...option,
    label: t(option.label),
  }));
