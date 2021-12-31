import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@enums/language.enum';
import { FiltersInterface } from '@interfaces/filters.interface';
import styled from 'styled-components/macro';
import { Tooltip } from 'antd';

interface Props {
  filters: FiltersInterface;
  language: Language;
}

const CurrentFilters = ({ filters, language }: Props): ReactElement | null => {
  const [filtersTouched, setFiltersTouched] = useState(false);
  const [currentFilterCategories, setCurrentFilterCategories] = useState<ReactNode[]>([]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const { t } = useTranslation('HEADER');

  useEffect(() => {
    if (!!filters.categories.length || filters.allCategoriesRequired) {
      setTimeout(() => {
        const separator = t(filters.allCategoriesRequired ? 'AND' : 'OR');
        const array: ReactNode[] = [];

        setFiltersTouched(true);

        filters.categories.forEach((category, index) => {
          array.push(<strong key={ category.id }>{ category.name }</strong>);
          array.push(<span key={ index }> { separator } </span>);
        });
        array.pop();

        setCurrentFilterCategories(array);
      });
    } else {
      setFiltersTouched(false);
      setCurrentFilterCategories([]);
    }
  }, [filters, language]);

  useEffect(() => {
    if (ref.current) {
      const clientW = ref.current!.clientWidth;
      const scrollW = ref.current!.scrollWidth;

      if (clientW && scrollW && clientW !== scrollW) {
        const odd = 2;
        const difference = scrollW - clientW;
        const xMoreWidth = 50;
        const children = ref.current!.children;
        let widthToReclaim = difference + xMoreWidth;
        let itemsToRemove = 0;
        let i = children.length - 1;

        while (widthToReclaim > 0 || itemsToRemove % odd === 0) {
          widthToReclaim -= (children[i] as HTMLElement).offsetWidth;
          itemsToRemove++;
          i--;
        }

        const numberOfCategoriesToRemove = Math.ceil(itemsToRemove / odd) // exclude ORs/ANDs
        const removedCategories = filters.categories
          .slice(itemsToRemove + 1)
          .map(category => category.name + '\n');

        setCurrentFilterCategories([
          ...currentFilterCategories.slice(0, currentFilterCategories.length - itemsToRemove),
          <Tooltip
            title={ removedCategories }
            placement="bottomRight"
            key={ currentFilterCategories.length }
          >
            <strong>{ t('X_MORE', { x: numberOfCategoriesToRemove }) }</strong>
          </Tooltip>,
        ]);
      }
    }
  }, [filters, currentFilterCategories]);

  return filtersTouched
    ? (
      <StyledSpan ref={ ref }>
        { t('CURRENT_FILTERS') }: { currentFilterCategories }
      </StyledSpan>
    )
    : null;
}

export default CurrentFilters;

const StyledSpan = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;