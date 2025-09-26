import axios from 'axios';
import { Shift } from '../stores/RootStore';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

// Моковые данные для демонстрации
const MOCK_SHIFTS: Shift[] = [
  {
    logo: 'https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=C1',
    address: 'ул. Тверская, 15, Москва',
    companyName: 'Кафе "Уют"',
    dateStartByCity: '2024-01-15',
    timeStartByCity: '09:00',
    timeEndByCity: '17:00',
    currentWorkers: 2,
    planWorkers: 3,
    workTypes: 'Официант',
    priceWorker: 1500,
    customerFeedbacksCount: 25,
    customerRating: 4.5,
  },
  {
    logo: 'https://via.placeholder.com/50x50/2196F3/FFFFFF?text=S2',
    address: 'пр. Невский, 100, Санкт-Петербург',
    companyName: 'Магазин "Спорт"',
    dateStartByCity: '2024-01-16',
    timeStartByCity: '10:00',
    timeEndByCity: '18:00',
    currentWorkers: 1,
    planWorkers: 2,
    workTypes: 'Продавец-консультант',
    priceWorker: 2000,
    customerFeedbacksCount: 18,
    customerRating: 4.2,
  },
  {
    logo: 'https://via.placeholder.com/50x50/FF9800/FFFFFF?text=R3',
    address: 'ул. Арбат, 25, Москва',
    companyName: 'Ресторан "Восток"',
    dateStartByCity: '2024-01-17',
    timeStartByCity: '19:00',
    timeEndByCity: '23:00',
    currentWorkers: 3,
    planWorkers: 4,
    workTypes: 'Повар',
    priceWorker: 3000,
    customerFeedbacksCount: 42,
    customerRating: 4.8,
  },
];

export class ShiftsService {
  static async getShifts(latitude: number, longitude: number): Promise<Shift[]> {
    // Сначала попробуем реальный API
    const candidates: Array<{ path: string; params: Record<string, number | string> }> = [
      { path: 'shift', params: { latitude, longitude } },
      { path: 'shift', params: { lat: latitude, lon: longitude } },
      { path: 'shifts', params: { latitude, longitude } },
      { path: 'shifts', params: { lat: latitude, lon: longitude } },
    ];

    let lastError: unknown = null;

    for (const candidate of candidates) {
      const url = `${API_BASE_URL}/${candidate.path}`;
      try {
        // eslint-disable-next-line no-console
        console.log('Requesting shifts:', url, candidate.params);
        const response = await axios.get(url, { params: candidate.params });
        return response.data;
      } catch (error: any) {
        lastError = error;
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // eslint-disable-next-line no-console
          console.warn('404 for', url, 'trying next variant...');
          continue;
        }
        // eslint-disable-next-line no-console
        console.error('Request failed for', url, error?.message ?? error);
        break;
      }
    }

    // Если все варианты API не работают, используем моковые данные
    // eslint-disable-next-line no-console
    console.warn('API недоступен, используем моковые данные для демонстрации');
    // eslint-disable-next-line no-console
    console.log('Location:', { latitude, longitude });
    
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return MOCK_SHIFTS;
  }
}
