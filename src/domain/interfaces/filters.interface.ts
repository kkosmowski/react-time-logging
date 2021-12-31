import { Category } from '@interfaces/category.interface';

export type FiltersModel = [
  {
    id: 'categories',
    categories: Category[],
  },
  {
    id: 'allCategoriesRequired',
    allCategoriesRequired: boolean,
  },
];

export interface FiltersInterface {
  categories: Category[];
  allCategoriesRequired: boolean;
}