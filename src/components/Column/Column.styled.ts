import styled, { css } from 'styled-components/macro';

const columnPadding = css`
  padding-left: 12px;
  padding-right: 12px;
`;

export const ColumnWrapper = styled.section`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  border: 1px solid var(--background-200);
  
  &:not(:last-child) {
    border-right: 0;
  }
  
  &.--today {
    position: relative;
    background-color: var(--primary-100);
    border-color: var(--primary-400);
    
    + * {
      border-left-color: var(--primary-400);
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
    color: var(--primary-700);
  }
  
`;

export const ColumnBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${ columnPadding } 
  
  .add-task {
    align-self: center;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease-in-out opacity;
    will-change: opacity;
    
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

export const TimeIndicator = styled.div`
  height: 6px;
  background-color: var(--background-200);
  
  .--today & {
    background-color: var(--primary-200);
  }
`;