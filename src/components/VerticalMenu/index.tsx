import React from 'react';
import { useAuth } from '../../hooks/auth';
import VerticalMenuProps from '../../models/VerticalMenuProps';

import {
  Container,
  DisabledNavLink,
  LogoutButton,
  StyledNavLink,
} from './styles';

const VerticalMenu: React.FC<VerticalMenuProps> = ({
  className,
  menuItem,
  useLogoutButton,
  children,
}) => {
  const { signOut } = useAuth();

  return (
    <Container className={className}>
      {children}
      {menuItem.length &&
        menuItem.map(item =>
          !item.disable ? (
            <StyledNavLink
              key={item.linkTo}
              to={`${item.linkTo}`}
              activeClassName="menuItemActive"
            >
              {item.title}
            </StyledNavLink>
          ) : (
            <DisabledNavLink key={item.linkTo}>{item.title}</DisabledNavLink>
          ),
        )}

      {useLogoutButton && (
        <LogoutButton to="/" onClick={() => signOut()}>
          Logout
        </LogoutButton>
      )}
    </Container>
  );
};

export default VerticalMenu;
