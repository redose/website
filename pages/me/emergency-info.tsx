import type { EmergencyContact, EmergencyInfo } from '@redose/types';
import type { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import redoseApi from '../../redose-api';
import { useToast } from '../../components/providers/toast';
import Loading from '../../components/loading';
import NoteForm from '../../components/user/emergency-info/note-form';
import Contacts from '../../components/user/emergency-info/contacts';

const EmergencyInfoPage: NextPage = function EmergencyInfoPage() {
  const toast = useToast();
  const [res] = useAxios<EmergencyInfo>('/user/me/emergency-info');

  useEffect(() => {
    if (res.error) {
      console.error(res.error);
      toast.error('Unable to fetch emergency info.');
    }
  }, [res]);

  return (
    <Container>
      <h1>My Emergency Contacts</h1>
      {!res.loading ? (
        <Loading fixed />
      ) : (
        <>
          <h2>Notes</h2>
          <p>
            TODO: Write what sorts of things we expect to put in here etc&hellip;
          </p>
          <NoteForm notes={res.data!.notes} lastUpdatedAt={res.data!.notesLastUpdatedAt} />

          <h2>Contacts</h2>
          <Contacts initialContacts={contacts} />
        </>
      )}
    </Container>
  );
};

export default EmergencyInfoPage;
