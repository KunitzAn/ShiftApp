import Geolocation from '@react-native-community/geolocation';
import { Location } from '../stores/RootStore';

export class LocationService {
  static async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Location error:', error);
          reject(new Error('Не удалось получить геолокацию'));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  static async requestLocationPermission(): Promise<boolean> {
    // В реальном приложении здесь была бы логика запроса разрешений
    // Для упрощения возвращаем true
    return true;
  }
}
