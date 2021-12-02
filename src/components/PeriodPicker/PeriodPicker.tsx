import { ReactElement } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

import { DATE_FORMAT } from '../../domain/consts/date.consts';

interface Props {
  onChange: (date: Moment) => void;
  value: Moment;
  withMargin?: boolean;
}

const customWeekStartEndFormat = (value: Moment) => `${
  moment(value).startOf('isoWeek').format(DATE_FORMAT)
} — ${
  moment(value).endOf('isoWeek').format(DATE_FORMAT)
}`;

const PeriodPicker = ({ onChange, value, withMargin }: Props): ReactElement => {
  const handleChange = (newValue: Moment | null): void => {
    newValue && onChange(newValue);
  };

  return (
    <DatePicker
      onChange={ handleChange }
      value={ value }
      format={ customWeekStartEndFormat }
      picker="week"
      style={ withMargin ? { margin: '0 16px' } : {} }
    />
  );
};

export default PeriodPicker;