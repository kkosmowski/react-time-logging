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

export const TaskDialogHeading = styled.h2`
  font-size: 15px;
  text-transform: uppercase;
  color: var(--foreground-700);
`;

export const Italic = styled.span`
  font-style: italic;
`;

export const TaskView = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const TaskDialogRow = styled.article`
  display: flex;
  flex-direction: column;
`;