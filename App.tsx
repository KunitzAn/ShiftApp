/**
 * ShiftApp - React Native приложение для поиска смен
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import ShiftsListScreen from './src/screens/ShiftsListScreen';
import ShiftDetailsScreen from './src/screens/ShiftDetailsScreen';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ShiftsList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="ShiftsList"
            component={ShiftsListScreen}
            options={{ title: 'Доступные смены' }}
          />
          <Stack.Screen
            name="ShiftDetails"
            component={ShiftDetailsScreen}
            options={{ title: 'Детали смены' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
