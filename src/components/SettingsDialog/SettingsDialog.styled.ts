import styled from 'styled-components/macro';
import { Row } from 'antd';

export const SettingsSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  
  &:not(:last-child) {
    margin-bottom: 40px;
  }
  
  button {
    align-self: flex-start;
  }
`;

export const AddCategoryRow = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const SettingsRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  
  .ant-select {
    width: auto;
    min-width: 200px;
  }
  
  .ant-input-affix-wrapper {
    width: auto;
  }
  
  input[type="number"] {
    width: 5ch;
  }
`;