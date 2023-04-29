import type { NextPage } from 'next';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import redoseApi from '../../redose-api';
import NoteForm from '../../components/user/emergency-info/note-form';

interface Props {
  notes: string;
  notesLastUpdatedAt: Date;
}

const EmergencyInfoPage: NextPage<Props> = function EmergencyInfoPage({
  notes: initialNotes,
  notesLastUpdatedAt: initialNotesLastUpdatedAt,
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [notesLastUpdatedAt, setNotesLastUpdatedAt] = useState(initialNotesLastUpdatedAt);

  function handleNoteUpdate(newNotes: string) {
    setNotes(newNotes);
    setNotesLastUpdatedAt(new Date());
  }

  return (
    <Container>
      <h1>My Emergency Contacts</h1>

      <h2>Notes</h2>
      <p>
        TODO: Write what sorts of things we expect to put in here etc&hellip;
      </p>
      <NoteForm
        initialValue={notes}
        lastUpdatedAt={notesLastUpdatedAt}
        onUpdate={handleNoteUpdate}
      />

      <h2>Contacts</h2>
      <Contacts />
    </Container>
  );
};

EmergencyInfoPage.getInitialProps = async () => redoseApi
  .get<{ emergencyInfo: Props }>('/user/me/emergency-info')
  .then((res) => res.data.emergencyInfo)
  .then((info) => ({
    ...info,
    notesLastUpdatedAt: info.notesLastUpdatedAt && new Date(info.notesLastUpdatedAt),
  }));

export default EmergencyInfoPage;
