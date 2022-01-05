import { ReactElement, useEffect, useState } from 'react';
import { Button, Menu, Select, Switch, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Explanation, Filter, FiltersDropdown, FiltersDropdownBackdrop, FiltersMenuWrapper } from './Filters.styled';
import { Category } from '@interfaces/category.interface';
import { SelectOption } from '@interfaces/select-option.interface';
import { FiltersInterface } from '@interfaces/filters.interface';
import Row from '@components/Row';
import { usePrevious } from '@hooks/use-previous';
import { equalFilters } from '@utils/filters.utils';
import { INITIAL_FILTERS } from '@consts/task.consts';

interface Props {
  categories: Category[];
  defaultFilters: FiltersInterface;
  onChange: (filters: FiltersInterface) => void;
  onSave: () => void;
}

const Filters = ({ categories, defaultFilters, onChange, onSave }: Props): ReactElement => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const formik = useFormik<FiltersInterface>({
    initialValues: INITIAL_FILTERS,
    onSubmit: () => {/**/},
  });
  const { setFieldValue, values, resetForm } = formik;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDefaultFilter, setIsDefaultFilter] = useState(true);
  const previousValues = usePrevious(values);
  const { t } = useTranslation('FILTERS');

  const handleCategorySelect = (option: string): void => {
    const category = categories.find(category => category.id === option);

    if (category) {
      setFieldValue('categories', [...values.categories, category]);
    }
  };

  const handleCategoryDeselect = (option: string): void => {
    setFieldValue('categories', values.categories.filter(category => category.id !== option));
  };

  const handleToggleChange = (checked: boolean): void => {
    setFieldValue('allCategoriesRequired', checked);
  };

  const handleDropdownClose = (): void => {
    setIsDropdownVisible(false);
  };

  const handleDropdownOpen = (): void => {
    setIsDropdownVisible(true);
  };

  const handleClear = (): void => {
    resetForm({ values: INITIAL_FILTERS });
  };

  const restoreDefault = (): void => {
    resetForm({ values: defaultFilters });
  };

  useEffect(() => {
    setCategoryOptions(categories.map(category => ({
      label: category.name,
      value: category.id,
    })));

    const categoriesIds = categories.map(category => category.id);
    const updatedCategories = values.categories
      .filter(category => categoriesIds.includes(category.id))
      .map(category => categories.find(cat => cat.id === category.id));

    setFieldValue('categories', updatedCategories);
  }, [categories]);

  useEffect(() => {
    setIsDefaultFilter(equalFilters(values, defaultFilters));

    if (!previousValues || equalFilters(values, previousValues)) {
      return;
    }

    onChange(values);
  }, [values, defaultFilters]);

  useEffect(() => {
    resetForm({ values: defaultFilters });
  }, [defaultFilters]);

  const filtersMenu = (
    <Menu>
      <FiltersMenuWrapper>
        <Filter>

          <label htmlFor="categories-filter">{ t('FILTER_CATEGORIES') }</label>

          <Select
            id="categories-filter"
            placeholder={ t('SELECT_CATEGORIES_PLACEHOLDER') }
            onSelect={ handleCategorySelect }
            onDeselect={ handleCategoryDeselect }
            options={ categoryOptions }
            value={ values.categories.map(c => c.id) }
            mode="tags"
          >
          </Select>
        </Filter>

        <Filter>
          <label htmlFor="filter-type">{ t('ANY_OR_EVERY') }</label>

          <Tooltip title={ t('ANY_OR_EVERY_TOOLTIP') }>
            <Switch
              id="filter-type"
              checked={ values.allCategoriesRequired }
              onChange={ handleToggleChange }
              unCheckedChildren={ t('ANY') }
              checkedChildren={ t('EVERY') }
            />
          </Tooltip>
        </Filter>

        <Filter>
          <label>{ t('SAVE_FILTERS') }</label>
          <Tooltip title={ isDefaultFilter ? t('ALREADY_DEFAULT_TOOLTIP') : '' }>
            <Button
              onClick={ onSave }
              disabled={ isDefaultFilter }
              type="primary"
            >{ t('SAVE_AS_DEFAULT') }</Button>
          </Tooltip>
          <Explanation>{ t('SAVE_FILTERS_EXPLANATION') }</Explanation>
        </Filter>

        <Row gap={ 8 }>
          <Tooltip title={ isDefaultFilter ? t('ALREADY_DEFAULT_TOOLTIP') : '' }>
            <Button
              onClick={ restoreDefault }
              disabled={ isDefaultFilter }
            >{ t('RESTORE_DEFAULT') }</Button>
          </Tooltip>
          <Button onClick={ handleClear }>{ t('CLEAR') }</Button>
          <Button onClick={ handleDropdownClose }>{ t('COMMON:CLOSE') }</Button>
        </Row>
      </FiltersMenuWrapper>
    </Menu>
  )

  return (
    <>
    <FiltersDropdown visible={ isDropdownVisible } overlay={ filtersMenu }>
      <Button
        onClick={ handleDropdownOpen }
        icon={ <FilterOutlined /> }
        shape="circle"
      />
    </FiltersDropdown>
    <FiltersDropdownBackdrop visible={ isDropdownVisible } onClick={ handleDropdownClose } />
    </>
  );
}

export default Filters;