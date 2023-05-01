import type { EmeregncyInfo, EmergencyInfoContact } from '@redose/types';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import redoseApi from '../../redose-api';
import { useToast } from '../../components/providers/toast';
import Loading from '../../components/loading';
import NoteForm from '../../components/user/emergency-info/note-form';
import Contacts from '../../components/user/emergency-info/contacts';

const EmergencyInfoPage: NextPage = function EmergencyInfoPage() {
  const toast = useToast();
  const [notes, setNotes] = useState<string>();
  const [notesLastUpdatedAt, setNotesLastUpdatedAt] = useState<Date>();
  const [contacts, setContacts] = useState<EmergencyInfoContact[]>();

  useEffect(() => {
    const ctrl = new AbortController();
    redoseApi.get<{ emergencyInfo: EmeregncyInfo }>('/user/me/emergency-info', {
      signal: ctrl.signal,
    })
      .then((res) => res.data.emergencyInfo)
      .then((info) => {
        setNotes(info.notes);
        setNotesLastUpdatedAt(info.notesLastUpdatedAt && new Date(info.notesLastUpdatedAt));
        setContacts(info.contacts.map((contact) => ({
          ...contact,
          createdAt: new Date(contact.createdAt),
        })));
      })
      .catch((ex) => {
        if (!axios.isCancel(ex)) toast.error(ex.message);
      });

    return () => {
      ctrl.abort();
    };
  }, []);

  return (
    <Container>
      <h1>My Emergency Contacts</h1>
      {!contacts ? (
        <Loading fixed />
      ) : (
        <>
          <h2>Notes</h2>
          <p>
            TODO: Write what sorts of things we expect to put in here etc&hellip;
          </p>
          <NoteForm initialNotesValue={notes} initialLastUpdatedAt={notesLastUpdatedAt} />

          <h2>Contacts</h2>
          <Contacts initialContacts={contacts} />
        </>
      )}
    </Container>
  );
};

export default EmergencyInfoPage;
