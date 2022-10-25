import User from './User';
import UserAuth from './UserAuth';

export default interface AuthContextData {
  user: UserAuth;
  personCpf?: string;
  signIn(credentials: User): Promise<boolean>;
  signOut(): void;
  refreshToken(cpf: string): void;
}
