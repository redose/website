import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import NoteTable from '../../../components/user/notes/table';

const UserDetailsPage: NextPage = function UserDetailsPage() {
  const router = useRouter();
  const userId = router.query.userId as string;

  return (
    <Container>
      <h1>User Details</h1>
      <NoteTable userId={userId} />
    </Container>
  );
};

export default UserDetailsPage;
