// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import CategoryListScreen from './CategoryListScreen';
import BoardListScreen from './BoardListScreen';
import ThreadListScreen from './ThreadListScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CategoryList"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="CategoryList" component={CategoryListScreen} />
        <Stack.Screen
          name="BoardList"
          component={BoardListScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen name="ThreadList" component={ThreadListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
