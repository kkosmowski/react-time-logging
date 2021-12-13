import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import { DatePicker, Input, Select, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import ErrorText from '@components/ErrorText';
import { Italic, StyledForm, StyledTextArea, TaskDialogGroup, TaskDialogHeading } from './TaskDialogForm.styled';
import { DATE_FORMAT } from '@consts/date.consts';
import { SelectOption } from '@interfaces/select-option.interface';
import { Category } from '@interfaces/category.interface';
import { TASK_DESCRIPTION_MAX_LENGTH } from '@consts/task.consts';
import { improveDurationString } from '@utils/task.utils';

interface Props {
  formik: FormikProps<TaskFormInterface>;
  isEditMode: boolean;
  categories: Category[];
}
const TaskDialogForm = ({ formik, isEditMode, categories }: Props): ReactElement => {
  const { handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const { t } = useTranslation('COMMON');

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
    setFieldValue('duration', improveDurationString(e.target.value));
  };

  const mapSelectOptionToCategoryTag = (category: Category): ReactElement | null => {
    if (!categories.map(c => c.id).includes(category.id)) return null;
    return <Tag color="var(--ant-primary-6)" key={ category.id }>{ category.name }</Tag>;
  };

  const categoryTags = values.categories
    .map(mapSelectOptionToCategoryTag)
    .filter(tag => tag !== null);
  const noneText = <Italic>{ t('N1') }</Italic>;

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
          placeholder="Task name"
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.title }
        />
        <ErrorText>{ touched.title ? errors.title : '' }</ErrorText>

        <StyledTextArea
          id="description"
          name="description"
          placeholder="Description"
          maxLength={ TASK_DESCRIPTION_MAX_LENGTH }
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.description }
          showCount
        />

        <Select
          id="categories"
          placeholder="Categories"
          onSelect={ handleCategorySelect }
          onDeselect={ handleCategoryDeselect }
          options={ categoryOptions }
          value={ values.categories.map(c => c.id) }
          mode="tags"
        />

        <DatePicker
          id="date"
          name="date"
          placeholder="When?"
          onChange={ date => setFieldValue('date', date) }
          format={ DATE_FORMAT }
          onBlur={ handleBlur }
          value={ values.date }
          allowClear={ false }
        />

        <Input
          id="duration"
          name="duration"
          placeholder={ '"1h", "30m", "2h 15m" etc.' }
          onChange={ handleChange }
          onBlur={ handleDurationBlur }
          value={ values.duration }
        />
        <ErrorText>{ touched.duration ? errors.duration : '' }</ErrorText>
      </StyledForm>
    )
    : (
      <>
        <TaskDialogGroup>
          <TaskDialogHeading>Title</TaskDialogHeading>
          <p>{ values.title }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Description</TaskDialogHeading>
          <p>{ values.description }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Categories</TaskDialogHeading>
          <p>{ categoryTags.length ? categoryTags : noneText }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Date</TaskDialogHeading>
          <p>{ values.date.format(DATE_FORMAT) }</p>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Duration</TaskDialogHeading>
          <p>{ values.duration }</p>
        </TaskDialogGroup>
      </>
    );
};

export default TaskDialogForm;