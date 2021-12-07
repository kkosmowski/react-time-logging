import { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import { Buttons, DeleteButton, GrayButton } from './CategoriesListItem.styled';
import { Category } from '@interfaces/category.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

interface Props {
  category: Category;
  onUpdate: (category: Category) => void;
  onDelete: (categoryId: EntityUid) => void;
}

const CategoriesListItem = ({ category, onUpdate, onDelete }: Props): ReactElement => {
  const [inputName, setInputName] = useState(category.name);
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<Input | null>(null);

  const handleCategoryEdit = (): void => {
    setIsEditMode(true);
  };

  const disableEditMode = (): void => {
    setIsEditMode(false);
  };

  const handleUpdate = (): void => {
    onUpdate({ ...category, name: inputName });
    disableEditMode();
  };

  useLayoutEffect(() => {
    isEditMode && inputRef.current?.focus();
  }, [isEditMode]);

  return (
    <>
      { isEditMode
        ? (
          <Input
            value={ inputName }
            onChange={ e => setInputName(e.target.value) }
            ref={ inputRef }
          />
        )
        : <span>{ category.name }</span>
      }

      <Buttons>
        { isEditMode
          ? (
            <>
              <Button
                onClick={ handleUpdate }
                type="primary"
                shape="circle"
                icon={ <SaveOutlined /> }
              />

              <GrayButton
                onClick={ disableEditMode }
                shape="circle"
                icon={ <CloseCircleOutlined /> }
              />
            </>
          )
          : (
            <>
              <GrayButton
                onClick={ handleCategoryEdit }
                shape="circle"
                icon={ <EditOutlined /> }
              />

              <DeleteButton
                onClick={ () => onDelete(category.id) }
                shape="circle"
                icon={ <DeleteOutlined /> }
              />
            </>
          )
        }
      </Buttons>
    </>
  )
};

export default CategoriesListItem;