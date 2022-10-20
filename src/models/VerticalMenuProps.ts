import MenuItem from './MenuItem';

export default interface VerticalMenuProps {
  className: string;
  menuItem: MenuItem[];
  useLogoutButton?: boolean;
}
