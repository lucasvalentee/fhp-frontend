import axios from 'axios';
import Professional from '../models/Professional';

export default class ProfessionalService {
  static async create({ personCpf }: Professional): Promise<boolean> {
    try {
      const response = await axios.post(`http://localhost:3333/professionals`, {
        personCpf,
      });

      return response.status === 201;
    } catch (error: Error | any) {
      console.log('[ProfessionalService.create] error -> ', { error });
      throw new Error(error.response.data.message);
    }
  }

  static async findByCpf(cpf: string): Promise<Professional> {
    try {
      const response = await axios.get<Professional>(
        `http://localhost:3333/professionals/${cpf}`,
      );

      return response.data;
    } catch (error: Error | any) {
      console.log('[ProfessionalService.findByCpf] error -> ', { error });
      throw new Error(error.response.data.message);
    }
  }
}
