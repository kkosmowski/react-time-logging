import { ReactElement, useEffect, useRef } from 'react';
import { List } from 'antd';

import { Category } from '@interfaces/category.interface';
import { ListWrapper } from './CategoriesList.styled';
import { EntityUid } from '@mytypes/entity-uid.type';
import CategoriesListItem from './CategoriesListItem';
import { ZERO } from '@consts/numbers.consts';

interface Props {
  categories: Category[];
  onUpdate: (category: Category) => void;
  onDelete: (categoryId: EntityUid) => void;
  scrollDown?: void[];
}

const CategoriesList = ({ categories, onUpdate, onDelete, scrollDown }: Props): ReactElement => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const initialRender = useRef(true);
  const renderCategories = (category: Category) => (
    <List.Item key={ category.id }>
      <CategoriesListItem
        onUpdate={ onUpdate }
        onDelete={ onDelete }
        category={ category }
      />
    </List.Item>
  );

  useEffect(() => {
    if (wrapperRef.current) {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        wrapperRef.current.scrollTo(ZERO, wrapperRef.current?.scrollHeight || ZERO);
      }
    }
  }, [scrollDown]);

  return (
    <ListWrapper ref={ wrapperRef }>
      <List
        dataSource={ categories }
        renderItem={ renderCategories }
        size="small"
      />
    </ListWrapper>
  )
};

export default CategoriesList;