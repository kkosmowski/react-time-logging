import styled from 'styled-components/macro';
import { Card } from 'antd';

import { TASK_DESCRIPTION_MAX_HEIGHT } from '@consts/task.consts';

export const StyledCard = styled(Card)`
  line-height: var(--task-card-line-height);
  
  &:first-child {
    margin-top: var(--task-card-margin-top);
  }
  margin-bottom: var(--task-card-margin-bottom);
  
  > .ant-card-head {
    padding: var(--task-card-header-padding);
    min-height: var(--task-card-header-min-height);
    
    > .ant-card-head-wrapper > .ant-card-head-title {
      padding: var(--task-card-title-padding);
    }
  }
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: var(--task-card-body-padding);
    white-space: pre-wrap;
  }
  
  .--today & {
    border-color: var(--ant-primary-2);

    &.--selectable {
      border-color: var(--ant-primary-4);
    }
  }
  
  &.--selectable {
    border-color: var(--foreground-900);
  }
  
  &.--selected {
    border-color: var(--ant-primary-6);
  }
  
  &.--cut {
    border-style: dashed;
    border-color: var(--background-400);
  }
  
  * {
    border-color: inherit;
  }
`;

export const Description = styled.span`
  color: var(--foreground-200);
  max-height: ${ TASK_DESCRIPTION_MAX_HEIGHT }px;
  overflow: hidden;
`;

export const Duration = styled.span`
  margin-left: auto;
  color: var(--ant-primary-6);
`;