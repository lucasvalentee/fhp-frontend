import axios from 'axios';
import ProfessionalSpecialtyServiceLocation from '../models/ProfessionalSpecialtyServiceLocation';

export default class ProfessionalSpecialtyServiceLocationService {
  static async findByProfessional(
    professionalId: string,
  ): Promise<ProfessionalSpecialtyServiceLocation[]> {
    try {
      const response = await axios.get<ProfessionalSpecialtyServiceLocation[]>(
        `http://localhost:3333/professionals/specialties/serviceLocations/${professionalId}`,
      );
      const professionalSpecialtyServiceLocation = response.data;

      return professionalSpecialtyServiceLocation;
    } catch (error: Error | any) {
      console.log(
        '[ProfessionalSpecialtyServiceLocationService.findByProfessional] error -> ',
        error,
      );
      throw new Error(error.response.data.message);
    }
  }
}
