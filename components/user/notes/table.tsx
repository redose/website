import type { UserNote } from '@redose/types';
import { useState, FC } from 'react';
import { Table } from 'react-bootstrap';
import useNotes from './use-notes';
import Loading from '../../loading';
import { EditButton, DeleteButton, AddButton } from '../../buttons';
import NoteFormModal, { FormValues } from './note-form-modal';

interface Props {
  userId: string;
}

const UserNotesTable: FC<Props> = function UserNotesTable({ userId }) {
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes({ userId });
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);

  async function handleModalSubmit({ content, channelId }: FormValues, noteId: string) {
    return updateNote(noteId, content, channelId || undefined);
  }

  return (
    <>
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
          {!notes?.length ? (
            <tr>
              <td colSpan={5}>
                {!notes ? (
                  <Loading />
                ) : (
                  <>No notes are associated with this user&hellip;</>
                )}
              </td>
            </tr>
          ) : notes.map((note) => (
            <tr key={note.id}>
              <td>{note.content}</td>
              <td>{note.channel?.name}</td>
              <td>{note.updatedAt.toLocaleString()}</td>
              <td>{note.createdAt.toLocaleString()}</td>
              <td>
                <EditButton onClick={() => setEditingNote(note)} />
                <DeleteButton onClick={() => deleteNote(note.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddButton onClick={() => setIsCreating(true)} />

      {(editingNote || isCreating) && (
        <NoteFormModal
          noteId={editingNote?.id}
          content={editingNote?.content}
          channelId={editingNote?.channel?.id}
          close={() => setEditingNote(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default UserNotesTable;
