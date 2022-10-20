import axios from 'axios';

export default class PersonService {
  static async findByUsername(username: string): Promise<object | null> {
    try {
      const response = await axios.get(
        `http://localhost:3333/people/findByUsername`,
        {
          params: username,
        },
      );
      const person = response.data;

      return person;
    } catch (error) {
      console.log('[PersonService.findByUsername] error -> ', error);
    }

    return null;
  }
}
