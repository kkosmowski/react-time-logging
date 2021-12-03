import { EntityUid } from '@mytypes/entity-uid.type';

export interface Task {
  id: EntityUid;
  title: string;
  duration: number; // in minutes
}