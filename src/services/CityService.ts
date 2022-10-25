import axios from 'axios';
import City from '../models/City';

export default class CityService {
  static async findById(id: number): Promise<City | null> {
    try {
      const response = await axios.get<City>(
        `http://localhost:3333/cities/findById/${id}`,
      );

      const city = response.data;

      return city;
    } catch (error: Error | any) {
      console.log('[CityService.findById] error -> ', error);
      throw new Error(error.response.data.message);
    }

    return null;
  }

  static async findByCountryState(countryStateId: number): Promise<City[]> {
    try {
      const response = await axios.get<City[]>(
        `http://localhost:3333/cities/findByCountryState/${countryStateId}`,
      );

      const cities = response.data;

      return cities;
    } catch (error: Error | any) {
      console.log('[CityService.findByCountryState] error -> ', error);
      throw new Error(error.response.data.message);
    }

    return [];
  }
}
