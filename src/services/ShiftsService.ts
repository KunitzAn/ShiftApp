import axios from 'axios';
import { Shift } from '../stores/RootStore';

const API_BASE_URL = 'https://mobile.handswork.pro/api';
const API_PATH = 'shifts/map-list-unauthorized';

// Моковые данные для демонстрации (фолбэк)
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
];

function mapApiToShift(item: any): Shift {
  const workTypes = Array.isArray(item.workTypes)
    ? item.workTypes.map((w: any) => w?.name).filter(Boolean).join(', ')
    : (item.workTypes ?? '');
  const feedbackCount = typeof item.customerFeedbacksCount === 'string'
    ? parseInt(String(item.customerFeedbacksCount).replace(/\D+/g, ''), 10) || 0
    : (item.customerFeedbacksCount ?? 0);

  return {
    logo: item.logo ?? '',
    address: item.address ?? '',
    companyName: item.companyName ?? '',
    dateStartByCity: item.dateStartByCity ?? '',
    timeStartByCity: item.timeStartByCity ?? '',
    timeEndByCity: item.timeEndByCity ?? '',
    currentWorkers: Number(item.currentWorkers ?? 0),
    planWorkers: Number(item.planWorkers ?? 0),
    workTypes,
    priceWorker: Number(item.priceWorker ?? 0),
    customerFeedbacksCount: feedbackCount,
    customerRating: typeof item.customerRating === 'number' ? item.customerRating : 0,
  };
}

export class ShiftsService {
  static async getShifts(latitude: number, longitude: number): Promise<Shift[]> {
    const url = `${API_BASE_URL}/${API_PATH}`;
    try {
      // eslint-disable-next-line no-console
      console.log('Requesting shifts:', url, { latitude, longitude });
      const response = await axios.get(url, { params: { latitude, longitude } });

      // Ожидаемый формат: { data: [...], status: 200 }
      const payload = response.data;
      const list = Array.isArray(payload?.data) ? payload.data : [];
      const mapped: Shift[] = list.map(mapApiToShift);
      return mapped;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error fetching shifts:', error?.message ?? error);
      // Фолбэк на моковые данные, чтобы приложение продолжало работать
      return MOCK_SHIFTS;
    }
  }
}
