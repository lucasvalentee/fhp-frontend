import axios from 'axios';
import User from '../models/User';

export default class UserService {
  static async create({ username, password }: User): Promise<boolean> {
    try {
      const response = await axios.post(`http://localhost:3333/users`, {
        username,
        password,
      });

      return response.status === 201;
    } catch (error) {
      console.log('[UserService.create] error -> ', { error });
    }

    return false;
  }
}
