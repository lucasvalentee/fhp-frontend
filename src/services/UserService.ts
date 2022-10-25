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
    } catch (error: Error | any) {
      console.log('[UserService.create] error -> ', { error });
      throw new Error(error.response.data.message);
    }

    return false;
  }

  static async findUserByUsername(username: string): Promise<User | null> {
    try {
      const response = await axios.get(
        `http://localhost:3333/users/findByUsername/${username}`,
      );

      const user = response.data;

      return user;
    } catch (error: Error | any) {
      console.log('[UserService.create] error -> ', { error });
      throw new Error(error.response.data.message);
    }

    return null;
  }
}
