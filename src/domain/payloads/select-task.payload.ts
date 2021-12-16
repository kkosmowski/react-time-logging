import { EntityUid } from '@mytypes/entity-uid.type';

export interface SelectTaskPayload {
  column: string;
  taskId: EntityUid;
}