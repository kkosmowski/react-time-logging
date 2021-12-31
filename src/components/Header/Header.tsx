import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import PeriodPicker from '@components/PeriodPicker';
import { CurrentFiltersRow, HeaderRow, SettingsButton, StyledHeader } from './Header.styled';
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

const Header = (): ReactElement => {
  const viewedDate = useSelector(boardSelectors.viewedDate);
  const categories = useSelector(categorySelectors.categories);
  const filters = useSelector(taskSelectors.filters);
  const defaultFilters = useSelector(taskSelectors.defaultFilters);
  const { language } = useSelector(uiSelectors.settings);
  const [filtersTouched, setFiltersTouched] = useState(false);
  const [currentFilterCategories, setCurrentFilterCategories] = useState<ReactNode[]>([]);
  const dispatch = useDispatch();
  const { t } = useTranslation('FILTERS');

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

  useEffect(() => {
    if (!!filters.categories.length || filters.allCategoriesRequired) {
      setTimeout(() => {
        const separator = t(filters.allCategoriesRequired ? 'AND' : 'OR');
        const array: ReactNode[] = [];

        setFiltersTouched(true);

        filters.categories.forEach((category) => {
          array.push(<strong key={ category.id }>{ category.name }</strong>);
          array.push(` ${ separator } `);
        });
        array.pop();

        setCurrentFilterCategories(array);
      });
    } else {
      setFiltersTouched(false);
      setCurrentFilterCategories([]);
    }
  }, [filters, language]);

  return (
    <StyledHeader>
      <HeaderRow>
        <Filters
          categories={ categories }
          defaultFilters={ defaultFilters }
          onChange={ handleFiltersChange }
          onSave={ setDefaultFilters }
        />

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
      </HeaderRow>

      { filtersTouched && (
        <CurrentFiltersRow>
          { t('CURRENT_FILTERS') }: { currentFilterCategories }
        </CurrentFiltersRow>
      ) }
    </StyledHeader>
  );
};

export default Header;