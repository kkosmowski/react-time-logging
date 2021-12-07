import { createSelector } from 'reselect';

import { RootState } from '../interfaces/root-state.interface';

const categorySelector = (state: RootState) => state.category;

const categorySelectors = {
  categories: createSelector(categorySelector, category => category.categories),
  categoriesLoading: createSelector(categorySelector, category => category.categoriesLoading),
  addInProgress: createSelector(categorySelector, category => category.addInProgress),
}

export default categorySelectors;