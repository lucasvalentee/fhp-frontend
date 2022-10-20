import axios from 'axios';
import AuthState from '../models/AuthState';
import User from '../models/User';

export default class SessionService {
  static async create({ username, password }: User): Promise<AuthState | null> {
    try {
      const response = await axios.post(`http://localhost:3333/sessions`, {
        username,
        password,
      });
      const { user, token, personCpf } = response.data;

      return { user, token, personCpf };
    } catch (error) {
      console.log('[SessionService.create] error -> ', error);
    }

    return null;
  }
}
