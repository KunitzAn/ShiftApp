import React, { useEffect, useCallback, memo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { rootStore, Shift } from '../stores/RootStore';
import { LocationService } from '../services/LocationService';
import { ShiftsService } from '../services/ShiftsService';

interface Props {
  navigation: any;
}

const ShiftsListScreen = observer(({ navigation }: Props) => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Запрашиваем геолокацию
      rootStore.setLocationLoading(true);
      const location = await LocationService.getCurrentLocation();
      rootStore.setLocation(location);
      rootStore.setLocationLoading(false);

      // Загружаем смены
      rootStore.setShiftsLoading(true);
      const shifts = await ShiftsService.getShifts(location.latitude, location.longitude);
      rootStore.setShifts(shifts);
      rootStore.setShiftsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      rootStore.setLocationError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      rootStore.setShiftsError(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  };

  const renderShiftItem = useCallback(({ item }: { item: Shift }) => (
    <TouchableOpacity
      style={styles.shiftItem}
      onPress={() => navigation.navigate('ShiftDetails', { shift: item })}
    >
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.price}>₽{item.priceWorker}</Text>
    </TouchableOpacity>
  ), [navigation]);

  const keyExtractor = useCallback((item: Shift, index: number) => 
    `${item.companyName}-${item.dateStartByCity}-${index}`, []);

  if (rootStore.locationLoading || rootStore.shiftsLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  if (rootStore.locationError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ошибка геолокации: {rootStore.locationError}</Text>
      </View>
    );
  }

  if (rootStore.shiftsError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ошибка загрузки смен: {rootStore.shiftsError}</Text>
      </View>
    );
  }

  if (!rootStore.hasShifts) {
    return (
      <View style={styles.centerContainer}>
        <Text>Смены не найдены</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rootStore.shifts}
        keyExtractor={keyExtractor}
        renderItem={renderShiftItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  shiftItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  errorText: {
    color: '#f44336',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default memo(ShiftsListScreen);
