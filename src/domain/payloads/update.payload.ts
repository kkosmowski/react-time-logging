import { EntityUid } from '@mytypes/entity-uid.type';
import { Category } from '@interfaces/category.interface';

export interface UpdatePayload {
  categoryId: EntityUid;
  update: Partial<Category>;
}