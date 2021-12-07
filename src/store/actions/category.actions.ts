import { createAction } from '@reduxjs/toolkit';

import { Category } from '@interfaces/category.interface';

const categoryActions = {
  add: createAction<void>('ADD_CATEGORY'),
  addSuccess: createAction<Category>('ADD_CATEGORY_SUCCESS'),

  getAll: createAction<void>('GET_CATEGORIES'),
  getAllSuccess: createAction<Category[]>('GET_CATEGORIES_SUCCESS'),
};

export default categoryActions;