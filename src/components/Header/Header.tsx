import { ReactElement } from 'react';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';

import PeriodPicker from '@components/PeriodPicker';
import { SettingsButton, StyledHeader } from './Header.styled';
import boardSelectors from '@store/selectors/board.selectors';
import boardActionCreators from '@store/actionCreators/board-action.creators';
import uiActionCreators from '@store/actionCreators/ui-action.creators';

const Header = (): ReactElement => {
  const viewedDate = useSelector(boardSelectors.viewedDate);
  const dispatch = useDispatch();

  const handlePeriodChange = (date: Moment): void => {
    dispatch(boardActionCreators.setViewedDate(date));
  };

  const handleSettingsButtonClick = (): void => {
    dispatch(uiActionCreators.openSettingsDialog());
  }

  return (
    <StyledHeader>
      <PeriodPicker
        onChange={ handlePeriodChange }
        value={ viewedDate }
        withMargin
      />

      <SettingsButton
        onClick={ handleSettingsButtonClick }
        icon={ <SettingOutlined /> }
        shape="circle"
      />
    </StyledHeader>
  );
};

export default Header;