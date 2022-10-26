import axios from 'axios';
import ProfessionalSpecialty from '../models/ProfessionalSpecialty';

export default class ProfessionalSpecialtyService {
  static async create({
    specialtyId,
    classEntity,
    personCpf,
    professionalId,
    registerNumber,
  }: ProfessionalSpecialty): Promise<boolean> {
    try {
      const response = await axios.post(
        `http://localhost:3333/professionals/specialties`,
        { specialtyId, classEntity, personCpf, professionalId, registerNumber },
      );
      return response.status === 201;
    } catch (error: Error | any) {
      console.log('[ProfessionalSpecialtyService.create] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async delete({
    specialtyId,
    professionalId,
  }: ProfessionalSpecialty): Promise<boolean> {
    try {
      const response = await axios.delete(
        `http://localhost:3333/professionals/specialties/${professionalId}/${specialtyId}`,
      );

      return response.status === 200;
    } catch (error: Error | any) {
      console.log('[ProfessionalSpecialtyService.delete] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async findByCpf(cpf: string): Promise<ProfessionalSpecialty[]> {
    try {
      const response = await axios.get<ProfessionalSpecialty[]>(
        `http://localhost:3333/professionals/specialties/findByCpf/${cpf}`,
      );
      const professionalSpecialties = response.data;

      return professionalSpecialties;
    } catch (error: Error | any) {
      console.log('[ProfessionalSpecialtyService.findByCpf] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}
