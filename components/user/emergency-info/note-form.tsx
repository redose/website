import type { User } from '@redose/types';
import {
  useState,
  FormEvent,
  ReactNode,
  FC,
} from 'react';
import { Form } from 'react-bootstrap';
import redoseApi from '../../../redose-api';
import { useToast } from '../../providers/toast';
import FormControls from '../../form-controls';

interface Props {
  children?: ReactNode;
  initialNotesValue?: string;
  initialLastUpdatedAt?: Date;
}

const NoteForm: FC<Props> = function NoteForm({
  children,
  initialNotesValue,
  initialLastUpdatedAt,
}) {
  const toast = useToast();
  const [notes, setNotes] = useState(initialNotesValue);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(initialLastUpdatedAt);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    setIsSubmitting(true);

    return redoseApi.patch<{ user: User }>('/user/me', {
      emergencyNotes: fd.get('notes')!.toString().trim() || null,
    })
      .then((res) => res.data.user)
      .then((user) => {
        setNotes(user.emergencyNotes);
        setLastUpdatedAt(new Date(user.emergencyNotesLastUpdatedAt!));
        toast.success('Emergency notes updated.');
        return user;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Emergency notes failed to update.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form method="patch" action="/api/user" onSubmit={handleSubmit}>
      {lastUpdatedAt && (
        <p>{lastUpdatedAt.toLocaleString()}</p>
      )}

      <Form.Control
        as="textarea"
        name="notes"
        defaultValue={notes}
        disabled={isSubmitting}
      />

      <FormControls disabled={isSubmitting}>
        {children}
      </FormControls>
    </form>
  );
};

export default NoteForm;
