import { ReactElement } from 'react';

import { StyledText } from './ErrorText.styled';

interface Props {
  children?: string | string[];
}

const ErrorText = ({ children }: Props): ReactElement => {

  return (
    <StyledText>{ children }</StyledText>
  )
};

export default ErrorText;