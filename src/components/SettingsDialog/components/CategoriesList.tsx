import { ReactElement } from 'react';
import { List } from 'antd';

import { Category } from '@interfaces/category.interface';
import { ListWrapper } from './CategoriesList.styled';
import { EntityUid } from '@mytypes/entity-uid.type';
import CategoriesListItem from './CategoriesListItem';

interface Props {
  categories: Category[];
  onUpdate: (category: Category) => void;
  onDelete: (categoryId: EntityUid) => void;
}

const CategoriesList = ({ categories, onUpdate, onDelete }: Props): ReactElement => {
  const renderCategories = (category: Category) => (
    <List.Item key={ category.id }>
      <CategoriesListItem
        onUpdate={ onUpdate }
        onDelete={ onDelete }
        category={ category }
      />
    </List.Item>
  );

  return (
    <ListWrapper>
      <List
        dataSource={ categories }
        renderItem={ renderCategories }
        size="small"
      />
    </ListWrapper>
  )
};

export default CategoriesList;