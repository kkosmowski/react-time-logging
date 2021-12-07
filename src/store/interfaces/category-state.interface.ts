import { Category } from '@interfaces/category.interface';

export interface CategoryState {
  categories: Category[];
  addInProgress: boolean;
  categoriesLoading: boolean;
}