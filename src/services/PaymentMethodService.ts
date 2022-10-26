import axios from 'axios';
import PaymentMethod from '../models/PaymentMethod';

export default class PaymentMethodService {
  static async findAll(): Promise<PaymentMethod[]> {
    try {
      const response = await axios.get<PaymentMethod[]>(
        `http://localhost:3333/paymentMethods`,
      );

      const paymentMethods = response.data;

      return paymentMethods;
    } catch (error: Error | any) {
      console.log('[PaymentMethodService.findAll] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}
