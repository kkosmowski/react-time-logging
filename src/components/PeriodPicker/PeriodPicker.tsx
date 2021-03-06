import { ReactElement, useEffect, useState } from 'react';
import { Button, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { formatWeekStartAndEnd } from '@utils/date.utils';
import { DAYS_IN_WEEK } from '@consts/date.consts';
import { PeriodPickerWrapper } from './PeriodPicker.styled';

interface Props {
  onChange: (date: Moment) => void;
  value: Moment | null;
  withMargin?: boolean;
}

const PeriodPicker = ({ onChange, value, withMargin }: Props): ReactElement => {
  const [date, setDate] = useState<Moment>(value || moment());
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('COMMON');

  const handleChange = (newDate: Moment | null): void => {
    newDate && setDate(newDate);
    setOpen(false);
  };

  const setPreviousWeek = (): void => {
    handleChange(moment(date).subtract(DAYS_IN_WEEK, 'days'));
  };

  const setNextWeek = (): void => {
    handleChange(moment(date).add(DAYS_IN_WEEK, 'days'));
  };

  const onTodayClick = (): void => {
    handleChange(moment());
    setOpen(false);
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
        onClick={ () => setOpen(true) }
        onChange={ handleChange }
        open={ open }
        value={ date }
        format={ formatWeekStartAndEnd }
        picker="week"
        allowClear={ false }
        style={ withMargin ? { margin: '0 16px' } : {} }
        renderExtraFooter={ () => (
          <div className="ant-picker-footer">
            <Button type="link"  onClick={ onTodayClick }>{ t('COMMON:TODAY') }</Button>
          </div>
        ) }
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