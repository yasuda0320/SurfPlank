// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryListScreen from './CategoryListScreen';
import BoardListScreen from './BoardListScreen';
import { RootStackParamList } from './types.ts';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CategoryList">
        <Stack.Screen name="CategoryList" component={CategoryListScreen} options={{ title: 'カテゴリ一覧' }} />
        <Stack.Screen name="BoardList" component={BoardListScreen} options={{ title: '板一覧' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
