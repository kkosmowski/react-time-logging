import { FiltersInterface, FiltersModel } from '@interfaces/filters.interface';
import { Category } from '@interfaces/category.interface';
import { equalArrays } from '@utils/equal-arrays.util';

export const filtersInterfaceToModel = (filters: FiltersInterface): FiltersModel => [
  {
    id: 'categories',
    categories: filters.categories,
  },
  {
    id: 'allCategoriesRequired',
    allCategoriesRequired: filters.allCategoriesRequired,
  },
];

export const filtersModelToInterface = (model: FiltersModel): FiltersInterface => ({
  categories: model[0].categories,
  allCategoriesRequired: model[1].allCategoriesRequired,
});

export const equalFilters = (filters1: FiltersInterface, filters2: FiltersInterface): boolean => {
  const mapFn = (category: Category) => category.id;
  const categories1 = filters1.categories.map(mapFn);
  const categories2 = filters2.categories.map(mapFn);

  return equalArrays(categories1, categories2) &&
    filters1.allCategoriesRequired === filters2.allCategoriesRequired;
}