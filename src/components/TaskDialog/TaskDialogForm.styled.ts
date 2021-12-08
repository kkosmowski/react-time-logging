import styled from 'styled-components/macro';
import { Input } from 'antd';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  
  > input + p {
    margin-bottom: 16px;
  }
  
  > * + div {
    margin-bottom: 38px;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  > textarea {
    min-height: 70px;
    height: 120px;
    max-height: 180px;
  }
`;

export const TaskDialogGroup = styled.article`
  display: flex;
  flex-direction: column;
`;

export const TaskDialogHeading = styled.h2`
  font-size: 18px;
`;

export const StyledText = styled.p`
  
`;