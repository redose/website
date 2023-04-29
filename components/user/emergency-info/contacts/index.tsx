import { useState, FC } from 'react';
import styled from 'styled-components';

interface Props {}

const EmergencyContacts: FC<Props> = function EmergencyContacts() {
  const [contacts, setContacts] = useState();
  const [isCreatingContact, setIsCreatingContact] = useState(false);
};

export default EmergencyContacts;
