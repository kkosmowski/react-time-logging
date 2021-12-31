import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@enums/language.enum';
import { FiltersInterface } from '@interfaces/filters.interface';

interface Props {
  filters: FiltersInterface;
  language: Language;
}

const CurrentFilters = ({ filters, language }: Props): ReactElement | null => {
  const [filtersTouched, setFiltersTouched] = useState(false);
  const [currentFilterCategories, setCurrentFilterCategories] = useState<ReactNode[]>([]);
  const { t } = useTranslation('HEADER');

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

  return filtersTouched
    ? (
      <span>
        { t('CURRENT_FILTERS') }: { currentFilterCategories }
      </span>
    )
    : null;
}

export default CurrentFilters;