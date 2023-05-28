import type { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const AddButton: FC<Omit<ButtonProps, 'variant'>> = function AddButton(props) {
  return (
    <Button {...props} variant="success">
      <FaPlus />
    </Button>
  );
};

export default AddButton;
