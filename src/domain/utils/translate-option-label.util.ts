import { TFunction } from 'react-i18next';

import { SelectOption } from '@interfaces/select-option.interface';

export const translateOptionLabel = (option: SelectOption, t: TFunction): SelectOption => ({
  ...option,
  label: t(option.label),
});
