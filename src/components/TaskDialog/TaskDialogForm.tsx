import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import { DatePicker, Input, Select, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { Moment } from 'moment';

import ErrorText from '@components/ErrorText';
import { Italic, StyledForm, StyledTextArea, TaskDialogGroup, TaskDialogHeading } from './TaskDialogForm.styled';
import { DATE_FORMAT, MINUTES_IN_HOUR } from '@consts/date.consts';
import { SelectOption } from '@interfaces/select-option.interface';
import { Category } from '@interfaces/category.interface';
import { TASK_DESCRIPTION_MAX_LENGTH } from '@consts/task.consts';
import { calculateDurationFromString, minutesToHoursAndMinutes } from '@utils/task.utils';
import { calculateDatesToDisable } from '@utils/calculate-dates-to-disabled.util';
import { WeekendDisplay } from '@enums/weekend-display.enum';

interface Props {
  formik: FormikProps<TaskFormInterface>;
  isEditMode: boolean;
  categories: Category[];
  weekendDisplay: WeekendDisplay;
  dayLimit: number;
  originalDuration: number;
  totalMinutes: number;
}

const TaskDialogForm = ({
  formik,
  isEditMode,
  categories,
  weekendDisplay,
  dayLimit,
  originalDuration,
  totalMinutes,
}: Props): ReactElement => {
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
    setFieldError,
    setFieldTouched
  } = formik;
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [overTime, setOverTime] = useState<string | null>(null);
  const { t } = useTranslation('TASK_DIALOG');

  const disabledDate = (date: Moment): boolean => {
    return calculateDatesToDisable(date, weekendDisplay);
  };

  const handleCategorySelect = (option: string): void => {
    const category = categories.find(category => category.id === option);

    if (category) {
      setFieldValue('categories', [...values.categories, category]);
    }
  };

  const handleCategoryDeselect = (option: string): void => {
    setFieldValue('categories', values.categories.filter(category => category.id !== option));
  };

  const handleDurationBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldTouched('duration', true, false);
    const minutes = calculateDurationFromString(e.target.value);
    const allowedTime = dayLimit * MINUTES_IN_HOUR - totalMinutes;

    if (minutes - originalDuration <= allowedTime) {
      setFieldValue('duration', minutesToHoursAndMinutes(minutes), false);
      setOverTime(null);
    } else {
      setOverTime(minutesToHoursAndMinutes(totalMinutes + minutes - originalDuration));
    }
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('duration', e.target.value, false);
  };

  const mapSelectOptionToCategoryTag = (category: Category): ReactElement | null => {
    if (!categories.map(c => c.id).includes(category.id)) return null;
    return <Tag color="var(--tag-background)" key={ category.id }>{ category.name }</Tag>;
  };

  const categoryTags = values.categories
    .map(mapSelectOptionToCategoryTag)
    .filter(tag => tag !== null);
  const noneText = <Italic>{ t('COMMON:NONE') }</Italic>;

  useEffect(() => {
    setFieldError('duration', overTime ? 'ERROR:DAY_LIMIT_EXCEEDED' : undefined);
  }, [overTime, errors]);

  useEffect(() => {
    setCategoryOptions(categories.map(category => ({
      label: category.name,
      value: category.id,
    })));
  }, [categories]);

  return isEditMode ?
    (
      <StyledForm>
        <Input
          id="title"
          name="title"
          placeholder={ t('TASK_NAME_PLACEHOLDER') }
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.title }
        />
        <ErrorText>{ touched.title ? errors.title : '' }</ErrorText>

        <StyledTextArea
          id="description"
          name="description"
          placeholder={ t('TASK_DESCRIPTION_PLACEHOLDER') }
          maxLength={ TASK_DESCRIPTION_MAX_LENGTH }
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.description }
          showCount
        />

        <Select
          id="categories"
          placeholder={ t('TASK_CATEGORIES_PLACEHOLDER') }
          onSelect={ handleCategorySelect }
          onDeselect={ handleCategoryDeselect }
          options={ categoryOptions }
          value={ values.categories.map(c => c.id) }
          mode="tags"
        />

        <DatePicker
          id="date"
          name="date"
          placeholder={ t('TASK_DATE_PLACEHOLDER') }
          onChange={ date => setFieldValue('date', date) }
          format={ DATE_FORMAT }
          onBlur={ handleBlur }
          value={ values.date }
          disabledDate={ disabledDate }
          allowClear={ false }
        />

        <Input
          id="duration"
          name="duration"
          placeholder={ t('TASK_DURATION_PLACEHOLDER') }
          onChange={ handleDurationChange }
          onBlur={ handleDurationBlur }
          value={ values.duration }
        />
        <ErrorText>
          { touched.duration && errors.duration
              ? t(errors.duration, { limit: dayLimit, current: overTime })
              : ''
          }
        </ErrorText>
      </StyledForm>
    )
    : (
      <>
        <TaskDialogGroup>
          <TaskDialogHeading>{ t('TASK_NAME_TITLE') }</TaskDialogHeading>
          <p>{ values.title }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>{ t('TASK_DESCRIPTION_TITLE') }</TaskDialogHeading>
          <p>{ values.description }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>{ t('TASK_CATEGORIES_TITLE') }</TaskDialogHeading>
          <p>{ categoryTags.length ? categoryTags : noneText }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>{ t('TASK_DATE_TITLE') }</TaskDialogHeading>
          <p>{ values.date.format(DATE_FORMAT) }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>{ t('TASK_DURATION_TITLE') }</TaskDialogHeading>
          <p>{ values.duration }</p>
        </TaskDialogGroup>
      </>
    );
};

export default TaskDialogForm;