import type { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';

const NotificationsButton = styled(Button)`
  position: relative;
`;

const Count = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5em;
  height: 1.5em;
  background-color: #e44;
  border-radius: 50%;
  border: 1px solid #eee;
`;

const Notifications: FC = function Notifications() {
  return (
    <NotificationsButton>
      <Count>3</Count>
      <FaEnvelope />
    </NotificationsButton>
  );
};

export default Notifications;
