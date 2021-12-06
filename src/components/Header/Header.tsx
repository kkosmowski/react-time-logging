import { ReactElement } from 'react';
import moment, { Moment } from 'moment';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import PeriodPicker from '@components/PeriodPicker';
import { PeriodPickerWrapper, StyledHeader } from './Header.styled';
import { DAYS_IN_WEEK } from '@consts/date.consts';
import boardSelectors from '@store/selectors/board.selectors';
import boardActionCreators from '@store/actionCreators/board-action.creators';

const Header = (): ReactElement => {
  const viewedDate = useSelector(boardSelectors.viewedDate);
  const dispatch = useDispatch();

  const handlePeriodChange = (date: Moment): void => {
    dispatch(boardActionCreators.setViewedDate(date));
  };

  const setPreviousWeek = (): void => {
    handlePeriodChange(moment(viewedDate).subtract(DAYS_IN_WEEK, 'days'));
  };

  const setNextWeek = (): void => {
    handlePeriodChange(moment(viewedDate).add(DAYS_IN_WEEK, 'days'));
  };

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
          value={ viewedDate }
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