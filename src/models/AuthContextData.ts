import User from './User';
import UserAuth from './UserAuth';

export default interface AuthContextData {
  user: UserAuth;
  signIn(credentials: User): Promise<void>;
  signOut(): void;
  getCpf(): string | undefined;
  doesUserHavePersonalData(): boolean;
}
