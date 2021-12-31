import { Moment } from 'moment';

import { EntityUid } from '@mytypes/entity-uid.type';

export interface TaskFormInterface {
  title: string;
  categories: EntityUid[];
  date: Moment;
  description: string;
  duration: string;
}