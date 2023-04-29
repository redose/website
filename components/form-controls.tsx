import type { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const FormControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
`;

interface Props {
  children?: ReactNode;
  disabled?: boolean;
  hasReset?: boolean;
}

const FormControls: FC<Props> = function FormControls({
  children,
  disabled = false,
  hasReset = false,
}) {
  return (
    <FormControlsWrapper>
      {children}
      {hasReset && (
        <Button type="reset" variant="warning" disabled={disabled}>Reset</Button>
      )}
      <Button type="submit" variant="success" disabled={disabled}>Submit</Button>
    </FormControlsWrapper>
  );
};

export default FormControls;
