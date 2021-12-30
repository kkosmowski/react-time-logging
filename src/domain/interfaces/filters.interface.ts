import { Category } from '@interfaces/category.interface';

export interface FiltersInterface {
  categories: Category[];
  allCategoriesRequired: boolean;
}