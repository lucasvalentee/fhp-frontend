import axios from 'axios';
import ServiceLocation from '../models/ServiceLocation';

export default class ServiceLocationService {
  static async save({
    id,
    countryStateId,
    cityId,
    zipCode,
    district,
    address,
    complement,
    phoneNumber,
    medicalInsurance,
    paymentMethods,
    professionalSpecialtyServiceLocation,
  }: ServiceLocation): Promise<boolean> {
    try {
      const response = await axios.post(
        `http://localhost:3333/serviceLocations`,
        {
          id,
          countryStateId,
          cityId,
          zipCode,
          district,
          address,
          complement,
          phoneNumber,
          medicalInsurance,
          paymentMethods,
          professionalSpecialtyServiceLocation,
        },
      );

      return response.status === 201;
    } catch (error: Error | any) {
      console.log('[ServiceLocationService.create] error -> ', { error });
      throw new Error(error.response.data.message);
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const response = await axios.delete(
        `http://localhost:3333/serviceLocations/${id}`,
      );

      return response.status === 200;
    } catch (error: Error | any) {
      console.log('[ServiceLocationService.delete] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async findById(id: string): Promise<ServiceLocation> {
    try {
      const response = await axios.get(
        `http://localhost:3333/serviceLocations/${id}`,
      );

      const serviceLocation = response.data;

      return serviceLocation;
    } catch (error: Error | any) {
      console.log('[ServiceLocationService.findById] error -> ', {
        error,
      });
      throw new Error(error.response.data.message);
    }
  }

  static async findByProfessional(
    professionalId: string,
  ): Promise<ServiceLocation[]> {
    try {
      const response = await axios.get(
        `http://localhost:3333/serviceLocations/findByProfessional/${professionalId}`,
      );

      const serviceLocations = response.data;

      return serviceLocations;
    } catch (error: Error | any) {
      console.log('[ServiceLocationService.findByProfessional] error -> ', {
        error,
      });
      throw new Error(error.response.data.message);
    }
  }
}
