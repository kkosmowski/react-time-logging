import { ReactElement, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { TaskFormInterface } from '@components/TaskDialog/domain/task-form.interface';
import { DatePicker, Input, Select } from 'antd';
import ErrorText from '@components/ErrorText';
import { StyledForm, StyledText, StyledTextArea, TaskDialogGroup, TaskDialogHeading } from './TaskDialogForm.styled';
import { DATE_FORMAT } from '@consts/date.consts';
import { SelectOption } from '@interfaces/select-option.interface';
import { Category } from '@interfaces/category.interface';
import { TASK_DESCRIPTION_MAX_LENGTH } from '@consts/task.consts';
import { EntityUid } from '@mytypes/entity-uid.type';

interface Props {
  formik: FormikProps<TaskFormInterface>;
  isEditMode: boolean;
  categories: Category[];
}
const TaskDialogForm = ({ formik, isEditMode, categories }: Props): ReactElement => {
  const { handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);

  const handleCategorySelect = (value: string): void => {
    setFieldValue('categories', [...values.categories, value]);
  };

  const handleCategoryDeselect = (value: string): void => {
    setFieldValue('categories', values.categories.filter(category => category !== value));
  };

  const findCategoryLabel = (categoryId: EntityUid): string =>
    categories.find(category => category.id === categoryId)?.name || '';

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
          value={ values.categories }
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
          onBlur={ handleBlur }
          value={ values.duration }
        />
        <ErrorText>{ touched.duration ? errors.duration : '' }</ErrorText>
      </StyledForm>
    )
    : (
      <>
        <TaskDialogGroup>
          <TaskDialogHeading>Title</TaskDialogHeading>
          <StyledText>{ values.title }</StyledText>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Description</TaskDialogHeading>
          <StyledText>{ values.description }</StyledText>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Categories</TaskDialogHeading>
          <StyledText>{ values.categories ? values.categories.map(findCategoryLabel) : 'None' }</StyledText>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Date</TaskDialogHeading>
          <StyledText>{ values.date.format(DATE_FORMAT) }</StyledText>
        </TaskDialogGroup>

        <TaskDialogGroup>
          <TaskDialogHeading>Duration</TaskDialogHeading>
          <StyledText>{ values.duration }</StyledText>
        </TaskDialogGroup>
      </>
    );
};

export default TaskDialogForm;