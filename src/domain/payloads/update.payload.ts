import { EntityUid } from '@mytypes/entity-uid.type';

export interface UpdatePayload<T> {
  id: EntityUid;
  update: Partial<T>;
}