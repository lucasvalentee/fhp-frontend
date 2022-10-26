import ServiceLocation from './ServiceLocation';

export default interface ProfessionalSpecialtyServiceLocation {
  professionalId: string;
  personCpf: string;
  specialtyId: string;
  serviceLocationId?: string;
  serviceLocation?: ServiceLocation;
}
