import { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DIALOG_WIDTH_MEDIUM } from '@consts/dialog.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import CategoriesList from './components/CategoriesList';
import categorySelectors from '@store/selectors/category.selectors';
import categoryActionCreators from '@store/actionCreators/category-action.creators';
import { AddCategoryRow, SettingsHeading, SettingsSection } from './SettingsDialog.styled';
import { Category } from '@interfaces/category.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

const SettingsDialog = (): ReactElement => {
  const categories = useSelector(categorySelectors.categories);
  const [isAddCategoryMode, setIsAddCategoryMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [scrollDown, setScrollDown] = useState<void[]>([]);
  const inputRef = useRef<Input | null>(null);
  const scrollDownDelay = 100;
  const dispatch = useDispatch();
  const { t } = useTranslation('SETTINGS_DIALOG');

  const handleCancel = (): void => {
    dispatch(uiActionCreators.closeSettingsDialog());
  };

  const handleCategoryUpdate = (category: Category): void => {
    categoryActionCreators.update(category.id, category)(dispatch);
  };

  const handleCategoryDelete = (categoryId: EntityUid): void => {
    categoryActionCreators.delete(categoryId)(dispatch);
  };

  const disableAddCategoryMode = (): void => {
    setIsAddCategoryMode(false);
  };

  const handleAddCategory = (): void => {
    if (!isAddCategoryMode) {
      setIsAddCategoryMode(true);
    } else {
      categoryActionCreators.add(categoryName)(dispatch);
      disableAddCategoryMode();
      setCategoryName('');

      setTimeout(() => {
        setScrollDown([]);
      }, scrollDownDelay);
    }
  };

  useEffect(() => {
    categoryActionCreators.getAll()(dispatch);
  }, []);

  useLayoutEffect(() => {
    isAddCategoryMode && inputRef.current?.focus();
  }, [isAddCategoryMode]);

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_MEDIUM }
      title={ t('COMMON:SETTINGS') }
      onCancel={ handleCancel }
      cancelText={ t('COMMON:CLOSE') }
      okButtonProps={ { style: { display: 'none' } } }
    >
      <SettingsSection>
        <SettingsHeading>{ t('MANAGE_CATEGORIES') }</SettingsHeading>
        <CategoriesList
          categories={ categories }
          onUpdate={ handleCategoryUpdate }
          onDelete={ handleCategoryDelete }
          scrollDown={ scrollDown }
        />
        <AddCategoryRow>
          { isAddCategoryMode && (
            <Input
              onChange={ e => setCategoryName(e.target.value) }
              value={ categoryName }
              ref={ inputRef }
            />
          ) }

          <Button onClick={ handleAddCategory } type="primary">
            { t( isAddCategoryMode ? 'ADD_CATEGORY' : 'NEW_CATEGORY') }
          </Button>

          { isAddCategoryMode && (
            <Button onClick={ disableAddCategoryMode }>
              { t('COMMON:CANCEL') }
            </Button>
          ) }
        </AddCategoryRow>
      </SettingsSection>
    </Modal>
  );
};

export default SettingsDialog;