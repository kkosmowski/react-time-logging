import { ReactElement, useEffect, useState } from 'react';
import { Button, Menu, Row, Select, Switch, Tooltip } from 'antd';
import { useFormik } from 'formik';

import { Filter, FiltersDropdown, FiltersDropdownBackdrop, FiltersMenuWrapper } from './Filters.styled';
import { Category } from '@interfaces/category.interface';
import { SelectOption } from '@interfaces/select-option.interface';
import { FiltersInterface } from '@interfaces/filters.interface';
import { FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { INITIAL_FILTERS } from '@consts/task.consts';

interface Props {
  categories: Category[];
  onChange: (filters: FiltersInterface) => void;
}

const Filters = ({ categories, onChange }: Props): ReactElement => {
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const formik = useFormik<FiltersInterface>({
    initialValues: INITIAL_FILTERS,
    onSubmit: () => {/**/},
  });
  const { setFieldValue, values, resetForm } = formik;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
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

  useEffect(() => {
    setCategoryOptions(categories.map(category => ({
      label: category.name,
      value: category.id,
    })));
  }, [categories]);

  useEffect(() => {
    onChange(values);
  }, [values]);

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

        <Row style={ { columnGap: '8px' } }>
          <Button onClick={ () => resetForm() }>{ t('CLEAR') }</Button>
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