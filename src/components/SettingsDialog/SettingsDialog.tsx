import { ChangeEvent, ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DIALOG_WIDTH_MEDIUM } from '@consts/dialog.consts';
import uiActionCreators from '@store/actionCreators/ui-action.creators';
import CategoriesList from './components/CategoriesList/CategoriesList';
import categorySelectors from '@store/selectors/category.selectors';
import categoryActionCreators from '@store/actionCreators/category-action.creators';
import { AddCategoryRow, SettingsRow, SettingsSection } from './SettingsDialog.styled';
import { Category } from '@interfaces/category.interface';
import { EntityUid } from '@mytypes/entity-uid.type';
import { WEEKEND_DISPLAY_OPTIONS } from '@consts/weekend-display-options.const';
import uiSelectors from '@store/selectors/ui.selectors';
import { WeekendDisplay } from '@enums/weekend-display.enum';
import { translateOptions } from '@utils/translate-options.util';
import { DAYS_OPTIONS } from '@consts/date.consts';
import { DayNumber } from '@enums/day-number.enum';
import { calculateDatesToDisable } from '@utils/calculate-dates-to-disabled.util';
import { LANGUAGE_OPTIONS, THEME_OPTIONS } from '@consts/settings.consts';
import { Language } from '@enums/language.enum';
import { Theme } from '@enums/theme.enum';

const SettingsDialog = (): ReactElement => {
  const categories = useSelector(categorySelectors.categories);
  const {
    dayTarget,
    dayLimit,
    weekendDisplay,
    weekStart,
    language,
    theme,
  } = useSelector(uiSelectors.settings);
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

  const handleWeekendDisplayChange = (option: WeekendDisplay): void => {
    uiActionCreators.updateSetting<WeekendDisplay>('weekendDisplay', option)(dispatch);

    const noWeekendOrOnlySaturdayAndWeekStartIsSunday =
      weekStart === DayNumber.Sunday && option !== WeekendDisplay.Full;
    const noWeekendAndWeekStartIsSaturday =
      weekStart === DayNumber.Saturday && option === WeekendDisplay.None;

    if (noWeekendOrOnlySaturdayAndWeekStartIsSunday || noWeekendAndWeekStartIsSaturday) {
      handleFirstWeekDayChange(DayNumber.Monday);
    }
  };

  const handleFirstWeekDayChange = (option: DayNumber): void => {
    uiActionCreators.updateSetting<DayNumber>('weekStart', option)(dispatch);
  };

  const handleDayTargetOrLimitChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const settingName = e.target.id as 'dayTarget' | 'dayLimit';
    uiActionCreators.updateSetting<number>(settingName, +e.target.value)(dispatch);
  };

  const handleLanguageChange = (language: Language): void => {
    uiActionCreators.updateSetting<Language>('language', language)(dispatch);
  };

  const handleThemeChange = (theme: Theme): void => {
    uiActionCreators.updateSetting<Theme>('theme', theme)(dispatch);
  };

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
        <h2>{ t('MANAGE_CATEGORIES') }</h2>

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

      <SettingsSection>
        <h2>{ t('BOARD_SETTINGS') }</h2>

        <SettingsRow>
          <h3 id="weekendDisplay">{ t('WEEKEND_DISPLAY') }</h3>

          <Select
            onChange={ handleWeekendDisplayChange }
            options={ translateOptions(WEEKEND_DISPLAY_OPTIONS, t) }
            value={ weekendDisplay }
            aria-labelledby="weekendDisplay"
          />
        </SettingsRow>

        <SettingsRow>
          <h3 id="firstDayOfWeekTitle">{ t('FIRST_DAY_OF_WEEK') }</h3>

          <Select
            onChange={ handleFirstWeekDayChange }
            value={ weekStart }
            aria-labelledby="firstDayOfWeekTitle"
          >
            { DAYS_OPTIONS.map(day => (
              <Select.Option
                value={ day.value }
                disabled={ calculateDatesToDisable(+day.value, weekendDisplay) }
                key={ day.value }
              >
                { t(day.label) }
              </Select.Option>
            )) }
          </Select>
        </SettingsRow>

        <SettingsRow>
          <h3 id="dayTargetTitle">{ t('DAY_TARGET') }</h3>

          <Input
            id="dayTarget"
            type="number"
            onChange={ handleDayTargetOrLimitChange }
            value={ dayTarget }
            suffix={ t('HOURS_SUFFIX') }
            aria-labelledby="dayTargetTitle"
          />
        </SettingsRow>

        <SettingsRow>
          <h3 id="dayLimitTitle">{ t('DAY_LIMIT') }</h3>

          <Input
            id="dayLimit"
            type="number"
            onChange={ handleDayTargetOrLimitChange }
            value={ dayLimit }
            suffix={ t('HOURS_SUFFIX') }
            aria-labelledby="dayLimitTitle"
          />
        </SettingsRow>

        <SettingsRow>
          <h3 id="languageTitle">{ t('LANGUAGE') }</h3>

          <Select
            onChange={ handleLanguageChange }
            options={ LANGUAGE_OPTIONS }
            value={ language }
            aria-labelledby="languageTitle"
          />
        </SettingsRow>

        <SettingsRow>
          <h3 id="themeTitle">{ t('THEME') }</h3>

          <Select
            onChange={ handleThemeChange }
            options={ translateOptions(THEME_OPTIONS, t) }
            value={ theme }
            aria-labelledby="themeTitle"
          />
        </SettingsRow>
      </SettingsSection>
    </Modal>
  );
};

export default SettingsDialog;
