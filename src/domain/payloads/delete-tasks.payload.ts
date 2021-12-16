import { EntityUid } from '@mytypes/entity-uid.type';

export interface DeleteTasksPayload {
  column: string;
  taskIds: EntityUid[];
}