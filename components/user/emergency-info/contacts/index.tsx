import type { EmergencyInfoContact } from '@redose/types';
import { useState, FC } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

interface Props {
  initialContacts: EmergencyInfoContact[];
}

const EmergencyContacts: FC<Props> = function EmergencyContacts({
  initialContacts,
}) {
  const [contacts, setContacts] = useState<EmergencyInfoContact[]>(initialContacts);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyInfoContact>();

  return (
    <Table striped bordered>
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
        ) : contacts.map((contact) => (contact.id === editingContact?.id ? (
          <EmergencyContactTableRowForm {...editingContact} />
        ) : (
          <tr key={contact.id}>
            <td>{contact.userId}</td>
            <td>{contact.contactEmail}</td>
            <td>
              <Button type="button" variant="warning" onClick={() => setEditingContact(contact)}>
                <FaEdit />
              </Button>
            </td>
          </tr>
        )))}
      </tbody>
    </Table>
  );
};

export default EmergencyContacts;
