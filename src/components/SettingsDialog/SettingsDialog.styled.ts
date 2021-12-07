import styled from 'styled-components/macro';

export const SettingsHeading = styled.h2`
  font-size: 18px;
`;

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