import Link from 'next/link';
import type { ReactNode, FC } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import styled from 'styled-components';
import NavItem from './nav-item';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    padding-left: 0;

    > li:not(:last-of-type) {
      margin-right: 1.5rem;
    }
  }
`;

interface Props {
  children: ReactNode;
}

const PageLayout: FC<Props> = function PageLayout({ children }) {
  return (
    <div>
      <Navbar as="header">
        <Container fluid>
          <Navbar.Brand as={Link} href="/">re:dose</Navbar.Brand>
          <Nav>
            <ul>
              <NavItem href="/foo">Foo</NavItem>
            </ul>
            <ul>
              <NavItem href="/bar">Bar</NavItem>
            </ul>
          </Nav>
        </Container>
      </Navbar>

      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
