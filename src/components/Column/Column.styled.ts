import styled, { css } from 'styled-components/macro';

const columnPadding = css`
  padding-left: 12px;
  padding-right: 12px;
`;

export const ColumnWrapper = styled.section`
  width: 20%;
  min-width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background-10);
  border: 1px solid var(--background-200);
  
  &:not(:last-child) {
    border-right: 0;
  }
  
  &.--today {
    position: relative;
    background-color: var(--ant-primary-1);
    border-color: var(--ant-primary-4);
    
    + * {
      border-left-color: var(--ant-primary-4);
    }
  }
`;

export const ColumnHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 17px;
  ${ columnPadding };
`;

export const DayName = styled.span`
  font-weight: 600;
  margin-inline-end: 8px;
`;

export const DayDate = styled.span`
  font-weight: 300;
  color: var(--foreground-200);
  
  .--today & {
    color: var(--primary-800);
  }
`;

export const HoursDetails = styled.p`
  font-weight: 500;
  color: var(--foreground-300);
  
  .--today & {
    color: var(--ant-primary-7);
  }
  
`;

export const ColumnBody = styled.div<{ draggedOver: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${ columnPadding }; 
  ${ ({ draggedOver }) => draggedOver ? css`
    background-color: var(--dragged-over-hover)
  ` : '' };
  overflow: auto;
  
  .add-task {
    align-self: center;
    flex-shrink: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease-in-out opacity;
    will-change: opacity;
    margin-bottom: 60px;
    
    &:first-child {
      margin-top: 16px;
    }
  }
  
  &:hover {
    .add-task {
      opacity: 1;
      pointer-events: all;
    }
  }
`;