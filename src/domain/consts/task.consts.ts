import { FiltersInterface } from '@interfaces/filters.interface';

export const TASK_TITLE_MIN_LENGTH = 2;
export const TASK_TITLE_MAX_LENGTH = 255;
export const TASK_DESCRIPTION_MAX_LENGTH = 600;

const TASK_DESCRIPTION_LINE_HEIGHT = 22;
const TASK_DESCRIPTION_VISIBLE_LINES = 7.625;
export const TASK_DESCRIPTION_MAX_HEIGHT = TASK_DESCRIPTION_LINE_HEIGHT * TASK_DESCRIPTION_VISIBLE_LINES;

export const INITIAL_FILTERS: FiltersInterface = {
  categories: [],
  allCategoriesRequired: false,
};
