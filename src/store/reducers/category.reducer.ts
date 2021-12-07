import { createReducer } from '@reduxjs/toolkit';

import { CategoryState } from '../interfaces/category-state.interface';
import categoryActions from '../actions/category.actions';

export const initialCategoryState: CategoryState = {
  categories: [],
  addInProgress: false,
  categoriesLoading: false,
  updateInProgress: false,
  deleteInProgress: false,
};

const categoryReducer = createReducer(initialCategoryState, (builder) => {
  builder
    .addCase(categoryActions.add, (state) => {
      state.addInProgress = true;
    })
    .addCase(categoryActions.addSuccess, (state, { payload }) => {
      state.addInProgress = false;
      state.categories = [...state.categories, payload];
    })

    .addCase(categoryActions.getAll, (state) => {
      state.categoriesLoading = true;
    })
    .addCase(categoryActions.getAllSuccess, (state, { payload }) => {
      state.categoriesLoading = false;
      state.categories = payload;
    })

    .addCase(categoryActions.update, (state) => {
      state.updateInProgress = true;
    })
    .addCase(categoryActions.updateSuccess, (state, { payload }) => {
      state.updateInProgress = false;
      state.categories = state.categories.map(category => category.id === payload.categoryId
        ? { ...category, ...payload.update }
        : category
      );
    })

    .addCase(categoryActions.delete, (state) => {
      state.deleteInProgress = true;
    })
    .addCase(categoryActions.deleteSuccess, (state, { payload }) => {
      state.deleteInProgress = false;
      state.categories = state.categories.filter(category => category.id !== payload);
    })
});

export default categoryReducer;