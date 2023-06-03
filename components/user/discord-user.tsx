import Link from 'next/link';
import type { FC } from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  p {
    margin-bottom: 0;
    margin-left: .8rem;
    font-weight: bold;
    text-align: right;
  }
`;

interface Props {
  id: string;
  username: string;
  avatar: string;
}

const DiscordUser: FC<Props> = function DiscordUser({ id, username, avatar }) {
  return (
    <ProfileLink href={`/users/${id}`}>
      <Image roundedCircle thumbnail src={avatar} alt={username} />
      <p>{username}</p>
    </ProfileLink>
  );
};

export default DiscordUser;
