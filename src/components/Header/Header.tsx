import { ReactElement, useEffect } from 'react';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';

import PeriodPicker from '@components/PeriodPicker';
import { DetailsRow, HeaderRow, SettingsButton, StyledHeader, Version } from './Header.styled';
import boardSelectors from '@store/selectors/board.selectors';
import boardActionCreators from '@store/actionCreators/board-action.creators';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import Filters from '@components/Filters';
import categorySelectors from '@store/selectors/category.selectors';
import categoryActionCreators from '@store/actionCreators/category-action.creators';
import { FiltersInterface } from '@interfaces/filters.interface';
import taskActionCreators from '@store/actionCreators/task-action.creators';
import taskSelectors from '@store/selectors/task.selectors';
import uiSelectors from '@store/selectors/ui.selectors';
import TotalTime from './components/TotalTime';
import CurrentFilters from './components/CurrentFilters';

const version = '1.0.3';

const Header = (): ReactElement => {
  const viewedDate = useSelector(boardSelectors.viewedDate);
  const categories = useSelector(categorySelectors.categories);
  const filters = useSelector(taskSelectors.filters);
  const defaultFilters = useSelector(taskSelectors.defaultFilters);
  const { language, weekendDisplay, dayTarget, disableTimeCheck } = useSelector(uiSelectors.settings);
  const columns = useSelector(boardSelectors.columns);
  const dispatch = useDispatch();

  const handlePeriodChange = (date: Moment): void => {
    dispatch(boardActionCreators.setViewedDate(date));
  };

  const handleSettingsButtonClick = (): void => {
    dispatch(uiActionCreators.openSettingsDialog());
  };

  const handleFiltersChange = (filters: FiltersInterface): void => {
    dispatch(taskActionCreators.updateFilters(filters));
  };

  const setDefaultFilters = (): void => {
    taskActionCreators.setDefaultFilters(filters)(dispatch);
  };

  useEffect(() => {
    categoryActionCreators.getAll()(dispatch);
    taskActionCreators.loadDefaultFilters()(dispatch);
  }, []);

  return (
    <StyledHeader>
      <Version>{ version }</Version>
      <HeaderRow>
        <Filters
          categories={ categories }
          defaultFilters={ defaultFilters }
          onChange={ handleFiltersChange }
          onSave={ setDefaultFilters }
        />

        <PeriodPicker onChange={ handlePeriodChange } value={ viewedDate } withMargin />

        <SettingsButton onClick={ handleSettingsButtonClick }
          icon={ <SettingOutlined /> }
          shape="circle"
        />
      </HeaderRow>

      <DetailsRow>
        <CurrentFilters filters={ filters } language={ language } />
        { !disableTimeCheck && (
          <TotalTime weekendDisplay={ weekendDisplay } dayTarget={ dayTarget } columns={ columns } />
        ) }
      </DetailsRow>
    </StyledHeader>
  );
};

export default Header;