import { ReactElement, useState } from 'react';
import moment, { Moment } from 'moment';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import PeriodPicker from '@components/PeriodPicker';
import { PeriodPickerWrapper, StyledHeader } from './Header.styled';
import { DAYS_IN_WEEK } from '../../domain/consts/date.consts';

const Header = (): ReactElement => {
  const [date, setDate] = useState<Moment>(moment());

  const handlePeriodChange = (value: Moment): void => {
    setDate(value);
  };

  const setPreviousWeek = (): void => {
    setDate(moment(date).subtract(DAYS_IN_WEEK, 'days'));
  };

  const setNextWeek = (): void => {
    setDate(moment(date).add(DAYS_IN_WEEK, 'days'));
  }

  return (
    <StyledHeader>
      <PeriodPickerWrapper>
        <Button
          onClick={ setPreviousWeek }
          type="default"
          icon={ <LeftOutlined /> }
        />

        <PeriodPicker
          onChange={ handlePeriodChange }
          value={ date }
          withMargin
        />

        <Button
          onClick={ setNextWeek }
          type="default"
          icon={ <RightOutlined /> }
        />
      </PeriodPickerWrapper>
    </StyledHeader>
  );
};

export default Header;