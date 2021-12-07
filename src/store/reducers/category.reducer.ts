import { createReducer } from '@reduxjs/toolkit';

import { CategoryState } from '../interfaces/category-state.interface';
import categoryActions from '../actions/category.actions';

export const initialCategoryState: CategoryState = {
  categories: [],
  addInProgress: false,
  categoriesLoading: false,
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
});

export default categoryReducer;