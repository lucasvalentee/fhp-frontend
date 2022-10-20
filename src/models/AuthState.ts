import UserAuth from './UserAuth';

export default interface AuthState {
  user: UserAuth;
  token: string;
  personCpf?: string;
}
