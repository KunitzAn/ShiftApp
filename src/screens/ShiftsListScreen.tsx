import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { rootStore, Shift } from '../stores/RootStore';

interface Props {
  navigation: any;
}

const ShiftsListScreen = observer(({ navigation }: Props) => {
  const renderShiftItem = ({ item }: { item: Shift }) => (
    <TouchableOpacity
      style={styles.shiftItem}
      onPress={() => navigation.navigate('ShiftDetails', { shift: item })}
    >
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.price}>₽{item.priceWorker}</Text>
    </TouchableOpacity>
  );

  if (rootStore.shiftsLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Загрузка смен...</Text>
      </View>
    );
  }

  if (rootStore.shiftsError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ошибка: {rootStore.shiftsError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rootStore.shifts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderShiftItem}
        contentContainerStyle={styles.listContainer}
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
});

export default ShiftsListScreen;
