import type { UserNote } from '@redose/types';
import { useEffect, useState, FC } from 'react';
import { Table, Form } from 'react-bootstrap';
import redoseApi from '../../../redose-api';
import { useToast } from '../../providers/toast';
import PageError from '../../page-error';
import Loading from '../../loading';
import { EditButton } from '../../buttons';

function parseResponse(note: UserNote) {
  return {
    ...note,
    updatedAt: new Date(note.updatedAt),
    createdAt: new Date(note.createdAt),
  };
}

interface Props {
  userId: string;
}

const UserNotesPage: FC<Props> = function UserNotesPage({ userId }) {
  const toast = useToast();
  const [notes, setNotes] = useState<UserNote[] | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [contentEdit, setContentEdit] = useState('');
  const [fetchRes] = useAxios<UserNote[]>(`/user/${userId}/notes`);

  useEffect(() => {
    redoseApi.get<{ notes: UserNote[] }>(`/user/${userId}/notes`)
      .then((res) => res.data.notes.map(parseResponse))
      .then((notes) => {
        setNotes(notes);
        return notes;
      });
  }, []);

  useEffect(() => {
    if (fetchRes.responserror) {
      toast.error('Could not fetch user notes.');
      console.error(fetchRes.error);
    }
  }, [fetchRes.error]);

  function handleEditClick(noteId: string) {
    setEditing((prev) => {
      if (prev) setContentEdit('');
      return !prev;
    })
  }

  useEffect(() => {
    if (!editing) {
      setContentEdit('');
    }
  }, [editing]);

  function handleSave() {

  }

  if (fetchRes.loading) return <Loading fixed />;
  return fetchRes.error ? (
    <PageError error={fetchRes.error}>
      <p>Could not load user notes&hellip;</p>
    </PageError>
  ) : (
    <>
      <h1>User Notes</h1>
      {!fetchRes.data?.length ? (
        <p>There are no notes associated with this user.</p>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Content</th>
              <th>Channel</th>
              <th>Updated At</th>
              <th>Created At</th>
              <th aria-label="Controls" />
            </tr>
          </thead>
          <tbody>
            {!notes.length ? (
              <tr>
                <td colSpan={2}>There are no notes for this user.</td>
              </tr>
            ) : notes.map((note) => (
              <tr key={note.id}>
                <td>
                  {editing !== note.id ? note.content : (
                    <Form.Control
                      as="textarea"
                      name="contentEdit"
                      value={contentEdit}
                      onChange={(e) => setContentEdit(e.target.value)}
                    />
                  )}
                </td>
                <td>{note.channel.name}</td>
                <td>{note.updatedAt.toLocaleString()}</td>
                <td>{note.createdAt.toLocaleString()}</td>
                <td>
                  <EditButton
                    isEditing={!!editing}
                    onEdit={() => setEditing(note.id)}
                    onSave={handleSave}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserNotesPage;
