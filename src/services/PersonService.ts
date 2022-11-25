import axios from 'axios';
import Person from '../models/Person';

export default class PersonService {
  static async create({
    cpf,
    name,
    email,
    phoneNumber,
    countryStateId,
    zipCode,
    cityId,
    district,
    address,
    complement,
    userId,
    user,
  }: Person): Promise<boolean> {
    try {
      const response = await axios.post(`http://localhost:3333/people`, {
        cpf,
        name,
        email,
        phoneNumber,
        countryStateId,
        zipCode,
        cityId,
        district,
        address,
        complement,
        userId,
        user,
      });

      return response.status === 201;
    } catch (error: Error | any) {
      console.log('[PersonService.create] error -> ', { error });
      throw new Error(error.response.data.message);
    }
  }

  static async update({
    cpf,
    name,
    email,
    phoneNumber,
    countryStateId,
    zipCode,
    cityId,
    district,
    address,
    complement,
    userId,
    user,
  }: Person): Promise<boolean> {
    try {
      const response = await axios.put(`http://localhost:3333/people`, {
        cpf,
        name,
        email,
        phoneNumber,
        countryStateId,
        zipCode,
        cityId,
        district,
        address,
        complement,
        userId,
        user,
      });

      return response.status === 200;
    } catch (error: Error | any) {
      console.log('[PersonService.update] error -> ', { error });
      throw new Error(error.response.data.message);
    }

    return false;
  }

  static async findByCpf(cpf: string): Promise<Person | null> {
    try {
      const response = await axios.get(`http://localhost:3333/people/${cpf}`);
      const person = response.data;

      return person;
    } catch (error: Error | any) {
      console.log('[PersonService.findByCpf] error -> ', { error });
      throw new Error(error.response.data.message);
    }
  }
}
