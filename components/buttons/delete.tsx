import type { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaXing } from 'react-icons/fa';

const DeleteButton: FC<Omit<ButtonProps, 'variant'>> = function DeleteButton(props) {
  return (
    <Button {...props} variant="danger">
      <FaXing />
    </Button>
  );
};

export default DeleteButton;
