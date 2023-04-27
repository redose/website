import type { FC } from 'react';
import styled from 'styled-components';
import type { IconBaseProps } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

const FixedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

const Spinner = styled(FaSpinner)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotate 1.5s infinite linear;
`;

interface Props extends IconBaseProps {
  className?: string;
  fixed: boolean;
}

const Loading: FC<Props> = function Loading({
  className,
  fixed = false,
  ...props
}) {
  return fixed ? (
    <FixedWrapper className={className}>
      <Spinner {...props} />
    </FixedWrapper>
  ) : (
    <Spinner {...props} className={className} />
  );
};

export default Loading;
