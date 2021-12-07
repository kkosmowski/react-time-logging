import { EntityUid } from '@mytypes/entity-uid.type';
import { Category } from '@interfaces/category.interface';

export interface CategoryUpdatePayload {
  categoryId: EntityUid;
  update: Partial<Category>;
}