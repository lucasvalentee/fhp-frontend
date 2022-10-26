import City from './City';
import CountryState from './CountryState';

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
  countryState?: CountryState;
  city?: City;
}
