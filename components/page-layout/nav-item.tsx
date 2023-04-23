import Link from 'next/link';
import type { ReactNode, FC } from 'react';
import { Nav } from 'react-bootstrap';

interface Props {
  children: ReactNode;
  href: string;
}

const NavItem: FC<Props> = function NavItem({ children, ...props }) {
  return (
    <Nav.Item as="li">
      <Nav.Link {...props} as={Link}>
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;
