import axios from 'axios';
import ProfessionalSpecialtyServiceLocation from '../models/ProfessionalSpecialtyServiceLocation';

interface ProfessionalSpecialtyServiceLocationRelationProps {
  personCpf: string;
  professionalId: string;
  specialties: string[];
}

export default class ProfessionalSpecialtyServiceLocationService {
  static async findByProfessional(
    professionalId: string,
  ): Promise<ProfessionalSpecialtyServiceLocation[]> {
    try {
      const response = await axios.get<ProfessionalSpecialtyServiceLocation[]>(
        `http://localhost:3333/professionals/specialties/serviceLocations/${professionalId}`,
      );
      const professionalSpecialtyServiceLocation = response.data;

      const unique = Array.from(
        new Set(
          professionalSpecialtyServiceLocation.map(
            item => item.serviceLocationId && item.serviceLocation,
          ),
        ),
      );

      return professionalSpecialtyServiceLocation;
    } catch (error: Error | any) {
      console.log(
        '[ProfessionalSpecialtyServiceLocationService.findByProfessional] error -> ',
        error,
      );
      throw new Error(error.response.data.message);
    }
  }

  static createRelationObject({
    personCpf,
    professionalId,
    specialties,
  }: ProfessionalSpecialtyServiceLocationRelationProps): ProfessionalSpecialtyServiceLocation[] {
    return specialties.map(specialtyId => ({
      personCpf,
      professionalId,
      specialtyId,
    }));
  }
}
