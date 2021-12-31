import styled from 'styled-components/macro';
import { Dropdown } from 'antd';

export const FiltersDropdown = styled(Dropdown)`
  position: absolute;
  left: 0;
`;

export const FiltersMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 24px;
  padding: 16px 16px 8px;
  min-width: 280px;
  width: min-content;
  max-width: 380px;
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 4px;
  width: 100%;
  
  .ant-switch {
    min-width: 56px;
  }
  
  .ant-select {
    width: 100%;
  }
`;

export const FiltersDropdownBackdrop = styled.div<{ visible: boolean }>`
  display: ${ ({ visible }) => visible ? 'block' : 'none' }; 
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.05);
`;

export const Explanation = styled.span`
  font-size: 13px;
  line-height: 1.25;
  color: var(--foreground-800);
`;