import { ReactElement } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { Tooltip } from 'antd';

interface Props {
  text: string;
}

const InfoIconWithTooltip = ({ text }: Props): ReactElement => (
  <Tooltip title={ text }>
    <StyledIcon />
  </Tooltip>
);

export default InfoIconWithTooltip;

const StyledIcon = styled(InfoCircleOutlined)`
  color: var(--foreground-800);
  font-size: 13px;
  margin: 0 6px;
`;