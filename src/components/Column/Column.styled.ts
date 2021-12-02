import styled, { css } from 'styled-components/macro';

const columnPadding = css`
  padding-left: 12px;
  padding-right: 12px;
`;

export const ColumnWrapper = styled.section`
  width: 20%;
  height: 100%;
  background-color: var(--background-100);
  ${ columnPadding }
`;

export const ColumnHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  font-size: 17px;
`;

export const DayName = styled.span`
  font-weight: 600;
  margin-inline-end: 8px;
`;

export const DayDate = styled.span`
  font-weight: 300;
  color: var(--foreground-200);
`;

export const HoursDetails = styled.p`
  font-weight: 500;
  color: var(--foreground-300);
  
`;

export const ColumnBody = styled.div`
  
  ${ columnPadding } 
`;

export const TimeIndicator = styled.div`
  width: 100%;
  height: 4px;
  background-color: var(--background-400);
`;