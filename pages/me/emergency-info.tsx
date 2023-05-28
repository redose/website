import type { EmergencyInfo, EmergencyContact, EmergencyContactPolicy } from '@redose/types';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import redoseApi from '../../redose-api';
import { useToast } from '../../components/providers/toast';
import Loading from '../../components/loading';
import NoteForm, { FormValues as NotesFormValues } from '../../components/user/emergency-info/note-form';
import Contacts from '../../components/user/emergency-info/contacts';

const EmergencyInfoPage: NextPage = function EmergencyInfoPage() {
  const toast = useToast();
  const [notes, setNotes] = useState<string>();
  const [notesLastUpdatedAt, setNotesLastUpdatedAt] = useState<Date>();
  const [contactPolicy, setContactPolicy] = useState<EmergencyContactPolicy | null>(null);
  const [contacts, setContacts] = useState<EmergencyContact[]>();

  useEffect(() => {
    const ctrl = new AbortController();
    redoseApi.get<EmergencyInfo>('/user/me/emergency-info', {
      signal: ctrl.signal,
    })
      .then((res) => res.data)
      .then((emergencyInfo) => {
        setNotes(emergencyInfo.notes || '');
        setNotesLastUpdatedAt(emergencyInfo.notesLastUpdatedAt
          && new Date(emergencyInfo.notesLastUpdatedAt));
        setContactPolicy(emergencyInfo.contactPolicy);
        setContacts(emergencyInfo.contacts.map((contact) => ({
          ...contact,
          createdAt: new Date(contact.createdAt),
        })));
        return emergencyInfo;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Unable to fetch emergency info.');
      });

    return () => {
      ctrl.abort();
    }
  }, []);

  async function updateNotes(values: NotesFormValues) {
    await redoseApi.patch<EmergencyInfo>('/user/me/emergency-info', values)
      .then((res) => {
        setNotes(res.data.notes);
        setContactPolicy(res.data.contactPolicy);
        setNotesLastUpdatedAt(new Date(res.data.notesLastUpdatedAt!));
        return res.data;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Could not update notes.');
      });
  }

  async function createContact(contact: unknown) {
    await redoseApi.post<EmergencyContact>('/user/me/emergency-info/contact', contact)
      .then((res) => {
        setContacts((prev) => (prev || []).concat(res.data));
        toast.success('Contact created.');
        return res.data;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Could not create contact.');
      });
  }

  async function updateContact(updates: EmergencyContact) {
    await redoseApi.patch<EmergencyContact>(`/user/emergency-info/contact/${updates.id}`, updates)
      .then((res) => {
        setContacts((prev) => prev
          ?.map((contact) => (contact.id === res.data.id ? res.data : contact)));
        toast.success('Contact updated.');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Could not update contact.');
      });
  }

  async function deleteContact(contactId: string) {
    await redoseApi.delete<void>(`/user/emergency-info/contact/${contactId}`)
      .then((res) => {
        setContacts((prev) => prev?.filter((contact) => contact.id !== contactId));
        toast.success('Contact deleted.');
        return res.data;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Could not delete contact.');
      });
  }

  return (
    <Container>
      <h1>My Emergency Contacts</h1>
      {notes === undefined ? (
        <Loading fixed />
      ) : (
        <>
          <h2>Notes</h2>
          <p>
            TODO: Write what sorts of things we expect to put in here etc&hellip;
          </p>

          <NoteForm
            notes={notes}
            contactPolicy={contactPolicy}
            lastUpdatedAt={notesLastUpdatedAt}
            onSubmit={updateNotes}
          />

          <h2>Contacts</h2>
          <Contacts
            contacts={contacts!}
            createContact={createContact}
            updateContact={updateContact}
            deleteContact={deleteContact}
          />
        </>
      )}
    </Container>
  );
};

export default EmergencyInfoPage;
