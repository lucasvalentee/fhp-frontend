import axios from 'axios';
import CountryState from '../models/CountryState';

export default class CountryStateService {
  static async findAll(): Promise<CountryState[]> {
    try {
      const response = await axios.get<CountryState[]>(
        `http://localhost:3333/countryStates`,
      );

      const countryStates = response.data;

      return countryStates;
    } catch (error: Error | any) {
      console.log('[CountryStateService.findAll] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async findById(id: number): Promise<CountryState | null> {
    try {
      const response = await axios.get<CountryState>(
        `http://localhost:3333/countryStates`,
        { params: id },
      );

      const countryState = response.data;

      return countryState;
    } catch (error: Error | any) {
      console.log('[CountryStateService.findById] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}
