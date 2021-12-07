import { ReactElement, useEffect, useState } from 'react';
import { Button, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { formatWeekStartAndEnd } from '@utils/date.utils';
import { DAYS_IN_WEEK } from '@consts/date.consts';
import { PeriodPickerWrapper } from './PeriodPicker.styled';

interface Props {
  onChange: (date: Moment) => void;
  value: Moment | null;
  withMargin?: boolean;
}

moment.locale('en-us', {
  week: { dow: 1 }
});

const PeriodPicker = ({ onChange, value, withMargin }: Props): ReactElement => {
  const [date, setDate] = useState<Moment>(value || moment());

  const handleChange = (newDate: Moment | null): void => {
    newDate && setDate(newDate);
  };

  const setPreviousWeek = (): void => {
    handleChange(moment(date).subtract(DAYS_IN_WEEK, 'days'));
  };

  const setNextWeek = (): void => {
    handleChange(moment(date).add(DAYS_IN_WEEK, 'days'));
  };

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <PeriodPickerWrapper>
      <Button
        onClick={ setPreviousWeek }
        type="default"
        icon={ <LeftOutlined /> }
      />

      <DatePicker
        onChange={ handleChange }
        value={ date }
        format={ formatWeekStartAndEnd }
        picker="week"
        allowClear={ false }
        style={ withMargin ? { margin: '0 16px' } : {} }
      />

      <Button
        onClick={ setNextWeek }
        type="default"
        icon={ <RightOutlined /> }
      />
    </PeriodPickerWrapper>
  );
};

export default PeriodPicker;