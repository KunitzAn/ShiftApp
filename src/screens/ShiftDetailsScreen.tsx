import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Shift } from '../stores/RootStore';

interface Props {
  route: {
    params: {
      shift: Shift;
    };
  };
}

const ShiftDetailsScreen = ({ route }: Props) => {
  const { shift } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.companyName}>{shift.companyName}</Text>
        <Text style={styles.address}>{shift.address}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата и время</Text>
          <Text style={styles.infoText}>Дата: {shift.dateStartByCity}</Text>
          <Text style={styles.infoText}>Начало: {shift.timeStartByCity}</Text>
          <Text style={styles.infoText}>Окончание: {shift.timeEndByCity}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Работа</Text>
          <Text style={styles.infoText}>Тип: {shift.workTypes}</Text>
          <Text style={styles.infoText}>Требуется: {shift.planWorkers} человек</Text>
          <Text style={styles.infoText}>Набрано: {shift.currentWorkers} человек</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Оплата</Text>
          <Text style={styles.price}>₽{shift.priceWorker}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Рейтинг компании</Text>
          <Text style={styles.infoText}>Рейтинг: {shift.customerRating}/5</Text>
          <Text style={styles.infoText}>Отзывов: {shift.customerFeedbacksCount}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default ShiftDetailsScreen;
