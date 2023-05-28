import type { EmergencyContact } from '@redose/types';
import { useState, FC } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { AddButton, EditButton, DeleteButton } from '../../../buttons';
import EmergencyContactsFormModal from './form-modal';

const PostTableControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledTable = styled(Table)`
  td:empty {
    content: '-';
    font-weight: bold;
  }
`;

interface Props {
  contacts: EmergencyContact[];
  createContact(contact: Pick<EmergencyContact, 'contactId' | 'email'>): Promise<void>;
  updateContact(contact: EmergencyContact): Promise<void>;
  deleteContact(contactId: string): Promise<void>;
}

const EmergencyContacts: FC<Props> = function EmergencyContacts({
  contacts,
  createContact,
  updateContact,
  deleteContact,
}) {
  const [editingContact, setEditingContact] = useState<boolean | EmergencyContact>(false);
  const isCreating = editingContact === true;

  return (
    <>
      <StyledTable striped bordered>
        <thead>
          <tr>
            <th>Discord ID</th>
            <th>Email</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {!contacts.length ? (
            <tr>
              <td colSpan={3}>
                Unable to fetch emergency contacts.
              </td>
            </tr>
          ) : contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.userId}</td>
              <td>{contact.email}</td>
              <td>
                <EditButton onClick={() => setEditingContact(contact)} />
                <DeleteButton onClick={() => deleteContact(contact.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <PostTableControls>
        <Button
          variant={isCreating ? 'danger' : 'success'}
          onClick={() => setEditingContact(true)}
        >
          {isCreating ? 'Cancel' : 'Create'}
        </Button>
      </PostTableControls>

      {editingContact && (
        <EmergencyContactsFormModal
          contactId={isCreating ? undefined : editingContact.id}
          discordId={isCreating ? undefined : editingContact.userId}
          email={isCreating ? undefined : editingContact.email}
          close={() => setEditingContact(false)}
          onSubmit={isCreating ? createContact : updateContact}
        />
      )}
    </>
  );
};

export default EmergencyContacts;
