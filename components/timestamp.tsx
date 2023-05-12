import type { ReactNode, FC } from 'react';
import styled from 'styled-components';

const Label = styled.span`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

interface Props {
  className?: string;
  date: Date;
  label?: string;
}

const Timestamp: FC<Props> = function Timestamp({
  className,
  date,
  label = 'Created at',
}) {
  return (
    <p className={className}>
      <Label>{label}</Label>
      &nbsp;
      {date.toLocaleString()}
    </p>
  );
};

export default Timestamp;
