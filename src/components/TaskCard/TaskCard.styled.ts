import styled from 'styled-components/macro';
import { Card } from 'antd';

import { TASK_DESCRIPTION_MAX_HEIGHT } from '@consts/task.consts';

export const StyledCard = styled(Card)`
  &:first-child {
    margin-top: 8px;
  }
  margin-bottom: 8px;
  
  > .ant-card-head {
    min-height: 28px;
    
    > .ant-card-head-wrapper > .ant-card-head-title {
      padding: 4px 0;
    }
  }
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding-bottom: 4px;
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