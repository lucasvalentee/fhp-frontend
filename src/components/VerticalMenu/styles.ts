import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.nav`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 340px;
  background-color: #eff3f8;

  .menuItemActive {
    background-color: #e4e9ef;
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  height: 60px;
  background-color: #eff3f8;
  color: #494949;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #e4e9ef;
  }
`;

export const DisabledNavLink = styled.div`
  text-decoration: none;
  height: 60px;
  background-color: #eff3f8;
  color: #cdcdcd;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoutButton = styled(Link)`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 340px;
  background-color: #ffaeae;
  color: #494949;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #ffa5a5;
  }
`;