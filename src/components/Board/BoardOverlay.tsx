import { memo, ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';

const BoardOverlay = (): ReactElement => (
  <StyledDiv>
    <LoadingOutlined style={ { fontSize: '48px', color: 'var(--ant-primary-6)' } } />
  </StyledDiv>
);

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-10-47);
`;

export default memo(BoardOverlay);