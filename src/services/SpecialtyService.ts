import axios from 'axios';
import Specialty from '../models/Specialty';

export default class SpecialtyService {
  static async findAll(): Promise<Specialty[]> {
    try {
      const response = await axios.get<Specialty[]>(
        `http://localhost:3333/specialties`,
      );

      const specialties = response.data;

      return specialties;
    } catch (error: Error | any) {
      console.log('[SpecialtyService.findAll] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}
