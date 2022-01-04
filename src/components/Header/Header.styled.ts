import styled from 'styled-components/macro';
import { Button } from 'antd';

const headerMargin = 16;
const versionMargin = 6;

export const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 ${ headerMargin }px;
  height: 128px;
`;

export const Version = styled.span`
  position: absolute;
  top: ${ versionMargin }px;
  right: ${ versionMargin - headerMargin }px;
  color: var(--foreground29);
  font-size: 12px;
  line-height: 1;
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
