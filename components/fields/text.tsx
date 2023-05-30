import type { FC } from 'react';
import { useField } from 'formik';
import { Form, FormControlProps } from 'react-bootstrap';
import Label from './label';

interface Props extends FormControlProps {
  name: string;
  type?: string;
  label?: string;
}

const TextField: FC<Props> = function TextField({
  className,
  name,
  type = 'text',
  label,
  ...props
}) {
  const [field, meta] = useField(name);

  return (
    <Form.Group className={className}>
      {label && (
        <Label>{label}</Label>
      )}

      <Form.Control
        as={type === 'textarea' ? type : 'input'}
        type={type === 'textarea' ? 'text' : type}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
