import User from './User';

export default interface Person {
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryStateId: number;
  zipCode: string;
  cityId: number;
  district: string;
  address: string;
  complement?: string;
  userId: string;
  user?: User;
}
