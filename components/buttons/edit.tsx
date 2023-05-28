import type { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

interface Props extends Omit<ButtonProps, 'variant'> {}

const EditButton: FC<Props> = function EditButton(props) {
  return (
    <Button {...props} variant="info">
      <FaPencilAlt />
    </Button>
  );
};

export default EditButton;
