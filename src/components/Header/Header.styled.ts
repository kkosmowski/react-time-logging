import styled from 'styled-components/macro';
import { Button } from 'antd';

export const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px;
  height: 128px;
`;

export const SettingsButton = styled(Button)`
  position: absolute;
  right: 0;
`;