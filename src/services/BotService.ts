import axios from 'axios';
import BotResponse from '../models/BotResponse';

class BotService {
  static async processMessage(message: string): Promise<BotResponse> {
    try {
      const response = await axios.post<BotResponse>(
        `http://localhost:5000/processMessage`,
        {
          message,
        },
      );

      const botResponse = response.data;

      return botResponse;
    } catch (error: Error | any) {
      console.log('[BotService.processMessage] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static async startConversation(): Promise<BotResponse> {
    try {
      const response = await axios.post<BotResponse>(
        `http://localhost:5000/startConversation`,
      );

      const botResponse = response.data;

      return botResponse;
    } catch (error: Error | any) {
      console.log('[BotService.startConversation] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}

export default BotService;
