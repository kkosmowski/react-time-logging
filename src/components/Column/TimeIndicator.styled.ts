import styled from 'styled-components/macro';

export const IndicatorBackground = styled.div`
  position: relative;
  height: 6px;
  background-color: var(--background-200);
  
  .--today & {
    background-color: var(--ant-primary-2);
  }
`;

export const IndicatorForeground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left;
  width: 100%;
  height: 100%;
  background-color: var(--ant-primary-5);
  transition: transform 0.25s ease-in-out;
  will-change: transform;
`;