import City from './City';
import CountryState from './CountryState';
import ProfessionalSpecialtyServiceLocation from './ProfessionalSpecialtyServiceLocation';

export default interface ServiceLocation {
  id?: string;
  countryStateId: number;
  cityId: number;
  zipCode: string;
  district: string;
  address: string;
  complement?: string;
  phoneNumber: string;
  medicalInsurance: string;
  paymentMethods?: string[];
  countryState?: CountryState;
  city?: City;
  professionalSpecialtyServiceLocation?: ProfessionalSpecialtyServiceLocation[];
}
