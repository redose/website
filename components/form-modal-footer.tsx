import type { FC } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const ModalFooter = styled(Modal.Footer)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface Props {
  className?: string;
  disabled?: boolean;
}

const FormModalFooter: FC<Props> = function FormModalFooter({ className, disabled = false }) {
  return (
    <ModalFooter className={className}>
      <Button type="submit" variant="success" disabled={disabled}>
        Submit
      </Button>
      <Button type="reset" variant="danger" disabled={disabled}>
        Close
      </Button>
    </ModalFooter>
  );
};

export default FormModalFooter;
