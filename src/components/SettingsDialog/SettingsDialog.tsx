import { ReactElement, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DIALOG_WIDTH_MEDIUM } from '@consts/dialog.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import CategoriesList from './components/CategoriesList';
import categorySelectors from '@store/selectors/category.selectors';
import categoryActionCreators from '@store/actionCreators/category-action.creators';
import { SettingsHeading, SettingsSection } from './SettingsDialog.styled';
import { Category } from '@interfaces/category.interface';
import { EntityUid } from '@mytypes/entity-uid.type';

const SettingsDialog = (): ReactElement => {
  const categories = useSelector(categorySelectors.categories);
  const dispatch = useDispatch();
  const { t } = useTranslation('SETTINGS_DIALOG');

  const handleCancel = (): void => {
    dispatch(uiActionCreators.closeSettingsDialog());
  };

  const handleCategoryUpdate = (category: Category): void => {
    //
  };

  const handleCategoryDelete = (categoryId: EntityUid): void => {
    //
  };

  useEffect(() => {
    dispatch(categoryActionCreators.getAll());
  }, []);

  return (
    <Modal
      visible
      width={ DIALOG_WIDTH_MEDIUM }
      title={ t('COMMON:SETTINGS') }
      onCancel={ handleCancel }
    >
      <SettingsSection>
        <SettingsHeading>{ t('MANAGE_CATEGORIES') }</SettingsHeading>
        <CategoriesList
          categories={ categories }
          onUpdate={ handleCategoryUpdate }
          onDelete={ handleCategoryDelete }
        />
        <Button type="primary">{ t('ADD_CATEGORY') }</Button>
      </SettingsSection>
    </Modal>
  );
};

export default SettingsDialog;