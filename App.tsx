// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Platform } from 'react-native';

import CategoryListScreen from './CategoryListScreen';
import BoardListScreen from './BoardListScreen';
import ThreadListScreen from './ThreadListScreen';
import ResponseListScreen from './ResponseListScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CategoryList"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          // Use the forHorizontalIOS interpolator for a smoother swipe gesture experience
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // Adjust gesture response distance if needed, especially for larger devices
          gestureResponseDistance: Platform.OS === 'android' ? 120 : 100,
        }}
      >
        <Stack.Screen name="CategoryList" component={CategoryListScreen} />
        <Stack.Screen name="BoardList" component={BoardListScreen} />
        <Stack.Screen name="ThreadList" component={ThreadListScreen} />
        <Stack.Screen name="ResponseList" component={ResponseListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
