import styled, { css } from 'styled-components/macro';

export const IndicatorBackground = styled.div`
  position: relative;
  height: 6px;
  background-color: var(--background-200);
  
  .--today & {
    background-color: var(--ant-primary-2);
  }
`;

export const IndicatorForeground = styled.div<{ exceeded: boolean, overtime: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left;
  width: 100%;
  height: 100%;
  background-color: ${ ({ exceeded, overtime }) => exceeded
    ? css`var(--ant-error-color)`
    : overtime 
      ? css`var(--ant-warning-color)`
      : css`var(--ant-primary-5)` 
  };
  transition: transform 0.25s ease-in-out;
  will-change: transform;
`;