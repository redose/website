import type { EmergencyContact } from '@redose/types';
import { useState, FC } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import { EditButton, DeleteButton } from '../../../buttons';
import DiscordUser from '../../discord-user';
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
    font-style: italic;
  }
`;

const ControlsCell = styled.td`
  > button:not(:last-of-type) {
    margin-right: .5em;
  }
`;

interface CreateContactArgs {
  contactId?: string;
  email?: string;
}

interface UpdateContactArgs extends CreateContactArgs {
  id: string;
}

interface Props {
  contacts: EmergencyContact[];
  createContact(contact: CreateContactArgs): Promise<void>;
  updateContact(contact: EmergencyContact): Promise<void>;
  deleteContact(contactId: string): Promise<void>;
}

const EmergencyContacts: FC<Props> = function EmergencyContacts({
  contacts,
  createContact,
  updateContact,
  deleteContact,
}) {
  const [editingContact, setEditingContact] = useState<boolean | UpdateContactArgs>(false);
  const isCreating = editingContact === true;

  return (
    <>
      <StyledTable striped bordered>
        <thead>
          <tr>
            <th>Discord</th>
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
          ) : contacts.map(({ id, email, contact }) => (
            <tr key={id}>
              <td>
                {!contact ? null : (
                  <DiscordUser {...contact} />
                )}
              </td>
              <td>{email}</td>
              <ControlsCell>
                <EditButton
                  onClick={() => setEditingContact({
                    id,
                    email,
                    contactId: contact?.id,
                  })}
                />
                <DeleteButton onClick={() => deleteContact(id)} />
              </ControlsCell>
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
