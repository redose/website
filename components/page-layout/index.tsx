import Link from 'next/link';
import type { ReactNode, FC } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import NavItem from './nav-item';

interface Props {
  children: ReactNode;
}

const PageLayout: FC<Props> = function PageLayout({ children }) {
  return (
    <div>
      <Navbar as="header">
        <Container fluid>
          <Navbar.Brand as={Link} href="/">re:dose</Navbar.Brand>
          <nav>
            <ul>
              <NavItem href="/foo">Foo</NavItem>
            </ul>
            <ul>
              <NavItem href="/bar">Bar</NavItem>
            </ul>
          </nav>
        </Container>
      </Navbar>

      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
