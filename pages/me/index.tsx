import type { NextPage } from 'next';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

const MePage: NextPage = function MePage() {
  return (
    <Container>
      <h1>Your Dashboard</h1>

      <nav>
        <ul>
          <li>
            <Link href="/me/emergency-info">Emergency Info</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default MePage;
