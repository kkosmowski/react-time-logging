import { createAction } from '@reduxjs/toolkit';

import { Category } from '@interfaces/category.interface';
import { CategoryUpdatePayload } from '@payloads/category-update.payload';
import { EntityUid } from '@mytypes/entity-uid.type';

const categoryActions = {
  add: createAction<void>('ADD_CATEGORY'),
  addSuccess: createAction<Category>('ADD_CATEGORY_SUCCESS'),

  getAll: createAction<void>('GET_CATEGORIES'),
  getAllSuccess: createAction<Category[]>('GET_CATEGORIES_SUCCESS'),

  update: createAction<void>('UPDATE_CATEGORY'),
  updateSuccess: createAction<CategoryUpdatePayload>('UPDATE_CATEGORY_SUCCESS'),

  delete: createAction<void>('DELETE_CATEGORY'),
  deleteSuccess: createAction<EntityUid>('DELETE_CATEGORY_SUCCESS'),
};

export default categoryActions;