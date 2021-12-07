import { Dispatch } from 'redux';
import { v4 } from 'uuid';

import categoryActions from '../actions/category.actions';
import { Category } from '@interfaces/category.interface';
import { StorageService } from '@services/storage.service';
import { EntityUid } from '@mytypes/entity-uid.type';

const categoryActionCreators = {
  add(name: string): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      const category: Category = { id: v4(), name };

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

  update(categoryId: EntityUid, update: Partial<Category>): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(categoryActions.update());
      await StorageService.update<Category>('categories', { id: categoryId }, update);
      dispatch(categoryActions.updateSuccess({ categoryId, update }));
    }
  },

  delete(categoryId: EntityUid): (d: Dispatch) => Promise<void> {
    return async function (dispatch: Dispatch): Promise<void> {
      dispatch(categoryActions.delete());
      await StorageService.delete('categories', categoryId);
      dispatch(categoryActions.deleteSuccess(categoryId));
    }
  },
}

export default categoryActionCreators;