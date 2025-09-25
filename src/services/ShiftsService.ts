import axios from 'axios';
import { Shift } from '../stores/RootStore';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export class ShiftsService {
  static async getShifts(latitude: number, longitude: number): Promise<Shift[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/shift`, {
        params: {
          latitude,
          longitude,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw new Error('Не удалось загрузить список смен');
    }
  }
}
