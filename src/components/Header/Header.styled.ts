import styled, { css } from 'styled-components/macro';
import { Button } from 'antd';

export const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 16px;
  height: 128px;
`;

export const SettingsButton = styled(Button)`
  position: absolute;
  right: 0;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailsRow = styled.p`
  position: absolute;
  bottom: 8px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--foreground-700);
  
  strong {
    color: var(--foreground);
  }
`;
