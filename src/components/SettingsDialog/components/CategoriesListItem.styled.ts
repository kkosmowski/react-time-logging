import styled from 'styled-components/macro';
import { Button } from 'antd';

export const Buttons = styled.div`
  margin-left: 8px;
  flex-shrink: 0;
  
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const GrayButton = styled(Button)`
  color: var(--foreground-400);
`;

export const DeleteButton = styled(Button)`
  color: var(--ant-error-color);
  border-color: var(--ant-error-color-outline);
`;