import Specialty from './Specialty';

export default interface ProfessionalSpecialty {
  personCpf: string;
  professionalId: string;
  specialtyId: number;
  registerNumber: string;
  classEntity: string;
  specialty?: Specialty;
}
