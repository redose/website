import type { UserNote } from '@redose/types';
import { useEffect, useState } from 'react';
import redoseApi from '../../../redose-api';
import { useToast } from '../../providers/toast';

interface QueryOptions {
  userId?: string;
}

export default function useNotes({ userId }: QueryOptions) {
  const toast = useToast();
  const [notes, setNotes] = useState<UserNote[]>();

  useEffect(() => {
    const ctrl = new AbortController();
    redoseApi.get<{ notes: UserNote[] }>(`/user/${userId}/notes`, {
      signal: ctrl.signal,
    })
      .then((res) => setNotes(res.data.notes))
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to fetch user notes.');
      });

    return ctrl.abort;
  }, []);

  async function createNote(content: string, channelId?: string) {
    return redoseApi.post<UserNote>(`/user/${userId}/note`, { userId, content, channelId })
      .then((res) => {
        setNotes((prev) => prev!.concat(res.data));
        toast.success('Note created.');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to create note.');
      });
  }

  async function updateNote(noteId: string, content: string, channelId?: string) {
    return redoseApi.patch<UserNote>(`/user/note/${noteId}`, { noteId, content, channelId })
      .then((res) => {
        setNotes((prev) => prev!.map((note) => (note.id === noteId ? res.data : note)));
        toast.success('Note updated.');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to update note.');
      });
  }

  async function deleteNote(noteId: string) {
    return redoseApi.delete(`/user/note/${noteId}`)
      .then(() => {
        setNotes((prev) => prev!.filter((note) => note.id !== noteId));
        toast.success('Note deleted.');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to delete note.');
      });
  }

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
  };
}
