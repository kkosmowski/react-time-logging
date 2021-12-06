import styled from 'styled-components/macro';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  
  > input + p {
    margin-bottom: 16px;
  }
  
  > p + div {
    margin-bottom: 38px;
  }
`;