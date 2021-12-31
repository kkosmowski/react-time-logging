import { ReactElement, ReactNode } from 'react';
import styled, { css } from 'styled-components/macro';

interface Props {
  children: ReactNode | ReactNode[];
  column?: boolean;
  gap?: number;
  center?: boolean;
  end?: boolean;
}

const Row = ({ children, ...props }: Props): ReactElement => (
  <StyledDiv { ...props }>{ children }</StyledDiv>
);

export default Row;

const StyledDiv = styled.div<Props>`
  display: flex;
  ${ ({ column }) => column ? css`flex-direction: column;` : '' }
  ${ ({ gap, column }) => gap ? css`${ column ? 'row' : 'column' }-gap: ${ gap }px;` : '' }
  ${ ({ center }) => center ? css`justify-content: center;` : '' }
  ${ ({ end }) => end ? css`justify-content: flex-end;` : '' }
`;