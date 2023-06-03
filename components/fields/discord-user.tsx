import type { User } from '@redose/types';
import type { useEffect, useState, FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import { debounce } from 'debounce';
import Label from './label';

interface Props {
  className?: string;
  name: string;
  label?: string;
  user?: User;
  disabled?: boolean;
  onChange(value: string): void;
}

const DiscordUserField: FC<Props> = function DiscordUserFIeld({
  className,
  name,
  label,
  user,
  disabled,
  onChange,
}) {
  const [field, meta] = useField(name);
  const [inputValue, setInputValue] = useState(user?.username || '');

  function handleChange() {

  }

  return (
    <Form.Group className={className}>
      {label && (
        <Label>{label}</Label>
      )}

      <Form.Control
        {...field}
        disabled={disabled}
        onChange={debounce(dehandleChange}
      />
    </Form.Group>
  );
};

export default DiscordUserField;
