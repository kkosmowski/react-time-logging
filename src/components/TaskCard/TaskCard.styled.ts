import styled from 'styled-components/macro';
import { Card } from 'antd';

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
    &, * {
      border-color: var(--primary-200);
    }
  }
`;

export const Description = styled.span`
  color: var(--foreground-200);
`;

export const Duration = styled.span`
  margin-left: auto;
  color: var(--primary-500);
`;