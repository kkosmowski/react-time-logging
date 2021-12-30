import { ReactElement, useEffect } from 'react';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';

import PeriodPicker from '@components/PeriodPicker';
import { SettingsButton, StyledHeader } from './Header.styled';
import boardSelectors from '@store/selectors/board.selectors';
import boardActionCreators from '@store/actionCreators/board-action.creators';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import Filters from '@components/Filters';
import categorySelectors from '@store/selectors/category.selectors';
import categoryActionCreators from '@store/actionCreators/category-action.creators';
import { FiltersInterface } from '@interfaces/filters.interface';
import taskActionCreators from '@store/actionCreators/task-action.creators';

const Header = (): ReactElement => {
  const viewedDate = useSelector(boardSelectors.viewedDate);
  const categories = useSelector(categorySelectors.categories);
  const dispatch = useDispatch();

  const handlePeriodChange = (date: Moment): void => {
    dispatch(boardActionCreators.setViewedDate(date));
  };

  const handleSettingsButtonClick = (): void => {
    dispatch(uiActionCreators.openSettingsDialog());
  };

  const handleFiltersChange = (filters: FiltersInterface): void => {
    dispatch(taskActionCreators.updateFilters(filters));
  }

  useEffect(() => {
    categoryActionCreators.getAll()(dispatch);
  }, []);

  return (
    <StyledHeader>
      <Filters categories={ categories } onChange={ handleFiltersChange } />

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