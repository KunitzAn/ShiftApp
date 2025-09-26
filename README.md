# Shift Finder App

Приложение на React Native (CLI) для отображения списка доступных смен для подработки на основе геолокации пользователя.

## 📱 Функционал

- Запрашивает точную геолокацию пользователя при первом запуске
- Получает список доступных смен по API с координатами пользователя
- Отображает список смен с краткой информацией:
  - Компания и логотип
  - Адрес
  - Дата и время
  - Количество рабочих мест
  - Оплата
- Экран деталей смены открывается по нажатию на элемент списка
- Данные берутся из ранее загруженного списка (без повторного запроса)
- Состояние хранится с использованием MobX

## 🚀 Запуск проекта

Перед запуском убедитесь, что у вас настроено окружение для React Native CLI:
[React Native Environment Setup](https://reactnative.dev/docs/environment-setup) (выберите React Native CLI Quickstart).

### 1. Установите зависимости

```bash
npm install
# или
yarn install
```

### 2. Запустите Metro bundler

```bash
npm start
# или
yarn start
```

### 3. Запустите приложение

#### Android

```bash
npm run android
# или
yarn android
```

#### iOS

Перед первым запуском установите зависимости CocoaPods:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Затем:

```bash
npm run ios
# или
yarn ios
```

## 🛠 Технологии

- **React Native CLI** - основная платформа
- **MobX** - управление состоянием
- **React Navigation** - навигация между экранами
- **TypeScript** - типизация
- **Axios** - HTTP запросы
- **@react-native-community/geolocation** - работа с геолокацией

## 📋 Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
├── screens/        # Экраны приложения
├── services/       # API сервисы
├── stores/         # MobX stores
├── types/          # TypeScript типы
└── utils/          # Утилиты
```

## 🔧 API

Приложение использует API: `https://mobile.handswork.pro/api/shifts/map-list-unauthorized`

**Параметры запроса:**
- `latitude` - широта пользователя
- `longitude` - долгота пользователя

**Формат ответа:**
```json
{
  "data": [
    {
      "id": "string",
      "logo": "string",
      "address": "string", 
      "companyName": "string",
      "dateStartByCity": "string",
      "timeStartByCity": "string",
      "timeEndByCity": "string",
      "currentWorkers": number,
      "planWorkers": number,
      "workTypes": [{"name": "string"}],
      "priceWorker": number,
      "customerFeedbacksCount": "string",
      "customerRating": number
    }
  ],
  "status": 200
}
```

## 📱 Демонстрация

Приложение запрашивает геолокацию при первом запуске и загружает список доступных смен в радиусе пользователя. При нажатии на смену открывается детальная информация.

## 🎯 Особенности реализации

- **Оптимизация производительности**: React.memo, useCallback, оптимизированный FlatList
- **Обработка ошибок**: fallback на моковые данные при недоступности API
- **UX**: индикаторы загрузки, красивые анимации переходов
- **Типизация**: полная типизация с TypeScript
- **Архитектура**: чистая архитектура с разделением на слои