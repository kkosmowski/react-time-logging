import { ReactElement, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';

import { formatWeekStartAndEnd } from '@utils/date.utils';

interface Props {
  onChange: (date: Moment) => void;
  value: Moment | null;
  withMargin?: boolean;
}

const PeriodPicker = ({ onChange, value, withMargin }: Props): ReactElement => {
  const today: Moment = moment();
  const handleChange = (newValue: Moment | null): void => {
    newValue && onChange(newValue);
  };

  useEffect(() => {
    if (!value) {
      handleChange(today);
    }
  }, []);

  return (
    <DatePicker
      onChange={ handleChange }
      value={ value || today }
      format={ formatWeekStartAndEnd }
      picker="week"
      style={ withMargin ? { margin: '0 16px' } : {} }
    />
  );
};

export default PeriodPicker;