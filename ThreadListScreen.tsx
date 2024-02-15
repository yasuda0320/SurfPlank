// ThreadListScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native'; // RoutePropのインポート
import { RootStackParamList } from './types'; // RootStackParamListのインポート

// RootStackParamListを使用してThreadListScreenのroute propの型を定義
type ThreadListScreenRouteProp = RouteProp<RootStackParamList, 'ThreadList'>;

interface ThreadListScreenProps {
  route: ThreadListScreenRouteProp;
}

const ThreadListScreen: React.FC<ThreadListScreenProps> = ({ route }) => {
  // paramsからitemを直接取り出す
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text>Board Name: {item.board_name}</Text>
      <Text>URL: {item.url}</Text>
      {/* 必要に応じて他のitemプロパティを表示 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThreadListScreen;
