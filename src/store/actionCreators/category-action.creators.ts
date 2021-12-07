import { Dispatch } from 'redux';

import categoryActions from '../actions/category.actions';
import { Category } from '@interfaces/category.interface';
import { StorageService } from '@services/storage.service';

const categoryActionCreators = {
  add(category: Category): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(categoryActions.add());
      await StorageService.add<Category>('categories', category);
      dispatch(categoryActions.addSuccess(category));
    }
  },
  getAll(): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(categoryActions.getAll());
      const categories = await StorageService.getAll<Category[]>('categories');
      dispatch(categoryActions.getAllSuccess(categories));
    }
  },
}

export default categoryActionCreators;